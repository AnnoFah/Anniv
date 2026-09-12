"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 20 + 8,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 12,
  sway: Math.random() * 50 - 25,
  emoji: ["🤍", "🩷", "💕", "💗", "🌸", "✨", "💖", "🫧"][
    Math.floor(Math.random() * 8)
  ],
}));

export default function FloatingHearts() {
  const heightRef = useRef(600);

  useEffect(() => {
    heightRef.current = window.innerHeight;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            bottom: "-3rem",
            fontSize: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, -(heightRef.current + 120)],
            x: [0, p.sway, -p.sway / 2, p.sway / 3, 0],
            opacity: [0, 0.75, 0.75, 0.3, 0],
            rotate: [0, 15, -10, 5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
