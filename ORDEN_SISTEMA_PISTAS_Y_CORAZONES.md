# 📜 ORDEN OPERATIVA OFICIAL — SISTEMA DE PISTAS CURRICULARES Y MECÁNICA DE CORAZONES (0 VIDAS)
**Proyecto:** Kimi Panda (MVP Flash PWA)  
**Autoridad de Aprobación:** Director Ejecutivo (USER)  
**Emisión Técnica:** Consejo Asesor Independiente (Psicopedagogo, Gamedev, Arquitecto)  
**Entornos de Aplicación:** `E:\KimiPanda\` (Repo GitHub Pages) y `e:\Presion Mental APP\Kimi Panda\app\`  
**Estado:** 🟡 LISTA PARA EJECUCIÓN (Aprobada por el Director Ejecutivo — Pendiente de orden de arranque en chat operativo)

---

## 🎯 Objetivo General
Resolver de raíz las dos inconsistencias de diseño lúdico y curricular auditadas por el Director Ejecutivo:
1. **Mecánica de 0 Corazones:** Eliminar el estado zombi donde el jugador con 0 corazones puede seguir jugando indefinidamente sin consecuencias. Implementar un **Cierre Amable de Ronda (Soft Fail)** con **Segunda Oportunidad de Mochi**, protegiendo la autoestima del niño de 6-7 años sin castigos punitivos.
2. **Sistema de 200 Pistas Curriculares:** Erradicar las frases genéricas hardcodeadas en JavaScript y construir un banco de **200 pistas pedagógicas específicas** inyectadas en `data/questions_mvp_6_7.json` y leídas dinámicamente en el motor de juego.

---

## 🛠️ PARTE 1: MECÁNICA DE CORAZONES EN 0 (GAMEDEV & ARQUITECTO)

### Diagnóstico del Problema:
En `js/game.js`, al fallar una pregunta se ejecuta `decrementHeart()`, pero nunca se comprueba si los corazones llegaron a 0. El juego simplemente permanece en 0 corazones y el niño puede seguir probando opciones indefinidamente, vaciando de sentido al HUD de corazones.

### Directiva de Implementación Aprobada:
1. **Flujo de Ejecución al llegar a 0 Corazones:**
   - Cuando `currentProfile.hearts` llega a 0 tras un fallo:
   - **Paso A (Segunda Oportunidad de Mochi - 1 vez por ronda):**
     - Si el jugador no ha usado su Segunda Oportunidad en la ronda actual:
     - Se pausa la tarjeta de preguntas y emerge el modal afectivo de Mochi (`#mochi-help-modal`):
       > *"¡Uff, estas preguntas están un poco difíciles! Toca a Mochi para recargar energías 🐼💖"*
     - Al tocar a Mochi: se reproduce sonido de alivio (`playMagic()`), Mochi sonríe y se recarga **+1 corazón** (`store.js` -> `currentProfile.hearts = 1`), permitiendo al niño continuar la ronda sin frustración.
   - **Paso B (Cierre Amable de Ronda - Soft Fail):**
     - Si el jugador vuelve a equivocarse y los corazones llegan a 0 por segunda vez (o si se desactiva la segunda oportunidad):
     - La ronda se detiene inmediatamente.
     - Se reproduce sonido suave de conclusión (`playWrongSoft()`).
     - Se transiciona a la Pantalla de Resumen (`scr-summary`):
       - **Título:** *"¡Buen esfuerzo! Practiquemos juntos 🐼"* (NUNCA "Game Over" ni "Perdiste").
       - **Estrellas:** Se otorga **1 ⭐ de Perseverancia** y se suman los puntos de experiencia (XP) ganados hasta ese punto.
       - **Botones:** Botón primario *"Reintentar Ronda 🔄"* y botón secundario *"Volver al Mapa 🗺️"*.
       - Al presionar Reintentar, se invoca `resetHearts()` para volver a iniciar con los 3 corazones llenos (`❤️❤️❤️`).

2. **Archivos a Modificar:**
   - `js/game.js`: Manejo de evento `HEARTS_DEPLETED` en `checkAnswer()`.
   - `js/store.js`: Variable de control `secondChanceUsed = false` reiniciada al inicio de cada ronda.
   - `index.html`: Estructura del modal `#mochi-help-modal` (liviano y centrado).
   - `css/game.css`: Animación de entrada de Mochi de apoyo y estilo del botón de recarga.

