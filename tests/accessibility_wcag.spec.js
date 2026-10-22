import { test, expect } from '@playwright/test';

const APP_URL = process.env.APP_URL || '/Kimi%20Panda/app/index.html';

test.describe('🎯 AUDITORÍA EXTERNA — ACCESIBILIDAD WCAG 2.2 AA (v1.2.0)', () => {

  test('VIEWPORT: Zoom habilitado para accesibilidad visual (sin user-scalable=no)', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    const viewportMeta = await page.$eval('meta[name="viewport"]', el => el.getAttribute('content'));
    expect(viewportMeta).not.toContain('user-scalable=no');
    expect(viewportMeta).toContain('width=device-width');
  });

  test('TECLADO Y ARIA: Elementos de control en Hub responden a Enter y Espacio', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    // 1. Abrir perfil con tecla Enter directamente usando locator.press
    const profileBtn = page.locator('#hub-profile-btn');
    await profileBtn.press('Enter');
    await page.waitForSelector('#profile-modal[open]');
    expect(await page.isVisible('#profile-modal[open]')).toBe(true);

    // Cerrar modal con Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    // 2. Tocar a Mochi con tecla Espacio
    const mascot = page.locator('#hub-mascot');
    await mascot.press('Space');
    await page.waitForTimeout(200);
    expect(await page.isVisible('#hub-bubble')).toBe(true);
  });

  test('TTS INFANTIL: Botón de lectura por voz presente y accesible en tarjeta de pregunta', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    await page.click('#btn-libre', { force: true });
    await page.waitForSelector('#scr-game.active');

    // El botón TTS debe existir y ser visible
    const speakBtn = page.locator('#btn-speak-q');
    await expect(speakBtn).toBeVisible();
    await expect(speakBtn).toHaveAttribute('aria-label', /Escuchar/i);

    // aria-live="polite" en #q-hint-box
    const hintBox = page.locator('#q-hint-box');
    await expect(hintBox).toHaveAttribute('aria-live', 'polite');
  });

  test('ERGONOMÍA TÁCTIL: Áreas de toque mínimas de 44x44px en comodines y nodos de mundo', async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');

    // 1. Comodines de juego
    await page.click('#btn-libre', { force: true });
    await page.waitForSelector('#scr-game.active');

    const btn5050Box = await page.locator('#btn-helper-5050').boundingBox();
    expect(btn5050Box.height).toBeGreaterThanOrEqual(44);

    const btnHintBox = await page.locator('#btn-helper-hint').boundingBox();
    expect(btnHintBox.height).toBeGreaterThanOrEqual(44);

    // 2. Nodos de mundos
    await page.click('#btn-game-back');
    await page.waitForSelector('#scr-hub.active');
    await page.click('#btn-mundos', { force: true });
    await page.waitForSelector('#scr-worlds.active');

    const firstNode = await page.locator('.lvl-node').first().boundingBox();
    expect(firstNode.width).toBeGreaterThanOrEqual(44);
    expect(firstNode.height).toBeGreaterThanOrEqual(44);
  });

});
