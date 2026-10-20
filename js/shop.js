/**
 * KIMI PANDA — TIENDA DE MOCHI Y ACCESORIOS (shop.js)
 */

import { getProfile, buyItem, equipItem } from './store.js';
import { playPop, playBuy, playEquip } from './audio.js';
import { showToast, burstConfetti } from './ui.js';

export const SHOP_ITEMS = [
  {
    id: 'cap_explorer',
    name: 'Gorra Exploradora',
    emoji: '🧢',
    price: 50,
    desc: '¡Para protegerse del sol en las islas!',
    svg: `<svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 24C6 14 14 8 26 8C36 8 42 13 42 22L46 25C47 26 46 28 44 28H4C2 28 2 26 3 25L6 24Z" fill="#3D9BE9" stroke="#241C15" stroke-width="2.5" stroke-linejoin="round"/><path d="M4 27C12 26 28 26 44 27C46 27 47 29 44 30C36 32 16 32 4 30C1 30 1 27 4 27Z" fill="#F0685F" stroke="#241C15" stroke-width="2"/><circle cx="25" cy="8" r="2.5" fill="#FFC53D" stroke="#241C15" stroke-width="1.8"/><path d="M14 18C17 12 30 12 34 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6"/></svg>`
  },
  {
    id: 'backpack_traveler',
    name: 'Mochila de Viaje',
    emoji: '🎒',
    price: 60,
    desc: 'Lleva tus cuadernos y lápices favoritos.',
    svg: `<svg viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="28" height="32" rx="7" fill="#FFC53D" stroke="#241C15" stroke-width="2.5"/><path d="M16 10V6C16 4.3 17.3 3 19 3H25C26.7 3 28 4.3 28 6V10" stroke="#241C15" stroke-width="2.5"/><path d="M8 22H36" stroke="#241C15" stroke-width="2.5"/><rect x="13" y="27" width="18" height="11" rx="4" fill="#FF8A2A" stroke="#241C15" stroke-width="2"/><circle cx="22" cy="22" r="2.5" fill="#fff" stroke="#241C15" stroke-width="1.5"/><path d="M14 31H30" stroke="#241C15" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'sunglasses_cool',
    name: 'Gafas de Sol Estelares',
    emoji: '🕶️',
    price: 80,
    desc: '¡El estilo más brillante de Kimi Panda!',
    svg: `<svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8C4 5 7 4 10 4H18C21 4 23 6 23 9V14C23 17 20 19 17 19H10C6 19 4 17 4 13V8Z" fill="#241C15" stroke="#241C15" stroke-width="2"/><path d="M25 8C25 5 28 4 31 4H39C42 4 44 6 44 9V14C44 17 42 19 38 19H31C28 19 25 17 25 13V8Z" fill="#241C15" stroke="#241C15" stroke-width="2"/><path d="M22 8H26" stroke="#241C15" stroke-width="2.5" stroke-linecap="round"/><path d="M7 7L13 15" stroke="#3D9BE9" stroke-width="2" stroke-linecap="round" opacity="0.85"/><path d="M28 7L34 15" stroke="#3D9BE9" stroke-width="2" stroke-linecap="round" opacity="0.85"/><circle cx="17" cy="8" r="1.5" fill="#fff"/><circle cx="38" cy="8" r="1.5" fill="#fff"/></svg>`
  },
  {
    id: 'cape_hero',
    name: 'Capa Voladora',
    emoji: '✨',
    price: 120,
    desc: '¡Siente el poder de responder veloz!',
    svg: `<svg viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6C15 6 18 10 23 10C28 10 31 6 31 6L40 40C40 40 33 37 23 42C13 37 6 40 6 40L15 6Z" fill="#F0685F" stroke="#241C15" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 12C21 24 23 38 23 42" stroke="#241C15" stroke-width="1.8" opacity="0.35"/><circle cx="23" cy="8" r="4.5" fill="#FFC53D" stroke="#241C15" stroke-width="2"/><circle cx="23" cy="8" r="1.8" fill="#fff"/></svg>`
  },
  {
    id: 'crown_gold',
    name: 'Corona Real Dorada',
    emoji: '👑',
    price: 150,
    desc: 'Para la reina o rey de los acertijos.',
    svg: `<svg viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 30L9 11L18 20L24 7L30 20L39 11L42 30H6Z" fill="#FFC53D" stroke="#241C15" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="28" width="36" height="6" rx="2" fill="#FF8A2A" stroke="#241C15" stroke-width="2"/><circle cx="24" cy="7" r="2.5" fill="#F0685F" stroke="#241C15" stroke-width="1.5"/><circle cx="9" cy="11" r="2" fill="#3D9BE9" stroke="#241C15" stroke-width="1.5"/><circle cx="39" cy="11" r="2" fill="#3D9BE9" stroke="#241C15" stroke-width="1.5"/><circle cx="24" cy="31" r="1.5" fill="#fff"/></svg>`
  },
  {
    id: 'hat_magic',
    name: 'Sombrero Mágico',
    emoji: '🧙',
    price: 200,
    desc: '¡Desata trucos y chispas de sabiduría!',
    svg: `<svg viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 36C12 33 36 33 44 36C45 37 43 40 38 40H10C5 40 3 37 4 36Z" fill="#9B6BF3" stroke="#241C15" stroke-width="2.5"/><path d="M12 35L22 6C23 4 26 4 28 6L33 14C35 17 38 18 36 21L36 35H12Z" fill="#9B6BF3" stroke="#241C15" stroke-width="2.5" stroke-linejoin="round"/><path d="M13 32H35" stroke="#FFC53D" stroke-width="4"/><path d="M22 17L23 15L24 17L26 18L24 19L23 21L22 19L20 18L22 17Z" fill="#FFC53D" stroke="#241C15" stroke-width="1"/><path d="M27 25L28 23L29 25L31 26L29 27L28 29L27 27L25 26L27 25Z" fill="#FFC53D" stroke="#241C15" stroke-width="1"/></svg>`
  }
];

