/**
 * KIMI PANDA — ENTRYPOINT PRINCIPAL ESM (main.js)
 */

import { loadProfile, getProfile, saveProfile, toggleAudioMute, claimMissionReward, resetProfile } from './store.js';
import { setMuted, playPop, playChest } from './audio.js';
import { showScreen, showToast, burstConfetti, initSkyFloaties } from './ui.js';
import { startFreePlayRound } from './game.js';
import { renderShopUI, updateHubEquippedHat } from './shop.js';
import { renderWorldsUI } from './worlds.js';
import { renderAchievementsUI, switchAchievementsTab } from './achievements.js';

function updateHubUI() {
  const profile = getProfile();

  const nameEl = document.getElementById('player-name');
  if (nameEl) nameEl.textContent = `¡Hola, ${profile.name || 'Sofía'}!`;

  const subEl = document.getElementById('player-sub');
  if (subEl) subEl.textContent = `${profile.age || 7} años · ${profile.rank || 'Exploradora'}`;

  const hubStarsVal = document.getElementById('hub-stars-val');
  if (hubStarsVal) hubStarsVal.textContent = profile.stars || 0;

  // Actualizar Nivel y XP
  const lvlTxt = document.getElementById('hub-level-txt');
  if (lvlTxt) lvlTxt.textContent = `Nv. ${profile.level || 1}`;

  const xpFill = document.getElementById('hub-xp-fill');
  if (xpFill) {
    const xpCurrent = (profile.xp || 0) % 100;
    xpFill.style.width = `${Math.min(100, xpCurrent)}%`;
  }

  // Actualizar sombreros
  updateHubEquippedHat();

  // Actualizar misiones
  updateMissionsUI(profile);

  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) {
    audioBtn.setAttribute('aria-label', profile.audioMuted ? 'Activar sonido' : 'Silenciar sonido');
    audioBtn.classList.toggle('muted', Boolean(profile.audioMuted));
  }
}

function updateMissionsUI(profile) {
  const missions = profile.missions || { gamesPlayed: 0, mathCorrect: 0, claimed1: false, claimed2: false };

  // Misión 1
  const m1Label = document.getElementById('mission-1-label');
  const m1Bar = document.getElementById('mission-1-bar-fill');
  const m1Reward = document.getElementById('mission-1-reward-pill');
  const m1Claim = document.getElementById('btn-claim-mission-1');
  const played = missions.gamesPlayed || 0;
  const p1 = Math.min(100, Math.round((played / 20) * 100));

  if (m1Label) m1Label.textContent = `Juega 20 partidas (${Math.min(20, played)}/20)`;
  if (m1Bar) m1Bar.style.width = `${p1}%`;

  if (missions.claimed1) {
    if (m1Claim) m1Claim.style.display = 'none';
    if (m1Reward) {
      m1Reward.style.display = 'flex';
      m1Reward.innerHTML = '<span>✓ Reclamado</span>';
    }
  } else if (played >= 20) {
    if (m1Reward) m1Reward.style.display = 'none';
    if (m1Claim) {
      m1Claim.style.display = 'inline-block';
      m1Claim.onclick = (e) => {
        const res = claimMissionReward(1, 180);
        if (res.success) {
          playChest();
          burstConfetti(e.currentTarget);
          showToast('¡Reclamaste +180 ⭐! 🎁');
          updateHubUI();
        }
      };
    }
  } else {
    if (m1Claim) m1Claim.style.display = 'none';
    if (m1Reward) m1Reward.style.display = 'flex';
  }

  // Misión 2
  const m2Label = document.getElementById('mission-2-label');
  const m2Bar = document.getElementById('mission-2-bar-fill');
  const m2Reward = document.getElementById('mission-2-reward-pill');
  const m2Claim = document.getElementById('btn-claim-mission-2');
  const mathHits = missions.mathCorrect || 0;
  const p2 = Math.min(100, Math.round((mathHits / 40) * 100));

  if (m2Label) m2Label.textContent = `Acierta 40 de Matemáticas (${Math.min(40, mathHits)}/40)`;
  if (m2Bar) m2Bar.style.width = `${p2}%`;

  if (missions.claimed2) {
    if (m2Claim) m2Claim.style.display = 'none';
    if (m2Reward) {
      m2Reward.style.display = 'flex';
      m2Reward.innerHTML = '<span>✓ Reclamado</span>';
    }
  } else if (mathHits >= 40) {
    if (m2Reward) m2Reward.style.display = 'none';
    if (m2Claim) {
      m2Claim.style.display = 'inline-block';
      m2Claim.onclick = (e) => {
        const res = claimMissionReward(2, 220);
        if (res.success) {
          playChest();
          burstConfetti(e.currentTarget);
          showToast('¡Reclamaste +220 ⭐! 🎁');
          updateHubUI();
        }
      };
    }
  } else {
    if (m2Claim) m2Claim.style.display = 'none';
    if (m2Reward) m2Reward.style.display = 'flex';
  }
}

