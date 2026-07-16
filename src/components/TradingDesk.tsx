import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ArrowLeftRight, 
  MessageSquare, 
  Check, 
  Sparkles, 
  DollarSign, 
  Facebook, 
  Users, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight,
  RefreshCw
} from "lucide-react";
import { ExchangeRateData } from "../types";

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

interface TradingDeskProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer";
  rateData: ExchangeRateData | null;
  isLoadingRate: boolean;
  onRefreshRate: () => void;
}

const FEATURED_PAGES = [
  { id: "p1", name: "Halaman Review Teknologi & Gadget", followers: "45.000", niche: "Teknologi", status: "Kualitas Hijau & Monetisasi", price: 1500000 },
  { id: "p2", name: "Studio Resep & Masak Viral", followers: "82.000", niche: "Makanan & Gaya Hidup", status: "Ads Aktif & Ter-monetisasi", price: 2200000 },
  { id: "p3", name: "Arena Komunitas Gaming", followers: "110.000", niche: "Gaming & Esports", status: "Instream Ads Disetujui", price: 2850000 },
  { id: "p4", name: "Pusat Kutipan & Motivasi Harian", followers: "25.000", niche: "Inspirasi", status: "Sudah Monetisasi", price: 1200000 }
];

const FEATURED_GROUPS = [
  { id: "g1", name: "Komunitas Travel & Backpacking Global", members: "150.000", niche: "Travel & Rekreasi", engagement: "Tinggi (10rb+ postingan/bulan)", price: 2400000 },
  { id: "g2", name: "Pusat Desainer UI/UX & Web Developer", members: "68.000", niche: "Pemrograman & Desain", engagement: "Sangat Aktif", price: 1650000 },
  { id: "g3", name: "Pusat Humor & Meme Harian", members: "245.000", niche: "Hiburan", engagement: "Ekstrem (50rb+ interaksi/hari)", price: 2900000 },
  { id: "g4", name: "Forum Kebugaran, Kesehatan & Diet", members: "95.000", niche: "Kesehatan & Kebugaran", engagement: "Interaksi Tinggi", price: 1800000 }
];

