/**
 * KIMI PANDA — TIENDA DE TRAJES Y SKINS DE MOCHI (shop.js)
 * Sistema de 9 Trajes Temáticos Canónicos Completos
 */

import { getProfile, buySkin, equipSkin, getEquippedSkin, buyItem, equipItem } from './store.js';
import { playPop, playBuy, playEquip } from './audio.js';
import { showToast, burstConfetti } from './ui.js';

export const MOCHI_SKINS = [
  {
    id: 'classic',
    name: 'Mochi Excursionista',
    category: 'Básico',
    emoji: '🐼',
    price: 0,
    desc: '¡El traje clásico y alegre de Mochi para dar los primeros pasos en las islas!',
    hubImg: 'assets/mascotas/skins/mochi_classic_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_classic_avatar.webp',
    dioramaPhrase: '¡Listo para cualquier aventura con mi pañuelo verde!'
  },
  {
    id: 'explorer',
    name: 'Mochi Safari & Bosque',
    category: 'Aventura',
    emoji: '🧭',
    price: 60,
    desc: 'Con sombrero de ala, brújula dorada y cantimplora para adentrarse en la selva.',
    hubImg: 'assets/mascotas/skins/mochi_explorer_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_explorer_avatar.webp',
    dioramaPhrase: '¡Con mi sombrero de explorador no me pierdo nunca!'
  },
  {
    id: 'diver',
    name: 'Mochi Buzo de Arrecifes',
    category: 'Acuático',
    emoji: '🤿',
    price: 90,
    desc: 'Equipado con visor subacuático y traje hidrodinámico para explorar el océano.',
    hubImg: 'assets/mascotas/skins/mochi_diver_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_diver_avatar.webp',
    dioramaPhrase: '¡Burbujas y corales! ¡Vamos a nadar con los peces!'
  },
  {
    id: 'aviator',
    name: 'Mochi Aviador de las Nubes',
    category: 'Vuelo',
    emoji: '✈️',
    price: 120,
    desc: 'Chaqueta de piloto y gafas retro de cuero para volar entre cúmulos de algodón.',
    hubImg: 'assets/mascotas/skins/mochi_aviator_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_aviator_avatar.webp',
    dioramaPhrase: '¡Motores encendidos! ¡Volamos directo a las nubes!'
  },
  {
    id: 'scientist',
    name: 'Mochi Pequeño Científico',
    category: 'Ciencia',
    emoji: '🧪',
    price: 150,
    desc: 'Bata blanca y probetas con líquidos burbujeantes para experimentos geniales.',
    hubImg: 'assets/mascotas/skins/mochi_scientist_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_scientist_avatar.webp',
    dioramaPhrase: '¡Hipótesis confirmada! La ciencia es divertidísima.'
  },
  {
    id: 'astronaut',
    name: 'Mochi Astronauta Cósmico',
    category: 'Espacial',
    emoji: '🧑‍🚀',
    price: 180,
    desc: 'Escafandra presurizada y mochila propulsora para viajar a las estrellas.',
    hubImg: 'assets/mascotas/skins/mochi_astronaut_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_astronaut_avatar.webp',
    dioramaPhrase: '¡3, 2, 1... Despegue estelar! ¡Gravedad cero!'
  },
  {
    id: 'artist',
    name: 'Mochi Pintor de Arcoíris',
    category: 'Arte',
    emoji: '🎨',
    price: 210,
    desc: 'Boina parisina y paleta salpicada con todos los colores del espectro.',
    hubImg: 'assets/mascotas/skins/mochi_artist_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_artist_avatar.webp',
    dioramaPhrase: '¡Pintemos el mundo de colores brillantes!'
  },
  {
    id: 'detective',
    name: 'Mochi Detective de Acertijos',
    category: 'Misterio',
    emoji: '🕵️',
    price: 250,
    desc: 'Gorra de sabueso y lupa mágica para resolver cualquier enigma curricular.',
    hubImg: 'assets/mascotas/skins/mochi_detective_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_detective_avatar.webp',
    dioramaPhrase: '¡Elemental, mi pequeño panda! El misterio está resuelto.'
  },
  {
    id: 'wizard',
    name: 'Mochi Sabio de las Estrellas',
    category: 'Magia',
    emoji: '🧙',
    price: 300,
    desc: 'Túnica estrellada y varita centelleante para conjurar respuestas correctas.',
    hubImg: 'assets/mascotas/skins/mochi_wizard_hub.webp',
    avatarImg: 'assets/mascotas/skins/mochi_wizard_avatar.webp',
    dioramaPhrase: '¡Abracadabra! ¡El conocimiento ilumina el camino!'
  }
];

// Alias para compatibilidad hacia atrás
export const SHOP_ITEMS = MOCHI_SKINS;

