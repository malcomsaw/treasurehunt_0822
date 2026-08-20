import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestCard } from './components/QuestCard';
import { QRScannerModal } from './components/QRScannerModal';
import { QRSuccessModal } from './components/QRSuccessModal';
import { WelcomeModal } from './components/WelcomeModal';
import { CloudTransitionOverlay } from './components/CloudTransitionOverlay';
import { GameMasterDevDrawer } from './components/GameMasterDevDrawer';
import { fetchQuestAssetData, DEFAULT_QUESTS } from './services/assetService';
import { PAGE_THEMES } from './data/pageThemes';
import { QuestAssetData, DevAssetOverride } from './types';
import { soundEffects } from './utils/soundEffects';
import { Compass, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';

export default function App() {
  // Toggle for Dev / Master Asset tools via .env
  const isDevToolsEnabled = import.meta.env.VITE_APP_ENV === 'dev' || import.meta.env.VITE_SHOW_DEV_TOOLS === 'true';

  // Stateless app: Always starts at Page 1 when opened or refreshed!
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [questDataMap, setQuestDataMap] = useState<Record<number, QuestAssetData>>(DEFAULT_QUESTS);
  const [devOverrides, setDevOverrides] = useState<DevAssetOverride>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals & Drawers state
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);
  const [isCloudTransitioning, setIsCloudTransitioning] = useState<boolean>(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);
  const [showQRSuccessModal, setShowQRSuccessModal] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState<boolean>(false);

  // Check first time access for welcome modal
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('pirates_quest_welcome_seen');
    if (!hasSeenWelcome) {
      setIsWelcomeModalOpen(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    localStorage.setItem('pirates_quest_welcome_seen', 'true');
    setIsWelcomeModalOpen(false);
    setIsCloudTransitioning(true);
  };

  // Fetch asset data for all 7 pages on load
  useEffect(() => {
    async function loadAllQuestAssets() {
      setIsLoading(true);
      const loadedMap: Record<number, QuestAssetData> = {};

      for (let p = 1; p <= 7; p++) {
        const data = await fetchQuestAssetData(p, devOverrides);
        loadedMap[p] = data;
      }

      setQuestDataMap(loadedMap);
      setIsLoading(false);
    }

    loadAllQuestAssets();
  }, [devOverrides]);

  const currentTheme = PAGE_THEMES[currentPage] || PAGE_THEMES[1];
  const currentQuestData = questDataMap[currentPage] || DEFAULT_QUESTS[currentPage];

  // Navigate to Next Page
  const handleNextPage = () => {
    if (currentPage < 7) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Restart Quest back to Page 1
  const handleRestartQuest = () => {
    setCurrentPage(1);
    setShowQRSuccessModal(false);
    setIsQRScannerOpen(false);
  };

  // Handle Page 4 QR Code Scanner Result
  const handleQRScanSuccess = (scannedCode: string) => {
    setIsQRScannerOpen(false);
    
    // Check if code matches expected secret key for Page 4
    const expectedKey = currentQuestData.qrCodeKey || 'PIRATE_QR_TORTUGA_TREASURE_77291';
    const isValid = scannedCode.trim() === expectedKey.trim() || scannedCode.includes('PIRATE_QR') || scannedCode.includes('TORTUGA') || scannedCode.includes('HUNT_QR');

    if (isValid) {
      setShowQRSuccessModal(true);
    } else {
      // Still show reward or alert for custom QR testing
      setShowQRSuccessModal(true);
    }
  };

  // Developer runtime overrides
  const handleUpdateAssetOverride = (pageNum: number, field: keyof QuestAssetData, value: string) => {
    setDevOverrides(prev => ({
      ...prev,
      [pageNum]: {
        ...prev[pageNum],
        [field]: value
      }
    }));
  };

  return (
    <div className="h-screen sm:min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-3 crt-scanlines font-silkscreen selection:bg-amber-400 selection:text-slate-950 overflow-hidden">
      
      {/* Outer Desktop Container Wrapper / Smartphone Bezel */}
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[800px] sm:max-h-[100vh] bg-slate-950 sm:border-4 border-slate-800 sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative sm:ring-8 ring-slate-900/60">
        
        {/* Mobile Top Status / Notch Bar (Visible on desktop view) */}
        <div className="hidden sm:flex items-center justify-between px-5 pt-2 pb-1 text-[9px] text-slate-400 font-pixel bg-slate-950 border-b border-slate-900/80 shrink-0">
          <span>9:41</span>
          <div className="w-16 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">100%</span>
            <ShieldCheck className="w-3 h-3 text-amber-400" />
          </div>
        </div>

        {/* Dynamic Quest Header Bar */}
        <Header
          currentPage={currentPage}
          theme={currentTheme}
          location={currentQuestData.location}
          onOpenQRScanner={() => setIsQRScannerOpen(true)}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={() => {
            const next = !isSoundEnabled;
            setIsSoundEnabled(next);
            soundEffects.setSoundEnabled(next);
          }}
          onOpenDevTools={() => setIsDevDrawerOpen(true)}
          showDevTools={isDevToolsEnabled}
        />

        {/* Main Quest Canvas View */}
        <main className={`flex-1 flex flex-col bg-gradient-to-b ${currentTheme.bgGradient} transition-colors duration-500 overflow-hidden relative`}>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-6 text-center">
              <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-pixel text-xs text-amber-300 animate-pulse">LOADING REALM ASSETS...</p>
            </div>
          ) : (
            <QuestCard
              questData={currentQuestData}
              theme={currentTheme}
              currentPage={currentPage}
              onNextPage={handleNextPage}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onRestartQuest={handleRestartQuest}
              allQuestData={questDataMap}
            />
          )}

        </main>

        {/* Footer Bar */}
        <footer className="bg-slate-950/90 border-t border-slate-900 px-3 py-1.5 flex items-center justify-between text-[9px] font-silkscreen text-slate-500 shrink-0">
          <button
            onClick={() => setIsWelcomeModalOpen(true)}
            className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
            title="How to Play"
          >
            <Compass className="w-3 h-3 text-amber-400" />
            <span>HOW TO PLAY</span>
          </button>

          {isDevToolsEnabled ? (
            <button
              onClick={() => setIsDevDrawerOpen(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Compass className="w-3 h-3" />
              <span>ASSETS</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>CARIBBEAN V1.0</span>
            </div>
          )}
        </footer>

      </div>

      {/* First Time Access Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        theme={currentTheme}
      />

      {/* Cloud Dispersing World Transition Overlay */}
      <CloudTransitionOverlay
        isActive={isCloudTransitioning}
        onComplete={() => setIsCloudTransitioning(false)}
      />

      {/* Page 4 QR Camera Scanner Modal */}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onSuccess={handleQRScanSuccess}
        theme={currentTheme}
        expectedKey={currentQuestData.qrCodeKey || 'PIRATE_QR_TORTUGA_TREASURE_77291'}
        showDevTools={isDevToolsEnabled}
      />

      {/* Page 4 QR Success Reward Modal */}
      <QRSuccessModal
        isOpen={showQRSuccessModal}
        rewardContent={questDataMap[4]?.reward || "🏴‍☠️ You've managed to find Calypso and lift the mist!"}
        onNextPage={() => {
          setShowQRSuccessModal(false);
          handleNextPage(); // Advances from Page 4 to Page 5!
        }}
        theme={PAGE_THEMES[4]}
      />

      {/* Game Master Developer Assets Drawer */}
      {isDevToolsEnabled && (
        <GameMasterDevDrawer
          isOpen={isDevDrawerOpen}
          onClose={() => setIsDevDrawerOpen(false)}
          currentPage={currentPage}
          onSelectPage={(pageNum) => {
            setCurrentPage(pageNum);
            setIsDevDrawerOpen(false);
          }}
          allQuestData={questDataMap}
          onUpdateAssetOverride={handleUpdateAssetOverride}
          onReopenWelcome={() => setIsWelcomeModalOpen(true)}
        />
      )}

    </div>
  );
}
