# 📜 Órdenes Operativas Oficiales — SPRINT 5: "Kimi Panda" (Accesibilidad WCAG 2.2 AA, PWA Instalable y Cierre MVP)
**Emitidas por:** Consejo Asesor Independiente (Cámara Asesora)  
**Autoridad de Despacho:** Director Ejecutivo (USER)  
**Entorno de Trabajo Exclusivo:** `e:\Presion Mental APP\Kimi Panda\app\`  
**Estado:** 🟢 COMPLETADO Y CERTIFICADO (18/18 TESTS VERDES — CIERRE MVP EXITOSO)

---

## 🎯 OBJETIVOS MAESTROS DEL SPRINT 5 (CIERRE MVP)

El **Sprint 5** culmina la primera fase integral del producto educativo independiente **Kimi Panda (MVP Flash PWA)** para niños de 6 a 7 años (Tier 1: Mineduc Chile), elevando la aplicación a los más altos estándares de accesibilidad universal, resiliencia PWA offline y control de aula escolar:

1. **♿ Accesibilidad Universal (WCAG 2.2 AA & Ergonomía Infantil):**
   - **Foco Visible de Alto Contraste:** Implementación de reglas `:focus-visible` con contorno azul luminoso (`--blue`) de 3px y offset de 3px para garantizar navegación impecable con teclado o dispositivos apuntadores asistivos.
   - **Semántica y Atributos ARIA Completos:**
     - Botones con `aria-label` descriptivos en todas las acciones y pantallas.
     - Controles de pestañas con `role="tablist"`, `role="tab"`, `aria-selected` y `aria-controls`.
     - Notificaciones con `role="status"` y `aria-live="polite"`.
   - **Ergonomía Táctil:** Áreas de contacto $\ge 44\times 44$px en todos los botones de la interfaz.
   - **Respeto a `prefers-reduced-motion`:** Supresión de animaciones de rebote y transiciones aceleradas para usuarios con sensibilidad vestibular o TDAH.

2. **📲 PWA Instalable y Caching Offline Resiliente:**
   - **Manifest PWA Completo:** Configuración en `manifest.json` de nombre formal, short name, color de tema (`#37A05C`), color de fondo (`#FFF4E4`), categoría `education` e iconos multi-resolución (192×192 y 512×512 con soporte `maskable`).
   - **Meta Tags de Integración Móvil:** Compatibilidad nativa para iOS y Android con `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style` y enlaces `apple-touch-icon`.
   - **Instalación Interactiva:** Captura del evento nativo `beforeinstallprompt` y botón de instalación asistida en pasaporte (`#btn-pwa-install`).

3. **🔄 Reinicio de Partida Seguro para Aula Escolar:**
   - Función `resetProfile()` en `store.js` para permitir que un docente o apoderado reinicie el progreso y saldo de estrellas de forma limpia cuando otro estudiante tome la tableta.
   - Mecánica de confirmación de 2 toques en `#btn-profile-reset` para prevenir borrados accidentales por parte de los niños.

4. **🧪 Certificación Automatizada Playwright (18/18 Tests Verdes):**
   - Nuevos tests `T-KP-13` (Accesibilidad WCAG 2.2 AA y reduced motion) y `T-KP-14` (PWA Manifest y reinicio de partida).
   - Verificación continua de Cero Scroll en los 5 modos de pantalla oficiales.

---

## 🔒 RESUMEN DE CONFINAMIENTO Y ESTABILIDAD
1. **Confinamiento 100%:** Todo el código reside en `Kimi Panda/app/`.
2. **Cero Regresiones:** El proyecto base `index.html` se mantiene 100% operativo y limpio.
