import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Wrench, QrCode, Edit3, Eye, Check, RefreshCw, Zap } from 'lucide-react';
import { QuestAssetData } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface GameMasterDevDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  onSelectPage: (pageNum: number) => void;
  allQuestData: Record<number, QuestAssetData>;
  onUpdateAssetOverride: (pageNum: number, field: keyof QuestAssetData, value: string) => void;
  onReopenWelcome?: () => void;
}

export const GameMasterDevDrawer: React.FC<GameMasterDevDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onSelectPage,
  allQuestData,
  onUpdateAssetOverride,
  onReopenWelcome
}) => {
  const [selectedInspectPage, setSelectedInspectPage] = useState<number>(4);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeQuest = allQuestData[selectedInspectPage] || allQuestData[1];
  const page4QrCodeKey = allQuestData[4]?.qrCodeKey || 'PIRATE_QR_TORTUGA_TREASURE_77291';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-t-4 border-amber-400 rounded-t-2xl shadow-2xl p-4 max-h-[85vh] flex flex-col space-y-4">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-pixel text-xs">
            <Wrench className="w-4 h-4" />
            <span>GAME MASTER & DEV ASSET TOOLS</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Page Jump Buttons */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-pixel text-slate-400">JUMP TO QUEST PAGE:</span>
            {onReopenWelcome && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                  onReopenWelcome();
                }}
                className="text-[9px] font-pixel text-amber-400 hover:text-amber-300 underline flex items-center gap-1 active:scale-95"
              >
                <span>REPLAY CLOUD TRANSITION</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectPage(num);
                }}
                className={`py-2 rounded font-pixel text-[11px] border transition-all ${
                  currentPage === num
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-200'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                P{num}
              </button>
            ))}
          </div>
        </div>

        {/* Inspect Asset Subfolder Selector */}
        <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 text-xs font-silkscreen">
          <span className="text-slate-400">INSPECT ASSETS FOLDER:</span>
          <select
            value={selectedInspectPage}
            onChange={(e) => setSelectedInspectPage(Number(e.target.value))}
            className="bg-slate-900 text-amber-300 border border-slate-700 rounded px-2 py-1 focus:outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <option key={p} value={p}>
                /assets/page{p}/
              </option>
            ))}
          </select>
        </div>

        {/* Page 4 QR Code Print Helper Button */}
        <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-500/40 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-pixel text-[11px] text-amber-300">QUEST 04 PRINTABLE QR CODE</h4>
            <p className="font-silkscreen text-[10px] text-slate-300">Display QR code to test camera scan</p>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              setShowQRModal(true);
            }}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-pixel text-[10px] rounded flex items-center gap-1 active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5" />
            SHOW QR
          </button>
        </div>

        {/* Editable Asset Fields for Selected Subfolder */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-slate-200">
          <div className="flex items-center gap-1 text-[10px] font-pixel text-slate-400">
            <Edit3 className="w-3.5 h-3.5" />
            <span>EDIT FILE ASSETS FOR /assets/page{selectedInspectPage}/</span>
          </div>

          <div className="space-y-2 font-silkscreen text-xs">
            <div>
              <label className="text-[10px] text-amber-400 block mb-1">location.txt</label>
              <input
                type="text"
                value={activeQuest.location}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'location', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-amber-400 block mb-1">instruction.txt</label>
              <textarea
                value={activeQuest.instruction}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'instruction', e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-amber-400 block mb-1">clue.txt</label>
              <textarea
                value={activeQuest.clue}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'clue', e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-amber-400 block mb-1">quiz.txt</label>
              <input
                type="text"
                value={activeQuest.quiz}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'quiz', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-amber-400 block mb-1">answer.txt (Case-insensitive)</label>
              <input
                type="text"
                value={activeQuest.answer}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'answer', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            {selectedInspectPage === 4 && (
              <div>
                <label className="text-[10px] text-amber-400 block mb-1">qr_code_key.txt</label>
                <input
                  type="text"
                  value={activeQuest.qrCodeKey || 'PIRATE_QR_TORTUGA_TREASURE_77291'}
                  onChange={(e) => onUpdateAssetOverride(4, 'qrCodeKey', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-amber-300 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            )}

            <div>
              <label className="text-[10px] text-amber-400 block mb-1">reward.txt</label>
              <textarea
                value={activeQuest.reward}
                onChange={(e) => onUpdateAssetOverride(selectedInspectPage, 'reward', e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-pixel text-xs rounded font-bold"
          >
            APPLY & CLOSE
          </button>
        </div>

      </div>

      {/* Printable / Displayable QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          <div className="w-full max-w-xs bg-slate-900 border-4 border-amber-400 rounded-xl p-5 flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-pixel text-xs text-amber-300">QUEST 04 QR MARKER</span>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border-4 border-slate-950 shadow-2xl flex items-center justify-center">
              <QRCodeCanvas
                value={page4QrCodeKey}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="H"
              />
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300 font-silkscreen text-[11px] w-full text-center">
              <span className="text-slate-500 block text-[9px]">ENCODED KEY:</span>
              <span className="text-amber-300 font-mono text-[10px]">{page4QrCodeKey}</span>
            </div>

            <p className="font-silkscreen text-[10px] text-slate-400">
              Point your phone or secondary camera at this screen while on Quest 4 to scan it!
            </p>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2 bg-amber-400 text-slate-950 font-pixel text-xs rounded"
            >
              CLOSE QR PREVIEW
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