export default function TradingDesk({ isOpen, onClose, initialTab = "paypal", rateData, isLoadingRate, onRefreshRate }: TradingDeskProps) {
  const [activeTab, setActiveTab] = useState<"paypal" | "facebook-pages" | "facebook-groups" | "payout-transfer">(initialTab);
  
  const googleRate = rateData?.referenceRate || 16150;
  const PAYPAL_USD_TO_IDR = rateData?.transactionRate || Math.round(googleRate - 1500);
  const PAYPAL_IDR_TO_USD = Math.round(googleRate + 470);
  const isStale = rateData?.isStale ?? true;
  const isFallback = rateData?.isFallback ?? true;
  const updatedAt = rateData?.updatedAt || new Date().toISOString();

  // PayPal Calculator State
  const [exchangeDirection, setExchangeDirection] = useState<"usd-to-idr" | "idr-to-usd">("usd-to-idr");
  const [usdAmount, setUsdAmount] = useState<string>("100");
  const [idrAmount, setIdrAmount] = useState<string>((100 * PAYPAL_USD_TO_IDR).toString());

  // State to hold calculated results specifically for positive and valid inputs
  const [calcResult, setCalcResult] = useState<{
    usd: number;
    referenceRate: number;
    adjustment: number;
    transactionRate: number;
    estimatedIDR: number;
  } | null>(null);

  // Sync initial tab when changed from props
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Sync idrAmount with updated rate on rate change or exchangeDirection change
  useEffect(() => {
    const num = parseFloat(usdAmount);
    if (!isNaN(num) && num > 0 && isFinite(num)) {
      const rate = exchangeDirection === "usd-to-idr" ? PAYPAL_USD_TO_IDR : PAYPAL_IDR_TO_USD;
      setIdrAmount(Math.round(num * rate).toString());
    }
  }, [rateData, exchangeDirection]);

  // Recalculate amounts
  const handleAmountChange = (val: string, source: "usd" | "idr") => {
    if (source === "usd") {
      setUsdAmount(val);
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0 || !isFinite(num)) {
        setIdrAmount("");
      } else {
        const rate = exchangeDirection === "usd-to-idr" ? PAYPAL_USD_TO_IDR : PAYPAL_IDR_TO_USD;
        setIdrAmount(Math.round(num * rate).toString());
      }
    } else {
      setIdrAmount(val);
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0 || !isFinite(num)) {
        setUsdAmount("");
      } else {
        const rate = exchangeDirection === "usd-to-idr" ? PAYPAL_USD_TO_IDR : PAYPAL_IDR_TO_USD;
        setUsdAmount((num / rate).toFixed(2));
      }
    }
  };

  // Switch exchange direction
  const handleToggleDirection = () => {
    const nextDirection = exchangeDirection === "usd-to-idr" ? "idr-to-usd" : "usd-to-idr";
    setExchangeDirection(nextDirection);
    const num = parseFloat(usdAmount);
    if (!isNaN(num) && num > 0 && isFinite(num)) {
      const rate = nextDirection === "usd-to-idr" ? PAYPAL_USD_TO_IDR : PAYPAL_IDR_TO_USD;
      setIdrAmount(Math.round(num * rate).toString());
    }
  };

  const handleCalculateExchange = () => {
    const usd = parseFloat(usdAmount);
    if (isNaN(usd) || usd <= 0 || !isFinite(usd)) {
      setCalcResult(null);
      return;
    }
    
    // Always compute the output metrics based on referenceRate and adjustment of 700
    const finalUsd = exchangeDirection === "usd-to-idr" ? usd : parseFloat((parseFloat(idrAmount) / PAYPAL_USD_TO_IDR).toFixed(2));
    const finalEstimatedIDR = exchangeDirection === "usd-to-idr" ? Math.round(usd * PAYPAL_USD_TO_IDR) : parseFloat(idrAmount);

    setCalcResult({
      usd: finalUsd,
      referenceRate: googleRate,
      adjustment: 1500,
      transactionRate: PAYPAL_USD_TO_IDR,
      estimatedIDR: finalEstimatedIDR
    });
  };

  // Auto calculate on mount or input update to populate the UI
  useEffect(() => {
    handleCalculateExchange();
  }, [rateData, usdAmount, exchangeDirection, idrAmount]);

  // FB Assets selection state
  const [selectedPage, setSelectedPage] = useState<string>("p1");
  const [selectedGroup, setSelectedGroup] = useState<string>("g1");

  // Form custom details
  const [userName, setUserName] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [payoutAccountType, setPayoutAccountType] = useState<"fb-pro" | "fanspage">("fb-pro");
  const [payoutAccountName, setPayoutAccountName] = useState("");
  const [payoutCurrentStatus, setPayoutCurrentStatus] = useState<"preventive" | "violated">("preventive");

  const getWhatsAppLink = () => {
    const waNumber = "62895366831241"; // WhatsApp Contact number
    let text = "";

    const greeting = userName ? `Halo AHMEDAYEV, nama saya ${userName}.` : "Halo AHMEDAYEV.";

    if (activeTab === "paypal") {
      const sourceCurrency = exchangeDirection === "usd-to-idr" ? "USD" : "IDR";
      const targetCurrency = exchangeDirection === "usd-to-idr" ? "IDR" : "USD";
      const sourceAmt = exchangeDirection === "usd-to-idr" ? usdAmount : idrAmount;
      const targetAmt = exchangeDirection === "usd-to-idr" ? idrAmount : usdAmount;
      const rate = exchangeDirection === "usd-to-idr" ? PAYPAL_USD_TO_IDR : PAYPAL_IDR_TO_USD;

      text = `${greeting} Saya ingin menukar saldo PayPal.\n\n*Detail Transaksi:*\n- Arah Konversi: ${exchangeDirection === "usd-to-idr" ? "PayPal USD ➔ Saldo IDR" : "IDR ➔ Saldo PayPal USD"}\n- Jumlah dikirim: ${sourceAmt} ${sourceCurrency}\n- Estimasi diterima: ${targetAmt} ${targetCurrency}\n- Kurs yang digunakan: 1 USD = ${rate.toLocaleString()} IDR\n\nMohon info langkah selanjutnya untuk menyelesaikan transaksi ini secara aman.`;
    } else if (activeTab === "facebook-pages") {
      const page = FEATURED_PAGES.find(p => p.id === selectedPage);
      text = `${greeting} Saya tertarik dengan Facebook Page yang tersedia di marketplace Anda.\n\n*Detail Halaman:*\n- Nama: ${page?.name}\n- Pengikut: ${page?.followers}\n- Niche: ${page?.niche}\n- Status: ${page?.status}\n- Harga: Rp ${page?.price?.toLocaleString("id-ID")}\n\nMohon pandu saya dalam proses rekber dan transfer kepemilikan yang aman.`;
    } else if (activeTab === "facebook-groups") {
      const group = FEATURED_GROUPS.find(g => g.id === selectedGroup);
      text = `${greeting} Saya tertarik dengan Facebook Group yang tersedia di marketplace Anda.\n\n*Detail Grup:*\n- Nama: ${group?.name}\n- Anggota: ${group?.members}\n- Niche: ${group?.niche}\n- Interaksi: ${group?.engagement}\n- Harga: Rp ${group?.price?.toLocaleString("id-ID")}\n\nMohon info prosedur transfer dan detail pembayarannya.`;
    } else if (activeTab === "payout-transfer") {
      const typeLabel = payoutAccountType === "fb-pro" ? "FB PRO" : "Fanspage / Halaman Facebook";
      const statusLabel = payoutCurrentStatus === "preventive" 
        ? "Pencegahan Pelanggaran Entitas Terhubung (Preventive)" 
        : "Akun Sudah Terkena Pembatasan / Pelanggaran Entitas Terhubung";
      text = `${greeting} Saya butuh Jasa Pindah Payout untuk menghindari pelanggaran entitas terhubung.\n\n*Detail Permintaan Jasa Pindah Payout:*\n- Jenis Akun: ${typeLabel}\n- Nama Akun / Page: ${payoutAccountName || "Belum ditentukan"}\n- Status Saat Ini: ${statusLabel}\n\nMohon dibantu info biaya, estimasi pengerjaan, dan pendampingan transfer payout yang aman. Terima kasih!`;
    }

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  const formatIDR = (valStr: string) => {
    const num = parseFloat(valStr);
    if (isNaN(num)) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  const formatUSD = (valStr: string) => {
    const num = parseFloat(valStr);
    if (isNaN(num)) return "$0.00";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
  };

  // Close modal on escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          id="modal-backdrop"
        />

        {/* Modal Window */}
        <motion.div 
          className="relative w-full max-w-4xl bg-[#12151D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          id="modal-container"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5"
            aria-label="Close modal"
            id="close-modal-button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel - Trading Parameters */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-r border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold font-mono bg-[#EC6519]/15 text-[#EC6519] border border-[#EC6519]/20">
                  Meja Transaksi AHMEDAYEV
                </span>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="text-zinc-400 text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#EC6519]" /> Rekber Aman
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white mb-6">
                Mulai Transaksi Aman
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-white/5 rounded-xl border border-white/5 mb-6" id="trading-desk-tabs">
                <button
                  onClick={() => setActiveTab("paypal")}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === "paypal" 
                      ? "bg-[#EC6519] text-white shadow-lg shadow-[#EC6519]/20" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-paypal"
                >
                  <Coins className="w-4 h-4 shrink-0" />
                  <span>PayPal</span>
                </button>
                <button
                  onClick={() => setActiveTab("facebook-pages")}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === "facebook-pages" 
                      ? "bg-[#EC6519] text-white shadow-lg shadow-[#EC6519]/20" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-fb-pages"
                >
                  <Facebook className="w-4 h-4 shrink-0" />
                  <span>Halaman</span>
                </button>
                <button
                  onClick={() => setActiveTab("facebook-groups")}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === "facebook-groups" 
                      ? "bg-[#EC6519] text-white shadow-lg shadow-[#EC6519]/20" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-fb-groups"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Grup</span>
                </button>
                <button
                  onClick={() => setActiveTab("payout-transfer")}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === "payout-transfer" 
                      ? "bg-[#EC6519] text-white shadow-lg shadow-[#EC6519]/20" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  id="tab-payout-transfer"
                >
                  <ArrowLeftRight className="w-4 h-4 shrink-0" />
                  <span>Payout</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="space-y-4">
                {activeTab === "paypal" && (
                  <div className="space-y-4" id="paypal-calculator-section">
                    <div className="flex justify-between items-start text-xs text-zinc-400 px-1 border-b border-white/5 pb-3">
                      <div>
                        <span className="flex items-center gap-1.5 text-zinc-400 font-medium">
                          Kurs Kompetitif
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-[#EC6519]/10 text-[#EC6519] font-mono border border-[#EC6519]/10">
                            Diperbarui setiap jam
                          </span>
                        </span>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1 flex flex-col gap-0.5">
                          <span>Terakhir: {formatToWIB(updatedAt)}</span>
                          {isStale && <span className="text-amber-500 italic">* Menggunakan kurs terakhir yang tersedia</span>}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5 font-sans">
                        <span className="font-mono text-[#EC6519] bg-[#EC6519]/5 px-2 py-1 rounded border border-[#EC6519]/10 font-medium text-xs">
                          1 USD = Rp {PAYPAL_USD_TO_IDR.toLocaleString("id-ID")}
                        </span>
                        
                        <button
                          type="button"
                          onClick={onRefreshRate}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-zinc-400 hover:text-white font-mono cursor-pointer transition-all"
                          title="Perbarui kurs"
                          id="refresh-rate-calc-btn"
                        >
                          <RefreshCw className={`w-2.5 h-2.5 ${isLoadingRate ? "animate-spin" : ""}`} />
                          <span>Perbarui Kurs</span>
                        </button>
                      </div>
                    </div>

                    {/* Send Input */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 relative focus-within:border-[#EC6519] transition-colors">
                      <label className="block text-xs text-zinc-400 mb-1">Saya Ingin Mengirim</label>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={exchangeDirection === "usd-to-idr" ? usdAmount : idrAmount}
                          onChange={(e) => handleAmountChange(e.target.value, exchangeDirection === "usd-to-idr" ? "usd" : "idr")}
                          min="0.01"
                          step="any"
                          className="bg-transparent text-white font-mono text-xl focus:outline-none w-full"
                          placeholder="0"
                          id="calc-send-input"
                        />
                        <span className="text-sm font-semibold font-mono text-white">
                          {exchangeDirection === "usd-to-idr" ? "USD" : "IDR"}
                        </span>
                      </div>
                    </div>

                    {/* Swap Direction Divider */}
                    <div className="flex justify-center -my-2 relative z-10">
                      <button
                        onClick={handleToggleDirection}
                        className="bg-[#EC6519] text-white p-2.5 rounded-full hover:bg-[#C53F28] transition-all shadow-md shadow-brand-orange/15 hover:scale-105 border border-white/10 cursor-pointer"
                        title="Tukar arah konversi"
                        id="calc-swap-button"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Receive Input */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 relative focus-within:border-[#EC6519] transition-colors">
                      <label className="block text-xs text-zinc-400 mb-1">Estimasi Diterima</label>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={exchangeDirection === "usd-to-idr" ? idrAmount : usdAmount}
                          onChange={(e) => handleAmountChange(e.target.value, exchangeDirection === "usd-to-idr" ? "idr" : "usd")}
                          min="0.01"
                          step="any"
                          className="bg-transparent text-white font-mono text-xl focus:outline-none w-full"
                          placeholder="0"
                          id="calc-receive-input"
                        />
                        <span className="text-sm font-semibold font-mono text-white">
                          {exchangeDirection === "usd-to-idr" ? "IDR" : "USD"}
                        </span>
                      </div>
                    </div>

                    {/* Action Button: Hitung Rate PayPal */}
                    <button
                      type="button"
                      onClick={handleCalculateExchange}
                      id="btn-calculate-exchange"
                      className="w-full py-3 bg-[#EC6519] hover:bg-[#C53F28] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all font-sans cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4" />
                      Hitung Rate PayPal
                    </button>

                    {/* Calculation Output Card */}
                    {calcResult ? (
                      <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-3 font-mono text-xs">
                        <h4 className="text-xs font-semibold text-white border-b border-white/5 pb-2 uppercase tracking-wider font-sans">Rincian Kalkulasi:</h4>
                        
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Nominal USD</span>
                          <span className="text-white font-medium">{calcResult.usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                        </div>



                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-zinc-400">Kurs Transaksi</span>
                          <span className="text-[#EC6519] font-bold">Rp {calcResult.transactionRate.toLocaleString("id-ID")}</span>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                          <span className="text-white font-semibold font-sans">Estimasi Rupiah Diterima</span>
                          <span className="text-lg font-bold text-emerald-400">
                            Rp {calcResult.estimatedIDR.toLocaleString("id-ID")}
                          </span>
                        </div>

                        <p className="text-[10px] text-zinc-500 leading-normal font-sans pt-2 border-t border-white/5 italic">
                          * PENTING: Hasil kalkulator di atas adalah estimasi berdasarkan rate penyesuaian AHMEDAYEV. Rate final/aktual wajib dikonfirmasi terlebih dahulu sebelum melakukan transfer dana.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-xs text-red-400 font-sans">
                        Silakan masukkan nominal USD positif yang valid untuk menghitung konversi.
                      </div>
                    )}

                    <p className="text-[11px] text-zinc-500 leading-relaxed px-1 font-sans">
                      *Catatan: Nilai tukar transaksi didasarkan pada harga referensi pasar bebas dengan penyesuaian margin tetap. Waktu transfer standar: 5 hingga 15 menit setelah saldo PayPal diselesaikan.
                    </p>
                  </div>
                )}

                {activeTab === "facebook-pages" && (
                  <div className="space-y-3" id="facebook-pages-section">
                    <p className="text-xs text-zinc-400 mb-2">Pilih Facebook Page premium terverifikasi dalam inventaris kami:</p>
                    <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {FEATURED_PAGES.map((page) => (
                        <div
                          key={page.id}
                          onClick={() => setSelectedPage(page.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                            selectedPage === page.id 
                              ? "bg-[#EC6519]/5 border-[#EC6519] shadow-md shadow-[#EC6519]/5" 
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }`}
                          id={`page-select-${page.id}`}
                        >
                          <div>
                            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <Facebook className="w-3.5 h-3.5 text-blue-500" />
                              {page.name}
                            </div>
                            <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-2 font-mono">
                              <span className="text-zinc-500">{page.niche}</span>
                              <span>•</span>
                              <span className="text-[#EC6519]">{page.followers} pengikut</span>
                              <span>•</span>
                              <span className="text-emerald-500">{page.status}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold font-mono text-[#EC6519]">Rp {page.price.toLocaleString("id-ID")}</div>
                            <div className="text-[9px] text-zinc-500">Siap Rekber</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-500 italic px-1 mt-1">
                      *Harga dapat berubah sewaktu-waktu sesuai dengan penawaran pasar.
                    </p>
                  </div>
                )}

                {activeTab === "facebook-groups" && (
                  <div className="space-y-3" id="facebook-groups-section">
                    <p className="text-xs text-zinc-400 mb-2">Pilih Facebook Group aktif dalam inventaris kami:</p>
                    <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {FEATURED_GROUPS.map((group) => (
                        <div
                          key={group.id}
                          onClick={() => setSelectedGroup(group.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                            selectedGroup === group.id 
                              ? "bg-[#EC6519]/5 border-[#EC6519] shadow-md shadow-[#EC6519]/5" 
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }`}
                          id={`group-select-${group.id}`}
                        >
                          <div>
                            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#EC6519]" />
                              {group.name}
                            </div>
                            <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-2 font-mono">
                              <span className="text-zinc-500">{group.niche}</span>
                              <span>•</span>
                              <span className="text-[#EC6519]">{group.members} anggota</span>
                              <span>•</span>
                              <span className="text-zinc-400">{group.engagement}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold font-mono text-[#EC6519]">Rp {group.price.toLocaleString("id-ID")}</div>
                            <div className="text-[9px] text-zinc-500">Transfer Admin Instan</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-500 italic px-1 mt-1">
                      *Harga dapat berubah sewaktu-waktu sesuai dengan penawaran pasar.
                    </p>
                  </div>
                )}

                {activeTab === "payout-transfer" && (
                  <div className="space-y-4" id="payout-transfer-section">
                    <p className="text-xs text-zinc-400">
                      Formulir Jasa Pindah Payout Akun Facebook Pro / Fanspage aman & terpercaya untuk menghindari pelanggaran entitas terhubung.
                    </p>

                    {/* Account Type Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-xs text-zinc-400">Tipe Akun Facebook</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPayoutAccountType("fb-pro")}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-center h-10 ${
                            payoutAccountType === "fb-pro"
                              ? "bg-[#EC6519]/10 border-[#EC6519] text-[#EC6519]"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          Facebook Pro (FB PRO)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPayoutAccountType("fanspage")}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-center h-10 ${
                            payoutAccountType === "fanspage"
                              ? "bg-[#EC6519]/10 border-[#EC6519] text-[#EC6519]"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          Fanspage / Halaman
                        </button>
                      </div>
                    </div>

                    {/* Account Name Input */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 focus-within:border-[#EC6519] transition-colors">
                      <label className="block text-xs text-zinc-400 mb-1">Nama Akun / Fanspage</label>
                      <input
                        type="text"
                        placeholder="Masukkan nama profil FB Pro atau Fanspage..."
                        value={payoutAccountName}
                        onChange={(e) => setPayoutAccountName(e.target.value)}
                        className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
                        id="payout-account-name-input"
                      />
                    </div>

                    {/* Current Status Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-xs text-zinc-400">Tujuan Pindah Payout</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPayoutCurrentStatus("preventive")}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-left flex flex-col justify-between h-16 ${
                            payoutCurrentStatus === "preventive"
                              ? "bg-[#EC6519]/10 border-[#EC6519] text-white"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          <span className="font-semibold block text-[11px] text-white">Pencegahan</span>
                          <span className="text-[9px] text-zinc-400 leading-tight">Menghindari resiko entitas terhubung</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPayoutCurrentStatus("violated")}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-left flex flex-col justify-between h-16 ${
                            payoutCurrentStatus === "violated"
                              ? "bg-[#EC6519]/10 border-[#EC6519] text-white"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          <span className="font-semibold block text-[11px] text-red-400">Sudah Melanggar</span>
                          <span className="text-[9px] text-zinc-400 leading-tight">Akun payout terkait bermasalah</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] text-zinc-500 italic px-1 leading-relaxed">
                      *Proses pemindahan payout dilakukan dengan pendampingan langsung oleh tim ahli kami demi menjamin keamanan 100% tanpa resiko pembatasan atau kehilangan akses halaman.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* User Details & CTA */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Nama Anda (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#EC6519] font-sans"
                  id="user-name-input"
                />
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#EC6519] hover:bg-[#C53F28] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#EC6519]/15 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
                id="submit-whatsapp-deal-button"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Pertanyaan via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Right Panel - Process / Verification Details */}
          <div className="w-full md:w-[320px] bg-white/[0.02] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <h3 className="text-xs font-semibold text-white tracking-widest uppercase font-mono mb-4 text-zinc-400">
                Keamanan Terjamin
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="p-1.5 h-fit bg-[#EC6519]/10 rounded-lg border border-[#EC6519]/20 text-[#EC6519]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white mb-0.5">Rekber Aman</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Garansi transaksi aman. Aset dan saldo diverifikasi sepenuhnya dan dikunci dengan aman selama transfer.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-1.5 h-fit bg-[#EC6519]/10 rounded-lg border border-[#EC6519]/20 text-[#EC6519]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white mb-0.5">Kepemilikan Instan</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Transfer bisnis Facebook dilakukan tanpa penundaan. Tanpa masa tunggu penahanan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-1.5 h-fit bg-[#EC6519]/10 rounded-lg border border-[#EC6519]/20 text-[#EC6519]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white mb-0.5">Kurs Kompetitif</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Konversikan USD ke IDR pada nilai pasar premium. Tersedia limit transaksi tinggi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center md:text-left">
              <div className="inline-block p-1 bg-white/5 rounded-full px-3 text-[10px] font-mono text-zinc-400 border border-white/5">
                🔒 Proses Terenkripsi 256-bit
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                Kami bertindak sebagai perantara premium untuk akuisisi digital, melindungi kepentingan pembeli dan penjual sepenuhnya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