---

## 💡 PARTE 2: SISTEMA DE 200 PISTAS CURRICULARES (CONTENIDO, ARQUITECTURA & DISEÑO)

### Diagnóstico del Problema:
Actualmente en `js/game.js` (líneas 133-140) existen 4 frases fijas por categoría (`"¡Usa tus deditos..."`, `"¡Piensa en lo que has visto..."`). No corresponden a las preguntas concretas, generando incoherencias pedagógicas evidentes (ej. para el chamanto chileno o el algodón suave).

### Directiva de Implementación Aprobada:

### 1. [AGENTE CONTENIDO] Redacción e Inyección de 200 Pistas Específicas
- **Archivo:** `data/questions_mvp_6_7.json` (tanto en `E:\KimiPanda\` como en `Kimi Panda/app/`).
- **Esquema:** Agregar a cada uno de los 200 objetos el campo `"hint": "..."`.
- **Criterios Pedagógicos Obligatorios (Supervisión Psicopedagógica):**
  1. **Andamiaje (Scaffolding):** La pista no revela la respuesta correcta ("No sopla la solución"), sino que guía el razonamiento inductivo o deductivo del niño.
  2. **Apoyo en la Ilustración:** En las preguntas con imagen (`img != null`), la pista invita expresamente a observar un detalle de la figura (ej. *"Observa la textura del algodón, ¿se ve suave o áspera?"*, *"Mira la manta de huaso que abriga el pecho"*).
  3. **Extensión Máxima:** Frases cortas de **8 a 14 palabras**, redactadas en lenguaje cálido, positivo y accesible para iniciación lectora.
  4. **Alineación por Área:**
     - **Matemáticas (40):** Descomposición numérica concreta, analogías de frutas/objetos cotidianos.
     - **Ciencias (30):** Relación con el cuerpo humano, sentidos, hábitos y entorno natural chileno.
     - **Lenguaje (50):** Fonética, rimas, separación silábica y pronunciación guiada.
     - **Lógica (40):** Comparación de atributos (tamaño, color, dirección, secuencias).
     - **Historia (20):** Símbolos patrios, tradiciones, geografía básica de Chile.
     - **Inglés (20):** Pistas bilingües de apoyo asociativo (*"Red is like a strawberry!"*).

### 2. [AGENTE ARQUITECTO] Conexión Dinámica en el Motor (`js/game.js`)
- En `useHintHelper()` (`js/game.js`), eliminar las frases fijas y conectar:
  ```javascript
  const q = currentRound[currentQuestionIndex];
  const hintBox = document.getElementById('q-hint-box');
  const hintText = document.getElementById('q-hint-text');

  if (hintBox && hintText && q) {
    const msg = q.hint || "¡Observa con atención la pregunta y piensa con calma!";
    hintText.textContent = msg;
    hintBox.style.display = 'flex';
  }
  ```

### 3. [AGENTE DISEÑO] Pulido y Adaptabilidad de la Píldora de Pista (`css/game.css`)
- Ajustar `#q-hint-box` para que:
  - Tenga animación de entrada suave `@keyframes hintPop`.
  - No tape nunca las opciones de respuesta táctiles en la tarjeta de juego.
  - Se adapte con fluidez a la matriz de 5 pantallas (Desktop, Tablet V/H, Móvil V/H) manteniendo contraste accesible (WCAG 4.5:1).

### 4. [AGENTE TESTER] Suite de Certificación Playwright
- Crear o actualizar suite en `tests/` para verificar:
  - Que las 200 preguntas del JSON posean un campo `hint` de texto no vacío.
  - Que al activar el comodín de pista en el navegador, el texto inyectado en `#q-hint-text` coincida exactamente con el `q.hint` de la pregunta activa.
  - Que al acumular fallos hasta llegar a 0 corazones, el juego active el Cierre Amable / Segunda Oportunidad y no quede en estado zombi.

---

## 🔒 Cadena de Mando
- Esta orden queda formalizada en este documento y en las memorias de los agentes operativos.
- **Los agentes NO iniciarán modificaciones de código hasta que el Director Ejecutivo dé la orden explícita en el chat operativo.**
