import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, Gift } from 'lucide-react';
import { QuestPageTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface QRSuccessModalProps {
  isOpen: boolean;
  rewardContent: string;
  onNextPage: () => void;
  theme: QuestPageTheme;
}

export const QRSuccessModal: React.FC<QRSuccessModalProps> = ({
  isOpen,
  rewardContent,
  onNextPage,
  theme
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEffects.playVictory();
      
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore if canvas confetti isn't ready
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextClick = () => {
    soundEffects.playClick();
    onNextPage();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-sm rounded-2xl bg-slate-900 border-4 border-amber-400 ${theme.pixelBoxClass} shadow-2xl p-5 flex flex-col items-center text-center space-y-4 animate-scaleUp`}>
        
        {/* Animated Trophy Header Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/50 animate-bounce">
            <Trophy className="w-9 h-9 fill-slate-950" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" />
        </div>

        {/* Modal Title matching exact prompt requirement */}
        <div className="space-y-1">
          <h2 className="font-pixel text-base text-amber-300 tracking-wide">
            YOU FOUND ME!
          </h2>
          <p className="font-silkscreen text-xs text-amber-100/90">
            And here is your reward:
          </p>
        </div>

        {/* Reward Content Box */}
        <div className="w-full bg-slate-950/90 border-2 border-amber-500/50 rounded-xl p-4 shadow-inner text-amber-200 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-pixel border-b border-amber-500/30 pb-2">
            <Gift className="w-4 h-4" />
            <span>TORTUGA REWARD UNLOCKED</span>
          </div>
          <p className="font-retro text-lg leading-relaxed text-slate-100 font-semibold tracking-wide">
            {rewardContent || "🏴‍☠️ Tortuga Pirate Council Seal — You found me, matey! The secret tavern code is verified!"}
          </p>
        </div>

        {/* Next Button at Bottom Center of Modal Window leading to Page 5 */}
        <div className="pt-2 w-full flex justify-center">
          <button
            onClick={handleNextClick}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-pixel text-xs tracking-wider rounded-xl border-2 border-amber-200 shadow-xl shadow-amber-500/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>NEXT PIRATE QUEST (QUEST 05)</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
        </div>

      </div>
    </div>
  );
};
