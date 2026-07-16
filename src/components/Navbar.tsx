import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Shield, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import MagneticButton from "./MagneticButton";

interface NavbarProps {
  onStartTrading: () => void;
}

export default function Navbar({ onStartTrading }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll effect
  useEffect(() => {
    let scrolled = false;
    const handleScroll = () => {
      const isOverThreshold = window.scrollY > 20;
      if (isOverThreshold !== scrolled) {
        scrolled = isOverThreshold;
        setIsScrolled(isOverThreshold);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // Dispatch event to force load all lazy-loaded sections
    window.dispatchEvent(new CustomEvent("ahmedayev-load-all-lazy"));

    // Defer scroll to next tick to allow React rendering to finish
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of the navbar
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

  const getNavLinkClass = () => {
    return "relative text-[13px] font-medium text-zinc-400 hover:text-white transition-all tracking-[1px] uppercase py-2 px-3.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] group";
  };

  const getSupportLinkClass = () => {
    return "relative text-[13px] font-medium text-zinc-400 hover:text-[#EC6519] transition-all tracking-[1px] uppercase py-2 px-3 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] group";
  };

  const getMobileNavLinkClass = () => {
    return "text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wider uppercase text-left py-2";
  };

  const getMobileSupportClass = () => {
    return "text-xs text-center font-medium text-zinc-400 hover:text-white py-2";
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-20 flex items-center ${
        isScrolled 
          ? "bg-[#0B0D12]/95 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent border-b border-brand-border"
      }`}
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="flex items-center gap-1.5 cursor-pointer group"
            id="nav-logo-container"
          >
            <span className="text-xl font-bold font-display tracking-tight group-hover:text-[#EC6519] transition-colors uppercase text-white">
              AHMED<span className="text-[#EC6519]">AYEV</span>
            </span>
            <div className="h-1 w-1 rounded-full bg-[#EC6519] animate-pulse"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-[16px]" id="desktop-nav-menu">
            <button 
              onClick={() => handleScrollTo("services")} 
              className={getNavLinkClass()}
              id="nav-link-services"
            >
              <span>Layanan</span>
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#EC6519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </button>
            <button 
              onClick={() => handleScrollTo("benefits")} 
              className={getNavLinkClass()}
              id="nav-link-benefits"
            >
              <span>Mengapa Kami</span>
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#EC6519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </button>
            <button 
              onClick={() => handleScrollTo("how-it-works")} 
              className={getNavLinkClass()}
              id="nav-link-how"
            >
              <span>Proses</span>
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#EC6519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </button>
            <button 
              onClick={() => handleScrollTo("testimonials")} 
              className={getNavLinkClass()}
              id="nav-link-testimonials"
            >
              <span>Testimoni</span>
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#EC6519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </button>
            <button 
              onClick={() => handleScrollTo("faq")} 
              className={getNavLinkClass()}
              id="nav-link-faq"
            >
              <span>FAQ</span>
              <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] bg-[#EC6519] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </button>
          </nav>
 
          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20tertarik%20untuk%20transaksi%20aset%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className={getSupportLinkClass()}
              id="nav-whatsapp-direct"
            >
              <span>Dukungan</span>
            </a>
             <MagneticButton
              onClick={onStartTrading}
              className="text-xs font-semibold uppercase tracking-wider text-white bg-[#EC6519] hover:bg-[#e05a1a] px-5 py-2.5 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center gap-1.5"
              id="nav-start-trading-btn"
            >
              <span>Konversi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-400 hover:text-white p-2 rounded-lg"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B0D12]/98 backdrop-blur-lg border-b border-white/10 absolute top-full left-0 right-0 py-6 px-4 space-y-4 shadow-xl z-50 animate-fade-in" id="mobile-nav-drawer">
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleScrollTo("services")} 
              className={getMobileNavLinkClass()}
              id="mobile-nav-link-services"
            >
              Layanan
            </button>
            <button 
              onClick={() => handleScrollTo("benefits")} 
              className={getMobileNavLinkClass()}
              id="mobile-nav-link-benefits"
            >
              Mengapa Kami
            </button>
            <button 
              onClick={() => handleScrollTo("how-it-works")} 
              className={getMobileNavLinkClass()}
              id="mobile-nav-link-how"
            >
              Proses
            </button>
            <button 
              onClick={() => handleScrollTo("testimonials")} 
              className={getMobileNavLinkClass()}
              id="mobile-nav-link-testimonials"
            >
              Testimoni
            </button>
            <button 
              onClick={() => handleScrollTo("faq")} 
              className={getMobileNavLinkClass()}
              id="mobile-nav-link-faq"
            >
              FAQ
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a 
              href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20tertarik%20untuk%20transaksi%20aset%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className={getMobileSupportClass()}
              id="mobile-nav-whatsapp"
            >
              Hubungi WhatsApp
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartTrading();
              }}
              className="w-full text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#003087] hover:bg-[#002466] py-3 rounded-xl transition-all shadow-md shadow-blue-900/15"
              id="mobile-nav-start-btn"
            >
              Konversi
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
