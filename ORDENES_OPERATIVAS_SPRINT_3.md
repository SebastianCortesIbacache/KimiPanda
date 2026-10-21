# 📜 Órdenes Operativas Oficiales — SPRINT 3: "Kimi Panda" (Didáctica Infantil, Comodines Protectores y Recompensas)
**Emitidas por:** Consejo Asesor Independiente (Cámara Asesora)  
**Autoridad de Despacho:** Director Ejecutivo (USER)  
**Entorno de Trabajo Exclusivo:** `e:\Presion Mental APP\Kimi Panda\app\`  
**Estado:** 🟢 AUTORIZADO Y EN EJECUCIÓN

---

## 🎯 OBJETIVOS MAESTROS DEL SPRINT 3

Tras la entrega del núcleo (Sprint 1) y el ecosistema de progresión (Sprint 2: Mundos, Tienda y XP), el **Sprint 3** se enfoca en la **excelencia didáctica infantil (Tier 1: 6-7 años)** y la **mitigación del estrés cognitivo**, incorporando:

1. **🛡️ Mecánica de Comodines Protectores (Game Helpers):**
   - ❄️ **Escudo Mochi (50/50):** Descarta 2 opciones incorrectas de forma no punitiva, dejando 2 alternativas para orientar al niño.
   - 💡 **Pista Sabia:** Muestra un andamiaje o cápsula de consejo en lenguaje simple para apoyar la lectoescritura inicial.
2. **🎁 Reclamación Interactiva de Misiones Semanales (Hub):**
   - Cuando las misiones alcanzan el 100% (`gamesPlayed >= 20` o `mathCorrect >= 40`), se activa el botón dinámico *"¡Reclamar! 🎁"*.
   - Animación de cofre, sonido de recompensa, confeti y suma inmediata de estrellas al store.
3. **☁️ Diorama de Islas Flotantes (Juicy Environment):**
   - Fondo enriquecido de islas flotantes y nubes en CSS/SVG puro que evoca la referencia canónica de Mochi, manteniendo cero scroll y alta ligereza.
4. **🔊 Nuevos Efectos de Audio Web API:**
   - `playMagic()` (para comodín 50/50), `playHint()` (para pista sabia) y `playChest()` (para apertura de cofres).
5. **🧪 Certificación Automatizada Playwright (5 Modos):**
   - Verificación de comodines en juego, reclamo de misiones y cero scroll sostenido.

---

## 🔒 REGLAS DE AISLAMIENTO
1. Todo el código vive estrictamente en `Kimi Panda/app/`.
2. Prohibido romper compatibilidad de tests previos (`T-KP-01` a `T-KP-08` deben seguir 100% verdes).
3. No punitividad: Ningún comodín cuesta estrellas ni penaliza al menor.
