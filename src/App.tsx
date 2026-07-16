import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LazyLoadSection from "./components/LazyLoadSection";
import { ExchangeRateData } from "./types";

// Lazy-loaded subcomponents below the fold
const Trust = lazy(() => import("./components/Trust"));
const Services = lazy(() => import("./components/Services"));
const WhyChoose = lazy(() => import("./components/WhyChoose"));
const HowItWorks = lazy(() => import("./components/HowItWorks"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/FAQ"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));
const CursorFollower = lazy(() => import("./components/CursorFollower"));
const TradingDesk = lazy(() => import("./components/TradingDesk"));

export default function App() {
  const [isDeskOpen, setIsDeskOpen] = useState(false);
  const [deskTab, setDeskTab] = useState<"paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer">("paypal");

  const [rateData, setRateData] = useState<ExchangeRateData | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  const rateDataRef = useRef<ExchangeRateData | null>(null);

  useEffect(() => {
    rateDataRef.current = rateData;
  }, [rateData]);

  const fetchExchangeRate = async () => {
    try {
      setIsLoadingRate(true);
      const res = await fetch("/api/exchange-rate");
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          setRateData(data);
        }
      }
    } catch (err) {
      console.error("Error fetching exchange rate from internal API:", err);
    } finally {
      setIsLoadingRate(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();

    const handleFocus = () => {
      const currentData = rateDataRef.current;
      if (currentData) {
        const lastUpdate = new Date(currentData.updatedAt).getTime();
        const now = Date.now();
        // Fetch again if > 60 minutes have passed
        if (now - lastUpdate > 60 * 60 * 1000) {
          fetchExchangeRate();
        }
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleOpenTradingDesk = (tab: "paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer" = "paypal") => {
    setDeskTab(tab);
    setIsDeskOpen(true);
  };

  const handleCloseTradingDesk = () => {
    setIsDeskOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-[#EC6519] selection:text-white relative overflow-x-hidden bg-[#0B0D12] text-[#F4EEE8]">
      {/* Premium SaaS Backdrop Layers */}
      <div className="noise-bg" />
      <div className="vignette-overlay" />
      
      {/* Background Decorative Ambient Glows - Cinematic soft gradients */}
      <div className="absolute top-[60%] left-[-15%] w-[800px] h-[800px] rounded-full bg-[#EC6519] opacity-[0.05] blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[5%] right-[-15%] w-[850px] h-[850px] rounded-full bg-[#C53F28] opacity-[0.04] blur-[170px] pointer-events-none z-0" />

      {/* Ultra-light grid pattern */}
      <div className="premium-grid z-0" />
      
      {/* Top sticky floating menu */}
      <Navbar 
        onStartTrading={() => handleOpenTradingDesk("paypal")} 
      />

      {/* Main Landing Flow */}
      <main className="relative" id="landing-main-flow">
        {/* Hero Section */}
        <Hero 
          onStartTrading={handleOpenTradingDesk} 
          rateData={rateData} 
          isLoadingRate={isLoadingRate} 
          onRefreshRate={fetchExchangeRate} 
        />

        {/* Operational Security & Trust Counter Section */}
        <LazyLoadSection height="120px">
          <Suspense fallback={<div className="h-[120px]" />}>
            <Trust />
          </Suspense>
        </LazyLoadSection>

        {/* Major Service Portfolios Section */}
        <LazyLoadSection height="500px">
          <Suspense fallback={<div className="h-[500px]" />}>
            <Services onStartTrading={handleOpenTradingDesk} />
          </Suspense>
        </LazyLoadSection>

        {/* Value Pillars Section */}
        <LazyLoadSection height="500px">
          <Suspense fallback={<div className="h-[500px]" />}>
            <WhyChoose />
          </Suspense>
        </LazyLoadSection>

        {/* Interactive Operations Step-by-Step Timeline */}
        <LazyLoadSection height="500px">
          <Suspense fallback={<div className="h-[500px]" />}>
            <HowItWorks />
          </Suspense>
        </LazyLoadSection>

        {/* Verified Customer Feedback Cards */}
        <LazyLoadSection height="400px">
          <Suspense fallback={<div className="h-[400px]" />}>
            <Testimonials />
          </Suspense>
        </LazyLoadSection>

        {/* Accordions Support Drawer */}
        <LazyLoadSection height="400px">
          <Suspense fallback={<div className="h-[400px]" />}>
            <FAQ />
          </Suspense>
        </LazyLoadSection>

        {/* Premium CTA Panel */}
        <LazyLoadSection height="300px">
          <Suspense fallback={<div className="h-[300px]" />}>
            <CTA onStartTrading={() => handleOpenTradingDesk("paypal")} />
          </Suspense>
        </LazyLoadSection>
      </main>

      {/* Sticky footer with links and support information */}
      <LazyLoadSection height="300px">
        <Suspense fallback={<div className="h-[300px]" />}>
          <Footer onStartTrading={handleOpenTradingDesk} />
        </Suspense>
      </LazyLoadSection>

      {/* Modal Secure Trading desk panel */}
      {isDeskOpen && (
        <Suspense fallback={null}>
          <TradingDesk 
            isOpen={isDeskOpen} 
            onClose={handleCloseTradingDesk} 
            initialTab={deskTab} 
            rateData={rateData} 
            isLoadingRate={isLoadingRate} 
            onRefreshRate={fetchExchangeRate} 
          />
        </Suspense>
      )}

      {/* Modern Cursor Follower with Parallax Lag Effects */}
      <Suspense fallback={null}>
        <CursorFollower />
      </Suspense>

    </div>
  );
}
