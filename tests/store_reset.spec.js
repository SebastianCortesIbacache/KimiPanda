const APP_URL = process.env.APP_URL || '/Kimi%20Panda/app/index.html';

import { test, expect } from '@playwright/test';

test.describe('🎯 AUDITORÍA EXTERNA — RESILIENCIA DE ESTADO Y RESET PURO (v1.2.0)', () => {

  test('RESET PURO: resetProfile() restablece worldLevels a 1 y audioMuted a false sin mutar DEFAULT_PROFILE', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    // Manipular estado simulando progresión de mundos y audio silenciado
    const modifiedState = await page.evaluate(async () => {
      const store = await import('./js/store.js');
      store.unlockNextWorldLevel('matematicas');
      store.unlockNextWorldLevel('matematicas'); // nivel 3
      store.unlockNextWorldLevel('ciencias');     // nivel 2
      store.toggleAudioMute(); // silenciar
      return store.getProfile();
    });

    expect(modifiedState.worldLevels.matematicas).toBe(3);
    expect(modifiedState.worldLevels.ciencias).toBe(2);
    expect(modifiedState.audioMuted).toBe(true);

    // Ejecutar resetProfile
    const resetState = await page.evaluate(async () => {
      const store = await import('./js/store.js');
      return store.resetProfile();
    });

    // Verificar que los mundos volvieron limpiamente a 1
    expect(resetState.worldLevels.inicio).toBe(1);
    expect(resetState.worldLevels.matematicas).toBe(1);
    expect(resetState.worldLevels.ciencias).toBe(1);
    expect(resetState.worldLevels.logica).toBe(1);
    expect(resetState.worldLevels.lenguaje).toBe(1);
    expect(resetState.worldLevels.historia).toBe(1);

    // Verificar audio desenmudecido
    expect(resetState.audioMuted).toBe(false);

    // Verificar rango canónico inicial
    expect(resetState.rank).toBe('Novata');
    expect(resetState.level).toBe(1);
  });

  test('UI RESET: El botón de reinicio en el Pasaporte reinicia limpiamente la partida', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    // Abrir modal de pasaporte
    await page.click('#hub-profile-btn');
    await page.waitForSelector('#profile-modal[open]');

    // Tocar botón de reinicio (primer toque pide confirmación)
    await page.click('#btn-profile-reset');
    await page.waitForTimeout(200);

    // Segundo toque confirma
    await page.click('#btn-profile-reset');
    await page.waitForTimeout(300);

    // El modal debe haberse cerrado y el Hub reflejar el perfil reiniciado
    const isModalOpen = await page.isVisible('#profile-modal[open]');
    expect(isModalOpen).toBe(false);

    const subText = await page.textContent('#player-sub');
    expect(subText).toContain('Novata');
  });

});
