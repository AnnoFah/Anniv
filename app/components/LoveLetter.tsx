"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARAGRAPHS = [
  "Happy 1st anniversary yaa 🤍",
  "Tidak kerasa yaa sayang, ternyata kita sudah 1 tahun. Kadang aku sendiri masih heran gimana bisa waktu berjalan cepet banget sampai akhirnya kita ada di titik ini. Selama setahun ini banyak banget hal yang kita alami bareng, dan menurutku justru semua hal itu yang bikin hubungan kita punya banyak cerita.",
  "Aku seneng banget sayang karena dari sekian banyak orang, aku bisa kenal kamu sedekat ini dan punya kesempatan buat nemenin hari-hari kamu. Ada banyak hal kecil tentang kamu yang sekarang sudah aku kenal, dan jujur aku seneng bisa mengetahui sisi-sisi kamu yang mungkin dulu sama sekali ngak pernah aku bayangin.",
  "Aku juga sadar selama sama kamu aku masih sering bikin salah, masih banyak sifatku yang mungkin bikin kamu kesel atau capek. Tapi aku bersyukur setiap ada masalah kita masih mau ngomongin dan nyelesaiin sama-sama. Semoga kedepannya aku bisa lebih dewasa, lebih ngerti kamu, dan lebih bisa jaga perasaan kamu yaa sayang.",
  "Terimakasih yaa sayang sudah menjadi seseorang yang bikin hari-hari aku terasa lebih berwarna. Terimakasih sudah nemenin banyak momen yang sebelumnya aku tidak pernah — aku happy pwol sayang — soalnya banyak banget hal yang belum kucoba dikarenakan keterbatasan dan lain-lain (mungkin susah untuk diungkapkan).",
  "Di tahun pertama ikiww aku cuma berharap kita masih punya banyak waktu untuk bikin cerita baru lagi sayang. Semoga kedepannya kita bisa lebih sering ketawa bareng, saling dukung, dan tetap mau bertahan sampai kapanpun ya sayang meskipun nanti pasti ada aja cobaannya.",
  "Jaga diri baik-baik yaa sayang, jangan lupa istirahatnya dan jangan terlalu maksain diri. Kurang-kurangin ovtnya ya sayang — jujur kamu itu keren pwol kok. Semoga semua yang sedang kamu jalanin sekarang dipermudah dan satu-satu keinginan kamu bisa tercapai.",
  "Sekali lagi happy 1st anniversary yaa 🤍🫶🏻",
];

const WORD_DELAY = 80;

export default function LoveLetter() {
  const [visibleParas, setVisibleParas] = useState<string[]>([]);
  const [currentPara, setCurrentPara] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentPara >= PARAGRAPHS.length) { setDone(true); return; }
    const words = PARAGRAPHS[currentPara].split(" ");
    if (wordCount >= words.length) {
      const timeout = setTimeout(() => {
        setVisibleParas((p) => [...p, PARAGRAPHS[currentPara]]);
        setCurrentPara((p) => p + 1);
        setWordCount(0);
      }, 350);
      return () => clearTimeout(timeout);
    }
    const timer = setTimeout(() => setWordCount((w) => w + 1), WORD_DELAY);
    return () => clearTimeout(timer);
  }, [currentPara, wordCount]);

  const currentWords =
    currentPara < PARAGRAPHS.length
      ? PARAGRAPHS[currentPara].split(" ").slice(0, wordCount).join(" ")
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glow */}
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-rose-200/40 via-pink-200/30 to-fuchsia-200/40 rounded-[2rem] blur-2xl" />

      {/* Paper */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
        {/* Top ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-rose-300 via-fuchsia-300 to-pink-300" />

        {/* Header */}
        <div className="relative flex flex-col items-center pt-6 sm:pt-8 pb-4 px-4 sm:px-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[80px] sm:text-[120px] opacity-[0.04]">🤍</span>
          </div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-2xl sm:text-3xl mb-2"
          >
            💌
          </motion.div>
          <h2 className="font-[family-name:var(--font-great-vibes)] text-4xl sm:text-5xl text-rose-500 drop-shadow-sm">
            Surat Untukmu
          </h2>
          <p className="font-[family-name:var(--font-lora)] text-rose-300 italic text-xs sm:text-sm mt-1 tracking-widest">
            — dengan sepenuh hati —
          </p>
          <div className="mt-3 flex gap-1">
            {["🌸", "💗", "🌸"].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                className="text-xs sm:text-sm"
              >
                {e}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-8 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />

        {/* Letter body */}
        <div
          className="px-5 sm:px-8 md:px-12 py-6 sm:py-8 min-h-[200px] space-y-4"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, #fce7f380 32px)",
            backgroundSize: "100% 32px",
            backgroundPositionY: "8px",
          }}
        >
          <AnimatePresence>
            {visibleParas.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`font-[family-name:var(--font-lora)] leading-relaxed ${
                  idx === 0
                    ? "text-rose-600 font-semibold text-base sm:text-xl"
                    : "text-rose-900 text-sm sm:text-base"
                }`}
              >
                {para}
              </motion.p>
            ))}
          </AnimatePresence>

          {!done && currentPara < PARAGRAPHS.length && (
            <p className={`font-[family-name:var(--font-lora)] leading-relaxed ${
              currentPara === 0
                ? "text-rose-600 font-semibold text-base sm:text-xl"
                : "text-rose-900 text-sm sm:text-base"
            }`}>
              {currentWords}
              <span className="typewriter-cursor" />
            </p>
          )}
        </div>

        {/* Footer */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-5 sm:px-8 pb-6 sm:pb-8 flex flex-col items-end gap-1"
          >
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-2" />
            <span className="font-[family-name:var(--font-great-vibes)] text-2xl sm:text-3xl text-rose-400">
              — with love 🤍
            </span>
            <span className="font-[family-name:var(--font-lora)] text-rose-300 text-xs italic">
              8 September 2025
            </span>
          </motion.div>
        )}

        {/* Bottom ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-300 via-fuchsia-300 to-pink-300" />
      </div>
    </motion.div>
  );
}
