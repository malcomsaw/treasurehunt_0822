import React from 'react';
import { Camera, Lock, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { QuestPageTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';
import playerName from '/assets/header/header_cap_name.txt';
import playerAvatar from '../assets/images/jacsparrow_1786546631506.jpg';

interface HeaderProps {
  currentPage: number;
  theme: QuestPageTheme;
  location: string;
  onOpenQRScanner: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenDevTools: () => void;
  showDevTools?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  theme,
  location,
  onOpenQRScanner,
  isSoundEnabled,
  onToggleSound,
  onOpenDevTools,
  showDevTools = false
}) => {
  const isPage4 = currentPage === 4;
  const [capName, setCapName] = React.useState<string>('Captain Jack Sparrow');

  React.useEffect(() => {
    const loadCapName = async () => {
      try {
        let res = await fetch(playerName);
     
        if (res.ok) {
          const text = await res.text();
          if (text.trim()) {
            setCapName(text.trim());
          }
        }
      } catch (e) {
        console.warn('Could not load header_cap_name:', e);
      }
    };
    loadCapName();
  }, []);

  const handleCameraClick = () => {
    soundEffects.playClick();
    if (isPage4) {
      onOpenQRScanner();
    }
  };

  return (
    <header className={`sticky top-0 z-30 px-3 py-2.5 transition-all duration-300 ${theme.headerBg} backdrop-blur-md border-b-2 shadow-lg`}>
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Square Profile Picture & Captain Name */}
        <div className="flex items-center gap-2.5">
          {showDevTools && (
            <button 
              onClick={onOpenDevTools}
              title="Game Master / Dev Tools"
              className="p-1.5 rounded bg-slate-900/80 border border-slate-700/60 text-amber-400 hover:text-amber-300 active:scale-95 transition-transform shrink-0"
            >
              <Compass className="w-4 h-4" />
            </button>
          )}

          {/* Square Profile Image of Jack Sparrow */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-amber-400 bg-slate-950 overflow-hidden shadow-md flex items-center justify-center">
              <img
                src={playerAvatar}
                alt="Captain Jack Sparrow"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-slate-950 rounded-full" title="Active Captain"></span>
          </div>

          {/* Captain Name from header_cap_name */}
          <div className="flex flex-col justify-center">
            <span className="font-pixel text-[8px] tracking-widest text-amber-400/80 uppercase">
              PIRATE CAPTAIN
            </span>
            <h1 className="font-pixel text-xs sm:text-sm text-slate-100 font-bold tracking-wide truncate max-w-[130px] sm:max-w-[180px]">
              {capName}
            </h1>
          </div>
        </div>

        {/* Right Actions: Sound Toggle & Camera QR Scanner Button */}
        <div className="flex items-center gap-2">
          
          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            title={isSoundEnabled ? "Mute 8-Bit Audio" : "Enable 8-Bit Audio"}
            className="p-2 rounded bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white active:scale-95 transition-transform"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Top Right Camera Icon for QR Scanning */}
          <div className="relative group">
            <button
              onClick={handleCameraClick}
              disabled={!isPage4}
              title={isPage4 ? "Open QR Camera Scanner (Enabled for Quest 4)" : "Camera scanner disabled for this quest"}
              className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isPage4
                  ? `${theme.btnPrimary} animate-pixel-pulse border-2 border-amber-300 shadow-lg shadow-amber-500/40 cursor-pointer active:scale-90`
                  : 'bg-slate-900/60 border border-slate-800 text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <Camera className={`w-5 h-5 ${isPage4 ? 'text-slate-950 font-bold' : 'text-slate-600'}`} />
              
              {!isPage4 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-slate-500 border border-slate-700 rounded-full p-0.5">
                  <Lock className="w-2.5 h-2.5" />
                </span>
              )}

              {isPage4 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-0.5 animate-ping">
                  <Sparkles className="w-2.5 h-2.5" />
                </span>
              )}
            </button>

            {/* Tooltip on Hover/Tap */}
            <div className="absolute right-0 top-12 hidden group-hover:flex flex-col items-end pointer-events-none z-50">
              <div className="bg-slate-900 text-slate-200 font-silkscreen text-[10px] px-2.5 py-1.5 rounded border border-slate-700 shadow-xl whitespace-nowrap">
                {isPage4 ? '✨ QR SCANNER ENABLED!' : '🔒 QR Scanner Locked'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
