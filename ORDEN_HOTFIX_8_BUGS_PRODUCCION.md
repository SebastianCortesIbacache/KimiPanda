# 🚨 ORDEN OPERATIVA PRIORITARIA — HOTFIX SPRINT: 8 BUGS AUDITADOS EN PRODUCCIÓN
**Proyecto:** Kimi Panda (MVP Flash PWA)  
**Entornos de Aplicación:** `E:\KimiPanda\` (Repo Producción GitHub Pages) y `E:\Presion Mental APP\Kimi Panda\app\`  
**Autoridad de Despacho:** Consejo Asesor Independiente por mandato del Director Ejecutivo (USER)  
**Estado:** 🔴 URGENTE — REQUERIDO PARA CERTIFICACIÓN FINAL

---

## 📋 Resumen Ejecutivo
Tras la inspección visual en producción (`sebastiancortesibacache.github.io/KimiPanda/`), el Director Ejecutivo ha identificado 8 inconsistencias críticas que deben ser corregidas de inmediato por el cuerpo operativo.

A continuación se detalla la matriz de asignación, diagnóstico técnico y solución obligatoria para cada uno de los 8 bugs:

---

## 🛠️ Matriz Detallada de Correcciones

### 1. 🖼️ [GRÁFICO / ARQUITECTO] Cero Imágenes Rotas (404) y Preguntas Imposibles
- **Síntoma:** Preguntas visuales como `mvp_geo_1` ("¿Qué forma es esta?") muestran un ícono de imagen rota y tres opciones geométricas imposibles de responder.
- **Causa Raíz:** En `data/questions_mvp_6_7.json` se hace referencia a `assets/preguntas/mvp_geo_1.webp`. Sin embargo, en el sistema de archivos la carpeta se llama `assets/Preguntas` (con mayúscula) y contiene archivos `.jpg` sin procesar (`Caracol_...jpg`, `Cartoon_...jpg`).
- **Instrucción de Ejecución:**
  1. Estandarizar el nombre de la carpeta a minúsculas: `assets/preguntas/`.
  2. Mapear y procesar las imágenes sticker generadas al formato `.webp` con la nomenclatura oficial del banco (`mvp_geo_1.webp`, `mvp_art_1.webp`, etc.).
  3. Verificar que TODAS las preguntas que contienen el atributo `"img"` tengan su archivo correspondiente existente y accesible.

### 2. 📝 [ARQUITECTO / DISEÑO] Erradicar Texto de Pregunta Duplicado en la Tarjeta
- **Síntoma:** En preguntas con imagen, el texto de la pregunta aparece duplicado: una vez arriba y otra vez abajo dentro de la misma tarjeta.
- **Causa Raíz:** En `js/game.js` (líneas 194-195):
  ```javascript
  qMediaImg.src = q.img;
  qMediaImg.alt = q.q; // ❌ ERROR: Inyecta el texto completo de la pregunta en el alt
  ```
  Al fallar la carga de la imagen (404), el navegador renderiza el texto del `alt` (`q.q`) justo encima del contenedor `#q-text` (que también contiene `q.q`), duplicando visualmente la pregunta.
- **Instrucción de Ejecución:**
  1. Modificar `js/game.js`: El `alt` de la imagen debe ser genérico o descriptivo breve (ej. `alt = "Ilustración educativa"`), NUNCA `q.q`.
  2. Implementar fallback defensivo: Agregar un listener `onerror` en `qMediaImg` que oculte automáticamente el contenedor `.q-media-frame` (`display: none;`) si la imagen no carga, evitando mostrar íconos rotos o artefactos en pantalla.

### 3. 🧹 [DISEÑO / ARQUITECTO] Limpieza Radical de Fondo (Cero Mochilas e Islas Flotantes)
- **Síntoma:** Elementos gráficos parásitos (mochilas rojas e islas verdes sueltas) flotan en el cielo o asoman por detrás de las tarjetas de juego y la tienda.
- **Causa Raíz:** Contenedores `.floating-island.island-1`, `.island-2` y elementos SVG descolgados en `index.html` y `css/tokens.css` / `css/hub.css`.
- **Instrucción de Ejecución:**
  1. Eliminar los contenedores `.floating-island` y SVGs de mochilas flotantes en `index.html`.
  2. Mantener el fondo del juego como un cielo cálido crema anti-fatiga (`#FFF4E4`) limpio, complementado únicamente por halos difusos sutiles (`.blob`), sin figuras parásitas que generen distracción o ruido cognitivo en niños de 6-7 años.