export function updateGlobalMochiSkin() {
  const profile = getProfile();
  const equippedId = profile.equippedSkin || profile.equippedHat || 'classic';
  const skin = MOCHI_SKINS.find(s => s.id === equippedId) || MOCHI_SKINS[0];

  // 1. Hero Mascot en el Hub principal
  const hubMascot = document.getElementById('hub-mascot');
  if (hubMascot && skin.hubImg) {
    if (hubMascot.getAttribute('src') !== skin.hubImg) {
      hubMascot.src = skin.hubImg;
    }
    hubMascot.alt = `${skin.name} saludando`;
  }

  // 2. Avatar pequeño en el HUD superior
  const hubAvatarImg = document.getElementById('hub-avatar-img') || document.querySelector('.avatar img');
  if (hubAvatarImg && skin.avatarImg) {
    if (hubAvatarImg.getAttribute('src') !== skin.avatarImg) {
      hubAvatarImg.src = skin.avatarImg;
    }
    hubAvatarImg.alt = `Avatar de ${skin.name}`;
  }

  // 3. Mascota del Diorama en la Tienda
  const shopMascot = document.getElementById('shop-mascot-img') || document.querySelector('.shop-diorama-mascot img');
  if (shopMascot && skin.avatarImg) {
    if (shopMascot.getAttribute('src') !== skin.avatarImg) {
      shopMascot.src = skin.avatarImg;
    }
    shopMascot.alt = `${skin.name} probándose traje`;
  }

  // 4. Frase del diorama de la tienda
  const dioramaBubble = document.getElementById('shop-diorama-bubble');
  if (dioramaBubble && skin.dioramaPhrase) {
    dioramaBubble.textContent = skin.dioramaPhrase;
  }
}

// Alias de retrocompatibilidad
export function updateHubEquippedHat() {
  updateGlobalMochiSkin();
}

export function renderShopUI() {
  const profile = getProfile();

  // Actualizar estrellas de la tienda
  const starsVal = document.getElementById('shop-stars-val');
  if (starsVal) {
    starsVal.textContent = profile.stars || 0;
  }

  // Actualizar visual global de Mochi en diorama
  updateGlobalMochiSkin();

  // Contenedor de trajes / skins
  const grid = document.getElementById('shop-items-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const equippedSkinId = profile.equippedSkin || profile.equippedHat || 'classic';
  const inventory = profile.inventory || ['classic'];

  MOCHI_SKINS.forEach(skin => {
    const isOwned = inventory.includes(skin.id);
    const isEquipped = equippedSkinId === skin.id;
    const canAfford = (profile.stars || 0) >= skin.price;

    const card = document.createElement('article');
    card.className = `shop-card skin-card ${isEquipped ? 'equipped' : ''} ${isOwned ? 'owned' : ''}`;

    let actionBtnHtml = '';
    if (isEquipped) {
      actionBtnHtml = `<button type="button" class="pbtn green btn-equipped" disabled aria-label="Traje ${skin.name} equipado">✓ Puesto</button>`;
    } else if (isOwned) {
      actionBtnHtml = `<button type="button" class="pbtn blue btn-equip" data-id="${skin.id}" aria-label="Vestir ${skin.name}">Vestir</button>`;
    } else {
      actionBtnHtml = `
        <button type="button" class="pbtn orange btn-buy ${!canAfford ? 'disabled' : ''}" data-id="${skin.id}" data-price="${skin.price}" ${!canAfford ? 'disabled' : ''} aria-label="Comprar ${skin.name} por ${skin.price} estrellas">
          <svg viewBox="0 0 24 24" fill="#FFC53D" stroke="#241C15" stroke-width="1.6" width="18" height="18" aria-hidden="true">
            <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/>
          </svg>
          ${skin.price}
        </button>
      `;
    }

    card.innerHTML = `
      <div class="skin-thumb-wrap">
        <img class="skin-thumb" src="${skin.avatarImg}" alt="${skin.name}" loading="lazy">
        <span class="skin-badge">${skin.category}</span>
      </div>
      <div class="shop-item-info">
        <h3 class="shop-item-title">${skin.emoji} ${skin.name}</h3>
        <p class="shop-item-desc">${skin.desc}</p>
      </div>
      <div class="shop-item-action">
        ${actionBtnHtml}
      </div>
    `;

    // Eventos
    const btnBuy = card.querySelector('.btn-buy');
    if (btnBuy) {
      btnBuy.onclick = (e) => {
        const res = buySkin(skin.id, skin.price);
        if (res.success) {
          playBuy();
          burstConfetti(e.currentTarget);
          showToast(`¡Conseguiste ${skin.name}! 🎉`);
          renderShopUI();
          updateGlobalMochiSkin();
        } else {
          showToast('¡Necesitas más estrellas! ⭐');
        }
      };
    }

    const btnEquip = card.querySelector('.btn-equip');
    if (btnEquip) {
      btnEquip.onclick = () => {
        equipSkin(skin.id);
        playEquip();
        showToast(`¡Mochi ahora viste ${skin.name}! ✨`);
        renderShopUI();
        updateGlobalMochiSkin();
      };
    }

    grid.appendChild(card);
  });
}
