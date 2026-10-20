/**
 * KIMI PANDA — STORE REACTIVO Y PERSISTENCIA (PWA Offline)
 */

const STORAGE_KEY = 'kp_profile_v1';

const DEFAULT_PROFILE = {
  name: 'Sofía',
  age: 7,
  rank: 'Exploradora',
  stars: 128,
  xp: 0,
  level: 1,
  hearts: 3,
  maxHearts: 3,
  streak: 0,
  highStreak: 0,
  unlockedLevels: 1,
  inventory: [],
  equippedHat: null,
  worldLevels: {
    inicio: 1,
    matematicas: 1,
    ciencias: 1,
    logica: 1,
    lenguaje: 1,
    historia: 1
  },
  levelStars: {
    inicio: {},
    matematicas: {},
    ciencias: {},
    logica: {},
    lenguaje: {},
    historia: {}
  },
  stats: {
    matematicas: { total: 0, correct: 0 },
    ciencias: { total: 0, correct: 0 },
    lenguaje: { total: 0, correct: 0 },
    logica: { total: 0, correct: 0 },
    historia: { total: 0, correct: 0 },
    ingles: { total: 0, correct: 0 }
  },
  missions: {
    gamesPlayed: 0,
    mathCorrect: 0,
    claimed1: false,
    claimed2: false
  },
  achievements: [],
  audioMuted: false,
};

let currentProfile = { ...DEFAULT_PROFILE };

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      currentProfile = { ...DEFAULT_PROFILE, ...parsed };
    } else {
      currentProfile = { ...DEFAULT_PROFILE };
      saveProfile();
    }
  } catch (e) {
    console.warn('[Store] Error cargando perfil:', e);
    currentProfile = { ...DEFAULT_PROFILE };
  }
  return currentProfile;
}

export function saveProfile(updated) {
  if (updated) {
    currentProfile = { ...currentProfile, ...updated };
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProfile));
  } catch (e) {
    console.warn('[Store] Error guardando perfil:', e);
  }
  return currentProfile;
}

export function getProfile() {
  return currentProfile;
}

export function resetProfile() {
  currentProfile = {
    ...DEFAULT_PROFILE,
    levelStars: {
      inicio: {},
      matematicas: {},
      ciencias: {},
      logica: {},
      lenguaje: {},
      historia: {}
    },
    stats: {
      matematicas: { total: 0, correct: 0 },
      ciencias: { total: 0, correct: 0 },
      lenguaje: { total: 0, correct: 0 },
      logica: { total: 0, correct: 0 },
      historia: { total: 0, correct: 0 },
      ingles: { total: 0, correct: 0 }
    },
    missions: {
      gamesPlayed: 0,
      mathCorrect: 0,
      claimed1: false,
      claimed2: false
    },
    inventory: [],
    equippedHat: null,
    achievements: []
  };
  saveProfile();
  return currentProfile;
}

export function addStars(count = 3) {
  currentProfile.stars = Math.max(0, (currentProfile.stars || 0) + count);
  saveProfile();
  return currentProfile.stars;
}

export function decrementHeart() {
  currentProfile.hearts = Math.max(0, (currentProfile.hearts || 1) - 1);
  return currentProfile.hearts;
}

export function resetHearts() {
  currentProfile.hearts = currentProfile.maxHearts || 3;
  return currentProfile.hearts;
}

export function toggleAudioMute() {
  currentProfile.audioMuted = !currentProfile.audioMuted;
  saveProfile();
  return currentProfile.audioMuted;
}

export function addXP(amount = 15) {
  const oldLevel = currentProfile.level || Math.floor((currentProfile.xp || 0) / 100) + 1;
  currentProfile.xp = (currentProfile.xp || 0) + amount;
  const newLevel = Math.floor(currentProfile.xp / 100) + 1;
  currentProfile.level = newLevel;

  const RANKS = ['Novata', 'Exploradora', 'Aventurera', 'Maestra Panda', 'Gran Sabia'];
  const rankIdx = Math.min(newLevel - 1, RANKS.length - 1);
  currentProfile.rank = RANKS[rankIdx];

  const leveledUp = newLevel > oldLevel;
  if (leveledUp) {
    addStars(10); // Bono de 10 estrellas por subir de nivel
  }
  saveProfile();
  return { xp: currentProfile.xp, level: newLevel, leveledUp, rank: currentProfile.rank };
}

