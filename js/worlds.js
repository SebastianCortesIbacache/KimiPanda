/**
 * KIMI PANDA — MAPA DE MUNDOS CURRICULARES (worlds.js)
 */

import { getProfile } from './store.js';
import { playPop, playWorldSelect } from './audio.js';
import { startWorldRound } from './game.js';

export const WORLDS = [
  {
    id: 'inicio',
    name: 'Isla Inicio',
    emoji: '🌴',
    category: ['matematicas', 'ciencias', 'lenguaje', 'logica'],
    color: 'green',
    desc: '¡Tu primera parada de entrenamiento!'
  },
  {
    id: 'matematicas',
    name: 'Bosque Matemático',
    emoji: '🌲',
    category: 'matematicas',
    color: 'amber',
    desc: 'Sumas, restas, conteo y figuras geométricas.'
  },
  {
    id: 'ciencias',
    name: 'Océano de Ciencias',
    emoji: '🌊',
    category: 'ciencias',
    color: 'blue',
    desc: 'Animales de Chile, plantas y los 5 sentidos.'
  },
  {
    id: 'logica',
    name: 'Laboratorio de Lógica',
    emoji: '🔬',
    category: 'logica',
    color: 'purple',
    desc: 'Secuencias, patrones y acertijos deductivos.'
  },
  {
    id: 'lenguaje',
    name: 'Montaña del Lenguaje',
    emoji: '🏔️',
    category: 'lenguaje',
    color: 'orange',
    desc: 'Vocales, consonantes, rimas y comprensión.'
  },
  {
    id: 'historia',
    name: 'Volcán de Historia e Inglés',
    emoji: '🌋',
    category: ['historia', 'ingles'],
    color: 'red',
    desc: 'Tradiciones, colores, familia y primeras palabras.'
  }
];

export function renderWorldsUI() {
  const profile = getProfile();
  const grid = document.getElementById('worlds-grid');
  if (!grid) return;

  grid.innerHTML = '';

  WORLDS.forEach(world => {
    const unlockedLevel = (profile.worldLevels && profile.worldLevels[world.id]) || 1;

    const card = document.createElement('article');
    card.className = `world-card ${world.color}`;

    // Nodos de los 5 niveles
    let levelsHtml = '';
    for (let lvl = 1; lvl <= 5; lvl++) {
      const isUnlocked = lvl <= unlockedLevel;
      const isPassed = lvl < unlockedLevel;
      const starsEarned = (profile.levelStars && profile.levelStars[world.id] && profile.levelStars[world.id][lvl]) || 0;
      const hasStars = starsEarned > 0;

      let starsBadgeHtml = '';
      if (hasStars) {
        starsBadgeHtml = `<span class="lvl-stars-mini" aria-hidden="true">${'⭐'.repeat(starsEarned)}</span>`;
      }

      levelsHtml += `
        <button type="button" 
          class="lvl-node ${isPassed ? 'passed' : ''} ${isUnlocked ? 'open' : 'locked'} ${hasStars ? 'has-stars' : ''}" 
          data-world="${world.id}" 
          data-lvl="${lvl}" 
          data-stars="${starsEarned}"
          ${!isUnlocked ? 'disabled' : ''}
          aria-label="${world.name} Nivel ${lvl} ${!isUnlocked ? 'Bloqueado' : isPassed ? 'Superado' : 'Disponible'}${hasStars ? ` (${starsEarned} estrellas)` : ''}">
          <span class="lvl-num">${isUnlocked ? (isPassed && !hasStars ? '⭐' : lvl) : '🔒'}</span>
          ${starsBadgeHtml}
        </button>
      `;
    }

    card.innerHTML = `
      <div class="world-card-header">
        <span class="world-emoji" aria-hidden="true">${world.emoji}</span>
        <div>
          <h3 class="world-title">${world.name}</h3>
          <p class="world-desc">${world.desc}</p>
        </div>
      </div>
      <div class="world-levels-track" role="group" aria-label="Niveles de ${world.name}">
        ${levelsHtml}
      </div>
    `;

    // Conectar botones de nivel
    card.querySelectorAll('.lvl-node.open').forEach(btn => {
      btn.onclick = () => {
        playWorldSelect();
        const lvl = parseInt(btn.dataset.lvl, 10);
        startWorldRound(world.id, world.category, lvl, world.name);
      };
    });

    grid.appendChild(card);
  });
}
