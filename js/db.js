/**
 * KIMI PANDA — GESTOR DE DATOS CURRICULARES (Mineduc Chile 6-7 años)
 */

let questionsCache = null;

export async function loadQuestions() {
  if (questionsCache && questionsCache.length > 0) {
    return questionsCache;
  }
  try {
    const res = await fetch('data/questions_mvp_6_7.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    questionsCache = await res.json();
    return questionsCache;
  } catch (e) {
    console.error('[DB] Error cargando banco de preguntas:', e);
    // Fallback de emergencia
    return [
      { id: 'fb_1', q: '8 + 7 = ?', opts: ['13', '15', '14', '16'], correct: 1, cat: 'matematicas', img: null },
      { id: 'fb_2', q: '6 × 3 = ?', opts: ['18', '12', '21', '16'], correct: 0, cat: 'matematicas', img: null },
      { id: 'fb_3', q: '¿Qué sigue? 2, 4, 6, …', opts: ['7', '9', '8', '10'], correct: 2, cat: 'logica', img: null },
      { id: 'fb_4', q: '15 − 9 = ?', opts: ['5', '7', '6', '8'], correct: 2, cat: 'matematicas', img: null }
    ];
  }
}

/**
 * Selecciona una ronda balanceada de preguntas (máximo 2 por categoría)
 */
export async function getRandomRound(count = 6) {
  const pool = await loadQuestions();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  const selected = [];
  const catCounts = {};

  for (const q of shuffled) {
    const cat = q.cat || 'general';
    catCounts[cat] = catCounts[cat] || 0;

    if (catCounts[cat] < 2) {
      selected.push(q);
      catCounts[cat]++;
      if (selected.length >= count) break;
    }
  }

  // Si no completó la cantidad por balance estricto, rellenar con restantes
  if (selected.length < count) {
    for (const q of shuffled) {
      if (!selected.includes(q)) {
        selected.push(q);
        if (selected.length >= count) break;
      }
    }
  }

  return selected.slice(0, count);
}

/**
 * Selecciona una tanda de preguntas de una o varias categorías específicas (para Modo Mundos)
 * con progresión curricular de dificultad (Niveles 1-2: easy, Niveles 3-4: medium, Nivel 5: mixto)
 */
export async function getCategoryRound(categories, count = 5, level = 1) {
  const pool = await loadQuestions();
  const cats = Array.isArray(categories) ? categories : [categories];
  let filtered = pool.filter(q => cats.includes(q.cat));

  // Filtrado pedagógico por nivel
  if (level <= 2) {
    const easyPool = filtered.filter(q => q.diff === 'easy');
    if (easyPool.length >= count) filtered = easyPool;
  } else if (level <= 4) {
    const medPool = filtered.filter(q => q.diff === 'medium');
    if (medPool.length >= count) filtered = medPool;
  }
  // Nivel 5: desafío mixto con todo el catálogo de la categoría

  const poolToUse = filtered.length >= count ? filtered : pool;
  const shuffled = [...poolToUse].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function hasImage(q) {
  return typeof q.img === 'string' && q.img.trim().length > 0;
}
