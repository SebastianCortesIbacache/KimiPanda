# Plan de trabajo — Rediseño visual "Aventura de Mochi en las Islas Flotantes"

**Proyecto:** Reto Panda (`SebastianCortesIbacache/PresionMental`)
**Objetivo:** Llevar la app del estilo actual (flat, fondos acuarela, emojis) al estilo de la referencia: render 3D tipo película de animación, islas flotantes, botones glossy y mascota protagonista.
**Referencia visual:** `Aventura de Mochi en las Islas Flotantes.png`
**Fecha:** Octubre 2026

---

## 1. Análisis de la situación actual

### 1.1 Estructura del proyecto (levantamiento real del repo)

```
PresionMental/
├── index.html
├── manifest.json, sw.js          → PWA (¡afecta a caché de assets!)
├── package.json, playwright.config.js, tests/  → ya hay tests E2E
├── css/
│   ├── variables.css             → tokens de diseño (punto de entrada clave)
│   ├── base.css, layout.css, components.css
│   ├── game.css, popups.css, states.css
│   └── tiers/                    → temas por tier (clay, retrowave, cyberpunk)
├── js/
│   ├── main.js, ui.js, game.js, store.js, db.js
├── assets/
│   ├── fondos/ iconos/ interface/ mascotas/ accesorios/ badges/
│   ├── audio/ sounds/ data/ db/ preguntas/
│   └── *_PROMPTS_*.md            → ya existe un pipeline de prompts de assets
└── Preguntas/, Referencias Visuales/
```

**Conclusión del levantamiento:** el proyecto ya está modularizado (CSS por capas, JS por módulos) y ya tiene una cultura de assets generados por prompts documentados. El rediseño encaja en esa estructura **sin necesidad de reescribir lógica**: el trabajo es 80 % CSS + assets, 20 % HTML/JS.

### 1.2 Brecha actual → objetivo

| Aspecto | Estado actual | Objetivo (referencia) |
|---|---|---|
| Fondo | Acuarela azul plana/borrosa | Escena 3D: cielo, nubes, islas flotantes con profundidad |
| Mascota | Emoji 🐼 y PNG pequeño | Mochi 3D protagonista (con mochila), tamaño hero |
| Botones menú | Circulares pequeños radiales, texto curvo | Botones gigantes glossy (verde/naranja) con icono 3D |
| Header | Texto simple | Tarjeta con avatar, nivel + barra XP, contador de estrellas con botón "+" |
| Iconografía | Emojis del sistema | Iconos 3D renderizados propios (gamepad, isla, brújula, cofre, estrella) |
| Progresión | Solo estrellas | Estrellas + sistema XP/nivel (nuevo, requiere lógica) |
| Misiones | Lista clara pero plana | Tarjeta "Misión de hoy" con iconos 3D, barras gruesas, cofre recompensa |
| Tipografía | Redondeada correcta | Mantener redondeada, mayor jerarquía y peso |

**Decisión de alcance importante:** el sistema XP/nivel (Nivel 12, 320/600 XP) de la referencia **no existe hoy** en la lógica del juego. El plan lo incluye como funcionalidad nueva (Fase 4).

---

## 2. Dirección de arte (especificación)

Extraída de la imagen de referencia:

- **Estilo:** render 3D "feature-film" suave (Pixar-like), luz cálida, colores saturados pero agradables, bordes redondeados en todo.
- **Paleta principal:**
  - Cielo: azul claro `#7EC8F0` → `#E8F6FF` (gradiente vertical)
  - Verde acción: `#3EBB6E` (botón Mundos, barras de progreso)
  - Naranja acción: `#FFA53B` (botón Juego libre)
  - Amarillo estrella: `#FFC93C`
  - Azul XP: `#3FA9F5`
  - Tinta texto: `#2B3A4A` / blanco sobre color
  - Tarjetas: blanco crema `#FFFDF6`
- **Botones glossy:** borde exterior oscuro (sombra sólida inferior gruesa ~8px), gradiente interno con brillo superior (highlight), radio ~36px, icono 3D centrado arriba, texto blanco con sombra suave.
- **Tarjetas:** blancas, radio ~28px, sombra inferior sólida oscura (no difusa), stickers rotados con borde.
- **Mascota:** Mochi 3D con polera azul y mochila naranja, saludando; posada sobre la isla del primer plano.

---

## 3. Fases del plan

### Fase 0 — Preparación (0.5 día)

| # | Tarea | Detalle |
|---|---|---|
| 0.1 | Crear rama `redesign/islas-flotantes` | Todo el trabajo fuera de `main` |
| 0.2 | Backup de CSS actuales | Ya existe precedente (`popups_circular_backup.css`); hacer lo mismo para `components.css` y `game.css` |
| 0.3 | Congelar la referencia | Copiar la imagen a `Referencias Visuales/` y anotarla (medidas aproximadas, colores con cuentagotas) |
| 0.4 | Definir `ASSETS_PROMPTS_TIER_ISLAS.md` | Siguiendo el formato de los `*_PROMPTS_*.md` existentes, crear el documento de prompts del nuevo tema |

