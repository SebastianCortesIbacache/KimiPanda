# 🐼 Kimi Panda — Aventura de Aprendizaje Didáctico

[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-37A05C?style=for-the-badge&logo=pwa)](https://github.com/SebastianCortesIbacache/KimiPanda)
[![Audience](https://img.shields.io/badge/Edad-6%20a%207%20a%C3%B1os-FF8A2A?style=for-the-badge)](https://github.com/SebastianCortesIbacache/KimiPanda)
[![Curriculum](https://img.shields.io/badge/Alineaci%C3%B3n-Mineduc%20Chile-3D9BE9?style=for-the-badge)](https://github.com/SebastianCortesIbacache/KimiPanda)
[![License](https://img.shields.io/badge/Licencia-MIT-9B6BF3?style=for-the-badge)](LICENSE)

**Kimi Panda** es una aplicación educativa interactiva y progresiva (PWA Offline-First) diseñada específicamente para niñas y niños de **6 a 7 años (1° y 2° Básico)**. Su diseño visual, basado en la estética **Playful Chunky Pop**, estimula la curiosidad y la agilidad mental mediante mecánicas de refuerzo positivo, mitigación de estrés cognitivo y cero temporizadores punitivos.

---

## 🌟 Características Principales

### 1. 🗺️ 6 Mundos Curriculares (Alineados a Mineduc Chile)
- 🧮 **Bosque Matemático (OA 01 - OA 04):** Conteo de objetos, sumas y restas simples, patrones numéricos y figuras geométricas 2D.
- 🌿 **Océano de Ciencias (OA 01 - OA 06):** Los 5 sentidos, partes de las plantas, hábitos saludables, estados de la materia y fauna nativa de Chile.
- 📖 **Montaña del Lenguaje (OA 02 - OA 08):** Conciencia fonológica, vocales y consonantes, rimas, adivinanzas poéticas y comprensión temprana.
- 💡 **Laboratorio de Lógica (Habilidades Transversales):** Secuencias lógicas, series de formas y deducción de acertijos visuales.
- 🏛️ **Volcán de Historia e Inglés (OA 01 - OA 05):** Entorno familiar, puntos cardinales, paisajes geográficos de Chile y primeros términos en inglés (colores, familia, números).
- 🌴 **Isla Inicio:** Parque de calentamiento y entrenamiento inicial multidisciplinario.

### 2. ⭐ Evaluación No Punitiva (1 a 3 Estrellas por Nivel)
- **3 ⭐⭐⭐ (Ronda Perfecta):** 0 errores. Fanfarria armónica pentatónica y mensaje dorado.
- **2 ⭐⭐ (Casi Perfecto):** 1 error. Mensaje plateado de aliento y recompensa estelar.
- **1 ⭐ (Reto Superado):** $\ge 2$ errores. Se premia la constancia y el esfuerzo de completar el nivel.
- Cada nivel superado graba su calificación en el mapa de mundos y desbloquea el siguiente nodo.

### 3. 🛡️ Comodines Protectores (Andamiaje Cognitivo)
- 💡 **Pista Sabia:** Muestra una cápsula de consejo en lenguaje simple y cercano para apoyar la comprensión lectora sin dar la respuesta.
- ❄️ **Escudo Mochi (50/50):** Descarta suavemente 2 alternativas incorrectas, dejando 2 opciones claras para orientar al niño y evitar el bloqueo.

### 4. 📊 Radar de Destrezas Curriculares
- Muestra el avance del estudiante en los 6 dominios de aprendizaje con barras de progreso y rangos de maestría:
  - *Semilla 🌱* $\to$ *Aprendiz 🎒* $\to$ *Explorador 🧭* $\to$ *Maestro Panda 👑*.
- Clic en la píldora de nivel del HUD abre directamente el radar de destrezas.

### 5. 🛍️ Tienda de Mochi y Vestuario
- 6 accesorios desbloqueables con estrellas: Gorra 🧢, Mochila 🎒, Lentes de sol 🕶️, Capa de superhéroe 🦸, Corona real 👑 y Sombrero de mago 🧙.
- El avatar de Mochi luce en tiempo real el accesorio equipado en el Hub y durante el juego.

### 6. 🔊 Ergonomía Acústica Sintetizada (Web Audio API)
- 100% sintetizado en código mediante osciladores Web Audio API (latencia 0 ms, cero peso de archivos de audio externos y compatibilidad total offline).
- Control de silencio accesible desde el HUD.

### 7. ♿ Accesibilidad Universal (WCAG 2.2 AA)
- Foco visible de alto contraste (`:focus-visible`) para navegación con teclado y conmutadores.
- Áreas táctiles mínimas $\ge 44\times 44$ px en todos los botones.
- Soporte completo para `prefers-reduced-motion`.
- Modal de pasaporte con botón seguro de reinicio de partida para uso compartido en aulas escolares.

---

## 🚀 Instalación y Ejecución Local

Kimi Panda no requiere dependencias complejas ni frameworks pesados; está construido en **JavaScript Vanilla Modular (ESM)**, **CSS nativo desacoplado** y **HTML5 semántico**.

### Opción 1: Con Python (Recomendado)
```bash
# Clonar el repositorio
git clone https://github.com/SebastianCortesIbacache/KimiPanda.git
cd KimiPanda

# Iniciar servidor local
python -m http.server 8000
```
Luego abre tu navegador en:  
👉 **`http://localhost:8000/index.html`**

### Opción 2: Con Node.js / npx
```bash
npx serve -l 8000 .
```

---

## 📂 Estructura del Proyecto

```
KimiPanda/
├── index.html                   # Punto de entrada principal PWA
├── manifest.json                # Manifiesto PWA (iconos 192/512 maskable, standalone)
├── sw.js                        # Service Worker Offline-First (Cache-First para assets)
├── package.json                 # Metadatos del proyecto y scripts
├── README.md                    # Documentación técnica y pedagógica
├── LICENSE                      # Licencia MIT
├── css/
│   ├── tokens.css               # Variables maestras, paleta pop, sombras y accesibilidad
│   ├── hub.css                  # Estilos del menú principal, bento cards y misiones
│   ├── game.css                 # Pantalla de juego adaptativo y resumen de ronda
│   ├── shop.css                 # Tienda de accesorios de Mochi
│   ├── worlds.css               # Mapa de mundos y nodos de niveles
│   └── achievements.css         # Sala de trofeos y radar de destrezas curriculares
├── js/
│   ├── main.js                  # Bootstrap y orquestación de eventos
│   ├── store.js                 # Store reactivo y persistencia local (localStorage)
│   ├── db.js                    # Adaptador de banco de preguntas curriculares
│   ├── game.js                  # Máquina de estados de ronda y lógica de calificación
│   ├── audio.js                 # Síntesis acústica Web Audio API
│   ├── ui.js                    # Utilidades de interfaz (confeti, toasts, pantallas)
│   ├── worlds.js                # Renderizado interactivo del mapa de mundos
│   ├── shop.js                  # Gestión de compra y vestuario de Mochi
│   └── achievements.js          # Lógica de trofeos y destrezas Mineduc
├── data/
│   └── questions_mvp_6_7.json   # Banco de 200 preguntas balanceadas
└── assets/
    ├── mascotas/                # Ilustraciones de Mochi (avatar, hub, celebrando)
    └── preguntas/               # Ilustraciones WebP estilo Chunky Sticker
```

---

## 📜 Licencia

Distribuido bajo la Licencia **MIT**. Consulta [`LICENSE`](LICENSE) para más detalles.
