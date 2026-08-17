import { QuestAssetData } from '../types';
import { getPublicAssetUrl, getIslandImageUrl, resolveImageUrl } from '../utils/assetResolver';

const DEFAULT_QUESTS: Record<number, QuestAssetData> = {
  1: {
    pageNum: 1,
    location: "Port Royal - Royal Docks",
    instruction: "Search along the sandy Caribbean harbour pier where pirate galleons berth. Look for a brass sea chest near the palm trees.",
    clue: "I sail on the high seas, fly a black skull flag, and hunt for glittering gold. What am I called?",
    quiz: "What word describes an outlaw seafaring rogue hunting for doubloons?",
    answer: "pirate",
    reward: "⚓ Captain's Doubloon #1715 — The harbour master whispers: Set sail towards Smuggler's Cove!",
    pictureUrl: getIslandImageUrl(1)
  },
  2: {
    pageNum: 2,
    location: "Smuggler's Cove - Grotto Cave",
    instruction: "Creep inside the tide-flooded cavern. Search behind the oak casks by the warm glowing lanterns.",
    clue: "Spiced, dark, or amber, distilled from Caribbean sugar-cane and beloved by sailors. What drink fills the pirate barrels?",
    quiz: "What classic Caribbean rum-based spirit fills the tavern casks?",
    answer: "rum",
    reward: "🍶 Golden Flask of Tortuga Spiced Rum — The cave whispers: Board the Black Pearl ship deck!",
    pictureUrl: getIslandImageUrl(2)
  },
  3: {
    pageNum: 3,
    location: "Black Pearl - Quarterdeck Wheel",
    instruction: "Take the wooden ship wheel on the main deck. Check the nautical navigation chart on the quarterdeck.",
    clue: "I have a magnetic needle pointing towards the North Star, guiding captains across stormy oceans.",
    quiz: "What brass nautical navigation instrument guides the ship across uncharted waters?",
    answer: "compass",
    reward: "🧭 Navigator's Brass Spyglass — Land ho! Tortuga Pirate Bar ahead! Prepare your spyglass camera scanner!",
    pictureUrl: getIslandImageUrl(3)
  },
  4: {
    pageNum: 4,
    location: "Tortuga Bar - Pirate Tavern",
    instruction: "You have arrived at the Tortuga Pirate Tavern! Look at the top-right camera spyglass icon: Open the camera scanner and scan the secret pirate tavern QR marker at this location.",
    clue: "No spoken password unlocks this tavern gate! Tap the top-right Spyglass Camera icon in this app to scan the secret pirate QR code!",
    quiz: "Scan the secret pirate tavern QR code at this location using the top-right spyglass camera icon!",
    answer: "PIRATE_QR_TORTUGA_TREASURE_77291",
    qrCodeKey: "PIRATE_QR_TORTUGA_TREASURE_77291",
    reward: "🏴‍☠️ Tortuga Pirate Council Seal — You found me, matey! The secret tavern code is verified! Click Next to enter the Pirate Court.",
    pictureUrl: getIslandImageUrl(4)
  },
  5: {
    pageNum: 5,
    location: "Pirate Court - Council Hall",
    instruction: "Approach the high council table where pirate lords gather under crossed swords and flickering chandeliers.",
    clue: "A curved single-edged sword favored by buccaneers in close-quarters naval boarding battles.",
    quiz: "What curved pirate sword is mounted above the captain's throne?",
    answer: "cutlass",
    reward: "⚔️ Royal Pirate Cutlass Crest — The Pirate Lords grant you passage to Skull Rock Island!",
    pictureUrl: getIslandImageUrl(5)
  },
  6: {
    pageNum: 6,
    location: "Skull Rock - Smuggler's Eye",
    instruction: "Stand inside the giant skull monolith on the tropical beach. Dig near the palm tree roots where X marks the spot.",
    clue: "X marks the spot! I am buried beneath tropical sands in a locked wooden chest full of gold doubloons and rubies.",
    quiz: "What word describes the buried gold and jewels every pirate searches for?",
    answer: "treasure",
    reward: "🗺️ Cursed Skull Map — The secret location of Davy Jones' Vault is revealed in golden ink!",
    pictureUrl: getIslandImageUrl(6)
  },
  7: {
    pageNum: 7,
    location: "Davy Jones' Vault - Royal Chamber",
    instruction: "Ahoy Captain! You have conquered the Caribbean seas and unlocked the legendary sunken pirate vault!",
    clue: "Shout the ultimate 5-letter pirate greeting cheer of joy and victory across the high seas!",
    quiz: "What famous pirate exclamation is shouted when sighting another ship or celebrating victory?",
    answer: "ahoy",
    reward: "👑 LEGENDARY CARIBBEAN PIRATE KING CROWN & CHEST OF GOLD DOUBLOONS! 🏴‍☠️💎 — You completed all 7 pirate quests, decoded all nautical clues, and scanned the Tortuga QR code! You are officially Pirate King of the Caribbean!",
    pictureUrl: getIslandImageUrl(7)
  }
};