### 4. 🐼 [DISEÑO] Mochi a Escala Hero con Sombra de Apoyo en el Suelo
- **Síntoma:** En la pantalla principal (Hub), Mochi se visualiza pequeño y parece flotar en el aire sin anclaje físico.
- **Causa Raíz:** Reglas CSS con dimensiones insuficientes y ausencia de sombra de contacto en `.mochi-hero`.
- **Instrucción de Ejecución:**
  1. En `css/hub.css`, ajustar el contenedor de Mochi a proporciones hero: `width: min(48vw, 220px); height: auto;`.
  2. Incorporar una elipse de sombra de apoyo física debajo de los pies de Mochi:
     ```css
     .mochi-shadow {
       width: 140px;
       height: 18px;
       background: rgba(36, 28, 21, 0.12);
       border-radius: 50%;
       filter: blur(4px);
       margin: -10px auto 0;
     }
     ```

### 5. 🧢 [DISEÑO / GAMEDEV] Alinear Accesorios en la Tienda (Gorra Flotante)
- **Síntoma:** En el probador de la Tienda, la gorra u otros accesorios flotan 20 a 30 píxeles por encima de la cabeza del avatar de Mochi.
- **Causa Raíz:** Coordenadas absolutas (`top`, `left`) descalibradas en `.avatar-preview-hat` respecto al contenedor responsive del avatar.
- **Instrucción de Ejecución:**
  1. Calibrar las coordenadas relativas en `css/shop.css` / `css/hub.css` vinculadas a porcentajes del contenedor padre:
     ```css
     .avatar-preview-hat {
       position: absolute;
       width: 56%;
       top: -6%;
       left: 22%;
       transform: rotate(-4deg);
       pointer-events: none;
       z-index: 3;
     }
     ```
  2. Probar la visualización en los 5 modos de pantalla (Desktop, Tablet V/H, Móvil V/H) para asegurar que el accesorio encaje perfectamente sobre la cabeza de Mochi.

### 6. 🎨 [GRÁFICO / DISEÑO] Erradicar Emojis Genéricos de Sistema en la Tienda
- **Síntoma:** En el catálogo de la tienda se muestran emojis nativos del sistema operativo (ej. `🦸‍♂️` en "Capa Voladora").
- **Causa Raíz:** Uso de caracteres Unicode de emojis como placeholders en `js/shop.js` o `index.html`.
- **Instrucción de Ejecución:**
  1. Reemplazar todos los emojis de sistema en los ítems de la tienda por íconos SVG vectoriales limpios o stickers ilustrados fieles a la estética oficial *Sticker Cartoon / Clay*.

### 7. 📱 [DISEÑO] Safe-Area Padding y Cero Textos Cortados en Footer
- **Síntoma:** En teléfonos móviles (tanto en vertical como en horizontal), el footer, textos de copyright o botones inferiores chocan con los bordes de la pantalla o quedan tapados por la barra de navegación del dispositivo.
- **Causa Raíz:** Falta de consideración de las variables de entorno de notch y gestos (`env(safe-area-inset-bottom)`).
- **Instrucción de Ejecución:**
  1. En `css/tokens.css` y `css/hub.css`, aplicar a `.app`, `.screen` y modales:
     ```css
     padding-bottom: calc(28px + env(safe-area-inset-bottom));
     box-sizing: border-box;
     ```
  2. Garantizar que en ningún modo de pantalla se produzcan solapamientos entre botones de acción y pies de página.

### 8. ❤️ [ARQUITECTO / GAMEDEV] Corazones de Vida Activos (Rojos) al Iniciar Partida
- **Síntoma:** Al arrancar una partida, los corazones de vida se dibujan en gris (vacíos), pareciendo que el jugador ya no tiene vidas.
- **Causa Raíz:** Inicialización errónea en `js/store.js` o renderizado por defecto de SVGs con clase inactiva en `js/game.js` (`renderHearts()`).
- **Instrucción de Ejecución:**
  1. Verificar que `store.js` inicialice con `hearts: 3`.
  2. En `js/game.js`, la función `renderHearts()` debe inyectar SVGs con relleno rojo activo (`fill: var(--red, #F0685F);`) para todas las vidas disponibles, y solo aplicar la clase `.lost` (gris/opaca) cuando el jugador falle una pregunta.

---

## 🔒 Cadena de Mando y Ejecución
1. Esta orden está formalizada y registrada en las memorias de todos los agentes.
2. Los agentes operativos deben aplicar estas correcciones **tanto en `E:\KimiPanda\` como en `E:\Presion Mental APP\Kimi Panda\app\`** para que la versión desplegada en GitHub Pages quede 100% libre de fallos.
3. El Agente Tester (QA) debe verificar visual y programáticamente los 8 puntos tras la ejecución.
