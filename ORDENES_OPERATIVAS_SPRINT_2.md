# 📜 Órdenes Operativas Oficiales — SPRINT 2: "Kimi Panda" (Mundos, Tienda y Progresión XP)
**Emitidas por:** Consejo Asesor Independiente (Cámara Asesora)  
**Autoridad de Despacho:** Director Ejecutivo (USER)  
**Entorno de Trabajo Exclusivo:** `e:\Presion Mental APP\Kimi Panda\app\`  
**Estado:** 🟢 AUTORIZADO Y EN EJECUCIÓN

---

## 🎯 OBJETIVOS MAESTROS DEL SPRINT 2

El Sprint 1 dotó a Kimi Panda de su núcleo operativo (Hub Bento Pop, tarjeta de pregunta adaptativa 2x2, motor de rondas, persistencia offline, 200 preguntas y certificación en 5 modos con cero scroll).

El **Sprint 2** expande la experiencia lúdica y pedagógica hacia la plenitud del MVP, transformando las estrellas ganadas en recompensas tangibles y estructurando la progresión curricular:

1. **🛍️ Pantalla de Tienda de Mochi (`scr-shop`):**
   - Catálogo de accesorios para vestir a Mochi (gorras, coronas, gafas, capas, mochilas).
   - Sistema de compra con estrellas acumuladas en el store (`kp_profile_v1`).
   - Equipamiento en tiempo real con reflejo en el Avatar y Hero Mochi.
2. **🗺️ Pantalla de Mundos / Islas Flotantes (`scr-worlds`):**
   - Mapa de 6 mundos temáticos alineados con las 6 asignaturas del currículum Mineduc.
   - Progresión de niveles secuenciales (1 a 5 por mundo) con rondas especializadas por categoría.
3. **🏆 Pantalla de Logros y Medallero (`scr-achievements`):**
   - Sala de trofeos con 8 insignias desbloqueables por hitos de agilidad mental y perseverancia.
4. **⭐ Sistema de Experiencia (XP) y Niveles de Explorador:**
   - Barra de XP viva en el HUD del Hub (`Nivel 1`, `30/100 XP`), nivel-up con animación de Mochi.
   - Conexión dinámica con las Misiones Semanales (seguimiento real de partidas y aciertos matemáticos).
5. **🪪 Modal de Pasaporte / Perfil Editable:**
   - Edición amigable de nombre, edad (6-7 años) y avatar.
6. **🧪 Certificación Automatizada Playwright (5 Modos):**
   - Garantía de CERO SCROLL en las 3 nuevas pantallas (`scr-shop`, `scr-worlds`, `scr-achievements`).
   - Pruebas E2E de compra, equipamiento, navegación entre mundos y subida de nivel.

---

## 🔒 REGLAS DE GOBERNANZA Y AISLAMIENTO
1. **Confinamiento 100% Estricto:** Todo el código se escribe en `Kimi Panda/app/` (`css/`, `js/`).
2. **Cero Acoplamiento Externo:** Prohibido importar librerías externas o scripts de la raíz.
3. **Compatibilidad Regresiva:** Todo perfil preexistente en `localStorage` migra de forma segura y automática sin perder estrellas.
4. **Cero Scroll en 5 Modos:** Toda nueva pantalla debe ajustarse fluidamente en Desktop, Tablet Portrait, Tablet Landscape, Móvil Portrait y Móvil Landscape (2 pulgares).

---

## 🛠️ ORDEN #1: AGENTE ARQUITECTO
**Dominio:** Estado expandido (`store.js`), lógica de tienda (`shop.js`), mapa de mundos (`worlds.js`), logros (`achievements.js`) y orquestación (`main.js`).

### Entregables Específicos:
1. **Extensión del Store Reactivo (`js/store.js`):**
   - Nuevos campos en el perfil:
     - `xp`: Experiencia acumulada (por defecto 0).
     - `level`: Nivel actual (calculado con fórmula `Math.floor(xp / 100) + 1`).
     - `inventory`: Array de IDs de accesorios adquiridos (por defecto `['default_hat']` o vacíos).
     - `equippedHat`: ID del accesorio actualmente equipado (o `null`).
     - `completedLevels`: Objeto o array de niveles superados por mundo (`{ matematicas: 1, ciencias: 0, ... }`).
     - `missionsProgress`: Seguimiento real de las 2 misiones activas (`gamesPlayed`, `mathCorrect`).
     - `unlockedAchievements`: Array de IDs de logros desbloqueados.
   - Métodos: `addXP(amount)`, `buyItem(itemId, price)`, `equipItem(itemId)`, `recordRoundResult(cat, score)`, `claimMissionReward(missionId)`.
2. **Módulo de Tienda (`js/shop.js`):**
   - Catálogo canónico de 6 artículos accesibles:
     - `cap_explorer` (Gorra Exploradora 🧢, 50 ⭐)
     - `sunglasses_cool` (Gafas de Sol Estelares 🕶️, 80 ⭐)
     - `crown_gold` (Corona Real Dorada 👑, 150 ⭐)
     - `cape_hero` (Capa de Superhéroe 🦸, 120 ⭐)
     - `hat_magic` (Sombrero de Mago 🧙, 200 ⭐)
     - `backpack_traveler` (Mochila de Viaje 🎒, 60 ⭐)
   - Lógica de compra atómica, equipamiento/desequipamiento y renderizado reactivo del catálogo.
3. **Módulo de Mundos (`js/worlds.js`):**
   - Definición de 6 mundos curriculares:
     - 🌴 *Isla Inicio* (Todas las categorías, tutorial introductorio)
     - 🌲 *Bosque Matemático* (Categoría: `matematicas`)
     - 🌊 *Océano de Ciencias* (Categoría: `ciencias`)
     - 🔬 *Laboratorio de Lógica* (Categoría: `logica`)
     - 🏔️ *Montaña del Lenguaje* (Categoría: `lenguaje`)
     - 🌋 *Volcán de Historia e Inglés* (Categorías: `historia`, `ingles`)
   - Selección de nivel y lanzamiento de rondas filtradas por categoría.
4. **Módulo de Logros (`js/achievements.js`):**
   - Catálogo de 8 logros con condición de desbloqueo y recompensas.
5. **Enrutamiento y Transiciones (`js/main.js`):**
   - Conexión de botones del Hub (`btn-mundos`, `btn-tienda`, `btn-logros`, `hub-profile-btn`).
   - Botones de regreso homogéneos en cada pantalla secundaria hacia `#scr-hub`.

