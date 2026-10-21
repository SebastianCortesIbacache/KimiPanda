# 🏷️ Estándar Oficial de Versionado Semántico (SemVer)
## Reto Panda & Kimi Panda | Gobernanza Bicameral

**Autoridad de Aprobación:** Director Ejecutivo (USER)  
**Alcance:** De aplicación general, obligatoria e inmediata para la **Cámara Asesora** (Consejo Asesor Independiente) y la **Cámara Operativa** (Cuerpo de Ejecución).  
**Fecha de Promulgación:** 2026-10-20  

---

## 🎯 1. Propósito y Principios Rectores
El presente estándar establece la nomenclatura, criterios y protocolos de control de versiones para todo el ecosistema de software de **Reto Panda** y **Kimi Panda**, adoptando el estándar internacional **Semantic Versioning 2.0.0 (SemVer)** adaptado a la industria del videojuego y aplicaciones educativas interactivas.

Todo cambio introducido en el código fuente, diseño, sonido, contenido pedagógico o arquitectura debe estar inequívocamente clasificado bajo este sistema para garantizar trazabilidad, orden en las auditorías del Consejo Asesor y claridad para el Director Ejecutivo.

---

## 📐 2. Estructura Canónica de Nombres: `X.Y.Z` (MAJOR.MINOR.PATCH)

Toda versión pública o interna del producto se expresa como:

$$\text{Versión} = \mathbf{X} \,.\, \mathbf{Y} \,.\, \mathbf{Z} \quad (\text{MAJOR} \,.\, \text{MINOR} \,.\, \text{PATCH})$$

```
      v 1 . 1 . 0
        │   │   └── PATCH: Correcciones de bugs, hotfixes, ajustes de CSS/JS sin cambios de funcionalidad.
        │   └────── MINOR: Nuevas mecánicas, nuevos bancos de preguntas, pantallas o mundos retrocompatibles.
        └────────── MAJOR: Cambios estructurales profundos, ruptura de compatibilidad o reescritura de motor.
```

### 🔴 MAJOR (`X.0.0`) — Cambios Mayores / Ruptura de Compatibilidad
Se incrementa cuando existen modificaciones que alteran de raíz el sistema o rompen la compatibilidad previa:
- Reescritura arquitectónica del motor (ej. migración a Godot, Capacitor nativo o cambio de esquema de datos incompatible en `localStorage`/IndexedDB).
- Rediseño holístico de la experiencia que invalida el progreso de usuarios anteriores sin un migrador.
- Lanzamiento de un nuevo ciclo mayor del producto (ej. pasar del MVP a la Suite Escolar Completa).
- *Al incrementar **X**, se reinician **Y** y **Z** a cero (`2.0.0`).*

### 🟡 MINOR (`x.Y.0`) — Nuevas Funcionalidades / Expansión de Contenido
Se incrementa cuando se agregan funcionalidades, pantallas, mecánicas o contenidos nuevos, manteniendo total compatibilidad con lo anterior:
- Inclusión de nuevas mecánicas lúdicas (ej. *Segunda Oportunidad de Mochi* con 0 vidas).
- Adición de sistemas pedagógicos (ej. banco de *200 Pistas Curriculares* en JSON y UI).
- Desbloqueo o implementación de nuevas pantallas o mundos (ej. Isla Inicio, Bosque Matemático, Tienda).
- Incorporación de módulos de audio o animaciones nuevas sin alterar la lógica base.
- *Al incrementar **Y**, se reinicia **Z** a cero (`1.1.0`).*

### 🟢 PATCH (`x.y.Z`) — Correcciones de Bugs / Hotfixes
Se incrementa exclusivamente ante resolución de defectos, optimizaciones y ajustes menores que no modifican ni añaden funcionalidad:
- Resolución de bugs visuales, desalineaciones CSS o fallos en responsive (ej. safe-area, gorra flotante).
- Corrección de rutas de imágenes rotas (404) o textos erróneos en preguntas.
- Ajustes de rendimiento, poda de memoria (VRAM) o refactorización interna sin cambio de comportamiento visible.
- Hotfixes directos en entornos de producción.
- *Al incrementar **Z**, se preservan **X** e **Y** intactos (`1.0.1`).*

---

## ⏳ 3. Ciclo de Vida y Sufijos de Pre-lanzamiento (Pre-release Tags)

Cuando una versión aún no está aprobada para producción por el Director Ejecutivo, se le adjunta un sufijo identificador:

1. **`-alpha.N` (ej. `v1.1.0-alpha.1`):** Construcción activa por el Cuerpo Operativo. Funcionalidades a medio terminar; reservado exclusivamente para iteración interna.
2. **`-beta.N` (ej. `v1.1.0-beta.1`):** *Feature Complete*. Todas las funcionalidades del sprint están codificadas; entra a fase de auditoría implacable por el Consejo Asesor y testing automatizado Playwright.
3. **`-rc.N` (Release Candidate, ej. `v1.1.0-rc.1`):** Candidato a producción. Si el Director Ejecutivo y el Consejo Asesor no encuentran observaciones bloqueantes, este build exacto se promueve a versión final sin el sufijo.
4. **Versión Estable / Producción (ej. `v1.1.0`):** Build aprobado y desplegado formalmente en GitHub Pages o tiendas.

