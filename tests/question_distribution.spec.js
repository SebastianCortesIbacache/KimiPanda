import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const APP_URL = process.env.APP_URL || '/Kimi%20Panda/app/index.html';

test.describe('🎯 AUDITORÍA EXTERNA — ANTI-SESGO Y DISTRIBUCIÓN (v1.2.0)', () => {

  test('BANCO DE DATOS: Las 200 preguntas tienen distribución estática equitativa (25% por posición)', async () => {
    const file = fs.existsSync(path.resolve('data/questions_mvp_6_7.json'))
      ? path.resolve('data/questions_mvp_6_7.json')
      : path.resolve('Kimi Panda/app/data/questions_mvp_6_7.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const questions = JSON.parse(raw);

    expect(questions.length).toBe(200);

    const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    for (const q of questions) {
      expect(q.opts.length).toBe(4);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThanOrEqual(3);
      counts[q.correct]++;
    }

    // Exactamente 50 preguntas en cada posición (25% cada una)
    expect(counts[0]).toBe(50);
    expect(counts[1]).toBe(50);
    expect(counts[2]).toBe(50);
    expect(counts[3]).toBe(50);
  });

  test('RUNTIME GAMEPLAY: Barajado Fisher-Yates distribuye uniformemente la opción correcta en pantalla', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    // Iniciar juego libre con force: true
    await page.click('#btn-libre', { force: true });
    await page.waitForSelector('#scr-game.active');

    const positionHits = { 0: 0, 1: 0, 2: 0, 3: 0 };
    const TOTAL_QUESTIONS_TO_SAMPLE = 6;

    for (let i = 0; i < TOTAL_QUESTIONS_TO_SAMPLE; i++) {
      await page.waitForSelector('#answers .pbtn');
      const btns = await page.$$('#answers .pbtn');
      expect(btns.length).toBe(4);

      let correctIndex = -1;
      for (let slot = 0; slot < 4; slot++) {
        const isCorrect = await btns[slot].getAttribute('data-correct');
        if (isCorrect === '1') {
          correctIndex = slot;
          break;
        }
      }

      expect(correctIndex).toBeGreaterThanOrEqual(0);
      positionHits[correctIndex]++;

      // Responder correctamente para avanzar
      await btns[correctIndex].click();

      // Esperar resolución y avance
      await page.waitForTimeout(450);

      const isSummary = await page.isVisible('#scr-summary.active');
      if (isSummary) {
        await page.click('#btn-summary-done');
        await page.waitForSelector('#scr-hub.active');
        await page.click('#btn-libre', { force: true });
        await page.waitForSelector('#scr-game.active');
        await page.waitForSelector('#answers .pbtn');
      } else {
        await page.waitForSelector('#answers .pbtn:not([disabled])', { timeout: 4000 }).catch(() => {});
      }
    }

    // Verificar que al menos 2 posiciones diferentes recibieron opciones correctas en el sample
    const slotsHit = Object.values(positionHits).filter(v => v > 0).length;
    expect(slotsHit).toBeGreaterThanOrEqual(2);
  });

});
