import { motion } from "motion/react";
import { Star, Quote, CheckCircle, ExternalLink, Zap, ShieldCheck, Heart } from "lucide-react";

const TESTIMONIALS_DATA = [
  {
    id: "t1",
    author: "Hardiansyah Harahap",
    role: "Pelanggan Setia (Trader Reguler)",
    avatar: "HH",
    text: "Transaksi ruby ke-2 direct.. Satset.. Mantap pokoknya",
    stars: 5,
    tag: "Transaksi Berulang (Bukti Loyalitas)",
    badge: "Transaksi Berulang"
  },
  {
    id: "t2",
    author: "Irwam Wang",
    role: "Anggota Terverifikasi",
    avatar: "IW",
    text: "Trusted 10k rby kemarin, gak ribet thanks bro +1 rep",
    stars: 5,
    tag: "Validasi Nyata & Detail (Trusted 10k Ruby)",
    badge: "Transaksi Valid"
  },
  {
    id: "t3",
    author: "Sandaya Anam",
    role: "Klien Jangka Panjang",
    avatar: "SA",
    text: "Seller pridavan paling trusted !! 12 minggu",
    stars: 5,
    tag: "Teruji Waktu (Bertahan Lama)",
    badge: "Aman & Teruji"
  }
];

const GUARANTEES = [
  {
    id: "g1",
    title: "Proses SATSET",
    desc: "Transaksi secepat kilat tanpa drama atau waktu tunggu yang lama.",
    icon: Zap,
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-500"
  },
  {
    id: "g2",
    title: "Amanah Dunia Akhirat",
    desc: "Integritas penuh dan kejujuran adalah prioritas utama kami dalam setiap transaksi.",
    icon: ShieldCheck,
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "g3",
    title: "Anti Ribet, Langsung Masuk",
    desc: "Prosedur super simpel, dana langsung cair ke rekening atau e-wallet tujuan Anda.",
    icon: Heart,
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-500"
  }
];

export default function Testimonials() {
  return (
    <section 
      className="py-24 bg-brand-secondary relative overflow-hidden" 
      id="testimonials"
    >
      {/* Back decoration lights */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-[#EC6519]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-3 py-1 rounded-full border border-[#EC6519]/20 inline-block">
            🔥 TESTIMONI TERPERCAYA & TERBUKTI 🔥
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Bukti Nyata Kepuasan Pelanggan <br className="hidden sm:inline" />
            <span className="orange-text-gradient">Sudah Ratusan Transaksi</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Kepercayaan Anda adalah segalanya. Berikut adalah beberapa ulasan nyata langsung dari komunitas pelanggan setia kami.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" id="testimonials-cards-grid">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#EC6519]/20 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-xl backdrop-blur-[10px] relative group"
              id={`testimonial-card-${item.id}`}
            >
              {/* Quote Mark background */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.02] group-hover:text-[#EC6519]/[0.05] transition-colors" />

              <div>
                {/* Stars Indicator & Custom Badge */}
                <div className="flex items-center justify-between gap-2 mb-5" id={`stars-badge-wrapper-${item.id}`}>
                  <div className="flex items-center gap-1" id={`stars-indicator-${item.id}`}>
                    {[...Array(item.stars)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#EC6519] text-[#EC6519]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#EC6519]/10 text-[#EC6519] px-2 py-0.5 rounded border border-[#EC6519]/10">
                    {item.badge}
                  </span>
                </div>

                {/* Testimonial Core Text */}
                <p className="text-sm text-zinc-200 font-sans leading-relaxed italic mb-6">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                {/* Premium Gradient Avatar Placeholder */}
                <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-[#EC6519] to-[#C53F28] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md shadow-brand-orange/15 font-mono">
                  {item.avatar}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate flex items-center gap-1.5 font-display">
                    {item.author}
                    <CheckCircle className="w-3.5 h-3.5 text-[#EC6519] shrink-0" />
                  </h4>
                  <p className="text-[10px] text-zinc-400 truncate font-sans">
                    {item.role}
                  </p>
                  <p className="text-[9px] text-[#EC6519] truncate font-mono uppercase mt-0.5 font-bold">
                    {item.tag}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Live Testimonials Link CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10 mb-20 text-center relative overflow-hidden shadow-xl backdrop-blur-[10px]"
          id="testimonials-facebook-cta"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
            Ingin melihat bukti transaksi selengkapnya?
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Kami menjaga transparansi 100%. Lihat langsung thread kumpulan testimoni lengkap, tangkapan layar transaksi asli, dan reputasi kami di media sosial Facebook.
          </p>
          <a
            href="https://www.facebook.com/share/p/1MGN1N3ax6/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold text-xs rounded-xl uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
          >
            <span>Lihat Semua Testimoni di Facebook</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Guarantees Section */}
        <div className="border-t border-white/5 pt-20" id="testimonials-guarantees">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-lg font-bold font-mono tracking-wider text-zinc-400 uppercase">
              🚀 GARANSI KECEPATAN & KEAMANAN
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUARANTEES.map((g, idx) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-start gap-4 hover:border-white/[0.1] transition-colors shadow-lg backdrop-blur-[8px]"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${g.color} ${g.iconColor} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{g.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{g.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

