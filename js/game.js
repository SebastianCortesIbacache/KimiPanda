/**
 * KIMI PANDA — MOTOR PRINCIPAL DE JUEGO (Máquina de Estados de Ronda)
 */

import { getRandomRound, getCategoryRound, hasImage } from './db.js';
import { getProfile, addStars, addXP, decrementHeart, resetHearts, unlockNextWorldLevel, recordMissionProgress, recordLevelStars, recordCategoryAnswer } from './store.js';
import { playPop, playCorrect, playWrongSoft, playStar, playLevelUp, playMagic, playHint, playFanfare3Stars } from './audio.js';
import { showScreen, showToast, burstConfetti, renderHearts } from './ui.js';

let currentRound = [];
let currentQuestionIndex = 0;
let roundStarsEarned = 0;
let roundXpEarned = 0;
let roundErrorsCount = 0;
let currentWorldId = null;
let currentLevelNumber = null;
let helper5050Used = false;
let helperHintUsed = false;
const ROUND_SIZE = 6;

const PRAISES = [
  '¡Increíble! +3 ⭐',
  '¡Genial! +3 ⭐',
  '¡Seco! +3 ⭐',
  '¡Fantástico! +3 ⭐',
  '¡Maravilloso! +3 ⭐'
];

export async function startFreePlayRound() {
  playPop();
  currentWorldId = null;
  currentLevelNumber = null;
  roundErrorsCount = 0;
  currentRound = await getRandomRound(ROUND_SIZE);
  currentQuestionIndex = 0;
  roundStarsEarned = 0;
  roundXpEarned = 0;
  helper5050Used = false;
  helperHintUsed = false;
  resetHearts();

  initHelpers();
  updateHUD();
  showScreen('scr-game');
  loadQuestion(currentQuestionIndex);
}

export async function startWorldRound(worldId, category, level, worldName) {
  playPop();
  currentWorldId = worldId;
  currentLevelNumber = level;
  roundErrorsCount = 0;
  currentRound = await getCategoryRound(category, 5);
  currentQuestionIndex = 0;
  roundStarsEarned = 0;
  roundXpEarned = 0;
  helper5050Used = false;
  helperHintUsed = false;
  resetHearts();

  initHelpers();
  updateHUD();
  showScreen('scr-game');
  loadQuestion(currentQuestionIndex);
}

function initHelpers() {
  const btn5050 = document.getElementById('btn-helper-5050');
  const badge5050 = document.getElementById('badge-5050');
  const btnHint = document.getElementById('btn-helper-hint');
  const badgeHint = document.getElementById('badge-hint');
  const hintBox = document.getElementById('q-hint-box');

  if (hintBox) hintBox.style.display = 'none';

  if (btn5050 && badge5050) {
    btn5050.disabled = helper5050Used;
    btn5050.classList.toggle('used', helper5050Used);
    badge5050.textContent = helper5050Used ? '0' : '1';
    btn5050.onclick = () => use5050Helper();
  }

  if (btnHint && badgeHint) {
    btnHint.disabled = helperHintUsed;
    btnHint.classList.toggle('used', helperHintUsed);
    badgeHint.textContent = helperHintUsed ? '0' : '1';
    btnHint.onclick = () => useHintHelper();
  }
}

function use5050Helper() {
  if (helper5050Used) return;
  helper5050Used = true;
  playMagic();

  const btn5050 = document.getElementById('btn-helper-5050');
  const badge5050 = document.getElementById('badge-5050');
  if (btn5050) {
    btn5050.disabled = true;
    btn5050.classList.add('used');
  }
  if (badge5050) badge5050.textContent = '0';

  const wrongBtns = Array.from(document.querySelectorAll('#answers .pbtn[data-correct="0"]'));
  const toDisable = wrongBtns.slice(0, 2);
  toDisable.forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.25';
    b.style.pointerEvents = 'none';
  });

  showToast('¡Escudo Mochi activado! ❄️');
}

