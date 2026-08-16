import React from 'react';
import { QuestAssetData } from '../types';
import { DEFAULT_QUESTS } from '../services/assetService';

interface IslandProgressMapProps {
  currentPage: number;
  allQuestData?: Record<number, QuestAssetData>;
}

const ISLAND_IMAGES: Record<number, string> = {
  1: '/src/assets/images/pirate_page1_unknown.jpg',
  2: '/src/assets/images/pirate_page2_smugglerscove_1786544323333.jpg',
  3: '/src/assets/images/pirate_page3_shipdeck_1786544339973.jpg',
  4: '/src/assets/images/pirate_page4_tortugabar_1786544358097.jpg',
  5: '/src/assets/images/pirate_page5_piratecourt_1786544370604.jpg',
  6: '/src/assets/images/pirate_page6_skullrock_1786544387275.jpg',
  7: '/src/assets/images/pirate_page7_treasuresunken_1786544400315.jpg',
};

const PIRATE_AVATAR = '/src/assets/images/jacsparrow_1786546631506.jpg';

// SVG curve points in viewBox 0 0 320 54
const POINT_COORDS = [
  { x: 22, y: 27 },
  { x: 68, y: 16 },
  { x: 114, y: 34 },
  { x: 160, y: 18 },
  { x: 206, y: 34 },
  { x: 252, y: 18 },
  { x: 298, y: 28 },
];

export const IslandProgressMap: React.FC<IslandProgressMapProps> = ({ currentPage, allQuestData }) => {
  const getIslandName = (pageNum: number): string => {
    const loc = allQuestData?.[pageNum]?.location || DEFAULT_QUESTS[pageNum]?.location;
    if (!loc) return `Isle ${pageNum}`;
    // Extract main island location before any sub-location hyphen
    const shortName = loc.split('-')[0].trim();
    return shortName || loc;
  };

  return (
    <div className="w-full bg-slate-950/90 border-2 border-amber-900/60 rounded-xl p-2.5 shadow-2xl relative overflow-hidden my-1">
      {/* Map Title Header */}
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-1.5 text-[10px] font-pixel text-amber-400">
          <span className="text-xs">🏴‍☠️</span>
          <span className="tracking-wider">CARIBBEAN VOYAGE MAP</span>
        </div>
        <span className="font-silkscreen text-[9px] text-amber-300/80">
          ISLE {currentPage} OF 7
        </span>
      </div>

      {/* Map Graphic Area */}
      <div className="relative w-full h-[56px] flex items-center justify-between">
        
        {/* Curvy Red Dotted Line SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 320 54"
          preserveAspectRatio="none"
        >
          <path
            d="M 22 27 Q 45 10, 68 16 T 114 34 T 160 18 T 206 34 T 252 18 T 298 28"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        </svg>

        {/* 7 Island Nodes */}
        <div className="relative w-full h-full z-10 flex items-center justify-between px-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => {
            const isCurrent = currentPage === num;
            const isVisited = currentPage > num;
            const isRevealed = num <= currentPage;
            const coords = POINT_COORDS[idx];
            const rawIslandName = getIslandName(num);
            const displayedName = isRevealed ? rawIslandName : '???';
            const hoverTitle = isRevealed ? rawIslandName : `Isle ${num} - Uncharted (Reach here to reveal)`;

            return (
              <div
                key={num}
                className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${(coords.x / 320) * 100}%`,
                  top: `${(coords.y / 54) * 100}%`,
                }}
              >
                {/* Island Wrapper Container */}
                <div className="relative flex items-center justify-center">
                  
                  {/* Pirate Avatar Image BEHIND the Island (so little island is visible) */}
                  {isCurrent && (
                    <div 
                      className="absolute -top-3.5 -left-3 z-0 w-7 h-7 rounded-full border-2 border-amber-400 shadow-md shadow-amber-500/50 overflow-hidden bg-slate-900 animate-bounce"
                      title="Captain Jack Sparrow"
                    >
                      <img
                        src={PIRATE_AVATAR}
                        alt="Jack Sparrow Pirate"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Island Thumbnail Circle (In Front in z-10) */}
                  <div
                    className={`relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 overflow-hidden bg-slate-900 transition-all duration-300 flex items-center justify-center ${
                      isCurrent
                        ? 'border-amber-400 ring-2 ring-amber-400/80 shadow-lg shadow-amber-500/40 scale-110'
                        : isVisited
                        ? 'border-emerald-400 opacity-90'
                        : 'border-slate-700 opacity-60 grayscale'
                    }`}
                  >
                    <img
                      src={ISLAND_IMAGES[num]}
                      alt={displayedName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Number Badge */}
                  <span
                    className={`absolute -bottom-1 -right-1 z-20 font-pixel text-[7px] w-3 h-3 rounded-full flex items-center justify-center border ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 font-bold border-slate-950'
                        : isVisited
                        ? 'bg-emerald-500 text-white border-slate-950'
                        : 'bg-slate-800 text-slate-400 border-slate-950'
                    }`}
                  >
                    {num}
                  </span>
                </div>

                {/* Island Label */}
                <span
                  title={hoverTitle}
                  className={`mt-0.5 font-pixel text-[7px] truncate max-w-[42px] text-center leading-none ${
                    isCurrent
                      ? 'text-amber-300 font-bold'
                      : isVisited
                      ? 'text-emerald-400/80'
                      : 'text-slate-500'
                  }`}
                >
                  {displayedName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

