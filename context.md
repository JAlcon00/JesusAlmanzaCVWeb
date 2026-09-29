# context.md · Contexto del proyecto JesusAlmanzaCVWeb

Complemento de `agent.md`. Aquí vive el "qué" (contenido, estructura, decisiones); `agent.md` define el "cómo".

## 1. Objetivo

Web personal de Jesús Almanza que presente su perfil profesional como una propuesta de valor, no como un CV pegado. Público principal: reclutadores técnicos, líderes de datos/TI y dirección de empresas financieras en México. La pregunta que responde en 10 segundos: "¿qué construye y por qué confiar en él?".

Fuente de verdad del contenido: `CV Jesús Almanza.pdf` (página 1 en inglés, página 2 en español). La web es bilingüe: inglés en `/` (idioma por defecto desde el 2026-09-28) y español en `/es/`. Todo el texto vive en `src/i18n/es.ts` y `src/i18n/en.ts`, ambos tipados con `SiteContent` (`src/i18n/types.ts`); si a un idioma le falta un campo, el build falla.

## 2. Posicionamiento

- Titular: "Transformo datos contables en decisiones confiables."
- Rol: ingeniero de software y datos, encargado de TI (IT Manager) en Olson Capital.
- Diferenciador: lleva datos del ERP (CONTPAQi) a un Data Warehouse en la nube con IA y control humano, y los sirve a la dirección vía BI con gobernanza y pruebas.

## 3. Datos reales (únicas cifras permitidas)

| Dato | Valor | Fuente |
|---|---|---|
| Registros consolidados en el DW | 4,762 de 2 empresas del grupo | MatchCount |
| Pruebas backend aprobadas | 791 (pytest) | DashBI |
| Matriz QA | 60 casos validados contra el DW real | DashBI |
| Latencia mediana por endpoint | menor a 1 s | DashBI |
| Sprints Scrum | 5 | DashBI |
| Stack DashBI | Django 5.2, Python 3.12 | DashBI |

Experiencia:
- Olson Capital, México. Encargado de TI (IT Manager). Ene 2024 - Actualidad. Incluye Alend SOFOM.
- Plastic Omnium, León, Gto. Practicante de TI (IT Trainee). Jun 2022 - Ene 2023.

Formación: Universidad La Salle Bajío, León, Gto. Ingeniería en Software y Sistemas Computacionales. Egreso dic 2026.
Certificación: Desarrollo Web con React, UNAM. Idiomas: español nativo, inglés intermedio-avanzado (B2).
Contacto: c.jesusalmanza@gmail.com · +52 56 4980 5943 · linkedin.com/in/jesusalmanza · github.com/JAlcon00

La demo "Umbral de confianza" y la simulación del pipeline usan cuentas de muestra y puntajes ficticios; están etiquetadas como ejemplo ilustrativo en pantalla. No convertirlas en datos "reales".

## 4. Arquitectura de la página (una sola ruta `/`)

| # | Sección | id | Familia de layout | Isla React | Eyebrow |
|---|---|---|---|---|---|
| 0 | Nav fija tipo pill | - | Barra flotante | No (script vanilla del toggle) | - |
| 1 | Hero | `inicio` | Titular a la izquierda + CTA abajo a la derecha + diagrama vivo a ancho completo | `PipelineLive` (`client:load`) | Sí |
| 2 | Perfil | `perfil` | Retrato + declaración editorial + fila de cifras | No (cifras estáticas con `.reveal`, mejor LCP/CLS que un contador) | No |
| 3 | Proyectos | `proyectos` | Bento asimétrico de 3 celdas | `ConfidenceRouter` (`client:visible`) | No |
| 4 | Experiencia | `experiencia` | Línea de tiempo con columna izquierda sticky | No | Sí |
| 5 | Stack | `stack` | Marquee único de logos + índice de 5 columnas | No | No |
| 6 | Formación | `formacion` | Split asimétrico 7/5 | No | No |
| 7 | Contacto | `contacto` | Manifiesto de ancho completo | `CopyEmail` (`client:visible`) | Sí |

## 5. Estructura de archivos

