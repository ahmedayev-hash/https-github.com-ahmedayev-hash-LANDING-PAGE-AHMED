import { motion } from "motion/react";
import { 
  ArrowRight, 
  Settings, 
  MessageSquare, 
  FileCheck, 
  Sparkles, 
  CornerDownRight, 
  TrendingUp 
} from "lucide-react";

const STEPS_DATA = [
  {
    step: "01",
    title: "Pilih Layanan",
    description: "Pilih antara jual/beli Facebook Page, Facebook Group, Pencairan PayPal, atau Pindah Payout yang aman.",
    icon: Settings,
    badge: "Isi detail"
  },
  {
    step: "02",
    title: "Hubungi Kami",
    description: "Gunakan integrasi WhatsApp kami untuk langsung terhubung dengan meja rekber terverifikasi. Tanpa pendaftaran atau pengaturan rumit.",
    icon: MessageSquare,
    badge: "Koneksi 10 Detik"
  },
  {
    step: "03",
    title: "Konfirmasi Transaksi",
    description: "Kami memverifikasi kredensial, menahan kepemilikan aset di rekber yang aman, dan menghitung nilai harga secara transparan.",
    icon: FileCheck,
    badge: "Rekber Tanpa Risiko"
  },
  {
    step: "04",
    title: "Selesai",
    description: "Dana langsung dicairkan ke rekening pilihan Anda, dan kepemilikan halaman/grup dipindahkan dengan aman ke Business Manager Anda.",
    icon: Sparkles,
    badge: "Transaksi Berhasil"
  }
];

export default function HowItWorks() {
  return (
    <section 
      className="py-24 bg-brand-bg relative border-t border-b border-white/5" 
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-3 py-1 rounded-full border border-[#EC6519]/20 inline-block">
            Eksekusi Lancar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            4 Langkah Alur Operasional Kami
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-zinc-400">
            Berdagang aset digital bersama AHMEDAYEV sangat sederhana, aman, dan selesai dalam hitungan menit.
          </p>
        </div>

        {/* Timeline Grid (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative" id="how-it-works-timeline">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#EC6519]/0 via-[#EC6519]/20 to-[#EC6519]/0 pointer-events-none" />

          {STEPS_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group flex flex-col items-center md:items-start text-center md:text-left relative w-full"
                id={`how-step-${item.step}`}
              >
                {/* Badge Number & Icon container */}
                <div className="flex items-center justify-between w-full mb-4 px-1 relative">
                  <div className="h-14 w-14 border-2 group-hover:border-[#EC6519] rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10 shadow-xl group-hover:shadow-[#EC6519]/10 group-hover:scale-110 bg-[#12151D] border-white/10 text-zinc-300 group-hover:text-[#EC6519]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* Step Number Display - High visibility */}
                  <span className="text-4xl font-extrabold font-mono tracking-tighter transition-colors duration-300 select-none text-zinc-500/50 group-hover:text-[#EC6519]/60">
                    {item.step}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-6 border-2 group-hover:border-[#EC6519]/30 rounded-2xl transition-all duration-300 shadow-2xl backdrop-blur-[12px] w-full relative overflow-hidden group-hover:-translate-y-1 bg-[#12151D]/90 hover:bg-[#1A1E29] border-white/[0.06]">
                  {/* Absolute top glowing bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#EC6519] transition-all duration-500" />
                  
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-2.5 py-1 rounded-md border border-[#EC6519]/20 mb-3 inline-block font-bold">
                    {item.badge}
                  </span>
                  
                  <h3 className="text-lg font-bold mb-2 font-display group-hover:text-[#EC6519] transition-colors duration-200 text-white">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-sans leading-relaxed transition-colors duration-200 text-zinc-400 group-hover:text-zinc-300">
                    {item.description}
                  </p>
                </div>

                {/* Arrow connectors (Mobile Only - shows below step except last) */}
                {idx < STEPS_DATA.length - 1 && (
                  <div className="md:hidden flex justify-center py-6 w-full relative">
                    <div className="h-8 w-8 rounded-full bg-[#12151D] border border-white/10 flex items-center justify-center text-[#EC6519] shadow-md animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Process Guarantee Callout */}
        <div className="mt-16 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <TrendingUp className="w-4.5 h-4.5" />
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl text-center sm:text-left">
              <strong>Butuh volume transaksi khusus?</strong> Kami melayani transfer monetisasi massal dan pencairan rutin PayPal untuk agensi serta jaringan kreator.
            </p>
          </div>
          <a
            href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20tertarik%20dengan%20transaksi%20aset%20digital%20bervolume%20besar."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#EC6519] hover:text-[#C53F28] tracking-wider uppercase flex items-center gap-1.5 shrink-0"
            id="how-it-works-bulk-btn"
          >
            <span>Ajukan Transaksi Massal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