---

## ⚠️ 4. Distinción Crítica: Versión de Software vs Caché de PWA

> [!CAUTION]
> **REGLA TÉCNICA INVIOLABLE:** Queda estrictamente prohibido confundir la versión del juego con el nombre de la caché del Service Worker.

| Concepto | Qué representa | Dónde se define | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Versión SemVer del Producto** | El estado funcional, lúdico y pedagógico del juego completo. | `package.json`, footer de la UI, changelogs, tags de Git. | `v1.0.1`, `v1.1.0` |
| **Identificador de Caché PWA** | Token técnico de invalidación de assets en el navegador del cliente. | Variable `CACHE_NAME` en `sw.js`. | `kimi-panda-v8` |

Un incremento de caché PWA (ej. pasar de `kimi-panda-v7` a `kimi-panda-v8`) es solo un mecanismo técnico de refresco; el software sigue rigiéndose por su versión SemVer oficial (`v1.0.1`).

---

## 🏛️ 5. Matriz Canónica del Historial y Estado del Proyecto

| Rama / Entorno | Versión SemVer | Estado Actual | Descripción Funcional y de Contenido |
| :--- | :---: | :---: | :--- |
| **Reto Panda Base** (`Presion Mental APP`) | `v0.9.0-rc` | Repositorio Base / Prototipo | Experiencia cinemática con videos de plastilina 3D, pasaporte, banco histórico y múltiples tiers. Base de investigación. |
| **Kimi Panda** (`E:\KimiPanda` / GitHub Pages) | **`v1.0.0`** | Histórico | **Lanzamiento Inicial MVP Flash PWA.** Hub Bento, 200 preguntas para 6-7 años, 103 ilustraciones clay y 3 vidas básicas. |
| **Kimi Panda** (`E:\KimiPanda` / GitHub Pages) | **`v1.0.1`** | **PRODUCCIÓN ACTUAL** | **Hotfix de 8 Bugs en Producción.** Cero 404s, gorra de avatar calibrada, corazones rojos desde el inicio, safe-area móvil y fondo limpio. |
| **Kimi Panda** (`Sprint Pistas y Corazones`) | **`v1.1.0-beta.1`** | **EN COLA DE EJECUCIÓN** | **Sprint de Pistas Curriculares y Resiliencia.** Mecánica de *Segunda Oportunidad de Mochi* al llegar a 0 vidas (Soft Fail) + banco de 200 pistas pedagógicas personalizadas. |
| **Kimi Panda** (`Sprint Mundos y Tienda`) | `v1.2.0` | Planificado | Activación de mundos bloqueados, sistema de tienda con compra de sombreros e inventario interactivo. |
| **Kimi Panda / Reto Panda Nativo** | `v2.0.0` | Visión Futura | Porting a Capacitor nativo para Google Play Store y App Store, o compilación en motor de juego dedicado. |

---

## 📋 6. Mandatos Operativos y Protocolos Institucionales

### Para la Cámara Asesora (Consejo Asesor Independiente):
1. **Catalogación Obligatoria en Dictámenes:** Todo Dictamen Consultivo emitido por un Asesor debe incluir obligatoriamente el impacto de versión:
   ```markdown
   6. **Impacto de Versión SemVer:** [PATCH / MINOR / MAJOR]
   7. **Versión Objetivo Sugerida:** [ej. v1.0.1 -> v1.1.0]
   ```
2. **Evaluación de Alcance:** Si una solicitud del Director Ejecutivo solo corrige defectos preexistentes, el Asesor debe catalogarla como `PATCH`. Si introduce una nueva regla o contenido pedagógico, debe catalogarla como `MINOR`.

### Para la Cámara Operativa (Cuerpo de Ejecución):
1. **Convención de Commits Ligada a SemVer:**
   - Commits con prefijo `fix:` $\rightarrow$ Incrementan **PATCH** (`v1.0.1` $\rightarrow$ `v1.0.2`).
   - Commits con prefijo `feat:` $\rightarrow$ Incrementan **MINOR** (`v1.0.1` $\rightarrow$ `v1.1.0`).
   - Commits con indicación `BREAKING CHANGE:` $\rightarrow$ Incrementan **MAJOR** (`v1.x.x` $\rightarrow$ `v2.0.0`).
2. **Agente Release como Custodio:** El Agente Release es el responsable de reflejar la versión SemVer aprobada en el código visible (ej. esquina inferior de la pantalla de bienvenida o menú de configuración) y sincronizar los tags de Git.
3. **Cero Ambigüedad:** Queda prohibido referirse a un avance simplemente como "la nueva versión". Todos los agentes deben emplear la nomenclatura técnica: *"Kimi Panda v1.0.1 (Producción)"*, *"Kimi Panda v1.1.0 (Sprint de Pistas y Corazones)"*.
