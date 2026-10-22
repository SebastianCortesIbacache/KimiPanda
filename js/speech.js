/**
 * KIMI PANDA — MÓDULO ACCESIBLE DE SÍNTESIS DE VOZ (TTS Infantil)
 * Permite a niños en iniciación lectora (6-7 años) escuchar preguntas y opciones
 */

let voicesLoaded = false;
let spanishVoice = null;

function loadSpanishVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    // Buscar voz chilena o latinoamericana, luego cualquier voz en español
    spanishVoice = voices.find(v => v.lang.startsWith('es-CL')) ||
                   voices.find(v => v.lang.startsWith('es-419')) ||
                   voices.find(v => v.lang.startsWith('es-MX')) ||
                   voices.find(v => v.lang.startsWith('es')) || null;
    voicesLoaded = true;
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadSpanishVoice();
  window.speechSynthesis.onvoiceschanged = () => {
    loadSpanishVoice();
  };
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.warn('[TTS] Error deteniendo síntesis:', e);
  }
}

export function speakText(text, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[TTS] SpeechSynthesis no soportado en este navegador');
    return false;
  }

  try {
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'es-CL';
    utterance.rate = options.rate || 0.9;   // Ritmo pausado para primeros lectores
    utterance.pitch = options.pitch || 1.05; // Tono cálido y alegre

    if (!spanishVoice) {
      loadSpanishVoice();
    }
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    if (options.onend) utterance.onend = options.onend;
    if (options.onerror) utterance.onerror = options.onerror;

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('[TTS] Error en síntesis de voz:', e);
    return false;
  }
}

export function speakQuestion(qData) {
  if (!qData || !qData.q) return false;
  
  // Limpiar emojis y fórmulas para lectura fluida
  let cleanText = qData.q
    .replace(/[🍎🍌⭐💖🐼🎮❄️💡🎁🏆👏💪🌟🌱]/gu, '')
    .replace(/×/g, ' por ')
    .replace(/\+/g, ' más ')
    .replace(/−/g, ' menos ')
    .replace(/=/g, ' es igual a ')
    .replace(/\?/g, '')
    .trim();

  let fullSpeech = `Pregunta: ${cleanText}.`;
  if (Array.isArray(qData.opts) && qData.opts.length > 0) {
    const optsClean = qData.opts.map(o => o.replace(/[🍎🍌⭐]/gu, '').trim());
    fullSpeech += ` Las opciones son: ${optsClean.join(', ')}.`;
  }

  return speakText(fullSpeech);
}
