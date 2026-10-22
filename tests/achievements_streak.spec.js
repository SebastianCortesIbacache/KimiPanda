const APP_URL = process.env.APP_URL || '/Kimi%20Panda/app/index.html';

import { test, expect } from '@playwright/test';

test.describe('🎯 AUDITORÍA EXTERNA — RACHAS DE ACIERTOS Y LOGROS (v1.2.0)', () => {

  test('CONTROL DE RACHAS: recordStreak acumula racha continua y preserva highStreak en fallos', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    const streakResult = await page.evaluate(async () => {
      const store = await import('./js/store.js');
      store.resetProfile();

      // 4 aciertos
      store.recordStreak(true);
      store.recordStreak(true);
      store.recordStreak(true);
      store.recordStreak(true);
      const s4 = structuredClone(store.getProfile());

      // 5to acierto (debe desbloquear logro)
      store.recordStreak(true);
      const s5 = structuredClone(store.getProfile());

      // 1 fallo (debe reiniciar streak a 0 pero mantener highStreak en 5)
      store.recordStreak(false);
      const sFail = structuredClone(store.getProfile());

      return {
        s4Streak: s4.streak,
        s5Streak: s5.streak,
        s5High: s5.highStreak,
        s5Achievements: s5.achievements,
        sFailStreak: sFail.streak,
        sFailHigh: sFail.highStreak
      };
    });

    expect(streakResult.s4Streak).toBe(4);
    expect(streakResult.s5Streak).toBe(5);
    expect(streakResult.s5High).toBe(5);
    expect(streakResult.s5Achievements).toContain('streak_5');

    // Tras el fallo
    expect(streakResult.sFailStreak).toBe(0);
    expect(streakResult.sFailHigh).toBe(5);
  });

});
