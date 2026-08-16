export interface QuestAssetData {
  pageNum: number;
  location: string;
  instruction: string;
  clue: string;
  quiz: string;
  answer: string;
  reward: string;
  qrCodeKey?: string;
  pictureUrl: string;
}

export interface QuestPageTheme {
  name: string;
  bgGradient: string;
  headerBg: string;
  cardBg: string;
  borderColor: string;
  accentText: string;
  btnPrimary: string;
  btnPrimaryHover: string;
  pixelBoxClass: string;
  badgeBg: string;
  glowColor: string;
}

export interface DevAssetOverride {
  [key: string]: Partial<QuestAssetData>;
}
