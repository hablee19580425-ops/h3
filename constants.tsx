
import { SlotGame } from './types';

// 프라그마틱 플레이 데모 베이스 URL - 사용자 예시 기반으로 구성
const BASE_PRAGMATIC_URL = "https://demogamesfree.pragmaticplay.net/hub-demo/openGame.do?lang=ko&cur=KRW&websiteUrl=https%3A%2F%2Fclienthub.pragmaticplay.com%2F&gcpif=2831&jurisdiction=99&lobbyUrl=https%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F";

// 주요 게임 심볼 매핑
const SYMBOL_MAP: Record<string, string> = {
  "Sweet Bonanza": "vs20swbnz",
  "Gates of Olympus": "vs20olympgcl",
  "Starlight Princess": "vs20starlight",
  "Sugar Rush": "vs20sugarrush",
  "Fruit Party": "vs20fruitparty",
  "Big Bass Bonanza": "vs10bbbonanza",
  "Bonanza Gold": "vs20bonanzagold",
  "The Dog House": "vs20doghouse",
  "Madame Destiny": "vs10madame",
  "Hand of Midas": "vs20midas",
  "Great Rhino Megaways": "vs20rhinoway",
  "Wolf Gold": "vs25wolfgold",
  "Wild West Gold": "vs20wildwest",
  "Floating Dragon": "vs10floatdrg",
  "Aztec Gems": "vs5aztecgems",
  "Buffalo King": "vs4096bufking",
  "John Hunter and the Tomb of the Scarab Queen": "vs25scarabqueen",
  "Release the Kraken": "vs20kraken",
  "Hot Fiesta": "vs25hotfiesta",
  "Lucky Dragons": "vs50luckyd",
  "Golden Beauty": "vs75goldenb",
  "Egyptian Fortunes": "vs20egyptfort",
  "Pirate Gold Deluxe": "vs40pirgolddel",
  "Spartan King": "vs40spartaking",
  "Bonanza Megaways": "vs20bonanzamw",
  "Book of Dead": "BookOfDead",
  "Legacy of Dead": "LegacyOfDead",
  "Reactoonz": "Reactoonz",
  "Jammin Jars": "JamminJars",
  "Money Train 2": "MoneyTrain2",
  "Extra Chilli": "ExtraChilli",
  "Razor Shark": "RazorShark",
  "Dragon Hatch": "DragonHatch",
  "Chaos Crew": "ChaosCrew",
  "Lucky Lightning": "vs20luckylight",
  "Fruit Tiki": "vs20tiki",
  "Narcos": "Narcos",
  "Starburst": "Starburst",
  "Twin Spin": "TwinSpin",
  "Dead or Alive": "DeadOrAlive",
  "Dead or Alive 2": "DeadOrAlive2",
  "Thunderstruck II": "Thunderstruck2",
  "Immortal Romance": "ImmortalRomance",
  "Mega Moolah": "MegaMoolah",
  "Hall of Gods": "HallOfGods",
  "Book of Ra": "BookOfRa",
  "Dancing Drums": "DancingDrums",
  "Fire Lightning": "FireLightning",
  "Jungle Spirit": "JungleSpirit",
  "Rise of Merlin": "RiseOfMerlin",
  "Wild North": "WildNorth",
  "Crystal Sun": "CrystalSun",
  "Book of Spells": "BookOfSpells",
  "Viking Runecraft": "VikingRunecraft",
  "Wild Toro": "WildToro",
  "Joker Strike": "JokerStrike",
  "Firestorm": "Firestorm",
  "Voodoo Gold": "VoodooGold",
  "Queen of Riches": "QueenOfRiches",
  // 사용자 예시 URL에 포함된 심볼 추가
  "Joker's Jewels": "vs5jokjewhs"
};

/**
 * 복잡한 형태의 데모 링크 생성
 * executeurl=URL_ENCODED_FULL_PATH 형태로 반환
 */
