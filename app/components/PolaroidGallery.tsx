"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const leftPhotos = ["/photo1.jpg", "/photo2.jpg"];
const rightPhotos = ["/funny1.jpg", "/funny2.jpg", "/funny3.jpg", "/funny4.jpg"];
const VIDEO_URL = "/our-video.mp4";

// ---------------------------------------------------------------------------
// ImageSlider
// ---------------------------------------------------------------------------
function ImageSlider({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm group">
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[idx]}
          alt={`photo ${idx + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={next}
        />
      </motion.div>

      {/* Prev/Next — visible on hover (desktop) or always on mobile */}
      <button
        onClick={prev}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" />
      </button>
      <button
        onClick={next}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
        {photos.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-colors ${
              i === idx ? "bg-rose-500" : "bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div className="absolute top-1.5 right-2 bg-black/30 rounded-full px-1.5 py-0.5 text-white text-[9px] sm:text-[10px]">
        {idx + 1}/{photos.length}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VideoPlayer
// ---------------------------------------------------------------------------
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const ref = (node: HTMLVideoElement | null) => {
    if (!node) return;
    if (playing) node.play();
    else node.pause();
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm group">
      <video ref={ref} src={VIDEO_URL} loop playsInline className="w-full h-full object-cover" />
      <button
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
      >
        <div className="bg-white/80 rounded-full p-2 sm:p-3 shadow-lg">
          {playing
            ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
            : <Play  className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />}
        </div>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Polaroid wrapper
// ---------------------------------------------------------------------------
interface PolaroidProps {
  rotate: string;
  caption: string;
  children: React.ReactNode;
  featured?: boolean;
}

function Polaroid({ rotate, caption, children, featured = false }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: featured ? 0 : 30 }}
      animate={{ opacity: 1, y: featured ? -10 : 0, rotate }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
      whileHover={{ scale: 1.03, rotate: "0deg", zIndex: 20 }}
      style={{ rotate, zIndex: featured ? 10 : 1 }}
      className={`relative bg-white rounded-sm flex-shrink-0
        ${featured
          // Featured: 92vw on mobile → cap at 2xl on desktop
          ? "p-3 sm:p-5 pb-12 sm:pb-16 w-[92vw] max-w-2xl shadow-[0_20px_70px_-10px_rgba(244,63,94,0.4)]"
          // Side: 44vw on mobile (two fit) → fixed on sm+
          : "p-2.5 sm:p-3 pb-10 sm:pb-12 w-[44vw] max-w-[240px] sm:w-64 md:w-72 lg:w-80 shadow-xl sm:shadow-2xl"
        }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-400 to-fuchsia-400 text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 rounded-full shadow-md font-[family-name:var(--font-lora)] tracking-wide whitespace-nowrap z-10">
          ✨ Momen Terbaik Kita
        </div>
      )}

      <div className={`w-full overflow-hidden rounded-sm bg-rose-50 ${featured ? "aspect-video" : "aspect-[3/4]"}`}>
        {children}
      </div>

      <p className={`absolute bottom-1.5 sm:bottom-2 left-0 right-0 text-center font-[family-name:var(--font-great-vibes)] text-rose-500 leading-tight px-1
        ${featured ? "text-base sm:text-xl" : "text-sm sm:text-base"}`}>
        {caption}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Gallery
// ---------------------------------------------------------------------------
export default function PolaroidGallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-10 sm:space-y-16"
    >
      <h2 className="text-center font-[family-name:var(--font-great-vibes)] text-3xl sm:text-4xl text-rose-500">
        Galeri Memori Kita
      </h2>

      {/* Row 1 — Featured video, full-bleed on mobile */}
      <div className="flex justify-center px-2 sm:px-4">
        <Polaroid rotate="0deg" caption="1 Tahun Kita 🤍" featured>
          <VideoPlayer />
        </Polaroid>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 px-6 sm:px-8 opacity-30">
        <div className="flex-1 h-px bg-rose-300" />
        <span className="text-rose-300 text-sm">📷</span>
        <div className="flex-1 h-px bg-rose-300" />
      </div>

      {/* Row 2 — Two photo polaroids, always side-by-side */}
      <div className="flex justify-center items-start gap-4 sm:gap-8 md:gap-12 px-2 sm:px-4">
        <Polaroid rotate="-5deg" caption="Masih Malu-Malu">
          <ImageSlider photos={leftPhotos} />
        </Polaroid>
        <Polaroid rotate="4deg" caption="Foto Lucu Kita">
          <ImageSlider photos={rightPhotos} />
        </Polaroid>
      </div>
    </motion.div>
  );
}
