# 📜 Historial de Cambios (Changelog) — Kimi Panda & Reto Panda

Todos los cambios notables de este proyecto están documentados en este archivo siguiendo el formato de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y rigiéndose por el estándar de [Versionado Semántico (SemVer 2.0.0)](.agents/ESTANDAR_VERSIONADO_SEMVER.md).

---

## [1.1.0] - 2026-10-21
### Agregado
- **Sistema Canónico de 9 Trajes y Skins Temáticas de Mochi:** Transformación integral de la Tienda de Mochi. Se reemplazó el sistema de accesorios flotantes 2D ("paper-doll") por 9 avatares temáticos completos renderizados en Clay 3D de alta fidelidad:
  1. `classic`: Mochi Excursionista (Gratis / Desbloqueado por defecto)
  2. `explorer`: Mochi Safari & Bosque (60 ⭐)
  3. `diver`: Mochi Buzo de Arrecifes (90 ⭐)
  4. `aviator`: Mochi Aviador de las Nubes (120 ⭐)
  5. `scientist`: Mochi Pequeño Científico (150 ⭐)
  6. `astronaut`: Mochi Astronauta Cósmico (180 ⭐)
  7. `artist`: Mochi Pintor de Arcoíris (210 ⭐)
  8. `detective`: Mochi Detective de Acertijos (250 ⭐)
  9. `wizard`: Mochi Sabio de las Estrellas (300 ⭐)
- **Persistencia Reactiva Global de Skins:** `updateGlobalMochiSkin()` sincroniza en tiempo real el traje de Mochi en el Hub (`#hub-mascot`), el avatar del HUD (`#hub-avatar-img`), y el probador de la tienda (`#shop-mascot-img`).
- **Segunda Oportunidad de Mochi (Mecánica 0 Vidas):** Cuando el jugador pierde su último corazón, se activa una pausa pedagógica afectiva con Mochi (`#mochi-help-modal`) otorgando +1 vida por ronda sin castigo punitivo.
- **Cierre Amable de Ronda (Soft Fail):** En caso de agotar la segunda oportunidad, la ronda concluye con la pantalla *"¡Buen esfuerzo! Practiquemos juntos 🐼"*, otorgando **1 ⭐ de Perseverancia** y sumando XP acumulada.
- **Banco de 200 Pistas Curriculares:** Inyección de pistas pedagógicas personalizadas por pregunta en `questions_mvp_6_7.json` y lectura dinámica desde el motor de juego.
- **Precacheo Offline PWA v10:** Registro en Service Worker (`sw.js`) de los 18 assets WebP correspondientes a los 9 trajes.
- **Suite de Pruebas Playwright:** Automatización de QA end-to-end (`tests/shop_skins.spec.js`) con Chrome headless verificando carga, navegación, compra de skins, deducción de estrellas, actualización de diorama y persistencia post-reload.
### Eliminado
- Eliminados los elementos flotantes CSS `hero-mochi-hat`, `hub-avatar-hat` y `shop-preview-hat` para erradicar desfases de recorte o desalineación visual en pantallas móviles.

---

## [1.0.1] - 2026-10-20
### Corregido
- **Hotfix de Producción (8 Bugs Críticos):**
  - **Cero 404s y Preguntas Ambiguas:** Eliminadas preguntas rotas sin soporte visual (ej. *"¿Qué forma es esta?"*).
  - **Eliminación de Texto Duplicado:** Tarjeta de pregunta protegida con texto descriptivo alternativo y fallback `onerror`.
  - **Calibración de Accesorios:** Gorra de avatar (`.avatar-preview-hat`) ajustada para descansar anatómicamente sobre la cabeza de Mochi sin flotar.
  - **Corazones de Vida Activos:** Visualización inicial en rojo brillante (`❤️❤️❤️`) desde el segundo 1 de juego, apagándose a gris solo al fallar.
  - **Safe-Area en Móviles:** Padding inferior adaptativo `calc(28px + env(safe-area-inset-bottom))` para evitar solapamiento con barras de navegación en iOS/Android.
  - **Fondo Limpio:** Eliminadas mochilas e islas flotantes descolgadas en el Hub; fondo crema `#FFF4E4` unificado.
  - **Sombra de Apoyo de Mochi:** Incorporada elipse de contacto física `.mochi-shadow` para anclar al personaje al piso.
  - **Erradicación de Emojis de Sistema:** Reemplazados emojis por iconografía SVG temática y stickers coherentes con la estética oficial.
  - **Ajustes de Hub Bento:** Separación de misiones semanales y optimización de diagramación desktop cross-browser (Chrome, Firefox, Safari).

---

## [1.0.0] - 2026-10-20
### Agregado
- **Lanzamiento Inicial MVP Flash PWA:**
  - Despliegue en GitHub Pages (`sebastiancortesibacache.github.io/KimiPanda/`).
  - Hub Bento modular con avatar 3D central de Mochi y acceso a modos de juego.
  - Banco inicial de 200 preguntas curadas para 6-7 años alineadas con el currículum Mineduc de Chile (Matemáticas, Lenguaje, Ciencias e Historia).
  - 103 ilustraciones canónicas en estilo plastilina táctil (*Clay World*).
  - Sistema de vidas (3 corazones), racha de aciertos y experiencia (XP).
  - Modo Offline-First total respaldado por Service Worker (`sw.js`).

---

## [0.9.0-rc] - 2026-10-18 (Reto Panda Base)
### Agregado
- Onboarding cinemático con pasaporte y selector de edad.
- Videos 3D de bienvenida de Mochi en plastilina y audio ambiental con Web Audio API.
- Motor de diorama con islas flotantes y arquitectura modular ESM.