---

## 🎨 ORDEN #2: AGENTE DISEÑO
**Dominio:** Estilos Chunky Pop de Tienda (`css/shop.css`), Mundos (`css/worlds.css`), Logros (`css/achievements.css`) y responsividad en 5 modos.

### Entregables Específicos:
1. **Estilos de la Tienda (`css/shop.css`):**
   - Diorama superior con Mochi en vitrina y espejo de previsualización.
   - Cuadrícula de tarjetas de artículos con estética Playful Chunky Pop (fondo crema, bordes tinta 3px, botón mecánico de compra verde/ámbar, etiqueta "Equipado" o precio en estrellas).
2. **Estilos del Mapa de Mundos (`css/worlds.css`):**
   - Cuadrícula/ruta de islas flotantes con colores distintivos por asignatura.
   - Nodos de nivel (círculos mecánicos con estrellas de calificación 1 a 3 y candados 🔒 en niveles bloqueados).
3. **Estilos de Logros (`css/achievements.css`):**
   - Vitrina de trofeos con medallas brillantes, descripción amigable en 2 líneas y barra de progreso de desbloqueo.
4. **Adaptabilidad Estricta (5 Modos Cero Scroll):**
   - En Desktop y Tablets: Layouts de cuadrícula fluida con tarjetas generosas.
   - En Móvil Portrait: Lista vertical scrollable internamente dentro de su contenedor sin desbordar el `body`.
   - En Móvil Landscape (844x390 - 2 pulgares): Split screen 50/50 optimizado para pulgares.

---

## 🔊 ORDEN #3: AGENTE SONIDO
**Dominio:** Micro-paisajes sonoros y efectos para compras, equipamiento y subida de nivel.

### Entregables Específicos (`js/audio.js`):
1. `sfxBuy()`: Tintineo de monedas / caja registradora alegre en Web Audio API al adquirir un accesorio.
2. `sfxEquip()`: Pop elástico de ajuste al colocarse una prenda.
3. `sfxLevelUp()`: Fanfarria triunfal ascendente corta al subir de nivel de explorador.
4. `sfxWorldSelect()`: Tono de brújula / mapa al seleccionar una isla.

---

## 🧪 ORDEN #4: AGENTE TESTER (QA)
**Dominio:** Verificación automatizada Playwright, cero scroll en 5 pantallas y certificación del ciclo.

### Entregables Específicos (`tests/kimi-panda-matrix.spec.js`):
1. **Casos de Cero Scroll para Tienda, Mundos y Logros (`T-KP-05`):**
   - Validar ausencia de desborde horizontal y vertical en los 5 modos en las 3 nuevas pantallas.
2. **Flujo de Compra y Equipamiento en Tienda (`T-KP-06`):**
   - Acumulación de estrellas -> entrada a Tienda -> compra de accesorio -> descuento de estrellas -> estado "Equipado" -> reflejo en el Avatar del Hub.
3. **Flujo de Progresión en Mundos (`T-KP-07`):**
   - Apertura de Mundos -> selección de Bosque Matemático -> jugar ronda -> desbloqueo de nivel 2.
4. **Validación de Experiencia y Level Up (`T-KP-08`):**
   - Suma de XP por ronda -> aumento de nivel y actualización del chip del HUD.