export function renderShopUI() {
  const profile = getProfile();

  // Actualizar estrellas de la tienda
  const starsVal = document.getElementById('shop-stars-val');
  if (starsVal) {
    starsVal.textContent = profile.stars || 0;
  }

  // Actualizar preview de Mochi con el accesorio equipado
  const previewBadge = document.getElementById('shop-preview-hat');
  if (previewBadge) {
    const equipped = SHOP_ITEMS.find(i => i.id === profile.equippedHat);
    previewBadge.innerHTML = equipped ? equipped.svg : '';
    previewBadge.style.display = equipped ? 'block' : 'none';
  }

  // Contenedor de artículos
  const grid = document.getElementById('shop-items-grid');
  if (!grid) return;

  grid.innerHTML = '';

  SHOP_ITEMS.forEach(item => {
    const isOwned = (profile.inventory || []).includes(item.id);
    const isEquipped = profile.equippedHat === item.id;
    const canAfford = (profile.stars || 0) >= item.price;

    const card = document.createElement('article');
    card.className = `shop-card ${isEquipped ? 'equipped' : ''} ${isOwned ? 'owned' : ''}`;

    let actionBtnHtml = '';
    if (isEquipped) {
      actionBtnHtml = `<button type="button" class="pbtn green" disabled aria-label="Accesorio equipado">✓ Puesto</button>`;
    } else if (isOwned) {
      actionBtnHtml = `<button type="button" class="pbtn blue btn-equip" data-id="${item.id}" aria-label="Equipar ${item.name}">Equipar</button>`;
    } else {
      actionBtnHtml = `
        <button type="button" class="pbtn orange btn-buy ${!canAfford ? 'disabled' : ''}" data-id="${item.id}" data-price="${item.price}" ${!canAfford ? 'disabled' : ''} aria-label="Comprar ${item.name} por ${item.price} estrellas">
          <svg viewBox="0 0 24 24" fill="#FFC53D" stroke="#241C15" stroke-width="1.6" width="18" height="18" aria-hidden="true">
            <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/>
          </svg>
          ${item.price}
        </button>
      `;
    }

    card.innerHTML = `
      <div class="shop-item-icon" aria-hidden="true">${item.svg}</div>
      <div class="shop-item-info">
        <h3 class="shop-item-title">${item.name}</h3>
        <p class="shop-item-desc">${item.desc}</p>
      </div>
      <div class="shop-item-action">
        ${actionBtnHtml}
      </div>
    `;

    // Eventos
    const btnBuy = card.querySelector('.btn-buy');
    if (btnBuy) {
      btnBuy.onclick = (e) => {
        const res = buyItem(item.id, item.price);
        if (res.success) {
          playBuy();
          burstConfetti(e.currentTarget);
          showToast(`¡Compraste ${item.name}! 🎉`);
          renderShopUI();
          updateHubEquippedHat();
        } else {
          showToast('¡Necesitas más estrellas! ⭐');
        }
      };
    }

    const btnEquip = card.querySelector('.btn-equip');
    if (btnEquip) {
      btnEquip.onclick = () => {
        equipItem(item.id);
        playEquip();
        showToast(`¡${item.name} equipado! ✨`);
        renderShopUI();
        updateHubEquippedHat();
      };
    }

    grid.appendChild(card);
  });
}

export function updateHubEquippedHat() {
  const profile = getProfile();
  const equipped = SHOP_ITEMS.find(i => i.id === profile.equippedHat);

  // Badge en el avatar del HUD (Accesibilidad / TextContent + Visual SVG)
  const hubHat = document.getElementById('hub-avatar-hat');
  if (hubHat) {
    hubHat.innerHTML = equipped ? `<span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${equipped.emoji || ''}</span>${equipped.svg}` : '';
    hubHat.style.display = equipped ? 'block' : 'none';
  }

  // Badge en Mochi grande
  const heroHat = document.getElementById('hero-mochi-hat');
  if (heroHat) {
    heroHat.innerHTML = equipped ? `<span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">${equipped.emoji || ''}</span>${equipped.svg}` : '';
    heroHat.style.display = equipped ? 'block' : 'none';
  }
}
