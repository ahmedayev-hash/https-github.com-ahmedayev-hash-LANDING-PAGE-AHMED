import { motion } from "motion/react";
import { 
  Facebook, 
  Users, 
  Coins, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  ArrowLeftRight
} from "lucide-react";

interface ServicesProps {
  onStartTrading: (tab: "paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer") => void;
}

const SERVICES_DATA = [
  {
    id: "facebook-pages",
    title: "Facebook Page",
    subtitle: "Akuisisi Halaman Premium",
    description: "Beli & Jual Facebook Page yang Sudah Monetisasi dengan jangkauan organik. Dapatkan peluang pendapatan instan dengan akun berkualitas tinggi.",
    features: [
      "Monetisasi Instream Ads & Reels terverifikasi",
      "Status halaman bersih (Kualitas Hijau)",
      "Transfer penuh melalui Business Manager secara aman",
      "Penahanan transaksi dengan rekber yang aman"
    ],
    cta: "Jelajahi Halaman",
    icon: Facebook,
    color: "from-[#EC6519] to-[#C53F28]",
    badge: "Penghasilan Instan"
  },
  {
    id: "facebook-groups",
    title: "Facebook Group",
    subtitle: "Portofolio Audiens Tertarget",
    description: "Miliki Facebook Group aktif di berbagai niche untuk melejitkan program afiliasi, jaringan distribusi konten, dan otoritas merek digital Anda.",
    features: [
      "Demografi dengan tingkat interaksi tinggi",
      "Tersedia berbagai jenis niche utama",
      "Pemindahan peran admin secara instan",
      "Lingkungan terkurasi yang bersih dari spam"
    ],
    cta: "Jelajahi Grup",
    icon: Users,
    color: "from-[#EC6519] to-[#C53F28]",
    badge: "Trafik Organik"
  },
  {
    id: "payout-transfer",
    title: "Jasa Pindah Payout",
    subtitle: "Migrasi FB Pro & Fanspage",
    description: "Pindahkan akun payout Facebook Pro maupun Fanspage Anda dengan aman dan teruji demi menghindari pelanggaran entitas terhubung secara permanen.",
    features: [
      "Pindah Payout FB Pro & Fanspage aman",
      "Mencegah risiko pembatasan merah / entitas",
      "Metode 100% aman dan sesuai standar FB",
      "Pendampingan penuh dari tim ahli kami"
    ],
    cta: "Pindah Payout",
    icon: ArrowLeftRight,
    color: "from-amber-500 to-red-500",
    badge: "Solusi Entitas"
  },
  {
    id: "paypal",
    title: "Pencairan Saldo PayPal",
    subtitle: "Konversi Saldo USD ⇄ IDR",
    description: "Konversikan saldo PayPal dollar global Anda ke Rupiah secara aman. Nikmati kurs tukar terbaik dengan pengiriman cepat ke bank lokal.",
    features: [
      "Pencairan ke Bank & E-Wallet lokal (IDR)",
      "Tanpa potongan atau margin tersembunyi",
      "Tanpa penahanan transaksi minimum/maksimum",
      "Waktu proses kurang dari 15 menit"
    ],
    cta: "Hitung Konversi",
    icon: Coins,
    color: "from-cyan-500 to-teal-500",
    badge: "Kurs Terbaik"
  }
];

export default function Services({ onStartTrading }: ServicesProps) {
  return (
    <section 
      className="py-24 bg-brand-bg relative" 
      id="services"
    >
      {/* Decorative center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#EC6519]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-3 py-1 rounded-full border border-[#EC6519]/20 inline-block">
            Solusi Marketplace Digital
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            Aset Premium & Penukaran Aman
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-zinc-400">
            Kami beroperasi sebagai platform perdagangan terpercaya bagi penerbit digital dan pengusaha, memberikan struktur kepemilikan yang bersih dan pencairan arus kas yang cepat.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="services-cards-grid">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="service-card flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                id={`service-card-${service.id}`}
              >
                {/* Subtle Orange Glow inside card on hover */}
                <div className="absolute inset-0 bg-[#EC6519]/[0.01] group-hover:bg-[#EC6519]/[0.03] rounded-[20px] transition-colors duration-300 pointer-events-none" />

                <div>
                  {/* Card Header Badge & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-12 w-12 bg-white/[0.03] group-hover:bg-[#EC6519]/10 border border-white/10 group-hover:border-[#EC6519]/30 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:text-[#EC6519] transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 group-hover:text-[#EC6519] group-hover:border-[#EC6519]/20 transition-all">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2 mb-6">
                    <span className="service-label">
                      {service.subtitle}
                    </span>
                    <h3 className="service-title">
                      {service.title}
                    </h3>
                    <p className="service-desc">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-8 border-t border-white/5 pt-6">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="mt-0.5 p-0.5 bg-[#EC6519]/10 text-[#EC6519] rounded-md shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-sans text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onStartTrading(service.id as any)}
                  className="w-full py-3 px-4 font-medium text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-[#EC6519] hover:text-white group-hover:shadow-lg group-hover:shadow-brand-orange/15 bg-white/5 text-white border border-white/5 hover:border-[#EC6519]"
                  id={`service-cta-btn-${service.id}`}
                >
                  <span>{service.cta}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
