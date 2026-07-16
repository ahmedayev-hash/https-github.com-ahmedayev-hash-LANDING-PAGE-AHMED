import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Configuration constants
const DEFAULT_ADJUSTMENT = 1500;
const DEFAULT_CACHE_SECONDS = 3600;
const STATIC_FALLBACK_REFERENCE_RATE = 16150; // Hardcoded fallback rate

interface CachedRate {
  referenceRate: number;
  source: string;
  updatedAt: Date;
  isFallback: boolean;
}

// In-memory cache
let rateCache: CachedRate | null = null;

// Helper to fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Check if rate is reasonable (between 10,000 and 25,000 IDR per USD)
function isValidRate(rate: any): rate is number {
  if (typeof rate !== "number" || isNaN(rate)) return false;
  return rate >= 10000 && rate <= 25000;
}

// Fetch exchange rate with fallback logic
async function getUpdatedRate(): Promise<CachedRate> {
  const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID;
  const timeout = 6000; // 6 seconds timeout

  // 1. Try Open Exchange Rates (if APP_ID is set)
  if (appId && appId.trim() !== "") {
    try {
      console.log("Fetching from Open Exchange Rates...");
      const url = `https://openexchangerates.org/api/latest.json?app_id=${appId.trim()}`;
      const res = await fetchWithTimeout(url, timeout);
      if (res.ok) {
        const data = await res.json();
        const rate = data?.rates?.IDR;
        if (isValidRate(rate)) {
          console.log(`Success OER: ${rate}`);
          return {
            referenceRate: rate,
            source: "open-exchange-rates",
            updatedAt: new Date(),
            isFallback: false,
          };
        }
      }
      console.warn(`Open Exchange Rates returned non-ok status: ${res.status}`);
    } catch (err) {
      console.error("Error fetching from Open Exchange Rates:", err);
    }
  } else {
    console.log("Open Exchange Rates App ID not configured, skipping to fallback API...");
  }

  // 2. Try Fallback API (open.er-api.com)
  try {
    console.log("Fetching from open.er-api.com fallback...");
    const url = "https://open.er-api.com/v6/latest/USD";
    const res = await fetchWithTimeout(url, timeout);
    if (res.ok) {
      const data = await res.json();
      const rate = data?.rates?.IDR;
      if (isValidRate(rate)) {
        console.log(`Success Fallback API: ${rate}`);
        return {
          referenceRate: rate,
          source: "open-er-api",
          updatedAt: new Date(),
          isFallback: true,
        };
      }
    }
    console.warn(`Fallback API returned non-ok status: ${res.status}`);
  } catch (err) {
    console.error("Error fetching from Fallback API:", err);
  }

  // 3. Try using previous cache even if expired
  if (rateCache) {
    console.log("Using expired cache as safe fallback.");
    return {
      ...rateCache,
      isFallback: true, // Marked as fallback because we couldn't fetch fresh data
    };
  }

  // 4. Ultimate hardcoded static fallback
  console.log("Using ultimate hardcoded static fallback.");
  return {
    referenceRate: STATIC_FALLBACK_REFERENCE_RATE,
    source: "static-fallback",
    updatedAt: new Date(),
    isFallback: true,
  };
}

// API endpoint for Exchange Rate
app.get("/api/exchange-rate", async (req, res) => {
  try {
    // Read parameters from env with fallbacks
    const adjustment = process.env.EXCHANGE_RATE_ADJUSTMENT_IDR 
      ? parseInt(process.env.EXCHANGE_RATE_ADJUSTMENT_IDR, 10) 
      : DEFAULT_ADJUSTMENT;
    const cacheSeconds = process.env.EXCHANGE_RATE_CACHE_SECONDS 
      ? parseInt(process.env.EXCHANGE_RATE_CACHE_SECONDS, 10) 
      : DEFAULT_CACHE_SECONDS;

    const cacheMs = cacheSeconds * 1000;
    const now = new Date();

    let currentRate: CachedRate;
    let isStale = false;

    if (rateCache && (now.getTime() - rateCache.updatedAt.getTime() < cacheMs)) {
      // Serve valid cached rate
      currentRate = rateCache;
    } else {
      // Cache expired or empty, fetch new rate
      try {
        currentRate = await getUpdatedRate();
        
        // If we fetched a fresh rate, update cache.
        // If we got back the previous rateCache due to error (and it's marked fallback), it is stale.
        if (rateCache && currentRate.source === rateCache.source && currentRate.updatedAt === rateCache.updatedAt) {
          isStale = true;
        } else {
          rateCache = currentRate;
        }
      } catch (error) {
        console.error("Unhandled error in getUpdatedRate:", error);
        if (rateCache) {
          currentRate = rateCache;
          isStale = true;
        } else {
          currentRate = {
            referenceRate: STATIC_FALLBACK_REFERENCE_RATE,
            source: "static-fallback",
            updatedAt: new Date(),
            isFallback: true,
          };
          isStale = true;
        }
      }
    }

    // Calculations
    const referenceRate = currentRate.referenceRate;
    const transactionRate = Math.round(referenceRate - adjustment);
    const nextRefreshAt = new Date(currentRate.updatedAt.getTime() + cacheMs);

    // If source is static-fallback, let's treat it as stale
    if (currentRate.source === "static-fallback") {
      isStale = true;
    }

    res.json({
      success: true,
      base: "USD",
      target: "IDR",
      referenceRate,
      adjustment,
      transactionRate,
      source: currentRate.source,
      updatedAt: currentRate.updatedAt.toISOString(),
      nextRefreshAt: nextRefreshAt.toISOString(),
      isFallback: currentRate.isFallback,
      isStale,
    });
  } catch (err) {
    console.error("Critical error in /api/exchange-rate:", err);
    // Secure fallback JSON response
    res.json({
      success: true,
      base: "USD",
      target: "IDR",
      referenceRate: STATIC_FALLBACK_REFERENCE_RATE,
      adjustment: DEFAULT_ADJUSTMENT,
      transactionRate: Math.round(STATIC_FALLBACK_REFERENCE_RATE - DEFAULT_ADJUSTMENT),
      source: "error-fallback",
      updatedAt: new Date().toISOString(),
      nextRefreshAt: new Date(Date.now() + DEFAULT_CACHE_SECONDS * 1000).toISOString(),
      isFallback: true,
      isStale: true,
    });
  }
});

// Vite or Static Server Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
