"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -40 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="flex flex-col items-center gap-5 select-none px-6 w-full max-w-xs sm:max-w-sm mx-auto"
    >
      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-rose-400 font-[family-name:var(--font-lora)] italic text-base sm:text-lg"
      >
        Hai sayang, ada pesan buat kamu nih. Buka ya!
      </motion.p>

      {/* Envelope */}
      <motion.div
        onClick={onOpen}
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.96 }}
        className="relative cursor-pointer w-full"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Base layer */}
        <div className="absolute inset-0 rounded-b-xl bg-gradient-to-br from-pink-100 via-rose-100 to-fuchsia-100 shadow-2xl border border-rose-200" />

        {/* SVG envelope shape — scales perfectly with any container size */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Back triangles */}
          <polygon points="0,0 200,160 400,0"   fill="#fbcfe8" opacity="0.6" />
          <polygon points="0,0 0,300 160,160"   fill="#fce7f3" opacity="0.5" />
          <polygon points="400,0 400,300 240,160" fill="#fce7f3" opacity="0.5" />
          <polygon points="0,300 400,300 200,160" fill="#fbcfe8" opacity="0.5" />
          {/* Top flap */}
          <polygon points="0,0 400,0 200,170"   fill="#f9a8d4" opacity="0.7" />
        </svg>

        {/* Pulsing heart seal */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 4 }}
        >
          <div className="bg-white rounded-full p-2 sm:p-2.5 shadow-lg border-2 border-rose-300">
            <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-500 fill-rose-400" />
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-rose-300 text-sm font-[family-name:var(--font-lora)] italic animate-pulse"
      >
        klik amplop untuk membuka ✉️
      </motion.p>
    </motion.div>
  );
}
