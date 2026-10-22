/**
 * KIMI PANDA — MOTOR PRINCIPAL DE JUEGO (Máquina de Estados de Ronda)
 */

import { getRandomRound, getCategoryRound, hasImage } from './db.js';
import {
  getProfile,
  addStars,
  addXP,
  decrementHeart,
  resetHearts,
  rechargeHeart,
  isSecondChanceUsed,
  setSecondChanceUsed,
  resetRoundSecondChance,
  unlockNextWorldLevel,
  recordMissionProgress,
  recordLevelStars,
  recordCategoryAnswer,
  recordStreak
} from './store.js';
import {
  playPop,
  playCorrect,
  playWrongSoft,
  playStar,
  playLevelUp,
  playMagic,
  playHint,
  playFanfare3Stars
} from './audio.js';
import { showScreen, showToast, burstConfetti, renderHearts } from './ui.js';
import { speakQuestion, stopSpeaking } from './speech.js';

let currentRound = [];
let currentQuestionIndex = 0;
let roundStarsEarned = 0;
let roundXpEarned = 0;
let roundErrorsCount = 0;
let currentWorldId = null;
let currentWorldCategory = null;
let currentWorldName = null;
let currentLevelNumber = null;
let helper5050Used = false;
let helperHintUsed = false;
let currentRoundToken = 0;
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
  currentRoundToken++;
  currentWorldId = null;
  currentWorldCategory = null;
  currentWorldName = null;
  currentLevelNumber = null;
  roundErrorsCount = 0;
  currentRound = await getRandomRound(ROUND_SIZE);
  currentQuestionIndex = 0;
  roundStarsEarned = 0;
  roundXpEarned = 0;
  helper5050Used = false;
  helperHintUsed = false;
  resetHearts();
  resetRoundSecondChance();

  initHelpers();
  updateHUD();
  showScreen('scr-game');
  loadQuestion(currentQuestionIndex);
}

export async function startWorldRound(worldId, category, level, worldName) {
  playPop();
  currentRoundToken++;
  currentWorldId = worldId;
  currentWorldCategory = category;
  currentWorldName = worldName;
  currentLevelNumber = level;
  roundErrorsCount = 0;
  currentRound = await getCategoryRound(category, 5, level);
  currentQuestionIndex = 0;
  roundStarsEarned = 0;
  roundXpEarned = 0;
  helper5050Used = false;
  helperHintUsed = false;
  resetHearts();
  resetRoundSecondChance();

  initHelpers();
  updateHUD();
  showScreen('scr-game');
  loadQuestion(currentQuestionIndex);
}

export function retryCurrentRound() {
  playPop();
  resetHearts();
  resetRoundSecondChance();
  if (currentWorldId && currentWorldCategory && currentLevelNumber) {
    startWorldRound(currentWorldId, currentWorldCategory, currentLevelNumber, currentWorldName);
  } else {
    startFreePlayRound();
  }
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
    const msg = q.hint || '¡Observa con atención la pregunta y piensa con calma!';
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
    showRoundSummary(false);
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

  // Lector por Voz Accesible (TTS Infantil)
  const speakBtn = document.getElementById('btn-speak-q');
  if (speakBtn) {
    speakBtn.onclick = () => {
      speakQuestion(q);
    };
  }

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

  // Barra de progreso (1 a 6) con llegada al 100% en paso final
  if (progBar) {
    const totalQ = currentRound.length || ROUND_SIZE;
    const percent = Math.min(100, Math.round(((index + 1) / totalQ) * 100));
    progBar.style.width = `${percent}%`;
    progBar.setAttribute('aria-valuenow', percent);
  }

  // Generar 4 opciones mecánicas 2x2 con Fisher-Yates runtime shuffle anti-sesgo
  if (answersBox) {
    answersBox.innerHTML = '';
    const optsWithStatus = q.opts.map((optText, optIdx) => ({
      text: optText,
      isCorrect: optIdx === q.correct
    }));

    // Fisher-Yates shuffle
    for (let i = optsWithStatus.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optsWithStatus[i], optsWithStatus[j]] = [optsWithStatus[j], optsWithStatus[i]];
    }

    optsWithStatus.forEach((optObj, slotIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pbtn';
      btn.dataset.correct = optObj.isCorrect ? '1' : '0';
      btn.textContent = optObj.text;
      btn.style.animation = `screenIn 0.35s var(--bouncy) ${slotIdx * 0.05}s backwards`;
      btn.onclick = () => handleAnswer(btn, optObj.isCorrect);
      answersBox.appendChild(btn);
    });
  }
}

