import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Gift, 
  ArrowRight, 
  Camera, 
  Scroll, 
  Trophy,
  RotateCcw
} from 'lucide-react';
import { QuestAssetData, QuestPageTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { resolveImageUrl } from '../utils/assetResolver';
import { IslandProgressMap } from './IslandProgressMap';

interface QuestCardProps {
  questData: QuestAssetData;
  theme: QuestPageTheme;
  currentPage: number;
  onNextPage: () => void;
  onOpenQRScanner: () => void;
  onRestartQuest: () => void;
  allQuestData?: Record<number, QuestAssetData>;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  questData,
  theme,
  currentPage,
  onNextPage,
  onOpenQRScanner,
  onRestartQuest,
  allQuestData
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showReward, setShowReward] = useState<boolean>(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const isPage4 = currentPage === 4;
  const isPage7 = currentPage === 7;

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollableRef.current) {
        scrollableRef.current.scrollTo({
          top: scrollableRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  // Reset page state whenever questData changes or page changes
  useEffect(() => {
    setUserAnswer('');
    setIsCorrect(false);
    setErrorMessage(null);
    setShowReward(false);
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = 0;
    }
  }, [currentPage, questData]);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    soundEffects.playClick();

    const normalizedInput = userAnswer.trim().toLowerCase();
    const normalizedExpected = questData.answer.trim().toLowerCase();

    if (normalizedInput === normalizedExpected) {
      setIsCorrect(true);
      setErrorMessage(null);
      setShowReward(true);
      soundEffects.playSuccess();
      scrollToBottom();

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Ignore canvas error
      }
    } else {
      setIsCorrect(false);
      setErrorMessage('❌ Incorrect answer! Re-read the clue carefully.');
      soundEffects.playError();
      scrollToBottom();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3.5 max-w-md mx-auto w-full h-full overflow-hidden space-y-2">
      
      {/* Fixed Top Banner: Location Name */}
      <div className={`shrink-0 p-2.5 sm:p-3 rounded-xl border-2 ${theme.cardBg} ${theme.borderColor} ${theme.pixelBoxClass} backdrop-blur-sm shadow-xl space-y-0.5`}>
        <div className="flex items-center gap-1.5 text-[11px] font-pixel text-amber-400">
          <MapPin className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>NEXT LOCATION</span>
        </div>
        <h2 className="font-pixel text-xs sm:text-sm text-slate-100 tracking-wide">
          {questData.location}
        </h2>
      </div>

      {/* Main Scrollable Content Area: Square Image, Captain's Log Instruction & Quiz */}
      <div ref={scrollableRef} className="flex-1 overflow-y-auto min-h-0 space-y-2.5 pr-1">
        
        <div className={`p-3 sm:p-4 rounded-xl border-2 ${theme.cardBg} ${theme.borderColor} ${theme.pixelBoxClass} backdrop-blur-sm shadow-xl space-y-3`}>
          
          {/* Picture & Instruction Grid */}
          <div className="flex flex-row items-center gap-3">
            
            {/* Square Picture (~90x90 pixels) */}
            <div className="relative shrink-0">
              <div className={`w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-lg border-2 ${theme.borderColor} bg-slate-950 overflow-hidden shadow-inner flex items-center justify-center p-1`}>
                <img
                  src={resolveImageUrl(questData.pictureUrl)}
                  alt={questData.location}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded bg-slate-900 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    // Fallback pixel graphic if image load fails
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/pixel${currentPage}/100/100`;
                  }}
                />
              </div>
              {/* Corner pixel accent */}
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 border border-slate-950 rounded-xs"></span>
            </div>

            {/* Instruction Box */}
            <div className="flex-1 bg-slate-950/80 p-2.5 sm:p-3 rounded-lg border border-slate-800 space-y-1 min-h-[90px] flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[10px] font-pixel text-amber-300">
                <Scroll className="w-3.5 h-3.5 text-amber-400" />
                <span>CAPTAIN'S LOG</span>
              </div>
              <p className="font-silkscreen text-[11px] text-slate-200 leading-relaxed whitespace-pre-line">
                {questData.instruction}
              </p>
            </div>
          </div>

          {/* Quiz & Input Section */}
          {!isPage4 ? (
            /* Standard Quiz Pages (Pages 1, 2, 3, 5, 6, 7) */
            <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-pixel text-amber-300">
                  Cryptic Clue:
                </label>
                <p className="font-silkscreen text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {questData.quiz}
                </p>
              </div>

              <form onSubmit={handleAnswerSubmit} className="space-y-1.5 pt-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    disabled={isCorrect}
                    placeholder="Enter your answer..."
                    className="flex-1 bg-slate-950 border-2 border-slate-700 text-slate-100 text-xs sm:text-sm px-2.5 py-2 rounded-lg font-retro text-base sm:text-lg focus:outline-none focus:border-amber-400 disabled:opacity-70 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isCorrect || !userAnswer.trim()}
                    className={`px-3 py-2 font-pixel text-[10px] rounded-lg border-2 border-amber-300 transition-all shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-600 text-white cursor-default'
                        : `${theme.btnPrimary} active:scale-95 disabled:opacity-50`
                    }`}
                  >
                    {isCorrect ? 'AHY! SOLVED!' : 'CHECK CODE'}
                  </button>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 text-[11px] font-silkscreen text-red-400 bg-red-950/80 border border-red-500/50 p-1.5 rounded">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>

              {/* Revealed Reward Box upon answering correctly */}
              {showReward && (
                <div className="bg-emerald-950/90 border-2 border-emerald-500 rounded-lg p-2 sm:p-2.5 space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-[11px] font-pixel text-emerald-300">
                    <Gift className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    <span>PIRATE TREASURE UNLOCKED!</span>
                  </div>
                  <p className="font-retro text-sm sm:text-base text-emerald-100 leading-snug whitespace-pre-line">
                    {questData.reward}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Page 4: QR Code Camera Scanner Focus Page */
            <div className="space-y-2.5 pt-1 border-t border-slate-800 text-center">
              <div className="bg-amber-950/60 border-2 border-amber-500/60 p-3 rounded-xl space-y-2">
                <div className="inline-flex p-2 rounded-full bg-amber-400 text-slate-950 font-bold animate-pulse">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-pixel text-[11px] text-amber-300">
                    SPYGLASS SCANNER REQUIRED
                  </h3>
                  <p className="font-silkscreen text-[10px] text-amber-100/90 leading-tight">
                    Look at the top-right spyglass camera icon! Tap it to open the camera scanner and scan the Tortuga tavern QR code.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenQRScanner}
                  className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-pixel text-[11px] rounded-lg border-2 border-amber-200 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>OPEN SPYGLASS SCANNER</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Fixed Bottom Container: Map & Next Isle Navigation */}
      <div className="shrink-0 space-y-2 pt-1 border-t border-slate-900/60">
        
        {/* Caribbean Voyage Island Progress Map */}
        <IslandProgressMap currentPage={currentPage} allQuestData={allQuestData} />

        {/* Bottom Navigation Area */}
        <div className="flex items-center justify-between min-h-[38px]">
          
          {/* Restart / Reset Option on Page 7 */}
          {isPage7 && isCorrect && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onRestartQuest();
              }}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-pixel text-[10px] rounded-lg border border-slate-600 flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESTART HUNT</span>
            </button>
          )}

          {/* Page 1 to 3 & Page 5 to 6 NEXT BUTTON at BOTTOM RIGHT */}
          {!isPage4 && !isPage7 && (
            <div className="ml-auto">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onNextPage();
                }}
                disabled={!isCorrect}
                title={isCorrect ? "Proceed to Next Quest" : "Answer the clue correctly to unlock the Next Page"}
                className={`py-2 px-3.5 rounded-xl font-pixel text-[11px] sm:text-xs flex items-center gap-2 border-2 transition-all ${
                  isCorrect
                    ? `${theme.btnPrimary} border-amber-300 shadow-lg cursor-pointer active:scale-95 animate-pulse`
                    : 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                <span>SAIL TO NEXT ISLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Page 7 Final Triumph Badge */}
          {isPage7 && isCorrect && (
            <div className="ml-auto flex items-center gap-1.5 text-xs font-pixel text-amber-300 bg-amber-950/80 border border-amber-400/60 px-3 py-1.5 rounded-lg">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>QUEST COMPLETED!</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
