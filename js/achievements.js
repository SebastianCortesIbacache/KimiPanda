/**
 * KIMI PANDA — SALA DE LOGROS Y MEDALLAS (achievements.js)
 */

import { getProfile, unlockAchievement, getCategoryStats } from './store.js';
import { playStar, playPop } from './audio.js';
import { showToast } from './ui.js';

export const CURRICULAR_DOMAINS = [
  {
    id: 'matematicas',
    name: 'Matemáticas',
    emoji: '🧮',
    color: 'amber',
    oa: 'OA 01 - OA 04',
    desc: 'Conteo hasta 20, sumas, restas y figuras 2D.'
  },
  {
    id: 'ciencias',
    name: 'Ciencias Naturales',
    emoji: '🌿',
    color: 'green',
    oa: 'OA 01 - OA 06',
    desc: 'Los 5 sentidos, seres vivos, plantas y fauna chilena.'
  },
  {
    id: 'lenguaje',
    name: 'Lenguaje y Comunicación',
    emoji: '📖',
    color: 'orange',
    oa: 'OA 02 - OA 08',
    desc: 'Conciencia fonológica, vocales, rimas y vocabulario.'
  },
  {
    id: 'logica',
    name: 'Lógica y Pensamiento',
    emoji: '💡',
    color: 'purple',
    oa: 'Transversal',
    desc: 'Patrones repetitivos, secuencias y acertijos visuales.'
  },
  {
    id: 'historia',
    name: 'Historia y Geografía',
    emoji: '🏛️',
    color: 'red',
    oa: 'OA 01 - OA 05',
    desc: 'Entorno familiar, puntos cardinales, paisajes y Chile.'
  },
  {
    id: 'ingles',
    name: 'Inglés Temprano',
    emoji: '🇬🇧',
    color: 'blue',
    oa: 'Vocabulario',
    desc: 'Saludos, números (1-10), colores y familia en inglés.'
  }
];

export const ACHIEVEMENTS = [
  {
    id: 'first_win',
    title: 'Primer Acierto',
    emoji: '🌟',
    desc: 'Acierta tu primera pregunta didáctica.',
    check: (p) => (p.stars || 0) >= 3
  },
  {
    id: 'streak_5',
    title: 'Racha Imparable',
    emoji: '🔥',
    desc: 'Consigue 5 aciertos seguidos.',
    check: (p) => (p.highStreak || 0) >= 5
  },
  {
    id: 'stars_150',
    title: 'Bóveda Estelar',
    emoji: '💰',
    desc: 'Acumula 150 estrellas doradas.',
    check: (p) => (p.stars || 0) >= 150
  },
  {
    id: 'shop_buyer',
    title: 'Moda Mochi',
    emoji: '🧢',
    desc: 'Consigue tu primer accesorio en la Tienda.',
    check: (p) => (p.inventory || []).length > 0
  },
  {
    id: 'level_3',
    title: 'Aventurera Sabia',
    emoji: '🏆',
    desc: 'Alcanza el Nivel 3 de Explorador.',
    check: (p) => (p.level || 1) >= 3
  },
  {
    id: 'math_expert',
    title: 'Genio de Números',
    emoji: '🧮',
    desc: 'Acierta 10 preguntas de Matemáticas.',
    check: (p) => (p.missions && p.missions.mathCorrect >= 10)
  },
  {
    id: 'games_5',
    title: 'Exploradora Activa',
    emoji: '🎮',
    desc: 'Juega 5 partidas en Kimi Panda.',
    check: (p) => (p.missions && p.missions.gamesPlayed >= 5)
  },
  {
    id: 'grand_master',
    title: 'Mente Brillante',
    emoji: '👑',
    desc: 'Llega al Nivel 5 de conocimiento.',
    check: (p) => (p.level || 1) >= 5
  }
];