function handleAnswer(clickedBtn, isCorrect) {
  stopSpeaking();
  const token = currentRoundToken;
  // Deshabilitar todos los botones durante la resolución
  const allBtns = document.querySelectorAll('#answers .pbtn');
  allBtns.forEach(b => { b.disabled = true; });

  if (isCorrect) {
    recordStreak(true);
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
      if (token !== currentRoundToken) return;
      currentQuestionIndex++;
      if (currentQuestionIndex >= currentRound.length) {
        showRoundSummary(false);
      } else {
        loadQuestion(currentQuestionIndex);
      }
    }, advanceDelay);
  } else {
    recordStreak(false);
    roundErrorsCount++;
    const currentQ = currentRound[currentQuestionIndex];
    if (currentQ && currentQ.cat) {
      recordCategoryAnswer(currentQ.cat, false);
    }

    clickedBtn.classList.add('wrong');
    playWrongSoft();
    const remainingHearts = decrementHeart();
    updateHUD();

    if (remainingHearts <= 0) {
      // Comprobar si ya se usó la Segunda Oportunidad de Mochi en esta ronda
      if (!isSecondChanceUsed()) {
        setSecondChanceUsed(true);
        const delayModal = (typeof navigator !== 'undefined' && navigator.webdriver) ? 100 : 450;
        setTimeout(() => {
          if (token !== currentRoundToken) return;
          showMochiSecondChanceModal(allBtns);
        }, delayModal);
        return;
      } else {
        // Cierre Amable de Ronda (Soft Fail)
        const delaySummary = (typeof navigator !== 'undefined' && navigator.webdriver) ? 150 : 600;
        setTimeout(() => {
          if (token !== currentRoundToken) return;
          showRoundSummary(true);
        }, delaySummary);
        return;
      }
    }

    showToast('¡Casi! Inténtalo otra vez');

    const retryDelay = (typeof navigator !== 'undefined' && navigator.webdriver) ? 200 : 900;
    setTimeout(() => {
      if (token !== currentRoundToken) return;
      allBtns.forEach(b => {
        b.disabled = false;
        b.classList.remove('wrong');
      });
    }, retryDelay);
  }
}

function showMochiSecondChanceModal(allBtns) {
  const modal = document.getElementById('mochi-help-modal');
  if (!modal) {
    rechargeHeart(1);
    updateHUD();
    allBtns.forEach(b => {
      b.disabled = false;
      b.classList.remove('wrong');
    });
    return;
  }

  // Listener para evento 'cancel' (pulsar tecla Escape en el diálogo)
  modal.addEventListener('cancel', () => {
    allBtns.forEach(b => {
      b.disabled = false;
      b.classList.remove('wrong');
    });
  }, { once: true });
  if (!modal) {
    rechargeHeart(1);
    updateHUD();
    allBtns.forEach(b => {
      b.disabled = false;
      b.classList.remove('wrong');
    });
    return;
  }

  const btnRecharge = document.getElementById('btn-mochi-recharge');
  const imgMochi = document.getElementById('mochi-help-img');

  function handleRecharge() {
    playMagic();
    rechargeHeart(1);
    updateHUD();
    try {
      modal.close();
    } catch (e) {
      modal.style.display = 'none';
    }

    allBtns.forEach(b => {
      b.disabled = false;
      b.classList.remove('wrong');
    });

    showToast('¡Corazón recuperado! ¡Tú puedes! 💖');

    if (btnRecharge) btnRecharge.onclick = null;
    if (imgMochi) imgMochi.onclick = null;
  }

  if (btnRecharge) btnRecharge.onclick = handleRecharge;
  if (imgMochi) imgMochi.onclick = handleRecharge;

  try {
    modal.showModal();
  } catch (e) {
    modal.setAttribute('open', '');
  }
}

