import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { 
  ArrowRight, 
  MessageSquare, 
  Check, 
  Facebook, 
  Users, 
  ArrowUpRight, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import MagneticButton from "./MagneticButton";
import { ExchangeRateData } from "../types";

interface HeroProps {
  onStartTrading: (tab?: "paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer") => void;
  rateData: ExchangeRateData | null;
  isLoadingRate: boolean;
  onRefreshRate: () => void;
}

function formatToWIB(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${formatter.format(date).replace(/:/g, ".")} WIB`;
  } catch (e) {
    return "";
  }
}

export default function Hero({ onStartTrading, rateData, isLoadingRate, onRefreshRate }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    // Check if the device is mobile/tablet or supports reduced motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasWebGLSupport = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      } catch (e) {
        return false;
      }
    };
    
    // Disable WebGL for touch devices, reduced motion, or devices without WebGL support
    if (isReduced || !isFinePointer || !hasWebGLSupport()) {
      setUseWebGL(false);
    }
  }, []);

  const googleRate = rateData?.referenceRate || 16150;
  const paypalRate = rateData?.transactionRate || 14650;
  const isStale = rateData?.isStale ?? true;
  const isFallback = rateData?.isFallback ?? true;
  const updatedAt = rateData?.updatedAt || new Date().toISOString();

  // Motion values to avoid re-rendering Hero component on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag effect
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transforms for background blur glow
  const glowX = useTransform(springX, (v) => v * -10);
  const glowY = useTransform(springY, (v) => v * -10);

  // Transforms for cards tilt
  const tiltRotateX = useTransform(springY, (v) => v * -3.5);
  const tiltRotateY = useTransform(springX, (v) => v * 3.5);
  const cardShadow = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => `${latestX * -10}px ${latestY * -10}px 35px rgba(0, 0, 0, 0.45)`
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isSectionVisible || !isTabActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isSectionVisible, isTabActive]);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-brand-bg"
      id="hero-section"
    >
      {/* WebGL Shader Background - Layer z-10 */}
      {isSectionVisible && isTabActive && useWebGL && (
        <Shader className="absolute inset-0 z-10 pointer-events-none">
          <Swirl 
            colorA="#0B0D12" 
            colorB="#12151D" 
            detail={1.7} 
          />
          <ChromaFlow 
            baseColor="#0B0D12" 
            downColor="#ff5f03" 
            leftColor="#ff5f03" 
            momentum={13} 
            radius={3.5} 
            rightColor="#ff5f03" 
            upColor="#ff5f03" 
          />
          <FlutedGlass 
            aberration={0.61} 
            angle={31} 
            frequency={8} 
            highlight={0.12} 
            highlightSoftness={0} 
            lightAngle={-90} 
            refraction={4} 
            shape="rounded" 
            softness={1} 
            speed={0.15} 
          />
          <FilmGrain strength={0.05} />
        </Shader>
      )}
      
      {/* Stripe-like subtle pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10" 
        aria-hidden="true"
      />

      {!useWebGL && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D12] via-[#12151D] to-[#0B0D12] opacity-100 pointer-events-none z-0" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-7 space-y-8 text-left relative">
            {/* Subtle glow behind the main headline to improve visual focus (large, blurred, barely noticeable) */}
            <motion.div 
              style={{
                x: glowX,
                y: glowY
              }}
              className="absolute -left-[5%] -top-[10%] w-[550px] h-[400px] rounded-full bg-[#EC6519]/5 blur-[130px] pointer-events-none z-0" 
            />
            
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full"
              id="hero-tag"
            >
              <span className="h-2 w-2 rounded-full bg-[#EC6519]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                Marketplace Rekber Terpercaya
              </span>
            </motion.div>
 
            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-[68px] font-bold font-display tracking-[-2px] text-white leading-[0.95]"
                id="hero-headline"
              >
                Marketplace Aset <br />
                <span className="orange-text-gradient">Digital Terpercaya</span>
              </motion.h1>
 
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-zinc-400 max-w-xl font-sans leading-relaxed"
                id="hero-subheadline"
              >
                Beli & Jual Facebook Page, Facebook Group, dan Cairkan Saldo PayPal secara aman dengan respon cepat dan dukungan profesional.
              </motion.p>
            </div>
 
            {/* Micro Badges / Benefits bullet line */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-500 font-mono"
              id="hero-bullets"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#EC6519]" /> 0% Biaya Tersembunyi
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#EC6519]" /> Transfer PayPal 5-15 Menit
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#EC6519]" /> 100% Rekber Aman
              </span>
            </motion.div>
 
            {/* Actions / CTA Row */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-8 sm:mt-12"
              id="hero-actions"
            >
              {/* Primary CTA: Convert Button */}
              <MagneticButton
                onClick={() => onStartTrading("paypal")}
                className="px-8 py-4 bg-[#EC6519] hover:bg-[#e05a1a] text-white font-semibold rounded-full text-sm uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer shadow-lg hover:shadow-xl hover:shadow-orange-950/20 transition-all duration-300 border border-transparent"
                id="hero-cta-trading"
              >
                <span>Konversi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              {/* Secondary CTA: WhatsApp Button */}
              <MagneticButton
                as="a"
                href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20tertarik%20untuk%20transaksi%20Facebook%20Page%20atau%20Group."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-semibold rounded-full text-sm uppercase tracking-wider border flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30 hover:shadow-lg"
                id="hero-cta-whatsapp"
              >
                <MessageSquare className="w-4 h-4 text-[#EC6519]" />
                <span>Hubungi WhatsApp</span>
              </MagneticButton>

              {/* Trust Badge: Certified Escrow Partner */}
              <div 
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-[4px] border transition-all duration-500 hover:scale-[1.02] cursor-default shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] bg-white/10 backdrop-blur-md border-white/10 text-white"
                id="certified-partner-badge"
              >
                <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#E8704E] animate-spin-slow">
                  <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
                </svg>
                <span className="text-[13px] sm:text-[14px] font-medium text-white">
                  Mitra Terverifikasi
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  Unggulan
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Side: Interactive Floating Cards */}
          <div className="lg:col-span-5 relative" id="hero-floating-cards-area">
            
            {/* Ambient Back Glow for the cards stack - Soft ambient orange light */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#EC6519]/8 blur-[100px] pointer-events-none" />

            {/* Cards Stack */}
            <div className="relative z-10 flex flex-col gap-5 max-w-md mx-auto lg:max-w-none">
              
              {/* Card 1: Facebook Page (Monetized) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onStartTrading("facebook-pages")}
                  style={{
                    transformPerspective: 1000,
                    rotateX: tiltRotateX,
                    rotateY: tiltRotateY,
                    transformStyle: "preserve-3d",
                    boxShadow: cardShadow
                  }}
                  whileHover={{ 
                    y: -5,
                    borderColor: "rgba(236, 101, 25, 0.4)",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)"
                  }}
                  className="group p-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl cursor-pointer transition-colors duration-300 backdrop-blur-[12px] relative overflow-hidden"
                  id="floating-card-fb-page"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-[#EC6519]/10 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Premium FB Page</h3>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#EC6519] transition-colors">Tech Review Hub</h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 uppercase tracking-wider">
                      Sudah Monetisasi
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-mono">ESTIMASI NILAI ASET</p>
                      <p className="text-2xl font-bold font-mono text-white">Rp 1.500.000</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block font-mono">STATUS</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Siap Ditransfer
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 2: Facebook Group (Active Members) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut", delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onStartTrading("facebook-groups")}
                  style={{
                    transformPerspective: 1000,
                    rotateX: tiltRotateX,
                    rotateY: tiltRotateY,
                    transformStyle: "preserve-3d",
                    boxShadow: cardShadow
                  }}
                  whileHover={{ 
                    y: -5,
                    borderColor: "rgba(236, 101, 25, 0.4)",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)"
                  }}
                  className="group p-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl cursor-pointer transition-colors duration-300 backdrop-blur-[12px] relative overflow-hidden"
                  id="floating-card-fb-group"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-[#C53F28]/10 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-center justify-center text-[#EC6519]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Facebook Group</h3>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#EC6519] transition-colors">Digital Creators Arena</h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EC6519]/15 text-[#EC6519] border border-[#EC6519]/20 uppercase tracking-wider font-mono">
                      125K Anggota
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-mono">TEMA AUDIENS</p>
                      <p className="text-sm font-semibold text-white">Afiliasi Pemasaran & Bisnis</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block font-mono">INTERAKSI TERVERIFIKASI</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#EC6519]" /> Sangat Aktif
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 3: PayPal Balance Exchange */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 6.0, ease: "easeInOut", delay: 0.4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onStartTrading("paypal")}
                  style={{
                    transformPerspective: 1000,
                    rotateX: tiltRotateX,
                    rotateY: tiltRotateY,
                    transformStyle: "preserve-3d",
                    boxShadow: cardShadow
                  }}
                  whileHover={{ 
                    y: -5,
                    borderColor: "rgba(236, 101, 25, 0.4)",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)"
                  }}
                  className="group p-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl cursor-pointer transition-colors duration-300 backdrop-blur-[12px] relative overflow-hidden"
                  id="floating-card-paypal-exchange"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-500">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Pencairan Saldo Cepat</h3>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#EC6519] transition-colors">PayPal USD ⇄ IDR</h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider font-mono">
                      Selesai
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          Kurs Transaksi Saat Ini
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                        </p>
                        <p className="text-sm font-semibold text-white font-mono">
                          1 USD = Rp {paypalRate.toLocaleString("id-ID")}
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRefreshRate();
                        }}
                        className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-1 text-[9px] font-mono shrink-0 cursor-pointer"
                        title="Perbarui kurs"
                        id="refresh-rate-hero-btn"
                      >
                        <RefreshCw className={`w-3 h-3 ${isLoadingRate ? "animate-spin" : ""}`} />
                        <span>Perbarui</span>
                      </button>
                    </div>



                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 border-t border-white/5 pt-1.5">
                      <span>Diperbarui setiap jam</span>
                      <span>Terakhir: {formatToWIB(updatedAt)}</span>
                    </div>

                    {(isStale || isFallback) && (
                      <p className="text-[9px] font-sans text-amber-500/80 italic mt-0.5 leading-tight">
                        * Menggunakan kurs terakhir. Rate final dikonfirmasi saat transaksi.
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
