import { motion } from "motion/react";
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface CTAProps {
  onStartTrading: () => void;
}

export default function CTA({ onStartTrading }: CTAProps) {
  return (
    <section 
      className="py-20 bg-brand-secondary relative overflow-hidden" 
      id="cta-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Orange Gradient Glowing Banner Box */}
        <div 
          className="relative bg-gradient-to-r from-[#EC6519] to-[#C53F28] rounded-[24px] p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-brand-orange/10 border border-white/10"
          id="cta-banner-container"
        >
          {/* Decorative Back Grids & Particles */}
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-white mx-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold">
                100% Rekber Aman Terverifikasi
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight">
              Siap Bertransaksi <br />
              Aset Digital Secara Aman?
            </h2>

            {/* Description */}
            <p className="text-sm text-white/80 max-w-md mx-auto font-sans leading-relaxed">
              Dapatkan peluang pendapatan instan. Miliki audiens bertrafik tinggi atau konversikan saldo Anda secara aman di AHMEDAYEV sekarang.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" id="cta-buttons-row">
              {/* Primary Convert Button */}
              <MagneticButton
                onClick={onStartTrading}
                className="w-full sm:w-auto px-8 py-4 bg-[#003087] hover:bg-[#002466] text-white font-semibold rounded-full text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2 group border border-transparent duration-300"
                id="cta-start-trading-btn"
              >
                <span>Konversi</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              {/* Secondary WhatsApp Button */}
              <MagneticButton
                as="a"
                href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20siap%20untuk%20bertransaksi%20atau%20konversi%20sekarang."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-black/20 hover:bg-black/30 text-white font-semibold rounded-full text-xs uppercase tracking-wider transition-all border border-white/20 hover:border-white/40 flex items-center justify-center gap-2 duration-300"
                id="cta-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Hubungi WhatsApp</span>
              </MagneticButton>
            </div>

            {/* Micro details */}
            <div className="flex items-center justify-center gap-6 text-[10px] text-white/65 pt-6 font-mono">
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Verifikasi Cepat</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Rekber Terverifikasi</span>
              <span>•</span>
              <span className="flex items-center gap-1">⚡ Proses khas 15 menit</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