```
src/
  assets/            retrato opcional: portrait.jpg|png|webp (si no existe, se muestra monograma)
  components/        secciones .astro (sin JS)
  components/islands componentes React interactivos
  i18n/types.ts      contrato SiteContent (lo cumplen es.ts y en.ts)
  i18n/es.ts         TODO el copy en español (incluye textos de islas y cuentas de muestra)
  i18n/en.ts         TODO el copy en inglés (fuente: página 1 del CV)
  i18n/shared.ts     datos que no cambian por idioma (contacto, umbral)
  i18n/index.ts      getContent(Astro.currentLocale), homePath(), fill()
  components/Home.astro  composición de la portada, compartida por ambos idiomas
  pages/index.astro  ruta / (en, por defecto) · pages/es/index.astro ruta /es/ (es)
  layouts/Base.astro head, SEO, JSON-LD Person, script de tema
  pages/index.astro  composición de secciones
  styles/global.css  tokens de color, tipografía, z-index, utilidades .reveal/.marquee
public/
  cv/Jesus-Almanza-CV.pdf  descarga del CV
```

## 6. Pendientes conocidos

- Imágenes de escena: YA descargadas en `src/assets/scenes/` (olson-office, plastic-omnium-plant, study-space), generadas con Canva y exportadas a resolución completa (diseño contenedor DAHWiFJcS0Y). Astro las optimiza (srcset, WebP).
- Dominio definitivo: actualizar `site` en `astro.config.mjs` (hoy `https://jesusalmanza.dev`, placeholder) para canonical, sitemap y Open Graph.
- Imagen Open Graph (`public/og.png`, 1200x630).
- CV en PDF por idioma: hoy ambos idiomas descargan el mismo PDF de 2 páginas (pág. 1 inglés, pág. 2 español). Opcional: separarlo en `Jesus-Almanza-CV-en.pdf` y `-es.pdf` y apuntar `cvUrl` por idioma.

## 7. Bitácora de decisiones

