import { test, expect } from '@playwright/test';

test.describe('Kimi Panda — Sistema de Skins Canónicas de Mochi', () => {

  test('Debe cargar el Hub con skin clásica y navegar a la tienda con 9 trajes', async ({ page }) => {
    // Escuchar errores de consola
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://127.0.0.1:8000/index.html');
    await page.waitForLoadState('domcontentloaded');

    // 1. Verificar Mochi en Hub con skin clásica
    const hubMascot = page.locator('#hub-mascot');
    await expect(hubMascot).toBeVisible();
    await expect(hubMascot).toHaveAttribute('src', 'assets/mascotas/skins/mochi_classic_hub.webp');

    const hubAvatar = page.locator('#hub-avatar-img');
    await expect(hubAvatar).toHaveAttribute('src', 'assets/mascotas/skins/mochi_classic_avatar.webp');

    // 2. Abrir Tienda
    const btnTienda = page.locator('#btn-tienda');
    await btnTienda.click();

    const scrShop = page.locator('#scr-shop');
    await expect(scrShop).toBeVisible();

    // 3. Verificar 9 cards de trajes
    const skinCards = page.locator('.shop-card.skin-card');
    await expect(skinCards).toHaveCount(9);

    // 4. Verificar que Classic está equipado ("✓ Puesto")
    const classicBtn = skinCards.nth(0).locator('.btn-equipped');
    await expect(classicBtn).toHaveText('✓ Puesto');

    // 5. Verificar compra de Mochi Safari & Bosque (id: explorer, 60 ⭐)
    // Inicialmente el usuario tiene 128 estrellas
    const shopStars = page.locator('#shop-stars-val');
    await expect(shopStars).toHaveText('128');

    const explorerCard = skinCards.nth(1);
    const buyExplorerBtn = explorerCard.locator('.btn-buy');
    await expect(buyExplorerBtn).toBeVisible();
    await buyExplorerBtn.click();

    // 6. Tras comprar, debe estar equipado automáticamente
    await expect(explorerCard.locator('.btn-equipped')).toHaveText('✓ Puesto');
    await expect(shopStars).toHaveText('68');

    // 7. Diorama de la tienda debe actualizarse a explorer
    const shopMascot = page.locator('#shop-mascot-img');
    await expect(shopMascot).toHaveAttribute('src', 'assets/mascotas/skins/mochi_explorer_avatar.webp');

    // 8. Volver al Hub y verificar que Mochi viste traje de explorer
    const btnBack = page.locator('#btn-shop-back');
    await btnBack.click();

    await expect(page.locator('#scr-hub')).toBeVisible();
    await expect(hubMascot).toHaveAttribute('src', 'assets/mascotas/skins/mochi_explorer_hub.webp');
    await expect(hubAvatar).toHaveAttribute('src', 'assets/mascotas/skins/mochi_explorer_avatar.webp');

    // 9. Recargar página y verificar persistencia en localStorage
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    await expect(hubMascot).toHaveAttribute('src', 'assets/mascotas/skins/mochi_explorer_hub.webp');
    await expect(hubAvatar).toHaveAttribute('src', 'assets/mascotas/skins/mochi_explorer_avatar.webp');

    // Sin errores de consola críticos
    expect(consoleErrors).toEqual([]);
  });

});