**Entregable:** rama lista + documento de prompts inicial.

---

### Fase 1 — Producción de assets 3D (3–4 días)

Es la fase crítica: sin buenos assets no hay rediseño. Todos en `assets/`, PNG con transparencia (salvo fondo), exportados también a WebP.

| # | Asset | Destino | Especificación |
|---|---|---|---|
| 1.1 | Fondo islas flotantes | `assets/fondos/hub_islas.webp` | 1536×1024 (landscape) + versión portrait 1080×1920; cielo, nubes, 3–4 islas lejanas, isla principal abajo-izquierda **sin personaje** (la mascota va encima como capa separada) |
| 1.2 | Mochi 3D hero | `assets/mascotas/mochi_explorador_saluda.png` | 1024×1024 transparente, polera azul, mochila naranja, saludando |
| 1.3 | Mochi variantes | `assets/mascotas/` | 3 poses extra con mismo prompt base: celebrando (acierto), pensando (pregunta), triste-suave (error) |
| 1.4 | Icono isla/montaña 3D | `assets/iconos/ico_mundos_3d.png` | 512×512 transparente, estilo del botón verde de la referencia |
| 1.5 | Icono gamepad 3D | `assets/iconos/ico_libre_3d.png` | 512×512 transparente, morado/blanco como referencia |
| 1.6 | Iconos secundarios 3D | `assets/iconos/` | Carrito (tienda), trofeo (logros), gráfico (destrezas), engranaje (ajustes), brújula, cofre del tesoro, estrella, diana |
| 1.7 | Sprites decorativos | `assets/interface/` | Nube suelta, estrella flotante, hojas — para capas de parallax |
| 1.8 | Documentar prompts | `assets/ASSETS_PROMPTS_TIER_ISLAS.md` | Prompt exacto de cada asset + seed si el generador lo permite (coherencia entre generaciones) |

**Regla de coherencia:** un único "prompt maestro" de estilo (mismo encabezado de estilo, iluminación y cámara) del que cuelgan todos los prompts; revisar cada asset contra la referencia antes de aprobarlo (checklist: ¿mismo grosor de formas? ¿misma luz? ¿misma saturación?).

**Optimización obligatoria:** fondo ≤ 300 KB en WebP; PNGs transparentes ≤ 150 KB (comprimir con `oxipng`/`squoosh`). Es PWA para niños, probablemente en tablets modestas.

**Entregable:** carpeta de assets completa + documento de prompts + hoja de aprobación visual.

---

### Fase 2 — Sistema de diseño en `variables.css` (1 día)

Reemplazar/crear tokens (sin borrar los actuales hasta el final — ver estrategia §5):

```css
/* Tema Islas Flotantes */
--sky-top:#7EC8F0; --sky-bottom:#E8F6FF;
--c-green:#3EBB6E; --c-green-d:#2A9453;
--c-orange:#FFA53B; --c-orange-d:#E0871F;
--c-star:#FFC93C; --c-xp:#3FA9F5;
--ink:#2B3A4A; --card:#FFFDF6;
--r-card:28px; --r-btn:36px; --r-pill:999px;
--shadow-solid:0 8px 0 rgba(43,58,74,.25);
--btn-highlight: inset 0 4px 0 rgba(255,255,255,.45);
```

- [ ] 2.1 Definir tokens de color, radios, sombras y espaciados
- [ ] 2.2 Definir escala tipográfica (3 niveles: display/body/label; nada < 14 px)
- [ ] 2.3 Crear clase utilitaria `.btn-glossy` (gradiente + highlight inset + sombra sólida + estado `:active` hundido)
- [ ] 2.4 Crear clase `.card-3d` (blanco crema, radio, sombra sólida inferior)
- [ ] 2.5 Crear `.sticker-rot` (píldora rotada -2.5° con borde y sombra)
- [ ] 2.6 Verificar contraste WCAG AA en textos (mínimo 4.5:1 en cuerpo)

**Entregable:** `variables.css` + sección de componentes base en `components.css`.

---

### Fase 3 — Reconstrucción del Hub (3 días)

Pantalla estrella del rediseño. Trabajo sobre `layout.css` + `components.css` y el markup del hub en `index.html`/`ui.js`.

**3.1 Header de perfil** (componente nuevo `profile-header`)
- [ ] Avatar circular con aro blanco grueso y sombra (usa `mochi_explorador_saluda.png` recortado)
- [ ] Nombre + subtítulo ("8 años · Exploradora")
- [ ] Chip de nivel: estrella amarilla + número, y barra XP azul con texto `320 / 600 XP`
- [ ] Contador de estrellas con botón verde "+" (lleva a la tienda)
- [ ] Botón ajustes: icono engranaje 3D en círculo blanco

