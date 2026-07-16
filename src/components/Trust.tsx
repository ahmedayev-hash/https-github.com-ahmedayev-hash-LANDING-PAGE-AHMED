import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  HelpCircle, 
  UsersRound, 
  TrendingUp, 
  CheckCircle2, 
  HeartHandshake 
} from "lucide-react";

const TRUST_BADGES = [
  { id: "tb1", icon: ShieldCheck, label: "Transaksi Aman", desc: "Penahanan dana berstandar rekber" },
  { id: "tb2", icon: Clock, label: "Respon Cepat", desc: "Waktu tunggu di bawah 10 menit" },
  { id: "tb3", icon: Award, label: "Penjual Terpercaya", desc: "Riwayat merchant digital terverifikasi" },
  { id: "tb4", icon: HeartHandshake, label: "Dukungan Profesional", desc: "Panduan transfer akun khusus" },
  { id: "tb5", icon: UsersRound, label: "Komunitas Terverifikasi", desc: "500+ penerbit online aktif" }
];

const STATISTICS = [
  { value: "500+", label: "Transaksi Sukses", subtitle: "Akuisisi & konversi selesai" },
  { value: "24/7", label: "Ketersediaan Layanan", subtitle: "Bantuan darurat sepanjang waktu" },
  { value: "100%", label: "Proses Transparan", subtitle: "Tanpa biaya tersembunyi atau margin tambahan" }
];

export default function Trust() {
  return (
    <section 
      className="py-16 bg-brand-secondary border-t border-b border-white/5 relative overflow-hidden" 
      id="trust-section"
    >
      {/* Soft gradient accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#EC6519]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="mb-16">
          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-8">
            Standar Operasional Kami yang Tersertifikasi
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="trust-badges-grid">
            {TRUST_BADGES.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-[#EC6519]/30 hover:bg-white/[0.06] transition-all duration-300 shadow-md backdrop-blur-[10px] group text-center flex flex-col items-center justify-center"
                  id={`trust-badge-${badge.id}`}
                >
                  <div className="h-10 w-10 rounded-full bg-[#EC6519]/10 flex items-center justify-center text-[#EC6519] mb-3 group-hover:scale-105 transition-transform border border-[#EC6519]/10">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-semibold text-white tracking-tight mb-0.5">{badge.label}</h4>
                  <p className="text-[10px] text-zinc-500 font-sans">{badge.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-[1px] bg-white/5 my-12" />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left py-4" id="statistics-grid">
          {STATISTICS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-2 relative md:pl-6 md:border-l border-white/5 first:border-l-0"
              id={`stat-col-${idx}`}
            >
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#EC6519]" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-300 font-mono tracking-wide uppercase">
                {stat.label}
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto md:mx-0">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
