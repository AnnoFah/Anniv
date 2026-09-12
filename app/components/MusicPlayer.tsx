"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  songTitle?: string;
  artist?: string;
}

export default function MusicPlayer({
  src,
  songTitle = "Teman Hidup",
  artist = "Tulus",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Auto-play on first user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    const tryPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {}); // silently ignore autoplay block
      document.removeEventListener("click", tryPlay);
    };
    document.addEventListener("click", tryPlay, { once: true });
    return () => document.removeEventListener("click", tryPlay);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () =>
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (hasError) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        onError={() => { setHasError(true); setPlaying(false); }}
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 80, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
          >
            <div
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/50 shadow-2xl w-[92vw] max-w-sm"
              style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* Animated music note icon */}
              <motion.div
                animate={playing ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                  hasError
                    ? "bg-rose-200"
                    : "bg-gradient-to-br from-rose-400 to-fuchsia-500"
                }`}
              >
                <Music className="w-4 h-4 text-white" />
              </motion.div>

              {/* Song info — or error state */}
              <div className="flex-1 min-w-0">
                {hasError ? (
                  <div>
                    <p className="text-rose-700 font-semibold text-xs font-[family-name:var(--font-lora)] leading-snug">
                      Tambahkan lagu dulu ya 🎵
                    </p>
                    <p className="text-rose-400 text-[10px] font-[family-name:var(--font-lora)] leading-snug mt-0.5">
                      Simpan MP3 ke: <span className="font-mono bg-rose-50 px-1 rounded">public/teman-hidup.mp3</span>
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-rose-800 font-semibold text-sm font-[family-name:var(--font-lora)] truncate">
                      {songTitle}
                    </p>
                    <p className="text-rose-400 text-xs font-[family-name:var(--font-lora)] italic">
                      {artist}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-1.5 h-1 bg-rose-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  {muted
                    ? <VolumeX className="w-4 h-4 text-rose-400" />
                    : <Volume2 className="w-4 h-4 text-rose-400" />}
                </button>
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-fuchsia-500 flex items-center justify-center shadow hover:scale-110 transition-transform"
                >
                  {playing
                    ? <Pause className="w-3.5 h-3.5 text-white" />
                    : <Play className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => setVisible(false)}
                className="text-rose-200 hover:text-rose-400 text-xs ml-1 transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open button */}
      <AnimatePresence>
        {!visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setVisible(true)}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 flex items-center justify-center shadow-xl"
          >
            <Music className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
