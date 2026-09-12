"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#ffffff", "#fbbf24"];
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 5, angle: 60,  spread: 65, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 65, origin: { x: 1 }, colors });
    confetti({ particleCount: 3, angle: 90,  spread: 80, origin: { x: 0.5, y: 0.6 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function RunawayButton() {
  const [bangetClicked, setBangetClicked] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const escape = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    // Keep the button within safe bounds (button ~110px wide, ~44px tall)
    const maxX = Math.max(0, (cw - 120) / 2);
    const maxY = Math.max(0, (ch - 50) / 2);
    controls.start({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
      transition: { type: "spring", stiffness: 400, damping: 18 },
    });
  }, [controls]);

  const handleBanget = async () => {
    setBangetClicked(true);
    await fireConfetti();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-xl mx-auto px-0 sm:px-0"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-100 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,207,232,0.4),transparent_60%)]" />

        {/* Top bar */}
        <div className="h-1.5 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-pink-400" />

        <div className="relative px-5 sm:px-8 py-8 sm:py-10 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-4xl sm:text-5xl mb-4 sm:mb-5"
          >
            🥺
          </motion.div>

          <h2 className="font-[family-name:var(--font-great-vibes)] text-3xl sm:text-4xl md:text-5xl text-rose-500 mb-2 leading-tight">
            Kamu juga seneng kan sama aku?
          </h2>
          <p className="font-[family-name:var(--font-lora)] text-rose-300 italic text-xs sm:text-sm mb-6 sm:mb-8">
            jawab jujur yaa, aku liat loh 👀
          </p>

          {/* Success toast */}
          <AnimatePresence>
            {bangetClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 sm:mb-6 bg-gradient-to-r from-rose-400 to-fuchsia-400 text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 shadow-lg"
              >
                <p className="font-[family-name:var(--font-great-vibes)] text-2xl sm:text-3xl mb-1">
                  Yeay! 🎉
                </p>
                <p className="font-[family-name:var(--font-lora)] text-xs sm:text-sm">
                  Aku juga sayang kamu banget!! 🤍
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons container — taller on mobile so runaway has room */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center h-36 sm:h-32 select-none overflow-hidden"
          >
            {/* Banget! */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBanget}
              className="relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold font-[family-name:var(--font-lora)] text-white shadow-xl text-sm sm:text-base overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f43f5e, #d946ef)" }}
            >
              <motion.span
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <span className="relative">Banget! 🥰</span>
            </motion.button>

            {/* Nggak — runaway */}
            <motion.button
              animate={controls}
              onHoverStart={escape}
              onTapStart={escape}
              onClick={escape}
              initial={{ x: 65, y: 0 }}
              className="absolute px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-[family-name:var(--font-lora)] text-xs sm:text-sm font-medium text-rose-300 bg-white border-2 border-dashed border-rose-200 hover:cursor-none"
            >
              Nggak 😶
            </motion.button>
          </div>

          <p className="text-rose-200 text-[10px] sm:text-xs font-[family-name:var(--font-lora)] italic mt-1">
            *tombol &ldquo;Nggak&rdquo; lagi ngambek, makluin aja 🫣
          </p>
        </div>
      </div>
    </motion.div>
  );
}