export function buyItem(itemId, price) {
  currentProfile.inventory = currentProfile.inventory || [];
  if (currentProfile.inventory.includes(itemId)) {
    return { success: false, reason: 'already_owned' };
  }
  if ((currentProfile.stars || 0) < price) {
    return { success: false, reason: 'insufficient_stars' };
  }

  currentProfile.stars -= price;
  currentProfile.inventory.push(itemId);
  currentProfile.equippedHat = itemId; // Auto-equipar al comprar
  saveProfile();
  return { success: true, item: itemId, remainingStars: currentProfile.stars };
}

export function equipItem(itemId) {
  currentProfile.inventory = currentProfile.inventory || [];
  if (itemId === null || currentProfile.inventory.includes(itemId)) {
    currentProfile.equippedHat = itemId;
    saveProfile();
    return { success: true, equippedHat: currentProfile.equippedHat };
  }
  return { success: false, reason: 'not_in_inventory' };
}

export function unlockNextWorldLevel(worldId) {
  currentProfile.worldLevels = currentProfile.worldLevels || {};
  const current = currentProfile.worldLevels[worldId] || 1;
  if (current < 5) {
    currentProfile.worldLevels[worldId] = current + 1;
    saveProfile();
  }
  return currentProfile.worldLevels[worldId];
}

export function recordLevelStars(worldId, levelNum, stars) {
  currentProfile.levelStars = currentProfile.levelStars || {};
  currentProfile.levelStars[worldId] = currentProfile.levelStars[worldId] || {};
  const currentBest = currentProfile.levelStars[worldId][levelNum] || 0;
  if (stars > currentBest) {
    currentProfile.levelStars[worldId][levelNum] = stars;
    saveProfile();
  }
  return currentProfile.levelStars[worldId][levelNum];
}

export function getLevelStars(worldId, levelNum) {
  if (!currentProfile.levelStars || !currentProfile.levelStars[worldId]) return 0;
  return currentProfile.levelStars[worldId][levelNum] || 0;
}

export function recordCategoryAnswer(category, isCorrect) {
  if (!category) return null;
  currentProfile.stats = currentProfile.stats || {};
  currentProfile.stats[category] = currentProfile.stats[category] || { total: 0, correct: 0 };
  currentProfile.stats[category].total = (currentProfile.stats[category].total || 0) + 1;
  if (isCorrect) {
    currentProfile.stats[category].correct = (currentProfile.stats[category].correct || 0) + 1;
  }
  saveProfile();
  return currentProfile.stats[category];
}

export function getCategoryStats() {
  currentProfile.stats = currentProfile.stats || {};
  return currentProfile.stats;
}

export function recordMissionProgress(key, amount = 1) {
  currentProfile.missions = currentProfile.missions || { gamesPlayed: 0, mathCorrect: 0, claimed1: false, claimed2: false };
  currentProfile.missions[key] = (currentProfile.missions[key] || 0) + amount;
  saveProfile();
  return currentProfile.missions;
}

export function claimMissionReward(missionNum, rewardStars = 100) {
  currentProfile.missions = currentProfile.missions || {};
  const claimKey = `claimed${missionNum}`;
  if (!currentProfile.missions[claimKey]) {
    currentProfile.missions[claimKey] = true;
    addStars(rewardStars);
    saveProfile();
    return { success: true, starsAdded: rewardStars, totalStars: currentProfile.stars };
  }
  return { success: false, reason: 'already_claimed' };
}

export function unlockAchievement(achId) {
  currentProfile.achievements = currentProfile.achievements || [];
  if (!currentProfile.achievements.includes(achId)) {
    currentProfile.achievements.push(achId);
    saveProfile();
    return true; // Recién desbloqueado
  }
  return false;
}