**3.2 Zona hero**
- [ ] Fondo `hub_islas.webp` a pantalla completa con `background-size:cover`
- [ ] Mochi 3D posicionado sobre la isla, con animación de flotación (translateY ±8px, 3.5 s)
- [ ] Burbuja de diálogo blanca "¿Qué jugamos hoy?" con cola, tipografía grande
- [ ] Capas de parallax: nubes y estrella flotante moviéndose a distinta velocidad (CSS puro, `prefers-reduced-motion` las desactiva)

**3.3 Menú principal (2 botones gigantes + 4 secundarios)**
- [ ] Botón **Mundos** verde glossy con `ico_mundos_3d.png`
- [ ] Botón **Juego libre** naranja glossy con `ico_libre_3d.png`
- [ ] Fila secundaria (más pequeños, mismo lenguaje): Tienda, Logros, Destrezas, con sus iconos 3D
- [ ] Estados: `:hover` (brillo +5 %), `:active` (hundido 4px, sombra se reduce)
- [ ] Zonas táctiles ≥ 64×64 px en todos

**3.4 Tarjeta "Misión de hoy"**
- [ ] Sticker amarillo rotado con icono diana 3D + título
- [ ] Filas de misión: icono 3D, texto a 2 líneas, contador `2 / 5`, barra de progreso gruesa verde
- [ ] Cofre 3D a la derecha de la primera misión (recompensa visual)
- [ ] Reutilizar datos reales del sistema de misiones actual (solo cambia la piel)

**Entregable:** hub idéntico a la referencia (comparación lado a lado aprobaría un ojo externo).

---

### Fase 4 — Funcionalidad nueva: sistema XP/Nivel (2 días)

La referencia muestra Nivel 12 y `320/600 XP`. Hay que crearlo:

- [ ] 4.1 Modelo en `db.js`: `xp_total`, fórmula de nivel (sugerencia: `xp_para_nivel(n) = 50 * n`, nivel = acumulado progresivo)
- [ ] 4.2 Ganancia de XP en `game.js`: +XP por acierto (p. ej. 10), bonus por racha, por completar nivel y por misión
- [ ] 4.3 Persistencia en el store existente (mismo mecanismo que estrellas)
- [ ] 4.4 Animación de la barra XP al ganar (relleno animado + "level up" con Mochi celebrando cuando sube de nivel)
- [ ] 4.5 Migración: perfiles existentes parten con XP proporcional a sus estrellas (p. ej. `xp = estrellas × 5`) para no castigar a usuarios actuales

**Entregable:** XP funcional, persistente y con feedback visual.

---

### Fase 5 — Extensión del tema al resto de pantallas (3 días)

El hub marca el estilo; el resto lo adopta de forma consistente pero más simple:

| Pantalla | Cambios |
|---|---|
| Splash / registro | Fondo islas (versión portrait), logo existente sobre tarjeta 3D, inputs glossy |
| Mapa de mundos | Mantener estructura de nodos; fondos por mundo regenerados en estilo 3D (mismo prompt maestro); nodos con aspecto de "moneda 3D" |
| Pantalla de juego | HUD sobre píldoras blancas con sombra sólida; tarjeta de pregunta `.card-3d`; respuestas `.btn-glossy` blancas; Mochi pensando/celebrando/triste según estado |
| Tienda | Tarjetas `.card-3d`, mascotas en vitrina 3D, botón comprar glossy verde |
| Logros / Destrezas | Badges existentes re-encuadrados en tarjetas 3D |
| Ajustes / popups | `popups.css` al nuevo lenguaje (bordes gruesos, sombras sólidas, stickers) |

- [ ] 5.1 Splash y registro
- [ ] 5.2 Mapa de mundos + fondos por mundo (5 fondos nuevos, mismo pipeline de prompts)
- [ ] 5.3 Pantalla de juego (la segunda más vista: capricho aquí)
- [ ] 5.4 Tienda, Logros, Destrezas
- [ ] 5.5 Popups y estados (`states.css`)

---

### Fase 6 — Rendimiento, PWA y responsive (1.5 días)

- [ ] 6.1 Todas las imágenes nuevas con `loading="lazy"` salvo el fondo del hub y Mochi (preload)
- [ ] 6.2 Actualizar `sw.js`: versionar la caché (bump de `CACHE_NAME`) para que los usuarios no queden con assets viejos — **paso fácil de olvidar y crítico**
- [ ] 6.3 `srcset`/variantes portrait-landscape del fondo según orientación (`media (orientation: portrait)`)
- [ ] 6.4 Presupuesto de rendimiento: pantalla de hub < 1.2 MB total, LCP < 2.5 s en 4G
- [ ] 6.5 Verificar tablet (768–1024 px), móvil (360–430 px) y desktop; la app actual se ve en horizontal, la referencia es vertical — **decidir y documentar orientación prioritaria**
- [ ] 6.6 `prefers-reduced-motion`: desactivar parallax y flotaciones