function useHintHelper() {
  if (helperHintUsed) return;
  helperHintUsed = true;
  playHint();

  const btnHint = document.getElementById('btn-helper-hint');
  const badgeHint = document.getElementById('badge-hint');
  if (btnHint) {
    btnHint.disabled = true;
    btnHint.classList.add('used');
  }
  if (badgeHint) badgeHint.textContent = '0';

  const q = currentRound[currentQuestionIndex];
  const hintBox = document.getElementById('q-hint-box');
  const hintText = document.getElementById('q-hint-text');

  if (hintBox && hintText && q) {
    let msg = '¡Cuenta despacio y fíjate bien!';
    if (q.cat === 'matematicas') msg = '¡Usa tus deditos o suma paso a paso!';
    else if (q.cat === 'ciencias') msg = '¡Piensa en lo que has visto en la naturaleza!';
    else if (q.cat === 'lenguaje') msg = '¡Escucha cómo suena cada palabra!';
    else if (q.cat === 'logica') msg = '¡Mira qué elemento se repite!';

    hintText.textContent = msg;
    hintBox.style.display = 'flex';
  }

  showToast('¡Pista de Sabiduría activada! 💡');
}

function updateHUD() {
  const profile = getProfile();
  const heartsContainer = document.getElementById('hearts');
  if (heartsContainer) {
    renderHearts(heartsContainer, profile.hearts, profile.maxHearts);
  }

  const gStars = document.getElementById('g-stars');
  if (gStars) {
    gStars.textContent = profile.stars;
  }
}

function loadQuestion(index) {
  if (index >= currentRound.length) {
    showRoundSummary();
    return;
  }

  const q = currentRound[index];
  const qCard = document.querySelector('.qcard');
  const qCat = document.getElementById('q-cat');
  const qText = document.getElementById('q-text');
  const qMediaFrame = document.querySelector('.q-media-frame');
  const qMediaImg = document.getElementById('q-media-img');
  const progBar = document.getElementById('prog');
  const answersBox = document.getElementById('answers');
  const hintBox = document.getElementById('q-hint-box');
  if (hintBox) hintBox.style.display = 'none';

  // Actualizar categoría
  const CAT_NAMES = {
    matematicas: 'Matemáticas',
    ciencias: 'Ciencias',
    lenguaje: 'Lenguaje',
    logica: 'Lógica',
    historia: 'Historia',
    ingles: 'Inglés'
  };
  if (qCat) qCat.textContent = CAT_NAMES[q.cat] || q.cat || 'General';

  // Componente Adaptativo (has-image vs text-only)
  if (hasImage(q)) {
    if (qCard) {
      qCard.classList.remove('text-only');
      qCard.classList.add('has-image');
    }
    if (qMediaFrame) qMediaFrame.style.display = 'flex';
    if (qMediaImg) {
      qMediaImg.alt = 'Ilustración educativa';
      qMediaImg.onerror = () => {
        // Fallback defensivo ante cualquier error de red o carga
        if (qMediaFrame) qMediaFrame.style.display = 'none';
        if (qCard) {
          qCard.classList.remove('has-image');
          qCard.classList.add('text-only');
        }
      };
      qMediaImg.onload = () => {
        if (qMediaFrame) qMediaFrame.style.display = 'flex';
      };
      qMediaImg.src = q.img;
    }
  } else {
    if (qCard) {
      qCard.classList.remove('has-image');
      qCard.classList.add('text-only');
    }
    if (qMediaFrame) qMediaFrame.style.display = 'none';
    if (qMediaImg) {
      qMediaImg.src = '';
      qMediaImg.alt = '';
      qMediaImg.onerror = null;
      qMediaImg.onload = null;
    }
  }

  // Texto de la pregunta
  if (qText) qText.textContent = q.q;

  // Barra de progreso (1 a 6)
  if (progBar) {
    const percent = Math.round((index / ROUND_SIZE) * 100);
    progBar.style.width = `${percent}%`;
  }

  // Generar 4 opciones mecánicas 2x2
  if (answersBox) {
    answersBox.innerHTML = '';
    q.opts.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pbtn';
      btn.dataset.correct = (optIdx === q.correct) ? '1' : '0';
      btn.textContent = optText;
      btn.style.animation = `screenIn 0.35s var(--bouncy) ${optIdx * 0.05}s backwards`;
      btn.onclick = () => handleAnswer(btn, optIdx === q.correct);
      answersBox.appendChild(btn);
    });
  }
}

