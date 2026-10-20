/**
 * KIMI PANDA — MOTOR DE AUDIO SINTETIZADO (Web Audio API)
 * Ligero, sin dependencias, latencia 0ms, 100% resiliente offline.
 */

let ctx = null;
let muted = false;

function getAudioContext() {
  if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

export function setMuted(val) {
  muted = Boolean(val);
}

export function isMuted() {
  return muted;
}

/**
 * Pop mecánico al presionar botones táctiles
 */
export function playPop() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const now = ac.currentTime;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(380, now);
  osc.frequency.exponentialRampToValueAtTime(760, now + 0.08);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Acorde mayor brillante (Do - Mi - Sol) para acierto
 */
export function playCorrect() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const now = ac.currentTime + idx * 0.07;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  });
}

/**
 * Tono suave y cálido para error (sin alarma ni pánico)
 */
export function playWrongSoft() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, now);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

/**
 * Tintineo metálico dulce al sumar estrellas
 */
export function playStar() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(987.77, now); // B5
  osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

/**
 * Tintineo alegre de compra en la tienda (caja registradora estelar)
 */
export function playBuy() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const notes = [659.25, 987.77, 1318.51, 1975.53]; // E5, B5, E6, B6
  notes.forEach((freq, idx) => {
    const now = ac.currentTime + idx * 0.05;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  });
}

/**
 * Pop elástico de equipar accesorio
 */
export function playEquip() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.11);
}

/**
 * Fanfarria triunfal ascendente al subir de nivel (Level Up)
 */
export function playLevelUp() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const chords = [
    { freq: 523.25, time: 0.0 },  // C5
    { freq: 659.25, time: 0.1 },  // E5
    { freq: 783.99, time: 0.2 },  // G5
    { freq: 1046.50, time: 0.35 } // C6 (sostenido)
  ];

  chords.forEach(({ freq, time }) => {
    const now = ac.currentTime + time;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const dur = time >= 0.35 ? 0.5 : 0.2;
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + dur + 0.05);
  });
}

/**
 * Tono de brújula/mapa al explorar mundos
 */
export function playWorldSelect() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12); // A5

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

/**
 * Efecto mágico chispeante para comodín 50/50 (descarte de opciones)
 */
export function playMagic() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const freqs = [880, 1174.66, 1396.91, 1760]; // A5, D6, F6, A6
  freqs.forEach((freq, idx) => {
    const now = ac.currentTime + idx * 0.04;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  });
}

/**
 * Tono cálido de campana para pista didáctica
 */
export function playHint() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(659.25, now); // E5
  osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.15); // B5

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.32);
}

/**
 * Fanfarria de apertura de cofre de misiones
 */
export function playChest() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const notes = [
    { freq: 440, time: 0.0 },   // A4
    { freq: 554.37, time: 0.08 }, // C#5
    { freq: 659.25, time: 0.16 }, // E5
    { freq: 880, time: 0.26 },   // A5
    { freq: 1108.73, time: 0.36 } // C#6
  ];

  notes.forEach(({ freq, time }) => {
    const now = ac.currentTime + time;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const dur = 0.28;
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + dur + 0.05);
  });
}

/**
 * Fanfarria de 3 Estrellas de Ronda Perfecta
 */
export function playFanfare3Stars() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const notes = [
    { freq: 523.25, time: 0.0 },   // C5
    { freq: 659.25, time: 0.1 },   // E5
    { freq: 783.99, time: 0.2 },   // G5
    { freq: 1046.50, time: 0.32 }, // C6
    { freq: 1318.51, time: 0.46 }  // E6
  ];

  notes.forEach(({ freq, time }, idx) => {
    const now = ac.currentTime + time;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = idx === notes.length - 1 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const dur = idx === notes.length - 1 ? 0.45 : 0.2;
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + dur + 0.05);
  });
}

/**
 * Campanadas de Trofeo / Logro Curricular
 */
export function playTrophy() {
  if (muted) return;
  const ac = getAudioContext();
  if (!ac) return;

  const now = ac.currentTime;
  [880, 1174.66, 1479.98].forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const t = now + (i * 0.12);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(t);
    osc.stop(t + 0.38);
  });
}
