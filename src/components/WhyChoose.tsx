import { motion } from "motion/react";
import { 
  ShieldAlert, 
  Zap, 
  Lock, 
  MessageCircleCode, 
  Headphones, 
  Activity 
} from "lucide-react";

const BENEFITS_DATA = [
  {
    id: "b1",
    icon: ShieldAlert,
    title: "Transaksi Terpercaya",
    description: "Setiap transaksi aset atau penukaran melalui proses validasi bertahap yang ketat sebelum transfer dimulai. Keamanan tidak bisa ditawar."
  },
  {
    id: "b2",
    icon: Zap,
    title: "Proses Sangat Cepat",
    description: "Waktu adalah uang. Integrasi pembayaran otomatis dan operator kami yang sigap menjamin transaksi selesai dalam waktu kurang dari 15 menit."
  },
  {
    id: "b3",
    icon: Lock,
    title: "Pembayaran Aman",
    description: "Semua pembayaran dan saldo diproses sepenuhnya melalui gerbang institusi terverifikasi, menjamin perlindungan mutlak dari risiko penarikan kembali (recall)."
  },
  {
    id: "b4",
    icon: MessageCircleCode,
    title: "Komunikasi Transparan",
    description: "Tanpa chatbot yang berbelit-belit. Anda bertransaksi langsung dengan trader eksekutif kami melalui pesan terenkripsi waktu nyata."
  },
  {
    id: "b5",
    icon: Headphones,
    title: "Dukungan Profesional",
    description: "Mulai dari persiapan awal hingga transfer rekber selesai, agen dukungan ahli kami akan memandu proses akuisisi atau pencairan saldo Anda secara pribadi."
  },
  {
    id: "b6",
    icon: Activity,
    title: "Marketplace Berpengalaman",
    description: "Dengan pengalaman bertahun-tahun dalam mengelola halaman bertrafik tinggi dan transfer dana, kami memahami aturan platform dengan sangat baik."
  }
];

export default function WhyChoose() {
  return (
    <section 
      className="py-24 bg-brand-secondary relative border-t border-white/5" 
      id="benefits"
    >
      {/* Background soft lighting */}
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#C53F28]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#EC6519]/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-3 py-1 rounded-full border border-[#EC6519]/20 inline-block">
            Kinerja Terbukti
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            Dirancang Demi Keamanan & Kecepatan
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-zinc-400">
            Temukan alasan mengapa para pengusaha digital terkemuka, kreator konten Facebook, dan pekerja lepas memilih AHMEDAYEV untuk mengelola aset digital mereka.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="why-choose-cards-grid">
          {BENEFITS_DATA.map((benefit, idx) => {
            const IconComp = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-white/[0.03] border border-white/[0.08] hover:border-[#EC6519]/30 rounded-2xl hover:bg-white/[0.06] transition-all duration-300 shadow-lg backdrop-blur-[10px] group"
                id={`benefit-card-${benefit.id}`}
              >
                <div className="flex gap-4">
                  {/* Icon Area */}
                  <div className="p-3 bg-white/[0.02] group-hover:bg-[#EC6519]/10 border border-white/10 group-hover:border-[#EC6519]/30 rounded-xl text-zinc-400 group-hover:text-[#EC6519] transition-all duration-300 shrink-0 h-fit">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold group-hover:text-[#EC6519] transition-colors font-display text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs font-sans leading-relaxed text-zinc-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
