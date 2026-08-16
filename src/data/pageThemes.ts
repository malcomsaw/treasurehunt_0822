import { QuestPageTheme } from '../types';

export const PAGE_THEMES: Record<number, QuestPageTheme> = {
  1: {
    name: 'Port Royal Harbour',
    bgGradient: 'from-amber-950 via-teal-950 to-sky-950',
    headerBg: 'bg-amber-950/90 border-amber-500/60',
    cardBg: 'bg-amber-950/85 border-amber-600/50',
    borderColor: 'border-amber-400',
    accentText: 'text-amber-300',
    btnPrimary: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-amber-900/50',
    btnPrimaryHover: 'hover:bg-amber-400',
    pixelBoxClass: 'pixel-box-wood',
    badgeBg: 'bg-amber-900 text-amber-200 border border-amber-400/60',
    glowColor: 'rgba(217, 119, 6, 0.3)'
  },
  2: {
    name: "Smuggler's Cove",
    bgGradient: 'from-cyan-950 via-slate-950 to-blue-950',
    headerBg: 'bg-cyan-950/90 border-cyan-500/50',
    cardBg: 'bg-cyan-950/85 border-cyan-600/50',
    borderColor: 'border-cyan-400',
    accentText: 'text-cyan-300',
    btnPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/50',
    btnPrimaryHover: 'hover:bg-cyan-500',
    pixelBoxClass: 'pixel-box-caribbean',
    badgeBg: 'bg-cyan-900 text-cyan-200 border border-cyan-400/50',
    glowColor: 'rgba(6, 182, 212, 0.3)'
  },
  3: {
    name: 'Black Pearl Deck',
    bgGradient: 'from-slate-950 via-sky-950 to-indigo-950',
    headerBg: 'bg-sky-950/90 border-sky-500/50',
    cardBg: 'bg-sky-950/85 border-sky-600/50',
    borderColor: 'border-sky-400',
    accentText: 'text-sky-300',
    btnPrimary: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/50',
    btnPrimaryHover: 'hover:bg-sky-500',
    pixelBoxClass: 'pixel-box-indigo',
    badgeBg: 'bg-sky-900 text-sky-200 border border-sky-400/50',
    glowColor: 'rgba(56, 189, 248, 0.3)'
  },
  4: {
    name: 'Tortuga Pirate Bar',
    bgGradient: 'from-amber-950 via-orange-950 to-amber-900',
    headerBg: 'bg-amber-900/90 border-amber-400/70',
    cardBg: 'bg-amber-950/90 border-amber-500/60',
    borderColor: 'border-amber-400',
    accentText: 'text-amber-300',
    btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-amber-900/60',
    btnPrimaryHover: 'hover:bg-amber-300',
    pixelBoxClass: 'pixel-box-pirate',
    badgeBg: 'bg-amber-900 text-amber-100 border border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  },
  5: {
    name: 'Pirate Council Court',
    bgGradient: 'from-red-950 via-slate-950 to-amber-950',
    headerBg: 'bg-red-950/90 border-red-500/50',
    cardBg: 'bg-red-950/85 border-red-600/50',
    borderColor: 'border-red-500',
    accentText: 'text-red-300',
    btnPrimary: 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50',
    btnPrimaryHover: 'hover:bg-red-500',
    pixelBoxClass: 'pixel-box-red',
    badgeBg: 'bg-red-900 text-red-200 border border-red-500/50',
    glowColor: 'rgba(239, 68, 68, 0.3)'
  },
  6: {
    name: 'Skull Rock Island',
    bgGradient: 'from-teal-950 via-slate-950 to-emerald-950',
    headerBg: 'bg-teal-950/90 border-teal-500/50',
    cardBg: 'bg-teal-950/85 border-teal-600/50',
    borderColor: 'border-teal-400',
    accentText: 'text-teal-300',
    btnPrimary: 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/50',
    btnPrimaryHover: 'hover:bg-teal-500',
    pixelBoxClass: 'pixel-box-caribbean',
    badgeBg: 'bg-teal-900 text-teal-200 border border-teal-400/50',
    glowColor: 'rgba(20, 184, 166, 0.3)'
  },
  7: {
    name: "Davy Jones' Sunken Vault",
    bgGradient: 'from-yellow-950 via-amber-950 to-teal-950',
    headerBg: 'bg-amber-900/90 border-amber-400/80',
    cardBg: 'bg-amber-950/90 border-amber-400/70',
    borderColor: 'border-amber-400',
    accentText: 'text-amber-300',
    btnPrimary: 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black shadow-amber-900/80',
    btnPrimaryHover: 'hover:from-amber-300 hover:to-yellow-300',
    pixelBoxClass: 'pixel-box-pirate',
    badgeBg: 'bg-amber-900 text-amber-100 border border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.5)'
  }
};
