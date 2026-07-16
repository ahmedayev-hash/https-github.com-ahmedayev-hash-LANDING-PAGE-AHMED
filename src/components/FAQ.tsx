import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    question: "Berapa lama proses pencairan saldo PayPal?",
    answer: "Umumnya, pencairan saldo PayPal ke Rupiah membutuhkan waktu antara 5 hingga 15 menit setelah kami mengonfirmasi dan menerima saldo PayPal Anda di dompet kami yang aman. Jika ada penundaan tinjauan manual dari pihak pengirim, proses mungkin membutuhkan waktu sedikit lebih lama, namun tim kami siap membantu berkoordinasi secara instan demi menghindari keterlambatan."
  },
  {
    id: "faq2",
    question: "Bagaimana keamanan transaksi dijamin?",
    answer: "Kami bertindak sebagai perantara rekber (escrow) yang ketat. Untuk transaksi Facebook Page dan Group, kami mengambil alih penuh hak admin terlebih dahulu, memverifikasi kualitas dan parameter aset, menahan dana pembeli secara aman, dan hanya melepaskan kepemilikan kepada pembeli serta mencairkan dana ke penjual saat kedua belah pihak sudah 100% puas."
  },
  {
    id: "faq3",
    question: "Bagaimana cara kerja transfer Facebook Page?",
    answer: "Untuk mentransfer Facebook Page dengan aman, penjual menambahkan profil rekber kami sebagai Admin halaman atau Business Manager terkait. Kami akan memeriksa status kualitas halaman (memastikan status Hijau dan bersih dari pelanggaran monetisasi). Selanjutnya, kami menambahkan pembeli sebagai Admin utama Business Manager yang baru lalu menghapus peran penjual. Langkah ini sepenuhnya melindungi kedua belah pihak dari risiko penipuan atau penarikan kembali (recall)."
  },
  {
    id: "faq4",
    question: "Apakah saya bisa menjual Facebook Group saya di sini?",
    answer: "Tentu saja. Kami aktif mencari Facebook Group aktif di berbagai niche utama (Bisnis, Perjalanan, Teknologi, Game, Kebugaran, Meme, dll.). Untuk mulai menjual grup Anda, silakan klik tombol 'Konversi' dan pilih 'Facebook Group', atau hubungi kami langsung di WhatsApp. Kami akan mengaudit tingkat interaksi grup Anda dan menawarkan harga premium yang adil."
  },
  {
    id: "faq5",
    question: "Apa itu Pelanggaran Entitas Terhubung & bagaimana Jasa Pindah Payout membantu?",
    answer: "Pelanggaran Entitas Terhubung (Connected Entity Violation) terjadi ketika akun Facebook Pro atau Fanspage Anda terhubung dengan profil/payout yang melanggar kebijakan Facebook. Jasa Pindah Payout kami membantu migrasi info pembayaran Anda ke akun profil bersih yang baru secara terpandu, aman, dan tanpa mengorbankan status monetisasi aktif Anda."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      className="py-24 bg-brand-bg relative border-t border-white/5" 
      id="faq"
    >
      {/* Background radial soft ambient glow */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-2/3 h-[250px] rounded-full bg-[#EC6519]/[0.015] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC6519] bg-[#EC6519]/10 px-3 py-1 rounded-full border border-[#EC6519]/20 inline-block">
            Meja Bantuan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm font-sans text-zinc-400">
            Dapatkan jawaban instan mengenai alur akuisisi aset digital kami yang aman, kurs penukaran, dan estimasi waktu rekber.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4" id="faq-accordions-container">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="transition-all duration-300 shadow-md backdrop-blur-[10px] rounded-xl overflow-hidden border bg-white/[0.03] border-white/[0.08] hover:border-[#EC6519]/20"
                id={`faq-item-${item.id}`}
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-4.5 h-4.5 text-[#EC6519] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold tracking-tight font-display transition-colors text-white">
                      {item.question}
                    </span>
                  </div>
                  
                  {/* Chevron Icon */}
                  <div className={`p-1 rounded-md text-zinc-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white" : ""
                  } bg-white/5`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs leading-relaxed border-t font-sans text-zinc-400 border-white/5 bg-white/[0.01]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Help Outro */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500">
            Punya pertanyaan lain atau butuh struktur transaksi rekber khusus?
          </p>
          <a
            href="https://wa.me/62895366831241?text=Halo%20AHMEDAYEV,%20saya%20ingin%20bertanya%20mengenai%20marketplace%20aset%20digital."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#EC6519] hover:text-[#C53F28] uppercase tracking-wider transition-colors"
            id="faq-help-wa-btn"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Langsung di WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