export function evaluateAchievements() {
  const profile = getProfile();
  let newlyUnlocked = [];

  ACHIEVEMENTS.forEach(ach => {
    if (!(profile.achievements || []).includes(ach.id) && ach.check(profile)) {
      unlockAchievement(ach.id);
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    playStar();
    showToast(`¡Nuevo Logro: ${newlyUnlocked[0].title}! 🏆`);
  }
}

export function renderAchievementsUI() {
  evaluateAchievements();
  const profile = getProfile();
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;

  grid.innerHTML = '';

  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = (profile.achievements || []).includes(ach.id);

    const card = document.createElement('article');
    card.className = `ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;

    card.innerHTML = `
      <div class="ach-icon" aria-hidden="true">${isUnlocked ? ach.emoji : '🔒'}</div>
      <div class="ach-info">
        <h3 class="ach-title">${ach.title}</h3>
        <p class="ach-desc">${ach.desc}</p>
      </div>
      <div class="ach-badge" aria-label="${isUnlocked ? 'Logro obtenido' : 'Logro bloqueado'}">
        ${isUnlocked ? '✓ Obtenido' : 'Pendiente'}
      </div>
    `;

    grid.appendChild(card);
  });
}

export function renderSkillsUI() {
  const stats = getCategoryStats();
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = '';

  CURRICULAR_DOMAINS.forEach(dom => {
    const s = stats[dom.id] || { total: 0, correct: 0 };
    const correct = s.correct || 0;
    const total = s.total || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Rango de dominio según aciertos acumulados
    let rankName = 'Semilla 🌱';
    let progressVal = Math.min(100, (correct / 15) * 100);
    if (correct >= 15) {
      rankName = 'Maestro Panda 👑';
    } else if (correct >= 8) {
      rankName = 'Explorador 🧭';
    } else if (correct >= 3) {
      rankName = 'Aprendiz 🎒';
    }

    const card = document.createElement('article');
    card.className = `skill-card ${dom.color}`;

    card.innerHTML = `
      <div class="skill-card-header">
        <span class="skill-emoji" aria-hidden="true">${dom.emoji}</span>
        <div class="skill-info">
          <div class="skill-title-row">
            <h3 class="skill-name">${dom.name}</h3>
            <span class="skill-oa-badge">${dom.oa}</span>
          </div>
          <p class="skill-desc">${dom.desc}</p>
        </div>
      </div>
      <div class="skill-metrics">
        <div class="skill-rank-pill">${rankName}</div>
        <div class="skill-stats-txt">
          <span>Aciertos: <strong>${correct}</strong></span>
          ${total > 0 ? `<span class="skill-pct">(${percent}%)</span>` : ''}
        </div>
      </div>
      <div class="skill-bar" role="progressbar" aria-valuenow="${progressVal}" aria-valuemin="0" aria-valuemax="100">
        <i class="skill-bar-fill ${dom.color}" style="width: ${progressVal}%;"></i>
      </div>
    `;

    grid.appendChild(card);
  });
}

export function switchAchievementsTab(tabName = 'trophies') {
  const btnTrophies = document.getElementById('tab-btn-trophies');
  const btnSkills = document.getElementById('tab-btn-skills');
  const gridTrophies = document.getElementById('achievements-grid');
  const gridSkills = document.getElementById('skills-grid');
  const title = document.getElementById('ach-main-title');
  const desc = document.getElementById('ach-main-desc');

  if (tabName === 'skills') {
    if (btnTrophies) { btnTrophies.classList.remove('active'); btnTrophies.setAttribute('aria-selected', 'false'); }
    if (btnSkills) { btnSkills.classList.add('active'); btnSkills.setAttribute('aria-selected', 'true'); }
    if (gridTrophies) gridTrophies.style.display = 'none';
    if (gridSkills) gridSkills.style.display = 'grid';
    if (title) title.textContent = 'Destrezas Curriculares';
    if (desc) desc.textContent = 'Tu progreso según el currículum Mineduc';
    renderSkillsUI();
  } else {
    if (btnSkills) { btnSkills.classList.remove('active'); btnSkills.setAttribute('aria-selected', 'false'); }
    if (btnTrophies) { btnTrophies.classList.add('active'); btnTrophies.setAttribute('aria-selected', 'true'); }
    if (gridSkills) gridSkills.style.display = 'none';
    if (gridTrophies) gridTrophies.style.display = 'grid';
    if (title) title.textContent = 'Sala de Trofeos';
    if (desc) desc.textContent = 'Tus logros y medallas ganadas';
    renderAchievementsUI();
  }
}