export function returnToHub() {
  playPop();
  updateHubUI();
  showScreen('scr-hub');
}

function initEventHandlers() {
  // Navegación de botones principales del Hub
  const btnMundos = document.getElementById('btn-mundos');
  if (btnMundos) {
    btnMundos.onclick = () => {
      playPop();
      renderWorldsUI();
      showScreen('scr-worlds');
    };
  }

  const btnLibre = document.getElementById('btn-libre');
  if (btnLibre) {
    btnLibre.onclick = () => startFreePlayRound();
  }

  const btnTienda = document.getElementById('btn-tienda');
  if (btnTienda) {
    btnTienda.onclick = () => {
      playPop();
      renderShopUI();
      showScreen('scr-shop');
    };
  }

  const btnLogros = document.getElementById('btn-logros');
  if (btnLogros) {
    btnLogros.onclick = () => {
      playPop();
      switchAchievementsTab('trophies');
      showScreen('scr-achievements');
    };
  }

  // Píldora de Nivel abre Destrezas Curriculares directamente
  const hubLevelPill = document.getElementById('hub-level-pill');
  if (hubLevelPill) {
    hubLevelPill.onclick = () => {
      playPop();
      switchAchievementsTab('skills');
      showScreen('scr-achievements');
    };
  }

  // Pestañas dentro de Sala de Logros
  const tabBtnTrophies = document.getElementById('tab-btn-trophies');
  if (tabBtnTrophies) {
    tabBtnTrophies.onclick = () => {
      playPop();
      switchAchievementsTab('trophies');
    };
  }

  const tabBtnSkills = document.getElementById('tab-btn-skills');
  if (tabBtnSkills) {
    tabBtnSkills.onclick = () => {
      playPop();
      switchAchievementsTab('skills');
    };
  }

  // Botones de retorno
  const btnGameBack = document.getElementById('btn-game-back');
  if (btnGameBack) btnGameBack.onclick = () => returnToHub();

  const btnSummaryDone = document.getElementById('btn-summary-done');
  if (btnSummaryDone) btnSummaryDone.onclick = () => returnToHub();

  const btnShopBack = document.getElementById('btn-shop-back');
  if (btnShopBack) btnShopBack.onclick = () => returnToHub();

  const btnWorldsBack = document.getElementById('btn-worlds-back');
  if (btnWorldsBack) btnWorldsBack.onclick = () => returnToHub();

  const btnAchBack = document.getElementById('btn-ach-back');
  if (btnAchBack) btnAchBack.onclick = () => returnToHub();

  // Control de Audio
  const btnAudioToggle = document.getElementById('btn-audio-toggle');
  if (btnAudioToggle) {
    btnAudioToggle.onclick = () => {
      const isMuted = toggleAudioMute();
      setMuted(isMuted);
      updateHubUI();
      if (!isMuted) playPop();
    };
  }

  // Modal de Pasaporte / Perfil
  initProfileModal();

  // Interacción amigable con la mascota del Hub
  const mascotEl = document.getElementById('hub-mascot');
  const bubbleEl = document.getElementById('hub-bubble');
  if (mascotEl && bubbleEl) {
    const PHRASES = [
      '¿Qué jugamos hoy?',
      '¡Vamos a explorar las islas!',
      '¡Tú puedes!',
      '¡Hoy ganaremos muchas estrellas!',
      '¡Eres muy inteligente!',
      '¡Mira mis sombreros en la tienda!'
    ];
    mascotEl.onclick = () => {
      playPop();
      const p = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      bubbleEl.textContent = p;
      bubbleEl.style.animation = 'none';
      void bubbleEl.offsetWidth;
      bubbleEl.style.animation = 'bubblePop 0.4s var(--bouncy)';
    };
  }
}