- 2026-09-28: Paleta del dueño adoptada tal cual (override consciente de la regla anti-morado). Índigo = acento único; menta = semántico.
- 2026-09-28: Tailwind v4 con tokens por variables CSS y `data-theme` para permitir toggle manual + preferencia del sistema.
- 2026-09-28: Logos de tecnologías con `simple-icons` en build (sin CDN externo) y monocromos para respetar la paleta.
- 2026-09-28: Capa visual "aurora" (`src/components/Aurora.astro`): degradados radiales de la paleta que derivan en 22-38 s, solo transform/opacity, sin `filter: blur` (Chrome recorta el desenfoque y deja cortes). Presente en hero (se desvanece con el scroll), tile de MatchCount, banda del Stack, contacto y marco del retrato. Máximo 4 superficies con aurora por página.
- 2026-09-28: Retrato del dueño sin fondo (`src/assets/portrait.png`, recortado de `JesusAlmanzaIMG.png`). Versión final en `Portrait.astro`: SIN marco; foto en blanco y negro con contraste alto (filtro CSS, el PNG original conserva el color); luz de aurora sin bordes detrás de cabeza y hombros, disolución inferior con máscara, rim light sutil en oscuro y parallax por capas con el puntero. Rechazado por el dueño (no reintroducir): recuadro/marco, apellido gigante detrás y anillo concéntrico.
- 2026-09-28: Fotografía editorial generada con IA (Canva) en Experiencia y Formación, vía `SceneImage.astro` con velo de marca.
- 2026-09-28: Auditoría + sistema de texturas "cyber-aurora" (agent.md §6.2): grano global, piso de retícula en el hero, corchetes HUD, scanlines en MatchCount, borde iluminado en tarjetas, riel de línea de tiempo en Experiencia, reglas de datos entre secciones y eyebrow que se decodifica.
- 2026-09-28: Versión en inglés con i18n nativo de Astro (`/en/`, sin prefijo para español). hreflang es-MX/en/x-default, og:locale por idioma, sitemap con alternates, anclas de sección traducidas (#proyectos / #projects), selector ES/EN en la nav. Las islas React reciben sus textos por props (serializables, sin funciones).
- 2026-09-28: Todo CTA de contacto (nav, botón de Contacto y el correo en texto) abre el cliente de correo predeterminado con `mailtoHref(c)` (`src/i18n/index.ts`): asunto y saludo prellenados por idioma (`mail` en es.ts/en.ts). "Copiar correo" queda como respaldo para quien usa correo web.
- 2026-09-28: Marca de la nav: sin monograma "JA". Wordmark `Jesús.Almanza` en Geist Mono bold (identificador de código), punto índigo (menta al pasar el cursor), cursor de terminal que parpadea y decodificación de letras al hover/foco. En pantallas < 420px el CTA de contacto de la nav queda solo con ícono de sobre (nombre accesible intacto).
- 2026-09-28: Idioma por defecto cambiado a inglés por petición del dueño: `/` = inglés, `/es/` = español. x-default apunta a `/`.
- 2026-09-28: Auditoría final (Fable 5.1): capa de scroll-storytelling (agent.md §6.3): progreso de lectura y sección activa en la nav, hero por capas que se eleva al hacer scroll, titulares palabra por palabra, cifras que cuentan, riel de Experiencia que se dibuja, imágenes con clip-reveal + parallax, CTAs magnéticos, iconos duotone. Imágenes de escena descargadas a resolución completa y activas en Experiencia y Formación. La imagen de la tarjeta DashBI fue descartada por el dueño (la tarjeta queda solo con texto).
- 2026-09-28: Núcleo de datos 3D (petición del dueño: "un modelo 3D que rote a través de toda la página"). Three.js 0.186 en un lienzo fijo detrás del contenido (`--z-scene: -1`), cargado en diferido tras `load` + `requestIdleCallback`. Las mismas 2,400 partículas (1,200 en móvil) cambian de forma por sección: nube → cubo → barras, y rotan 1.5 vueltas a lo largo de la página. Sin WebGL no aparece; con reduced-motion se dibuja una sola vez, quieto, en forma de cubo. El panel de Contacto es translúcido (`bg-surface/55`) para que se vean las barras. Descartados: cristal facetado y pila de bases de datos.
- 2026-09-28: Revelado por scroll con CSS scroll-driven animations (sin JS); las islas React quedan solo para piezas que el usuario manipula o que narran el flujo de datos.

## 7.1 Entorno: el proyecto vive en el Escritorio sincronizado con iCloud

- macOS descarga bajo demanda los archivos de iCloud ("dataless"). El 2026-09-28 iCloud había sacado ~9,000 archivos de `node_modules` a la nube: el servidor de desarrollo se colgaba al leerlos (0% CPU, sin responder) y el build pasó de 5 s a más de 1 min.
- Solución aplicada: la carpeta del proyecto está marcada en Finder como "Mantener descargado" (iCloud no la vacía) y `node_modules` se reinstaló completo.
- NO usar el truco `node_modules.nosync` + enlace simbólico: Vite detecta dependencias por la ruta real `/node_modules/` y con el enlace falla con "module is not defined".
- Para revisar si vuelve a pasar: `find node_modules -type f -flags +dataless | wc -l` debe dar 0. Si no, `rm -rf node_modules && npm install`.
- Alternativa definitiva: mover el proyecto fuera del Escritorio/Documentos (por ejemplo `~/Developer/`).

## 8. Comandos

```
npm run dev       # servidor local en http://localhost:4321 (Astro 7 lo corre como daemon: `npx astro dev stop` para detenerlo)
npm run build     # astro check + build estático en dist/
npm run preview   # sirve dist/
```

## 9. Guía de estilo del copy (español de México)

- Cargos y profesiones en minúscula dentro de la prosa ("ingeniero de software y datos"); con mayúscula solo como título de un puesto aislado ("Encargado de TI").
- Tuteo en todo el sitio ("Escríbeme", "Ajusta", "Conversemos").
- Números del uno al nueve con letra en prosa ("dos empresas", "cinco sprints"); cifras destacadas en dígitos.
- Meses abreviados en minúscula con punto: "ene. 2024 - actualidad".
- Anglicismos técnicos en minúscula dentro de la prosa ("data warehouse", "backend"); "Estado de Resultados" con mayúscula por ser un estado financiero.
- Terminología contable mexicana: "ejercicio fiscal", "turnar a revisión", "catálogo de cuentas".
- Listas de logros con verbos en paralelo (todos en presente o todos en pretérito) y oraciones completas, no fragmentos.
