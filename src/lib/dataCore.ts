import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

/*
 * Núcleo de datos 3D (fondo fijo de toda la página).
 * Las MISMAS partículas pasan por tres formas según la sección, contando la historia del sitio:
 *   1. Nube caótica     -> datos crudos del ERP          (hero, perfil)
 *   2. Cubo ordenado    -> data warehouse                (proyectos, experiencia)
 *   3. Gráfica de barras -> decisiones                    (formación, contacto)
 * El objeto rota con el progreso del scroll. Leemos scrollY dentro del bucle de render
 * (no hay listener de scroll). Con prefers-reduced-motion se dibuja una sola vez, quieto.
 */

type Shape = Float32Array;

// Generador pseudoaleatorio con semilla: las formas son idénticas en cada visita.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cloudShape(n: number): Shape {
  const r = rng(7);
  const out = new Float32Array(n * 3);
  // Varios cúmulos desordenados: se lee como datos sin estructura
  const centers = Array.from({ length: 6 }, () => [(r() - 0.5) * 2.2, (r() - 0.5) * 1.8, (r() - 0.5) * 2.2]);
  for (let i = 0; i < n; i++) {
    const c = centers[Math.floor(r() * centers.length)];
    const spread = 0.35 + r() * 0.55;
    const u = r() * 2 - 1;
    const th = r() * Math.PI * 2;
    const rad = Math.cbrt(r()) * spread;
    const s = Math.sqrt(1 - u * u);
    out[i * 3] = c[0] + rad * s * Math.cos(th);
    out[i * 3 + 1] = c[1] + rad * u;
    out[i * 3 + 2] = c[2] + rad * s * Math.sin(th);
  }
  return out;
}

function cubeShape(n: number): Shape {
  const r = rng(11);
  const side = Math.ceil(Math.cbrt(n));
  const cells: number[][] = [];
  for (let x = 0; x < side; x++)
    for (let y = 0; y < side; y++) for (let z = 0; z < side; z++) cells.push([x, y, z]);
  // Mezcla determinista: los huecos que sobran quedan repartidos, como registros en un almacén
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const out = new Float32Array(n * 3);
  const size = 2.1;
  for (let i = 0; i < n; i++) {
    const [x, y, z] = cells[i];
    out[i * 3] = (x / (side - 1) - 0.5) * size;
    out[i * 3 + 1] = (y / (side - 1) - 0.5) * size;
    out[i * 3 + 2] = (z / (side - 1) - 0.5) * size;
  }
  return out;
}

function barsShape(n: number): Shape {
  const r = rng(23);
  const grid = 5;
  const spacing = 0.5;
  const half = 0.11; // medio ancho de cada barra
  // Alturas con tendencia creciente: la lectura es "los datos ya dicen algo"
  const heights: number[] = [];
  for (let gx = 0; gx < grid; gx++)
    for (let gz = 0; gz < grid; gz++) heights.push(0.3 + ((gx + gz) / (2 * (grid - 1))) * 1.7 + r() * 0.3);
  // Cada barra = 4 columnas verticales (sus aristas) con puntos a paso constante: bordes nítidos
  const corners = [
    [-half, -half],
    [half, -half],
    [-half, half],
    [half, half],
  ];
  const totalHeight = heights.reduce((a, b) => a + b, 0) * corners.length;
  const step = totalHeight / n;
  const out = new Float32Array(n * 3);
  let i = 0;
  heights.forEach((h, k) => {
    const cx = (Math.floor(k / grid) - (grid - 1) / 2) * spacing;
    const cz = ((k % grid) - (grid - 1) / 2) * spacing;
    for (const [ox, oz] of corners) {
      for (let y = 0; y <= h && i < n; y += step, i++) {
        out[i * 3] = cx + ox;
        out[i * 3 + 1] = y - 1.1;
        out[i * 3 + 2] = cz + oz;
      }
    }
  });
  // Los puntos que sobren por redondeo coronan la barra más alta
  const tallest = heights.indexOf(Math.max(...heights));
  const tx = (Math.floor(tallest / grid) - (grid - 1) / 2) * spacing;
  const tz = ((tallest % grid) - (grid - 1) / 2) * spacing;
  for (; i < n; i++) {
    out[i * 3] = tx + (r() - 0.5) * half * 2;
    out[i * 3 + 1] = heights[tallest] - 1.1;
    out[i * 3 + 2] = tz + (r() - 0.5) * half * 2;
  }
  return out;
}

function dotTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.85)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function startDataCore(canvas: HTMLCanvasElement): () => void {
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 767px)').matches;
  const n = small ? 1200 : 2400;

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 6.4);

  const shapes = [cloudShape(n), cubeShape(n), barsShape(n)];
  const positions = new Float32Array(shapes[0]);
  const colors = new Float32Array(n * 3);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    size: small ? 0.045 : 0.058,
    map: dotTexture(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const group = new Group();
  group.add(new Points(geometry, material));
  scene.add(group);

  // Paleta del sitio: índigo abajo -> menta arriba (los datos "suben" a decisiones)
  const low = new Color();
  const high = new Color();
  const tmp = new Color();
  const applyTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    low.set(dark ? '#6366f1' : '#4f46e5');
    high.set(dark ? '#34d399' : '#059669');
    material.blending = dark ? AdditiveBlending : NormalBlending;
    material.opacity = dark ? (small ? 0.32 : 0.95) : small ? 0.24 : 0.7;
    material.needsUpdate = true;
    lastMix = [-1, -1]; // fuerza recolorear
  };

  // Anclas de sección (se recalculan al redimensionar)
  let anchors = { a0: 0, a1: 1, b0: 2, b1: 3 };
  const top = (sel: string) => {
    const el = document.querySelector<HTMLElement>(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  };
  const measure = () => {
    const vh = window.innerHeight;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Desktop: el objeto vive a la derecha para no competir con el texto; móvil: centrado y más chico
    group.position.x = small ? 0 : 1.75;
    group.scale.setScalar(small ? 0.82 : 1.18);
    const ids = document.querySelectorAll<HTMLElement>('main section[id]');
    const profile = ids[1];
    const projects = ids[2];
    const education = ids[5];
    const contact = ids[6];
    anchors = {
      a0: (profile ? top(`#${profile.id}`) : vh) - vh * 0.4,
      a1: (projects ? top(`#${projects.id}`) : vh * 2) - vh * 0.2,
      b0: (education ? top(`#${education.id}`) : vh * 4) - vh * 0.6,
      b1: (contact ? top(`#${contact.id}`) : vh * 5) - vh * 0.3,
    };
  };

  let lastMix: [number, number] = [-1, -1];
  const updateShape = (m1: number, m2: number) => {
    if (Math.abs(m1 - lastMix[0]) < 0.001 && Math.abs(m2 - lastMix[1]) < 0.001) return;
    lastMix = [m1, m2];
    const [a, b, c] = shapes;
    for (let i = 0; i < n * 3; i += 3) {
      for (let k = 0; k < 3; k++) {
        const ab = a[i + k] + (b[i + k] - a[i + k]) * m1;
        positions[i + k] = ab + (c[i + k] - ab) * m2;
      }
      const t = Math.min(1, Math.max(0, (positions[i + 1] + 1.1) / 2.3));
      tmp.copy(low).lerp(high, t * (0.35 + m2 * 0.65));
      colors[i] = tmp.r;
      colors[i + 1] = tmp.g;
      colors[i + 2] = tmp.b;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  };

  // Estado suavizado (inercia) para que el objeto no siga el scroll a tirones
  const cur = { m1: 0, m2: 0, rot: 0, tiltX: 0, tiltY: 0 };
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  };

  let raf = 0;
  let running = true;
  const start = performance.now();

  const frame = (now: number) => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = y / max;
    const m1 = smooth(anchors.a0, anchors.a1, y);
    const m2 = smooth(anchors.b0, anchors.b1, y);
    cur.m1 += (m1 - cur.m1) * 0.08;
    cur.m2 += (m2 - cur.m2) * 0.08;
    updateShape(cur.m1, cur.m2);

    // Rotación: una vuelta y media a lo largo de toda la página + giro lento en reposo
    const idle = ((now - start) / 1000) * 0.06;
    const targetRot = progress * Math.PI * 3 + idle;
    cur.rot += (targetRot - cur.rot) * 0.06;
    cur.tiltX += (pointer.y * 0.25 + 0.35 - cur.tiltX) * 0.05;
    cur.tiltY += (pointer.x * 0.35 - cur.tiltY) * 0.05;
    group.rotation.set(cur.tiltX, cur.rot + cur.tiltY, 0);

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  };

  const onVisibility = () => {
    if (calm) return;
    running = document.visibilityState === 'visible';
    if (running) raf = requestAnimationFrame(frame);
    else cancelAnimationFrame(raf);
  };

  const onResize = () => {
    measure();
    if (calm) renderStatic();
  };

  // Movimiento reducido: una sola imagen quieta del cubo (la forma central de la historia)
  const renderStatic = () => {
    updateShape(1, 0);
    group.rotation.set(0.45, 0.6, 0);
    renderer.render(scene, camera);
  };

  const themeObserver = new MutationObserver(() => {
    applyTheme();
    if (calm) renderStatic();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  applyTheme();
  measure();
  window.addEventListener('resize', onResize);

  if (calm) {
    renderStatic();
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);
  }

  canvas.classList.add('is-ready');

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    themeObserver.disconnect();
    geometry.dispose();
    material.map?.dispose();
    material.dispose();
    renderer.dispose();
  };
}