function initProfileModal() {
  const profileBtn = document.getElementById('hub-profile-btn');
  const modal = document.getElementById('profile-modal');
  const form = document.getElementById('profile-form');
  const nameInput = document.getElementById('input-profile-name');
  const cancelBtn = document.getElementById('btn-profile-cancel');
  const ageBtns = document.querySelectorAll('.profile-age-btn');

  let selectedAge = 7;

  if (profileBtn && modal) {
    profileBtn.onclick = () => {
      playPop();
      const profile = getProfile();
      if (nameInput) nameInput.value = profile.name || 'Sofía';
      selectedAge = profile.age || 7;

      ageBtns.forEach(b => {
        b.classList.toggle('selected', parseInt(b.dataset.age, 10) === selectedAge);
      });

      modal.showModal();
    };
  }

  ageBtns.forEach(b => {
    b.onclick = () => {
      playPop();
      selectedAge = parseInt(b.dataset.age, 10);
      ageBtns.forEach(btn => btn.classList.toggle('selected', btn === b));
    };
  });

  if (cancelBtn && modal) {
    cancelBtn.onclick = () => {
      playPop();
      modal.close();
    };
  }

  if (form && modal) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const newName = (nameInput ? nameInput.value.trim() : '') || 'Sofía';
      saveProfile({ name: newName, age: selectedAge });
      playPop();
      modal.close();
      updateHubUI();
      showToast('¡Pasaporte actualizado! ✨');
    };
  }

  // Reiniciar partida para un nuevo estudiante
  const resetBtn = document.getElementById('btn-profile-reset');
  if (resetBtn && modal) {
    let confirmPending = false;
    resetBtn.onclick = () => {
      playPop();
      if (!confirmPending) {
        confirmPending = true;
        resetBtn.textContent = '¿Confirmar reinicio? Toca aquí ⚠️';
        resetBtn.style.color = '#B03A2E';
        setTimeout(() => {
          confirmPending = false;
          if (resetBtn) {
            resetBtn.textContent = '🔄 Reiniciar partida (Nuevo explorador)';
            resetBtn.style.color = '#C84B43';
          }
        }, 3500);
      } else {
        resetProfile();
        modal.close();
        updateHubUI();
        showToast('¡Partida reiniciada para nuevo explorador! ✨');
        confirmPending = false;
        resetBtn.textContent = '🔄 Reiniciar partida (Nuevo explorador)';
        resetBtn.style.color = '#C84B43';
      }
    };
  }
}

let deferredInstallPrompt = null;
function initPwaInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('btn-pwa-install');
    if (installBtn) installBtn.style.display = 'block';
  });

  const installBtn = document.getElementById('btn-pwa-install');
  if (installBtn) {
    installBtn.onclick = async () => {
      playPop();
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          showToast('¡Kimi Panda instalado en tu pantalla! 📲');
        }
        deferredInstallPrompt = null;
        installBtn.style.display = 'none';
      }
    };
  }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('[SW] Error en registro:', err);
      });
    });
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  const profile = loadProfile();
  setMuted(profile.audioMuted);
  updateHubUI();
  initEventHandlers();
  initSkyFloaties();
  initPwaInstall();
  registerServiceWorker();

  // Mostrar Hub inicial
  showScreen('scr-hub');
});
