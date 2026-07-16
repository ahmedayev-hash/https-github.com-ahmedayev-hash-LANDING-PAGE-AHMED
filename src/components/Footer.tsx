import { Facebook, Users, Coins, Heart, MessageSquare, ArrowUp, Shield, ArrowLeftRight } from "lucide-react";

interface FooterProps {
  onStartTrading: (tab: "paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer") => void;
}

export default function Footer({ onStartTrading }: FooterProps) {
  const handleScrollTo = (id: string) => {
    // Dispatch event to force load all lazy-loaded sections
    window.dispatchEvent(new CustomEvent("ahmedayev-load-all-lazy"));

    // Defer scroll to next tick to allow React rendering to finish
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer 
      className="bg-brand-secondary border-t border-white/5 pt-20 pb-10 relative overflow-hidden" 
      id="footer"
    >
      {/* Decorative accent background lighting */}
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[150px] rounded-full bg-[#EC6519]/[0.02] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top footer section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5" id="footer-top-grid">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={handleScrollTop}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#EC6519] to-[#C53F28] flex items-center justify-center text-white font-bold font-display text-sm tracking-tighter shadow-md shadow-brand-orange/20">
                A
              </div>
              <span className="text-lg font-bold font-display tracking-widest text-white group-hover:text-[#EC6519] transition-colors uppercase">
                AHMEDAYEV
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-[#EC6519]" />
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-sm">
              Marketplace aset digital premium yang terpercaya. Beli dan jual Facebook Page yang sudah monetisasi, Facebook Group terverifikasi, dan konversikan saldo PayPal secara aman dengan proses rekber yang cepat.
            </p>

            <div className="flex items-center gap-4 text-zinc-500">
              {/* Facebook Profile Link - Dihentikan sementara hingga URL resmi dikonfigurasi */}
              {/* 
              <a 
                href="https://facebook.com/ahmedayev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors" 
                title="Facebook"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              */}
              <a 
                href="https://wa.me/62895366831241" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-500 transition-colors" 
                title="Dukungan WhatsApp"
                aria-label="Saluran Dukungan WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans" id="footer-quick-links">
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-[#EC6519] transition-colors">
                  Layanan
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("benefits")} className="hover:text-[#EC6519] transition-colors">
                  Mengapa Kami
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("how-it-works")} className="hover:text-[#EC6519] transition-colors">
                  Alur Operasional
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("testimonials")} className="hover:text-[#EC6519] transition-colors">
                  Testimoni
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("faq")} className="hover:text-[#EC6519] transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Layanan
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans" id="footer-services-links">
              <li>
                <button onClick={() => onStartTrading("facebook-pages")} className="hover:text-[#EC6519] transition-colors flex items-center gap-1.5">
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook Page</span>
                </button>
              </li>
              <li>
                <button onClick={() => onStartTrading("facebook-groups")} className="hover:text-[#EC6519] transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Facebook Group</span>
                </button>
              </li>
              <li>
                <button onClick={() => onStartTrading("payout-transfer")} className="hover:text-[#EC6519] transition-colors flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Jasa Pindah Payout</span>
                </button>
              </li>
              <li>
                <button onClick={() => onStartTrading("paypal")} className="hover:text-[#EC6519] transition-colors flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Pencairan PayPal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white font-mono">
              Kontak Meja Pasar
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400 font-sans" id="footer-contact-details">
              <li className="leading-relaxed">
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Jam Operasional</span>
                <span className="text-white">09.00 – 23.00 WIB</span>
              </li>
              <li>
                <span className="text-zinc-500 block text-[10px] uppercase font-mono">Pertanyaan Cepat</span>
                <a 
                  href="https://wa.me/62895366831241" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#EC6519] hover:underline font-semibold"
                >
                  +62 895-3668-31241 (WhatsApp)
                </a>
              </li>
              <li className="text-[10px] text-zinc-500 leading-relaxed">
                *Catatan: Kurs didasarkan pada audit pasar harian. Proses rekber membutuhkan konfirmasi legal atas identitas aset.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom footer section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-sans">
          
          <div className="flex items-center gap-1" id="footer-credits">
            <span>© {new Date().getFullYear()} AHMEDAYEV. Hak Cipta Dilindungi.</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              Diverifikasi Aman oleh manajer rekber
            </span>
          </div>

          <button 
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg border border-white/5 hover:border-white/10 transition-all font-mono uppercase text-[10px]"
            id="scroll-to-top-btn"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