function handleAnswer(clickedBtn, isCorrect) {
  // Deshabilitar todos los botones durante la resolución
  const allBtns = document.querySelectorAll('#answers .pbtn');
  allBtns.forEach(b => { b.disabled = true; });

  if (isCorrect) {
    clickedBtn.classList.add('correct');
    playCorrect();
    playStar();

    addStars(3);
    roundStarsEarned += 3;

    // Sumar XP
    const { level, leveledUp } = addXP(15);
    roundXpEarned += 15;
    updateHUD();

    // Misión semanal: aciertos matemáticos
    const currentQ = currentRound[currentQuestionIndex];
    if (currentQ && currentQ.cat === 'matematicas') {
      recordMissionProgress('mathCorrect', 1);
    }
    if (currentQ && currentQ.cat) {
      recordCategoryAnswer(currentQ.cat, true);
    }

    burstConfetti(clickedBtn);

    if (leveledUp) {
      playLevelUp();
      showToast(`¡SUBISTE A NIVEL ${level}! 🏆 +10 ⭐`);
    } else {
      const praise = PRAISES[Math.floor(Math.random() * PRAISES.length)];
      showToast(praise);
    }

    const advanceDelay = (typeof navigator !== 'undefined' && navigator.webdriver) ? 300 : 1400;
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex >= currentRound.length) {
        showRoundSummary();
      } else {
        loadQuestion(currentQuestionIndex);
      }
    }, advanceDelay);
  } else {
    roundErrorsCount++;
    const currentQ = currentRound[currentQuestionIndex];
    if (currentQ && currentQ.cat) {
      recordCategoryAnswer(currentQ.cat, false);
    }

    clickedBtn.classList.add('wrong');
    playWrongSoft();
    decrementHeart();
    updateHUD();

    showToast('¡Casi! Inténtalo otra vez');

    const retryDelay = (typeof navigator !== 'undefined' && navigator.webdriver) ? 200 : 900;
    setTimeout(() => {
      allBtns.forEach(b => {
        b.disabled = false;
        b.classList.remove('wrong');
      });
    }, retryDelay);
  }
}

function showRoundSummary() {
  recordMissionProgress('gamesPlayed', 1);

  let starsRating = 3;
  if (roundErrorsCount === 1) {
    starsRating = 2;
  } else if (roundErrorsCount >= 2) {
    starsRating = 1;
  }

  if (currentWorldId && currentLevelNumber) {
    recordLevelStars(currentWorldId, currentLevelNumber, starsRating);
    unlockNextWorldLevel(currentWorldId);
  } else if (currentWorldId) {
    unlockNextWorldLevel(currentWorldId);
  }

  if (starsRating === 3) {
    playFanfare3Stars();
  } else {
    playStar();
  }

  const summaryStars = document.getElementById('summary-stars');
  if (summaryStars) {
    summaryStars.textContent = `+${roundStarsEarned} ⭐ · +${roundXpEarned} XP`;
  }

  renderSummaryStarsUI(starsRating);
  showScreen('scr-summary');
}

function renderSummaryStarsUI(stars) {
  const container = document.getElementById('summary-rating-stars');
  const praise = document.getElementById('summary-rating-praise');
  if (container) {
    container.innerHTML = `
      <span class="rating-star ${stars >= 1 ? 'earned' : 'empty'}" style="animation-delay: 0.05s">⭐</span>
      <span class="rating-star ${stars >= 2 ? 'earned' : 'empty'}" style="animation-delay: 0.2s">⭐</span>
      <span class="rating-star ${stars >= 3 ? 'earned' : 'empty'}" style="animation-delay: 0.35s">⭐</span>
    `;
  }
  if (praise) {
    if (stars === 3) {
      praise.textContent = '¡Ronda Perfecta! ¡Eres increíble! 🌟';
      praise.className = 'summary-rating-praise gold';
    } else if (stars === 2) {
      praise.textContent = '¡Excelente Trabajo! ¡Casi perfecto! 👏';
      praise.className = 'summary-rating-praise silver';
    } else {
      praise.textContent = '¡Bien Hecho! ¡Completaste el reto! 💪';
      praise.className = 'summary-rating-praise bronze';
    }
  }
}
