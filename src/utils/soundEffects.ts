// 8-bit & Sea Shanty Retro Web Audio API Synthesizer with Caribbean Theme BGM Engine

const NOTE_FREQS: Record<string, number> = {
  'A2': 110.00,
  'Bb2': 116.54,
  'B2': 123.47,
  'C3': 130.81,
  'Cs3': 138.59,
  'D3': 146.83,
  'E3': 164.81,
  'F3': 174.61,
  'Fs3': 185.00,
  'G3': 196.00,
  'Gs3': 207.65,
  'A3': 220.00,
  'Bb3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'Cs4': 277.18,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'Fs4': 369.99,
  'G4': 392.00,
  'Gs4': 415.30,
  'A4': 440.00,
  'Bb4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'Cs5': 554.37,
  'D5': 587.33,
  'E5': 659.25,
  'F5': 698.46,
  'G5': 783.99,
  'A5': 880.00,
  'D2': 73.42,
  'F2': 87.31,
  'G2': 98.00,
  '-': 0
};

interface BGMStep {
  melody?: string;
  harmony?: string;
  bass?: string;
  beat?: 'kick' | 'snare' | 'hihat' | null;
}

// 6/8 meter Caribbean Pirate Theme ("He's a Pirate" - D Minor Arrangement)
const CARIBBEAN_THEME_STEPS: BGMStep[] = [
  // Intro Pickup
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'A3', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'C4', harmony: 'G3' },

  // M1: Dm
  { beat: 'kick', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },

  // M2: Dm / Am
  { beat: 'kick', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'snare', bass: 'A2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },

  // M3: Dm / C
  { beat: 'kick', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'C3', melody: 'C4', harmony: 'E3' },
  { beat: 'snare', bass: 'C3', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M4: Dm
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'A3', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'C4', harmony: 'G3' },

  // M5: Dm
  { beat: 'kick', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },

  // M6: Dm / Am
  { beat: 'kick', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'snare', bass: 'A2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },

  // M7: Dm / C
  { beat: 'kick', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'C3', melody: 'C4', harmony: 'E3' },
  { beat: 'snare', bass: 'C3', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M8: Dm
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'A3', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'C4', harmony: 'G3' },

  // M9: Dm / Gm
  { beat: 'kick', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'G2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'G2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },

  // M10: Gm / Bb
  { beat: 'kick', bass: 'G2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'G2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'snare', bass: 'Bb2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'Bb2', melody: 'Bb4', harmony: 'D4' },
  { beat: 'hihat', bass: 'Bb2', melody: 'Bb4', harmony: 'D4' },

  // M11: F / Am
  { beat: 'kick', bass: 'F2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'F2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'A2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'snare', bass: 'A2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },

  // M12: Dm
  { beat: 'kick', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'snare', bass: 'D2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M13: Dm / Gm
  { beat: 'kick', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'snare', bass: 'G2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },

  // M14: Bb / C
  { beat: 'kick', bass: 'Bb2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'Bb2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'Bb2', melody: 'D4', harmony: 'F3' },
  { beat: 'snare', bass: 'C3', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'C3', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'C3', melody: 'E4', harmony: 'G3' },

  // M15: Dm / Am
  { beat: 'kick', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'A2', melody: 'D4', harmony: 'F3' },
  { beat: 'snare', bass: 'A2', melody: 'E4', harmony: 'G3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M16: Dm Transition to Heroic Phrase
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'E4', harmony: 'G3' },

  // M17: F Major heroic lift
  { beat: 'kick', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'F2', melody: 'A4', harmony: 'C4' },

  // M18: Gm
  { beat: 'kick', bass: 'G2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'G2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'G2', melody: 'A4', harmony: 'C4' },
  { beat: 'snare', bass: 'G2', melody: 'Bb4', harmony: 'D4' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },

  // M19: Dm / A7
  { beat: 'kick', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },
  { beat: 'snare', bass: 'A2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M20: Dm Transition
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'E4', harmony: 'G3' },

  // M21: F Major
  { beat: 'kick', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'F2', melody: 'F4', harmony: 'A3' },
  { beat: 'hihat', bass: 'F2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'F2', melody: 'A4', harmony: 'C4' },

  // M22: Am / C
  { beat: 'kick', bass: 'A2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'A2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'A2', melody: 'A4', harmony: 'C4' },
  { beat: 'snare', bass: 'C3', melody: 'C5', harmony: 'E4' },
  { beat: 'hihat', bass: 'C3', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'C3', melody: 'A4', harmony: 'C4' },

  // M23: Gm / Dm
  { beat: 'kick', bass: 'G2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'G2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'D2', melody: 'F4', harmony: 'A3' },
  { beat: 'snare', bass: 'D2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M24: Dm / A7
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'A2', melody: '-' },
  { beat: 'hihat', bass: 'A2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'A2', melody: 'Bb4', harmony: 'D4' },

  // M25: C Major Climax
  { beat: 'kick', bass: 'C3', melody: 'C5', harmony: 'E4' },
  { beat: 'hihat', bass: 'C3', melody: 'C5', harmony: 'E4' },
  { beat: 'hihat', bass: 'C3', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'C3', melody: 'C5', harmony: 'E4' },
  { beat: 'hihat', bass: 'C3', melody: 'D5', harmony: 'F4' },
  { beat: 'hihat', bass: 'C3', melody: 'Bb4', harmony: 'D4' },

  // M26: Gm / Bb
  { beat: 'kick', bass: 'G2', melody: 'Bb4', harmony: 'D4' },
  { beat: 'hihat', bass: 'G2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'G2', melody: 'Bb4', harmony: 'D4' },
  { beat: 'snare', bass: 'Bb2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'Bb2', melody: 'G4', harmony: 'Bb3' },
  { beat: 'hihat', bass: 'Bb2', melody: 'G4', harmony: 'Bb3' },

  // M27: Dm / A7
  { beat: 'kick', bass: 'D2', melody: 'A4', harmony: 'C4' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'A2', melody: 'F4', harmony: 'A3' },
  { beat: 'snare', bass: 'A2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'A2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'A2', melody: 'E4', harmony: 'G3' },

  // M28: Dm Resolution Chord
  { beat: 'kick', bass: 'D2', melody: 'D4', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'snare', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-', harmony: '-' },

  // M29: Gallop Transition Loop
  { beat: 'kick', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: '-' },
  { beat: 'snare', bass: 'D2', melody: '-' },
  { beat: 'hihat', bass: 'D2', melody: 'A3', harmony: 'F3' },
  { beat: 'hihat', bass: 'D2', melody: 'C4', harmony: 'G3' }
];

class SoundEffectsManager {
  private audioCtx: AudioContext | null = null;
  public enabled: boolean = true;
  private isBGMRunning: boolean = false;
  private bgmStepIndex: number = 0;
  private nextStepTime: number = 0;
  private schedulerTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private userInteractionBound: boolean = false;

  constructor() {
    this.bindUserInteraction();
  }

  private getContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        
        // Master & Channel Busses
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);

        this.bgmGain = this.audioCtx.createGain();
        this.bgmGain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
        this.bgmGain.connect(this.masterGain);

        this.sfxGain = this.audioCtx.createGain();
        this.sfxGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
        this.sfxGain.connect(this.masterGain);

        // Pre-create 1-second white noise buffer for percussions
        const bufferSize = this.audioCtx.sampleRate;
        this.noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const output = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private bindUserInteraction() {
    if (typeof window === 'undefined' || this.userInteractionBound) return;
    this.userInteractionBound = true;

    const unlock = () => {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (this.enabled && !this.isBGMRunning) {
        this.startBGM();
      }
    };

    window.addEventListener('pointerdown', unlock, { once: false, passive: true });
    window.addEventListener('keydown', unlock, { once: false, passive: true });
    window.addEventListener('touchstart', unlock, { once: false, passive: true });
  }

  public setSoundEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  public toggleSound(): boolean {
    const next = !this.enabled;
    this.setSoundEnabled(next);
    return next;
  }

  // --- BACKGROUND MUSIC ENGINE ---

  public startBGM() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (this.isBGMRunning) return;
    this.isBGMRunning = true;

    // Reset step pointer
    this.bgmStepIndex = 0;
    this.nextStepTime = ctx.currentTime + 0.05;

    // Start lookahead scheduling loop (~30ms ticks)
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
    }
    this.schedulerTimer = window.setInterval(() => {
      this.scheduleBGM();
    }, 30);
  }

  public stopBGM() {
    this.isBGMRunning = false;
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  private scheduleBGM() {
    if (!this.enabled || !this.isBGMRunning) return;
    const ctx = this.getContext();
    if (!ctx || !this.bgmGain) return;

    // 6/8 step duration: ~0.145 seconds per 8th note
    const stepDuration = 0.145;
    const scheduleAhead = 0.25;

    while (this.nextStepTime < ctx.currentTime + scheduleAhead) {
      const step = CARIBBEAN_THEME_STEPS[this.bgmStepIndex];
      if (step) {
        this.playBGMStep(step, this.nextStepTime, stepDuration);
      }

      this.nextStepTime += stepDuration;
      this.bgmStepIndex = (this.bgmStepIndex + 1) % CARIBBEAN_THEME_STEPS.length;
    }
  }

  private playBGMStep(step: BGMStep, time: number, duration: number) {
    const ctx = this.audioCtx;
    if (!ctx || !this.bgmGain) return;

    try {
      // 1. Lead Melody Note (Pirate Accordion / Brass synth)
      if (step.melody && step.melody !== '-' && NOTE_FREQS[step.melody]) {
        const freq = NOTE_FREQS[step.melody];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        // Pirate horn / accordion lowpass filter envelope
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, time);
        filter.frequency.exponentialRampToValueAtTime(700, time + duration * 0.9);

        // Volume envelope with punchy attack and gentle decay
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.22, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.95);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(time);
        osc.stop(time + duration);
      }

      // 2. Harmony Voice (Warm Flute / Chime)
      if (step.harmony && step.harmony !== '-' && NOTE_FREQS[step.harmony]) {
        const freq = NOTE_FREQS[step.harmony];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.12, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.85);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(time);
        osc.stop(time + duration);
      }

      // 3. Bass Voice (Driving Dm Galleon Pulse)
      if (step.bass && step.bass !== '-' && NOTE_FREQS[step.bass]) {
        const freq = NOTE_FREQS[step.bass];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.20, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.7);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(time);
        osc.stop(time + duration);
      }

      // 4. Sea-Shanty Percussion (Kick, Snare / Cannon, Woodblock Hi-Hat)
      if (step.beat === 'kick') {
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();

        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(130, time);
        kickOsc.frequency.exponentialRampToValueAtTime(35, time + 0.09);

        kickGain.gain.setValueAtTime(0.3, time);
        kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

        kickOsc.connect(kickGain);
        kickGain.connect(this.bgmGain);

        kickOsc.start(time);
        kickOsc.stop(time + 0.1);
      } else if (step.beat === 'snare' && this.noiseBuffer) {
        // Snare / cannon noise hit
        const noise = ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, time);

        const snareGain = ctx.createGain();
        snareGain.gain.setValueAtTime(0.18, time);
        snareGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        noise.connect(filter);
        filter.connect(snareGain);
        snareGain.connect(this.bgmGain);

        noise.start(time);
        noise.stop(time + 0.09);
      } else if (step.beat === 'hihat' && this.noiseBuffer) {
        // Woodblock / soft hihat click
        const noise = ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(4500, time);

        const hatGain = ctx.createGain();
        hatGain.gain.setValueAtTime(0.08, time);
        hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

        noise.connect(filter);
        filter.connect(hatGain);
        hatGain.connect(this.bgmGain);

        noise.start(time);
        noise.stop(time + 0.04);
      }
    } catch {
      // Ignore audio scheduling blips
    }
  }

  // --- SOUND EFFECTS ---

  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.20, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  public playError() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.setValueAtTime(110, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  public playQRScanSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const notes = [659.25, 880, 1174.66, 1760]; // E5, A5, D6, A6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.28);
      });
    } catch {
      // Ignore
    }
  }

  public playVictory() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      const notes = [
        { f: 523.25, d: 0.12 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.12 },
        { f: 1046.50, d: 0.25 },
        { f: 880.00, d: 0.12 },
        { f: 1046.50, d: 0.4 }
      ];

      let startTime = ctx.currentTime;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + note.d + 0.02);

        startTime += note.d + 0.03;
      });
    } catch {
      // Ignore
    }
  }

  public playPortalTransition() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    try {
      // 1. Sweeping wind / sea breeze noise whoosh
      if (this.noiseBuffer) {
        const noise = ctx.createBufferSource();
        noise.buffer = this.noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(4.0, ctx.currentTime);
        filter.frequency.setValueAtTime(300, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.8);
        filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 1.8);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 1.85);
      }

      // 2. Magical ascending portal chime arpeggio
      const portalChimes = [
        { f: 293.66, t: 0.1, d: 0.3 }, // D4
        { f: 440.00, t: 0.25, d: 0.35 }, // A4
        { f: 587.33, t: 0.45, d: 0.4 }, // D5
        { f: 698.46, t: 0.65, d: 0.45 }, // F5
        { f: 880.00, t: 0.85, d: 0.5 }, // A5
        { f: 1174.66, t: 1.05, d: 0.7 } // D6
      ];

      portalChimes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + note.t);
        gain.gain.linearRampToValueAtTime(0.20, ctx.currentTime + note.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d + 0.02);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new SoundEffectsManager();