export async function fetchQuestAssetData(pageNum: number, customOverrides?: Record<number, Partial<QuestAssetData>>): Promise<QuestAssetData> {
  const defaultData = DEFAULT_QUESTS[pageNum] || DEFAULT_QUESTS[1];
  const pageRelPath = `assets/page${pageNum}`;

  // Try fetching actual text files from public folder using base-aware path
  try {
    const [locRes, instRes, clueRes, quizRes, ansRes, rewRes, qrRes] = await Promise.allSettled([
      fetch(getPublicAssetUrl(`${pageRelPath}/location.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/instruction.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/clue.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/quiz.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/answer.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/reward.txt`)),
      fetch(getPublicAssetUrl(`${pageRelPath}/qr_code_key.txt`))
    ]);

    const location = (locRes.status === 'fulfilled' && locRes.value.ok) ? (await locRes.value.text()).trim() : defaultData.location;
    const instruction = (instRes.status === 'fulfilled' && instRes.value.ok) ? (await instRes.value.text()).trim() : defaultData.instruction;
    const clue = (clueRes.status === 'fulfilled' && clueRes.value.ok) ? (await clueRes.value.text()).trim() : defaultData.clue;
    const quiz = (quizRes.status === 'fulfilled' && quizRes.value.ok) ? (await quizRes.value.text()).trim() : defaultData.quiz;
    const answer = (ansRes.status === 'fulfilled' && ansRes.value.ok) ? (await ansRes.value.text()).trim() : defaultData.answer;
    const reward = (rewRes.status === 'fulfilled' && rewRes.value.ok) ? (await rewRes.value.text()).trim() : defaultData.reward;
    
    let qrCodeKey = defaultData.qrCodeKey;
    if (qrRes.status === 'fulfilled' && qrRes.value.ok) {
      const fetchedQr = (await qrRes.value.text()).trim();
      if (fetchedQr) qrCodeKey = fetchedQr;
    }

    const fetchedData: QuestAssetData = {
      pageNum,
      location,
      instruction,
      clue,
      quiz,
      answer,
      reward,
      qrCodeKey,
      pictureUrl: defaultData.pictureUrl
    };

    if (customOverrides && customOverrides[pageNum]) {
      const override = customOverrides[pageNum];
      return {
        ...fetchedData,
        ...override,
        pictureUrl: override.pictureUrl ? resolveImageUrl(override.pictureUrl) : fetchedData.pictureUrl
      };
    }

    return fetchedData;
  } catch (err) {
    console.warn(`Failed fetching asset files for page ${pageNum}, using fallback defaults`, err);
    if (customOverrides && customOverrides[pageNum]) {
      const override = customOverrides[pageNum];
      return {
        ...defaultData,
        ...override,
        pictureUrl: override.pictureUrl ? resolveImageUrl(override.pictureUrl) : defaultData.pictureUrl
      };
    }
    return defaultData;
  }
}

export { DEFAULT_QUESTS };
