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
    desc: '¡Para protegerse del sol en las islas!'
  },
  {
    id: 'backpack_traveler',
    name: 'Mochila de Viaje',
    emoji: '🎒',
    price: 60,
    desc: 'Lleva tus cuadernos y lápices favoritos.'
  },
  {
    id: 'sunglasses_cool',
    name: 'Gafas de Sol Estelares',
    emoji: '🕶️',
    price: 80,
    desc: '¡El estilo más brillante de Kimi Panda!'
  },
  {
    id: 'cape_hero',
    name: 'Capa Voladora',
    emoji: '🦸',
    price: 120,
    desc: '¡Siente el poder de responder veloz!'
  },
  {
    id: 'crown_gold',
    name: 'Corona Real Dorada',
    emoji: '👑',
    price: 150,
    desc: 'Para la reina o rey de los acertijos.'
  },
  {
    id: 'hat_magic',
    name: 'Sombrero Mágico',
    emoji: '🧙',
    price: 200,
    desc: '¡Desata trucos y chispas de sabiduría!'
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
    previewBadge.textContent = equipped ? equipped.emoji : '';
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
      <div class="shop-item-icon" aria-hidden="true">${item.emoji}</div>
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

  // Badge en el avatar del HUD
  const hubHat = document.getElementById('hub-avatar-hat');
  if (hubHat) {
    hubHat.textContent = equipped ? equipped.emoji : '';
    hubHat.style.display = equipped ? 'block' : 'none';
  }

  // Badge en Mochi grande
  const heroHat = document.getElementById('hero-mochi-hat');
  if (heroHat) {
    heroHat.textContent = equipped ? equipped.emoji : '';
    heroHat.style.display = equipped ? 'block' : 'none';
  }
}
