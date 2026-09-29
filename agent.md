# agent.md · Reglas de trabajo para agentes en JesusAlmanzaCVWeb

Este archivo es contrato. Cualquier agente (Claude u otro) que edite este proyecto debe leerlo junto con `context.md` antes de tocar código. Si una regla choca con una petición, se pregunta al dueño antes de romperla.

## 1. Design read (no cambiar sin aprobación)

> Portafolio de ingeniero de software y datos para reclutadores y líderes técnicos del sector financiero, con lenguaje técnico-editorial sobrio y una pieza "viva" que demuestra el trabajo real (pipeline de MatchCount). Astro + Tailwind v4 + islas React con Motion.

Dials: `DESIGN_VARIANCE 8` · `MOTION_INTENSITY 8` · `VISUAL_DENSITY 5` (auditoría final 2026-09-28: capa de scroll-storytelling; antes 8/7/5).

## 2. Stack fijo

| Capa | Decisión | Notas |
|---|---|---|
| Framework | Astro 7, salida estática | Todo es HTML estático salvo islas explícitas |
| Estilos | Tailwind v4 vía `@tailwindcss/vite` | Tokens en `src/styles/global.css` (`@theme inline`). Nada de `tailwind.config.js` |
| Interactividad | React 19 como islas (`client:visible` por defecto, `client:load` solo sobre el pliegue) | Una isla = un archivo `.tsx` en `src/components/islands/` |
| Animación | `motion/react` | Nunca GSAP ni Three.js en el mismo árbol |
| Iconos | `@phosphor-icons/react`, peso `regular` (o `duotone` en iconos de 28px+) | En `.astro` importar desde `@phosphor-icons/react/dist/ssr`. En islas, desde `@phosphor-icons/react` |
| Logos de tecnologías | `simple-icons` (paths oficiales, render en build) | Monocromo `currentColor`. Si falta el logo (C#, SQL Server, AWS), se usa un glifo Phosphor. Nunca dibujar SVG a mano |
| Tipografía | Geist Variable + Geist Mono Variable (`@fontsource-variable/*`, self-hosted) | Nada de Google Fonts por `<link>`, nada de Inter, nada de serif |

Antes de importar una librería nueva: revisar `package.json`, dar el comando de instalación y justificarla aquí.

## 2.1 Idiomas (i18n)

- Inglés es el idioma por defecto (`/`); español vive en `/es/`. Config en `astro.config.mjs` (`i18n`, `defaultLocale: 'en'`, `prefixDefaultLocale: false`).
- Ningún componente contiene texto visible ni `aria-label` fijo: todo sale de `getContent(Astro.currentLocale)` (`src/i18n/`).
- Cualquier texto nuevo se agrega a `types.ts` y a AMBOS archivos (`es.ts`, `en.ts`) en el mismo cambio.
- Las islas React reciben su copy por props y solo importan `i18n/fill.ts`, `i18n/shared.ts` e `i18n/types.ts` (nunca `i18n/index.ts`, para no mandar ambos idiomas al navegador). Las props deben ser serializables: plantillas con `{placeholder}`, no funciones.
- Inglés: americano, primera persona, verbos activos, sin rayas largas, mismas cifras reales que el español. CTA de contacto en inglés: "Get in touch".
- Tras tocar copy: `npm run build` y revisar que `dist/index.html` (inglés) no tenga restos en español ni `dist/es/index.html` restos en inglés.

## 3. Paleta (definida por el dueño)

| Token | Hex | Rol | Uso permitido |
|---|---|---|---|
| Navy | `#0F172A` | Estructura y confianza | Texto principal en claro, fondo en oscuro, tiles de énfasis |
| Off-white | `#F8FAFC` | Claridad | Fondo en claro, texto en oscuro |
| Índigo | `#6366F1` | Acento de marca (único) | Rellenos, anillos de foco, gradientes sutiles, iconos grandes |
| Pizarra | `#475569` | Texto secundario | Subtítulos, bordes, metadatos en modo claro |
| Menta | `#10B981` | Éxito / live | SOLO métricas de impacto y estado "en ejecución". Nunca en botones ni en links |

Derivados obligatorios por contraste WCAG AA (ya calculados, no sustituir):

- Texto índigo sobre `#F8FAFC`: usar `#4F46E5` (6.0:1). `#6366F1` da 4.3:1 y no pasa en texto chico.
- Botón primario: fondo `#4F46E5`, texto `#F8FAFC` en ambos temas. Hover `#4338CA`.
- Texto índigo en oscuro: `#A5B4FC` / `#818CF8`.
- Menta en claro: `#047857` texto chico, `#059669` cifras grandes. En oscuro `#34D399` / `#10B981`.
- Pizarra `#475569` sobre navy NO pasa: en oscuro el secundario es `#94A3B8`.

Regla: índigo es el único acento. Menta es semántica (logro / live), no decorativa. No se agregan colores fuera de esta tabla ni de las escalas slate/indigo/emerald equivalentes.

## 4. Sistema de forma y layout

- Radios: tiles y paneles `rounded-2xl` (16px). Botones, chips y toggles `rounded-full`. Nada más.
- Contenedor: `max-w-[1280px] mx-auto px-5 md:px-8`.
- Hero: `min-h-[100dvh]` prohibido `h-screen`. Padding superior máximo `pt-24`.
- Cada sección usa una familia de layout distinta (ver `context.md` §4). No repetir familias.
- Todo layout multicolumna declara su colapso `< 768px` en el mismo componente.
- Z-index solo desde la escala de `global.css` (`--z-nav`, `--z-skip`).

## 5. Tema

- Claro y oscuro desde el inicio, por variables CSS y atributo `data-theme` en `<html>`.
- Por defecto sigue `prefers-color-scheme`; el toggle guarda la preferencia en `localStorage` (con try/catch).
- Un solo tema por página. Ninguna sección invierte el tema.

## 6. Movimiento

- Toda animación responde "¿qué comunica?" (jerarquía, narrativa, feedback, cambio de estado). Si no, se quita.
- Solo `transform` y `opacity`. Springs `stiffness 100, damping 20` o easing `[0.16, 1, 0.3, 1]`.
- `prefers-reduced-motion`: obligatorio. Islas usan `useReducedMotion()`; CSS usa `@media (prefers-reduced-motion: no-preference)`.
- Revelado al hacer scroll: CSS `animation-timeline: view()` (clase `.reveal`), cero JS.
- Prohibido `window.addEventListener('scroll')` y `useState` para valores continuos.
- Máximo un marquee en toda la página (ya está en Stack).
- Aurora: usar siempre `<Aurora variant="hero|panel|band" />`, nunca degradados sueltos. Máximo 4 superficies con aurora (hoy: hero, MatchCount, Stack, Contacto; el marco del retrato no cuenta). Nunca detrás de texto chico sin comprobar contraste AA. Prohibido `filter: blur()` en capas animadas.

## 6.2 Sistema de texturas "cyber-aurora" (maximalismo controlado)

Cada capa tiene un tope. Si una sección nueva necesita textura, reutiliza estas; no se inventan otras sin aprobación. Utilidades en `src/styles/global.css`.

| Capa | Implementación | Dónde / tope |
|---|---|---|
| Grano de película | `body::after` fijo, SVG `feTurbulence`, opacidad 0.05 claro / 0.07 oscuro, `z-index: var(--z-grain)` | Global, una sola capa. Nunca animado |
| Piso de retícula | `CyberGrid.astro`, perspectiva + `translateY` en loop | Solo hero (1 instancia) |
| Aurora | `Aurora.astro` | Máx. 4 superficies (ver §6) |
| Corchetes HUD | clase `.hud` | Máx. 3: diagrama del hero, demo de umbral, panel de contacto |
| Scanlines CRT | clase `.scanlines` | Solo superficies navy (hoy: tile de MatchCount) |
| Borde iluminado | clase `.spotlight` + script en `Base.astro` (`--mx/--my`) | Tarjetas con borde; solo puntero fino |
| Regla de datos | `DataRule.astro` | Máx. 2 entre secciones |
| Riel de línea de tiempo | `.exp-rail` en `Experience.astro` | Solo Experiencia; nodo menta = puesto actual (estado real) |
| Eyebrow que se decodifica | `[data-decode]` en `Hero.astro` | Solo el eyebrow del hero, una vez al cargar |

Reglas:
- Retrato sin marco ni elementos decorativos detrás (rechazado por el dueño: recuadro, nombre gigante y anillo). Solo luz sin bordes.
- Excepción consciente a la regla "sin retículas decorativas": el piso de retícula del hero existe por petición explícita del estilo cyber. No replicarlo en otras secciones.
- Toda capa animada se congela con `prefers-reduced-motion` y anima solo `transform`/`opacity`.
- Nunca `backdrop-filter` sobre capas animadas (el diagrama del hero está sobre la retícula en movimiento).

## 6.3 Scroll-storytelling (auditoría final)

Utilidades en `global.css`; todo con CSS scroll-driven animations o IntersectionObserver. Prohibido `window.addEventListener('scroll')`.

| Pieza | Implementación | Motivo |
|---|---|---|
| Progreso de lectura | `.nav-progress` (`animation-timeline: scroll(root)`) en la nav | Orientación |
| Sección activa en la nav | IntersectionObserver en `Nav.astro` → `aria-current` | Orientación |
| Hero por capas | `.hero-drift` con `--drift/--drift-scale/--drift-opacity` por capa | Profundidad al salir del hero |
| Titulares palabra por palabra | `Words.astro` + `.reveal-words` | Jerarquía de lectura (solo h2 de sección, nunca cuerpo) |
| Cifras que cuentan | `[data-count]` + script en `Profile.astro` | Los logros "llegan" |
| Riel que se dibuja | `.exp-rail-fill` (`animation-timeline: view()`) | Posición en la línea de tiempo |
| Imágenes de escena | `.scene` (clip reveal) + `.scene > img` (parallax) | Las imágenes responden al scroll |
| Botones magnéticos | `[data-magnetic]` + script en `Base.astro` | Feedback táctil; solo CTAs primarios |
| Iconos duotone | `weight="duotone"` en iconos ≥ 20px | Profundidad con el acento de marca |
| Núcleo de datos 3D | `DataCore.astro` + `src/lib/dataCore.ts` (Three.js, carga diferida en idle) | Hilo narrativo de toda la página: nube de datos crudos (hero) → cubo/data warehouse (Proyectos) → gráfica de barras/decisiones (Contacto). Rota con el scroll |

Reglas: cada nueva animación debe caber en una de estas filas o justificar una nueva. Contenedores que envuelvan elementos animados con `view()` usan `overflow-clip`, nunca `overflow-hidden` (hidden crea un contenedor de scroll y congela el progreso de la animación). Todo respeta `prefers-reduced-motion` y `pointer: fine` donde aplica.

## 6.1 Imágenes

- Toda imagen de contenido pasa por `SceneImage.astro` (o `Portrait.astro`) y vive en `src/assets/`, nunca en `public/`, para que `astro:assets` la optimice.
- Estilo: fotografía editorial en tonos navy/índigo con acentos menta, sin texto legible, sin logos y sin personas. Nada de fotos de stock genéricas ni capturas de UI falsas.
- Cada imagen lleva `alt` descriptivo en español y proporción fija (`aspect`) para CLS 0.
- Si una imagen no existe, no se muestra nada: prohibidos los recuadros vacíos o de relleno.

## 7. Copy (español de México, tono profesional y directo)

- CERO rayas largas (em-dash `—`) y cero en-dash (`–`). Solo guion `-`.
- Nunca inventar métricas, puestos, tecnologías ni logros. Las cifras reales están en `context.md` §3. Cualquier ejemplo ficticio se etiqueta como "ejemplo ilustrativo".
- Sin verbos de relleno (potenciar, revolucionar, elevar, sin fisuras).
- Titulares de sección ≤ 8 palabras. Subtexto del hero ≤ 20 palabras.
- Eyebrows (etiqueta chica en mayúsculas sobre un título): máximo 3 en toda la página y nunca dos en secciones a menos de 3 de distancia.
- Una etiqueta por intención de CTA: contacto = "Escríbeme" / "Get in touch", proyectos = "Ver proyectos" / "View projects", descarga = "Descargar CV" / "Download CV".

## 8. Accesibilidad (no negociable)

- Contraste AA mínimo en ambos temas, incluyendo botones, chips y placeholders.
- Skip link, landmarks (`header`, `main`, `footer`), un solo `h1`, jerarquía de headings sin saltos.
- Iconos decorativos con `aria-hidden`; botones solo-icono con `aria-label`.
- Foco visible: `outline` índigo de 2px con offset. Nunca `outline: none` sin reemplazo.
- Objetivos táctiles ≥ 44px.
- Contenido de islas legible sin JS (SSR de Astro).

## 9. Rendimiento

- Objetivos: LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse ≥ 95 en las 4 categorías.
- Imágenes con `astro:assets` (`<Image>`), dimensiones explícitas.
- Islas con `client:visible` salvo el hero. No hidratar nada que no sea interactivo.
- Fuentes self-hosted con `font-display: swap`.

## 10. Checklist antes de dar algo por terminado

1. `npm run build` pasa sin errores (`astro check` incluido).
2. Revisar la página en claro y oscuro, desktop (1440) y móvil (375).
3. `grep -rn "—\|–" src/` devuelve vacío.
4. Contar eyebrows (≤ 3) y confirmar que ninguna sección repite familia de layout.
5. Probar con `prefers-reduced-motion: reduce`.
6. Actualizar `context.md` si cambió contenido, secciones o decisiones.
