"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    const generateBubble = (creationTimeOffset = 0) => {
      const colors = [
        "bg-purple-400/30",
        "bg-purple-500/25",
        "bg-purple-300/35",
        "bg-blue-400/30",
        "bg-blue-500/25",
        "bg-blue-300/35",
        "bg-pink-400/40",
        "bg-pink-500/35",
        "bg-pink-300/45",
        "bg-cyan-400/40",
        "bg-cyan-500/35",
        "bg-cyan-300/45",
        "bg-emerald-400/20",
        "bg-emerald-500/15",
        "bg-emerald-300/25",
        "bg-amber-400/20",
        "bg-amber-500/15",
        "bg-amber-300/25",
        "bg-violet-400/30",
        "bg-violet-500/25",
        "bg-violet-300/35",
        "bg-indigo-400/30",
        "bg-indigo-500/25",
        "bg-indigo-300/35",
        "bg-fuchsia-400/30",
        "bg-fuchsia-500/25",
        "bg-fuchsia-300/35",
        "bg-rose-400/30",
        "bg-rose-500/25",
        "bg-rose-300/35",
        "bg-teal-400/30",
        "bg-teal-500/25",
        "bg-teal-300/35",
        "bg-sky-400/30",
        "bg-sky-500/25",
        "bg-sky-300/35",
        "bg-lime-400/20",
        "bg-lime-500/15",
        "bg-lime-300/25",
      ];

      const size = 8 + Math.random() * 30;
      const opacity = 0.2 + Math.random() * 0.8;
      const lifespan = 3000 + Math.random() * 9000;

      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity,
        lifespan,
        createdAt: Date.now() - creationTimeOffset,
      };
    };

    const initialBubbles = Array.from({ length: 50 }).map((_, i) =>
      generateBubble(Math.random() * 8000)
    );
    setBubbles(initialBubbles);

    const manageBubbles = () => {
      setBubbles((prevBubbles) => {
        const now = Date.now();

        const remainingBubbles = prevBubbles.filter(
          (bubble) => now - bubble.createdAt < bubble.lifespan
        );

        const bubblesToAdd = Math.floor(Math.random() * 4) + 3;
        if (remainingBubbles.length < 60) {
          const newBubbles = Array.from({ length: bubblesToAdd }).map(() =>
            generateBubble()
          );
          return [...remainingBubbles, ...newBubbles];
        }

        return remainingBubbles;
      });
    };

    const interval = setInterval(manageBubbles, 500 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {bubbles.map((bubble) => {
          const progress = Math.min(
            1,
            (Date.now() - bubble.createdAt) / bubble.lifespan
          );
          const opacity = Math.sin(progress * Math.PI) * bubble.opacity;

          return (
            <motion.div
              key={bubble.id}
              className={`absolute rounded-full ${bubble.color} z-0`}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                opacity: opacity,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: opacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default BubbleBackground;