export function generateComplexLink(name: string): string {
  let symbol = SYMBOL_MAP[name];

  if (!symbol) {
    // 매핑되지 않은 경우 기본 규칙: 공백 제거 및 소문자, Pragmatic 접두사 가정
    symbol = `vs20${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  }

  // base URL에 gameSymbol 파라미터를 추가
  // 예시: ...&gameSymbol=vs5jokjewhs...
  const fullDemoUrl = `${BASE_PRAGMATIC_URL}&gameSymbol=${symbol}`;
  
  // 전체 URL을 인코딩하여 executeurl 값으로 설정
  return `https://slotbuff3.com/FreeSlot?executeurl=${encodeURIComponent(fullDemoUrl)}`;
}

/**
 * 동적 썸네일 생성 함수 (140x140)
 */
function createThumbnail(title: string): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement("canvas");
  canvas.width = 140;
  canvas.height = 140;
  const ctx = canvas.getContext("2d");
  if (!ctx) return '';

  const grad = ctx.createLinearGradient(0, 0, 140, 140);
  grad.addColorStop(0, "#1e293b");
  grad.addColorStop(1, "#0f172a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 140, 140);

  ctx.fillStyle = "#fbbf24";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 14px Arial";

  const words = title.split(" ");
  let line = "";
  let y = 60;
  words.forEach((w) => {
    const test = line + w + " ";
    if (ctx.measureText(test).width > 120) {
      ctx.fillText(line, 70, y);
      line = w + " ";
      y += 18;
    } else {
      line = test;
    }
  });
  ctx.fillText(line, 70, y);
  return canvas.toDataURL("image/png");
}

const rawGames = [
  { name: "Sweet Bonanza" },
  { name: "Gates of Olympus" },
  { name: "Starlight Princess" },
  { name: "Sugar Rush" },
  { name: "Fruit Party" },
  { name: "Big Bass Bonanza" },
  { name: "Bonanza Gold" },
  { name: "The Dog House" },
  { name: "Madame Destiny" },
  { name: "Hand of Midas" },
  { name: "Bonanza Megaways" },
  { name: "Great Rhino Megaways" },
  { name: "Wolf Gold" },
  { name: "Fire Joker" },
  { name: "Book of Dead" },
  { name: "Legacy of Dead" },
  { name: "Reactoonz" },
  { name: "Jammin Jars" },
  { name: "Money Train 2" },
  { name: "Extra Chilli" },
  { name: "Razor Shark" },
  { name: "Dragon Hatch" },
  { name: "Chaos Crew" },
  { name: "Wild West Gold" },
  { name: "Floating Dragon" },
  { name: "Aztec Gems" },
  { name: "Lucky Lightning" },
  { name: "Buffalo King" },
  { name: "Fruit Tiki" },
  { name: "Narcos" },
  { name: "John Hunter and the Tomb of the Scarab Queen" },
  { name: "Release the Kraken" },
  { name: "Starburst" },
  { name: "Twin Spin" },
  { name: "Dead or Alive" },
  { name: "Dead or Alive 2" },
  { name: "Thunderstruck II" },
  { name: "Immortal Romance" },
  { name: "Mega Moolah" },
  { name: "Hall of Gods" },
  { name: "Book of Ra" },
  { name: "Dancing Drums" },
  { name: "Fire Lightning" },
  { name: "Spartan King" },
  { name: "Jungle Spirit" },
  { name: "Rise of Merlin" },
  { name: "Golden Beauty" },
  { name: "Egyptian Fortunes" },
  { name: "Pirate Gold Deluxe" },
  { name: "Wild North" },
  { name: "Crystal Sun" },
  { name: "Book of Spells" },
  { name: "Viking Runecraft" },
  { name: "Wild Toro" },
  { name: "Hot Fiesta" },
  { name: "Joker Strike" },
  { name: "Firestorm" },
  { name: "Voodoo Gold" },
  { name: "Lucky Dragons" },
  { name: "Queen of Riches" }
];

export const SLOT_GAMES: SlotGame[] = rawGames.map((g, idx) => ({
  id: `slot-${idx}`,
  name: g.name,
  provider: 'Direct Access',
  thumbnail: createThumbnail(g.name),
  link: generateComplexLink(g.name),
  category: 'Popular',
  rating: 5.0
}));

export const CATEGORIES: string[] = ['All', 'Popular', 'PS Folder'];