---

### Fase 7 — QA, tests y despliegue (1.5 días)

- [ ] 7.1 Actualizar tests Playwright existentes (selectores que cambien por el nuevo markup)
- [ ] 7.2 Nuevos tests E2E: flujo splash → hub → nivel → acierto (suma estrellas **y XP**) → vuelta al hub (barra XP persistió)
- [ ] 7.3 Prueba de regresión visual: capturas antes/después de cada pantalla (Playwright screenshots)
- [ ] 7.4 Test con usuarios reales: 3–5 niños del rango objetivo; observar si encuentran los botones sin ayuda (métrica: tiempo hasta tocar "Mundos" < 5 s)
- [ ] 7.5 Checklist accesibilidad: contraste, foco visible, `aria-label` en iconos-botón
- [ ] 7.6 Merge a `main`, deploy a GitHub Pages y verificación en producción (incl. forzar actualización del SW)

---

## 4. Cronograma resumido

| Fase | Duración | Dependencia |
|---|---|---|
| 0. Preparación | 0.5 día | — |
| 1. Assets 3D | 3–4 días | Fase 0 |
| 2. Sistema de diseño | 1 día | Fase 0 (paralelizable con 1) |
| 3. Hub | 3 días | Fases 1 y 2 |
| 4. XP/Nivel | 2 días | Fase 3 (parcialmente paralelizable) |
| 5. Resto de pantallas | 3 días | Fases 1, 2 y 3 |
| 6. Rendimiento/PWA | 1.5 días | Fase 5 |
| 7. QA y despliegue | 1.5 días | Fase 6 |
| **Total** | **≈ 15–16 días (3 semanas)** | |

Con dos personas (una en assets/arte, otra en código): **≈ 2 semanas**.

---

## 5. Estrategia técnica de integración

1. **No romper lo que funciona:** el rediseño es una capa de piel. La lógica de juego (`game.js`), preguntas y store se tocan lo mínimo (solo XP).
2. **Convivencia de temas:** como ya existe `css/tiers/`, implementar "Islas Flotantes" como un tier más (p. ej. `tiers/islas.css`) que sobrescribe tokens. Así se puede volver atrás con un cambio de clase en `<body>`.
3. **Migración componente a componente:** hub primero (mayor impacto), luego el resto. Cada pantalla mergeable por separado.
4. **Assets antes que CSS:** ninguna pantalla se maqueta hasta tener sus assets aprobados — maquetar con placeholders lleva a retrabajo.

---

## 6. Criterios de aceptación

- [ ] El hub es visualmente equivalente a la referencia (mismo layout: header perfil, hero Mochi+burbuja, 2 botones glossy, tarjeta misión con cofre)
- [ ] Cero emojis del sistema en la UI (todos reemplazados por assets propios)
- [ ] XP/nivel funciona, persiste tras recargar y migra datos de usuarios existentes
- [ ] Hub < 1.2 MB, LCP < 2.5 s en 4G simulado
- [ ] Tests Playwright en verde
- [ ] Un niño de 6–9 años llega desde el splash hasta responder una pregunta sin ayuda
- [ ] Todo el catálogo de prompts documentado en `assets/ASSETS_PROMPTS_TIER_ISLAS.md`

---

## 7. Riesgos y mitigaciones

| Riesgo | Prob. | Mitigación |
|---|---|---|
| Assets IA incoherentes entre sí (cada imagen "de su padre y su madre") | Alta | Prompt maestro único, seeds fijas, checklist de aprobación contra referencia (Fase 1) |
| Peso de imágenes 3D mata el rendimiento | Media | WebP, presupuesto por asset, compresión obligatoria, lazy loading (Fase 6) |
| Service Worker sirve assets viejos tras el rediseño | Media | Bump de `CACHE_NAME` + test de actualización en 7.6 |
| Alcance crece (rediseñar los 5 fondos de mundo, 50 niveles…) | Alta | Fase 5 limitada a "adoptar el lenguaje", fondos de mundo en una fase posterior si el tiempo aprieta |
| Orientación: la app actual es landscape, la referencia portrait | Media | Decisión explícita en 6.5; recomendado: soportar ambas con el fondo en dos variantes |

---

## 8. Entregables finales

1. Rama `redesign/islas-flotantes` mergeada y desplegada en GitHub Pages
2. Biblioteca de assets 3D en `assets/` + documento de prompts
3. Tier CSS `islas` en `css/tiers/`
4. Sistema XP/Nivel operativo
5. Suite de tests actualizada + informe de regresión visual
