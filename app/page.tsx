"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Envelope from "./components/Envelope";
import FloatingHearts from "./components/FloatingHearts";
import LoveLetter from "./components/LoveLetter";
import TogetherCounter from "./components/TogetherCounter";
import PolaroidGallery from "./components/PolaroidGallery";
import RunawayButton from "./components/RunawayButton";
import MusicPlayer from "./components/MusicPlayer";

const BGM_SRC = "/teman-hidup.mp3";

function SectionDivider({ emoji = "🌸" }: { emoji?: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 opacity-50 px-2 sm:px-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      <motion.span
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="text-lg sm:text-xl"
      >
        {emoji}
      </motion.span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
    </div>
  );
}

const MILESTONES = [
  { icon: "☕", text: "Ribuan hari bareng" },
  { icon: "💬", text: "Chat ngak ada habisnya" },
  { icon: "🌧️", text: "Nemenin hujan & cerah" },
  { icon: "🥺", text: "Saling jaga perasaan" },
];

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-rose-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 10, delay: 3, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-fuchsia-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        />
      </div>

      {/* Music player — shown after envelope opened */}
      {opened && (
        <MusicPlayer src={BGM_SRC} songTitle="Teman Hidup" artist="Tulus" />
      )}

      <AnimatePresence>{opened && <FloatingHearts />}</AnimatePresence>

      {/* ── Envelope screen ────────────────────────────── */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 px-4"
          >
            <Envelope onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ──────────────────────────────── */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            // Responsive horizontal padding & max-width
            className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14 sm:space-y-20"
          >

            {/* ── Hero ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center space-y-3 sm:space-y-4 pt-2 sm:pt-4"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl"
              >
                🤍
              </motion.div>

              <h1 className="font-[family-name:var(--font-great-vibes)] text-5xl sm:text-7xl lg:text-8xl text-rose-500 drop-shadow-lg leading-tight">
                Happy 1st Anniversary
              </h1>
              <p className="font-[family-name:var(--font-lora)] text-rose-400 italic text-base sm:text-lg">
                8 September 2025 — selamanya 🌸
              </p>

              {/* Milestone chips — wrap on mobile */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-sm border border-rose-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm"
                  >
                    <span className="text-sm sm:text-base">{m.icon}</span>
                    <span className="font-[family-name:var(--font-lora)] text-rose-500 text-xs sm:text-sm">
                      {m.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <SectionDivider emoji="💌" />

            {/* ── Love Letter ──────────────────────────── */}
            <section id="letter">
              <LoveLetter />
            </section>

            <SectionDivider emoji="⏳" />

            {/* ── Together Counter ─────────────────────── */}
            <section id="counter">
              <TogetherCounter />
            </section>

            <SectionDivider emoji="📷" />

            {/* ── Polaroid Gallery ─────────────────────── */}
            <section id="gallery">
              <PolaroidGallery />
            </section>

            <SectionDivider emoji="🥺" />

            {/* ── Runaway Button ───────────────────────── */}
            <section id="fun" className="pb-24 sm:pb-16">
              <RunawayButton />
            </section>

            {/* ── Footer ───────────────────────────────── */}
            <footer className="text-center pb-6 sm:pb-8 space-y-1 sm:space-y-2">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="font-[family-name:var(--font-great-vibes)] text-2xl sm:text-3xl text-rose-400"
              >
                dengan cinta, selalu 🤍
              </motion.p>
              <p className="text-rose-300 text-xs font-[family-name:var(--font-lora)] italic">
                8 September 2025 — ∞
              </p>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
