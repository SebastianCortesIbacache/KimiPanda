# 📜 Órdenes Operativas Oficiales — SPRINT 4: "Kimi Panda" (Calificación por Estrellas, Destrezas Curriculares Mineduc y PWA v6)
**Emitidas por:** Consejo Asesor Independiente (Cámara Asesora)  
**Autoridad de Despacho:** Director Ejecutivo (USER)  
**Entorno de Trabajo Exclusivo:** `e:\Presion Mental APP\Kimi Panda\app\`  
**Estado:** 🟢 COMPLETADO Y CERTIFICADO (16/16 TESTS VERDES)

---

## 🎯 OBJETIVOS MAESTROS DEL SPRINT 4

El **Sprint 4** de **Kimi Panda** eleva la aplicación a un nivel superior de gamificación pedagógica, progresión curricular y retroalimentación interactiva infantil (Tier 1: 6-7 años), incorporando:

1. **⭐ Sistema de Calificación de 1 a 3 Estrellas por Nivel en Mundos:**
   - **Evaluación No Punitiva:**
     - 0 errores $\implies$ 3 ⭐⭐⭐ (*"¡Ronda Perfecta! ¡Eres increíble! 🌟"*)
     - 1 error $\implies$ 2 ⭐⭐ (*"¡Excelente Trabajo! ¡Casi perfecto! 👏"*)
     - $\ge 2$ errores $\implies$ 1 ⭐ (*"¡Bien Hecho! ¡Completaste el reto! 💪"*) — Siempre se premia el esfuerzo y la finalización.
   - **Visualización en Pantalla de Resumen:** Billetera de 3 estrellas animadas con entrada secuencial elástica (`starBounceIn`) y mensajes de elogio diferenciados.
   - **Persistencia en Mapa de Mundos:** Cada nodo de nivel (`.lvl-node`) muestra las estrellas obtenidas en una insignia flotante (`.lvl-stars-mini`), desbloqueando progresivamente el siguiente nivel.

2. **📊 Destrezas Curriculares (Radar de Aprendizaje Mineduc):**
   - **6 Dominios Curriculares Oficiales:**
     1. 🧮 **Matemáticas** (OA 01 - OA 04): Conteo, adiciones, sustracciones y figuras 2D.
     2. 🌿 **Ciencias Naturales** (OA 01 - OA 06): Sentidos, seres vivos, plantas y fauna chilena.
     3. 📖 **Lenguaje y Comunicación** (OA 02 - OA 08): Conciencia fonológica, vocales, rimas y vocabulario.
     4. 💡 **Lógica y Pensamiento** (Transversal): Patrones repetitivos, secuencias y deducción visual.
     5. 🏛️ **Historia y Geografía** (OA 01 - OA 05): Entorno familiar, puntos cardinales, paisajes y Chile.
     6. 🇬🇧 **Inglés Temprano** (Vocabulario): Saludos, números, colores y familia.
   - **Métricas en Tiempo Real:** Registro automático de aciertos y precisión porcentual en `store.js` (`profile.stats`).
   - **Rangos de Maestría Pedagógica:** *Semilla 🌱*, *Aprendiz 🎒*, *Explorador 🧭* y *Maestro Panda 👑*.
   - **Acceso Directo:** Clic en la píldora de Nivel del Top Bar HUD (`#hub-level-pill`) abre directamente el radar de Destrezas.

3. **🔊 Nuevos Paisajes Sonoros Sintetizados (Web Audio API):**
   - `playFanfare3Stars()`: Secuencia armónica brillante ascendente (Do5 - Mi5 - Sol5 - Do6 - Mi6) para rondas perfectas.
   - `playTrophy()`: Tríada de campanas agudas cristalinas para logros y medallas curriculares.

4. **📱 PWA Service Worker v6:**
   - Actualización de caché a `kimi-panda-v6` con precacheo exhaustivo de scripts, estilos, banco de preguntas y audio.

5. **🧪 Certificación Automatizada Playwright (16/16 Tests):**
   - Incorporación de pruebas `T-KP-11` (Estrellas por nivel) y `T-KP-12` (Destrezas curriculares).
   - Verificación de cero scroll sostenido en los 5 modos oficiales (Desktop, Tablet Portrait, Tablet Landscape, Móvil Portrait, Móvil Landscape).

---

## 🔒 REGLAS DE AISLAMIENTO Y CUMPLIMIENTO
1. Aislamiento absoluto en `Kimi Panda/app/` (cero modificaciones en el index.html raíz).
2. Regresión CERO: Todos los tests funcionales de la suite principal y de Kimi Panda se encuentran 100% en verde.
