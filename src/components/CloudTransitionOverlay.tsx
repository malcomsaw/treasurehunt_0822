import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';

interface CloudTransitionOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

export const CloudTransitionOverlay: React.FC<CloudTransitionOverlayProps> = ({
  isActive,
  onComplete
}) => {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100, // percentage from center
      y: (Math.random() - 0.5) * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.4,
      duration: Math.random() * 1.2 + 1.2
    }))
  );

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="cloud-portal-transition"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center"
        >
          {/* Background Fog Flash / Ambient Ethereal Glow */}
          <motion.div
            initial={{ opacity: 0.9, scale: 0.9 }}
            animate={{ opacity: [0.9, 1, 0], scale: [0.9, 1.4, 2] }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-radial from-amber-400/40 via-sky-950/70 to-slate-950 backdrop-blur-xl"
          />

          {/* Central Sunbeam / Golden Compass Light Flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.2, 2.5] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute z-20 flex flex-col items-center justify-center text-center"
          >
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 blur-md opacity-80" />
              <Compass className="w-16 h-16 sm:w-20 sm:h-20 text-slate-950 absolute inset-0 m-auto drop-shadow-[0_0_15px_rgba(251,191,36,1)]" />
              <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, -10] }}
              transition={{ duration: 1.6, times: [0, 0.3, 0.7, 1] }}
              className="mt-3 font-pixel text-xs sm:text-sm text-amber-300 tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              ✨ ENTERING THE CARIBBEAN REALM... ✨
            </motion.div>
          </motion.div>

          {/* Floating Stardust Particles Parting Outward */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: '0vw',
                y: '0vh',
                opacity: 0,
                scale: 0.2
              }}
              animate={{
                x: `${p.x > 0 ? p.x + 30 : p.x - 30}vw`,
                y: `${p.y * 1.2}vh`,
                opacity: [0, 1, 1, 0],
                scale: [0.2, 1.4, 0]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute z-30 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(253,224,71,0.9)]"
              style={{
                width: p.size,
                height: p.size
              }}
            />
          ))}

          {/* ================= LEFT CLOUDS BANK (Dispersing Left) ================= */}
          <motion.div
            initial={{ x: '0%', opacity: 1 }}
            animate={{ x: '-135%', opacity: [1, 1, 0.9, 0] }}
            transition={{ duration: 2.1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 bottom-0 left-0 w-[65vw] sm:w-[60vw] pointer-events-none z-10 flex flex-col justify-between"
          >
            {/* Top-Left Main Heavy Cumulus Cloud */}
            <div className="relative w-[120%] -left-[10%] -top-[10%]">
              <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-[10px_10px_30px_rgba(0,0,0,0.8)] fill-slate-100/95">
                <defs>
                  <linearGradient id="cloudGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.98" />
                    <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M100,350 Q120,220 250,220 Q320,120 450,160 Q560,80 660,180 Q780,190 760,330 Q820,440 700,500 Q620,580 480,550 Q360,600 220,540 Q100,520 80,420 Z"
                  fill="url(#cloudGradLeft)"
                />
              </svg>
            </div>

            {/* Mid-Left Billowing Cloud Puff */}
            <div className="relative w-[130%] -left-[15%] -my-[15%] opacity-90">
              <svg viewBox="0 0 700 500" className="w-full h-auto drop-shadow-[8px_8px_25px_rgba(0,0,0,0.7)]">
                <path
                  d="M50,250 Q80,140 190,140 Q260,60 370,90 Q460,30 550,110 Q640,120 630,230 Q680,320 590,370 Q520,440 400,410 Q300,450 180,410 Q80,390 50,300 Z"
                  fill="#f8fafc"
                />
              </svg>
            </div>

            {/* Bottom-Left Heavy Cloud Bank */}
            <div className="relative w-[140%] -left-[20%] -bottom-[10%]">
              <svg viewBox="0 0 850 650" className="w-full h-auto drop-shadow-[15px_15px_35px_rgba(0,0,0,0.85)] fill-slate-200">
                <path
                  d="M120,380 Q140,240 280,240 Q350,140 490,180 Q610,90 720,200 Q840,210 820,360 Q880,480 760,540 Q670,630 520,600 Q390,650 240,590 Q120,560 90,450 Z"
                  fill="url(#cloudGradLeft)"
                />
              </svg>
            </div>
          </motion.div>

          {/* ================= RIGHT CLOUDS BANK (Dispersing Right) ================= */}
          <motion.div
            initial={{ x: '0%', opacity: 1 }}
            animate={{ x: '135%', opacity: [1, 1, 0.9, 0] }}
            transition={{ duration: 2.1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-0 bottom-0 right-0 w-[65vw] sm:w-[60vw] pointer-events-none z-10 flex flex-col justify-between"
          >
            {/* Top-Right Main Heavy Cumulus Cloud */}
            <div className="relative w-[120%] -right-[10%] -top-[10%] scale-x-[-1]">
              <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-[-10px_10px_30px_rgba(0,0,0,0.8)]">
                <defs>
                  <linearGradient id="cloudGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.98" />
                    <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M100,350 Q120,220 250,220 Q320,120 450,160 Q560,80 660,180 Q780,190 760,330 Q820,440 700,500 Q620,580 480,550 Q360,600 220,540 Q100,520 80,420 Z"
                  fill="url(#cloudGradRight)"
                />
              </svg>
            </div>

            {/* Mid-Right Billowing Cloud Puff */}
            <div className="relative w-[130%] -right-[15%] -my-[15%] opacity-90 scale-x-[-1]">
              <svg viewBox="0 0 700 500" className="w-full h-auto drop-shadow-[-8px_8px_25px_rgba(0,0,0,0.7)]">
                <path
                  d="M50,250 Q80,140 190,140 Q260,60 370,90 Q460,30 550,110 Q640,120 630,230 Q680,320 590,370 Q520,440 400,410 Q300,450 180,410 Q80,390 50,300 Z"
                  fill="#f8fafc"
                />
              </svg>
            </div>

            {/* Bottom-Right Heavy Cloud Bank */}
            <div className="relative w-[140%] -right-[20%] -bottom-[10%] scale-x-[-1]">
              <svg viewBox="0 0 850 650" className="w-full h-auto drop-shadow-[-15px_15px_35px_rgba(0,0,0,0.85)]">
                <path
                  d="M120,380 Q140,240 280,240 Q350,140 490,180 Q610,90 720,200 Q840,210 820,360 Q880,480 760,540 Q670,630 520,600 Q390,650 240,590 Q120,560 90,450 Z"
                  fill="url(#cloudGradRight)"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