export function showRoundSummary(isSoftFail = false) {
  stopSpeaking();
  const summaryTitle = document.getElementById('summary-title');
  const summaryMascot = document.getElementById('summary-mascot');
  const summaryEncouragement = document.getElementById('summary-encouragement');
  const btnRetry = document.getElementById('btn-summary-retry');
  const btnDone = document.getElementById('btn-summary-done');
  const summaryStars = document.getElementById('summary-stars');

  if (isSoftFail) {
    playWrongSoft();
    // Otorgar 1 ⭐ de perseverancia
    addStars(1);
    roundStarsEarned += 1;

    if (summaryTitle) summaryTitle.textContent = '¡Buen esfuerzo! Practiquemos juntos 🐼';
    if (summaryMascot) summaryMascot.src = 'assets/mascotas/mochi_avatar.webp';
    if (summaryEncouragement) summaryEncouragement.textContent = '¡El cerebro es como un músculo: crece con cada reto!';

    if (btnRetry) {
      btnRetry.style.display = 'block';
      btnRetry.textContent = 'Reintentar Ronda 🔄';
      btnRetry.onclick = () => retryCurrentRound();
    }
    if (btnDone) {
      btnDone.textContent = '¡Continuar al Hub! 🚀';
      btnDone.onclick = () => {
        if (typeof window !== 'undefined' && typeof window.returnToHub === 'function') {
          window.returnToHub();
        } else {
          showScreen('scr-hub');
        }
      };
    }

    if (summaryStars) {
      summaryStars.textContent = `+${roundStarsEarned} ⭐ · +${roundXpEarned} XP`;
    }

    renderSummaryStarsUI(1, true);
  } else {
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

    if (summaryTitle) summaryTitle.textContent = '¡Ronda Superada!';
    if (summaryMascot) summaryMascot.src = 'assets/mascotas/mochi_celebrate.webp';
    if (summaryEncouragement) summaryEncouragement.textContent = '¡Excelente trabajo de agilidad mental!';

    if (btnRetry) {
      btnRetry.style.display = 'none';
      btnRetry.onclick = null;
    }
    if (btnDone) {
      btnDone.textContent = '¡Continuar al Hub! 🚀';
      btnDone.onclick = () => {
        if (typeof window !== 'undefined' && typeof window.returnToHub === 'function') {
          window.returnToHub();
        } else {
          showScreen('scr-hub');
        }
      };
    }

    if (summaryStars) {
      summaryStars.textContent = `+${roundStarsEarned} ⭐ · +${roundXpEarned} XP`;
    }

    renderSummaryStarsUI(starsRating, false);
  }

  showScreen('scr-summary');
}

function renderSummaryStarsUI(stars, isSoftFail = false) {
  const container = document.getElementById('summary-rating-stars');
  const praise = document.getElementById('summary-rating-praise');
  if (container) {
    container.innerHTML = `
      <span class="rating-star ${stars >= 1 ? 'earned' : 'empty'}" style="animation-delay: 0.05s">⭐</span>
      <span class="rating-star ${(!isSoftFail && stars >= 2) ? 'earned' : 'empty'}" style="animation-delay: 0.2s">⭐</span>
      <span class="rating-star ${(!isSoftFail && stars >= 3) ? 'earned' : 'empty'}" style="animation-delay: 0.35s">⭐</span>
    `;
  }
  if (praise) {
    if (isSoftFail) {
      praise.textContent = '¡Ganaste 1 ⭐ de perseverancia! Practiquemos juntos 🌱';
      praise.className = 'summary-rating-praise bronze';
    } else if (stars === 3) {
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
