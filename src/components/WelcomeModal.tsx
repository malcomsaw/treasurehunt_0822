import React, { useEffect, useState } from 'react';
import { Compass, Scroll, MapPin, Camera, Volume2, Check, Sparkles } from 'lucide-react';
import { QuestPageTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: QuestPageTheme;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [captainName, setCaptainName] = useState<string>('Captain Jac Sparrow');

  useEffect(() => {
    async function loadCaptainName() {
      try {
        const res = await fetch('/assets/header/header_cap_name.txt');
        if (res.ok) {
          const text = await res.text();
          if (text.trim()) {
            setCaptainName(text.trim());
          }
        }
      } catch (e) {
        console.warn('Could not load captain name for welcome modal:', e);
      }
    }

    if (isOpen) {
      loadCaptainName();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    soundEffects.playPortalTransition();
    soundEffects.startBGM();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-sm sm:max-w-md rounded-2xl bg-slate-900 border-4 border-amber-400 shadow-2xl p-4 sm:p-5 flex flex-col items-center text-center space-y-3 sm:space-y-4 animate-scaleUp max-h-[92vh] overflow-y-auto ${theme?.pixelBoxClass || ''}`}>
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center space-y-1">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-200 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/40">
              <Compass className="w-8 h-8 sm:w-9 sm:h-9 text-slate-950 animate-spin-slow" />
            </div>
            <Sparkles className="absolute -top-1.5 -right-1.5 w-5 h-5 text-amber-300 animate-pulse" />
          </div>

          <h2 className="font-pixel text-sm sm:text-base text-amber-300 tracking-wide mt-2">
            WELCOME {captainName.toUpperCase()}!
          </h2>
          <p className="font-silkscreen text-[10px] sm:text-xs text-amber-100/90">
            Ahoy, matey! Prepare yourself for the Caribbean Quest Voyage for your ultimate present.
          </p>
        </div>

        {/* Instructions Box */}
        <div className="w-full bg-slate-950/90 border-2 border-amber-500/50 rounded-xl p-3 sm:p-4 shadow-inner text-left space-y-2.5 text-slate-200">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-pixel border-b border-amber-500/30 pb-1.5">
            <Scroll className="w-4 h-4 text-amber-400 shrink-0" />
            <span>HOW TO PLAY & NAVIGATE</span>
          </div>

          <ul className="space-y-2 font-retro text-xs sm:text-sm text-slate-200 leading-snug">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">1.</span>
              <div>
                <strong className="text-amber-300 font-pixel text-[10px]">READ THE CLUES:</strong>
                <p className="text-slate-300">Check the Captain's Log and location clues on each island page.</p>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">2.</span>
              <div>
                <strong className="text-amber-300 font-pixel text-[10px]">SOLVE THE QUIZ:</strong>
                <p className="text-slate-300">Enter the correct pirate answer to unlock the treasure and enable the Next Page button.</p>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">3.</span>
              <div>
                <strong className="text-amber-300 font-pixel text-[10px]">SPYGLASS SCANNER:</strong>
                <p className="text-slate-300">Tap the camera icon in the top header to scan the QR code whenever the quest requires!.</p>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">4.</span>
              <div>
                <strong className="text-amber-300 font-pixel text-[10px]">CARIBBEAN VOYAGE MAP:</strong>
                <p className="text-slate-300">Track Captain's vessel across all 7 locations on the map at the bottom.</p>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">5.</span>
              <div>
                <strong className="text-amber-300 font-pixel text-[10px]">SOUND CONTROLS:</strong>
                <p className="text-slate-300">Toggle retro sea sound effects using the speaker icon in the header.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* OK Button at Middle Bottom */}
        <div className="pt-1 w-full flex justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-3/4 py-2.5 sm:py-3 px-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-pixel text-xs tracking-wider rounded-xl border-2 border-amber-200 shadow-xl shadow-amber-500/40 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer font-bold"
          >
            <Check className="w-4 h-4 font-bold" />
            <span>OK, LET'S SAIL!</span>
          </button>
        </div>

      </div>
    </div>
  );
};
