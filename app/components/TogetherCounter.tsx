"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const START_DATE = new Date("2025-09-08T00:00:00");

function getElapsed() {
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - START_DATE.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = Math.floor((totalDays % 365) % 30);
  return { years, months, days, hours, minutes, seconds };
}

const UNITS = [
  { key: "years",   label: "Tahun",  icon: "🥂", color: "from-rose-400 to-pink-500" },
  { key: "months",  label: "Bulan",  icon: "🌙", color: "from-pink-400 to-fuchsia-500" },
  { key: "days",    label: "Hari",   icon: "☀️", color: "from-fuchsia-400 to-purple-500" },
  { key: "hours",   label: "Jam",    icon: "⏰", color: "from-purple-400 to-rose-500" },
  { key: "minutes", label: "Menit",  icon: "💫", color: "from-rose-300 to-pink-400" },
  { key: "seconds", label: "Detik",  icon: "💗", color: "from-pink-300 to-fuchsia-400" },
];

export default function TogetherCounter() {
  const [elapsed, setElapsed] = useState(getElapsed());

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/50 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,240,246,0.45) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Top bar */}
        <div className="h-1.5 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-pink-400" />

        {/* Header */}
        <div className="text-center pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-3xl sm:text-4xl mb-2 sm:mb-3"
          >
            💑
          </motion.div>
          <h2 className="font-[family-name:var(--font-great-vibes)] text-3xl sm:text-4xl text-rose-500">
            Kita sudah bersama selama
          </h2>
          <p className="font-[family-name:var(--font-lora)] text-rose-300 text-xs sm:text-sm italic mt-1">
            sejak 8 September 2025 🤍
          </p>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-8 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-4 sm:mb-6" />

        {/* Units grid — 3 cols on mobile, 6 on sm+ */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 px-4 sm:px-6 pb-6 sm:pb-8">
          {UNITS.map(({ key, label, icon, color }) => {
            const value = elapsed[key as keyof typeof elapsed];
            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className={`relative w-full rounded-xl sm:rounded-2xl bg-gradient-to-br ${color} p-0.5 shadow-md`}>
                  <div className="bg-white/80 rounded-[10px] sm:rounded-[14px] py-2 sm:py-3 px-1 flex flex-col items-center gap-0.5">
                    <span className="text-sm sm:text-lg">{icon}</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={value}
                        initial={{ y: -14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 14, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-rose-800 tabular-nums font-[family-name:var(--font-lora)]"
                      >
                        {String(value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-[family-name:var(--font-lora)] text-rose-400 tracking-wide font-medium">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pb-5 sm:pb-7 px-4">
          <div className="inline-flex items-center gap-2 bg-rose-50/80 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 border border-rose-100">
            <span className="text-xs sm:text-sm">🌸</span>
            <p className="font-[family-name:var(--font-lora)] text-rose-400 italic text-xs sm:text-sm">
              dan setiap detiknya selalu berarti
            </p>
            <span className="text-xs sm:text-sm">🌸</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
