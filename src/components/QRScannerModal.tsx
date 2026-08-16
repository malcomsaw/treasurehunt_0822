import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, RefreshCw, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { QuestPageTheme } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (scannedCode: string) => void;
  theme: QuestPageTheme;
  expectedKey: string;
  showDevTools?: boolean;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  theme,
  expectedKey,
  showDevTools = false
}) => {
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [manualInput, setManualInput] = useState<string>('');
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qr-reader-container';

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      return;
    }

    // Initialize scanner
    const startCamera = async () => {
      setScannerError(null);
      setIsScanning(true);

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
          setCameras(devices);
          // Prefer back camera if available
          const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear'));
          const camId = backCamera ? backCamera.id : devices[0].id;
          setSelectedCameraId(camId);
          startScanningWithCamera(camId);
        } else {
          setScannerError('No camera devices detected on this system.');
          setIsScanning(false);
        }
      } catch (err) {
        console.warn('Camera access error:', err);
        setScannerError('Camera access denied or unavailable. You can use the manual test code input below.');
        setIsScanning(false);
      }
    };

    // Small delay to ensure container element is mounted
    const timer = setTimeout(() => {
      startCamera();
    }, 200);

    return () => {
      clearTimeout(timer);
      stopScanner();
    };
  }, [isOpen]);

  const startScanningWithCamera = async (cameraId: string) => {
    try {
      if (html5QrcodeRef.current) {
        await stopScanner();
      }

      const html5Qr = new Html5Qrcode(scannerContainerId);
      html5QrcodeRef.current = html5Qr;

      await html5Qr.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          handleDecodedCode(decodedText);
        },
        () => {
          // Ignore scanning frame ticks
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.warn('Failed to start camera feed:', err);
      setScannerError('Could not start camera feed. Please check camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrcodeRef.current) {
      try {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
        html5QrcodeRef.current.clear();
      } catch (err) {
        console.warn('Error stopping QR scanner:', err);
      }
      html5QrcodeRef.current = null;
    }
    setIsScanning(false);
  };

  const handleDecodedCode = (code: string) => {
    soundEffects.playQRScanSuccess();
    stopScanner();
    onSuccess(code);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    soundEffects.playClick();
    handleDecodedCode(manualInput.trim());
  };

  const handleSimulateScan = () => {
    soundEffects.playClick();
    handleDecodedCode(expectedKey);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-sm rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-400 ${theme.pixelBoxClass} shadow-2xl flex flex-col`}>
        
        {/* Header */}
        <div className="bg-amber-950/90 border-b border-amber-500/40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-amber-400 text-slate-950 font-bold animate-pulse">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-pixel text-[11px] text-amber-300">TORTUGA SPYGLASS SCANNER</h3>
              <p className="font-silkscreen text-[10px] text-amber-100/80">Align Pirate QR Code in Frame</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto text-slate-200">
          
          {/* Camera Selector if multiple cameras exist */}
          {cameras.length > 1 && (
            <div className="flex items-center justify-between text-[11px] font-silkscreen bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400">Camera:</span>
              <select
                value={selectedCameraId}
                onChange={(e) => {
                  setSelectedCameraId(e.target.value);
                  startScanningWithCamera(e.target.value);
                }}
                className="bg-slate-900 text-amber-300 border border-slate-700 rounded px-2 py-1 focus:outline-none"
              >
                {cameras.map(cam => (
                  <option key={cam.id} value={cam.id}>
                    {cam.label || `Camera ${cam.id.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Scanner Video Container */}
          <div className="relative bg-slate-950 rounded-lg border-2 border-slate-800 overflow-hidden min-h-[240px] flex items-center justify-center">
            
            <div id={scannerContainerId} className="w-full h-full text-slate-100" />

            {/* Corner Overlay Targets for Pixel Vibe */}
            <div className="absolute inset-4 pointer-events-none border-2 border-amber-400/60 rounded flex flex-col justify-between p-1">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-amber-400"></span>
                <span className="w-4 h-4 border-t-2 border-r-2 border-amber-400"></span>
              </div>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-amber-400"></span>
                <span className="w-4 h-4 border-b-2 border-r-2 border-amber-400"></span>
              </div>
            </div>

            {/* Error Message */}
            {scannerError && (
              <div className="absolute inset-0 bg-slate-950/95 p-4 flex flex-col items-center justify-center text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <p className="font-silkscreen text-xs text-slate-300">{scannerError}</p>
              </div>
            )}
          </div>

          <p className="font-silkscreen text-[11px] text-center text-amber-200/90 leading-tight">
            📷 Point your mobile camera at the Quest 04 physical QR marker!
          </p>

          {/* Quick Simulate / Test Scan Button for Dev/Testing */}
          {showDevTools && (
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-silkscreen text-slate-400">
                <span>SCANNER TEST HELPER</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>

              <button
                type="button"
                onClick={handleSimulateScan}
                className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-300 rounded font-pixel text-[10px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                SIMULATE PAGE 4 QR SCAN
              </button>

              {/* Manual Code Input */}
              <form onSubmit={handleManualSubmit} className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Or paste code here..."
                  className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 px-3 py-1.5 rounded text-[10px] font-silkscreen"
                >
                  TEST
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-pixel text-[10px] rounded border border-slate-600 active:scale-95 transition-transform"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
