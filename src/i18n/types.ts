/** Contrato de contenido: es.ts y en.ts deben cumplirlo completo (si falta un campo, el build falla). */

export type Locale = 'es' | 'en';

export type Highlight = { icon: string; text: string };

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

/** `logo` es la clave de simple-icons; si no existe (marcas retiradas), `fallback` es un glifo Phosphor. */
export type Tech = { name: string; logo?: string; fallback?: 'code' | 'database' | 'cloud' | 'brain' | 'chart' };

export type StackGroup = { label: string; icon: string; items: Tech[] };

export type Role = {
  company: string;
  location: string;
  title: string;
  /** Nombre del puesto en el otro idioma, entre paréntesis (opcional). */
  titleAlt?: string;
  period: string;
  current: boolean;
  intro: string;
  /** Imagen opcional en src/assets/scenes/<scene>.jpg */
  scene: string;
  sceneAlt: string;
  items: Highlight[];
};

export type SampleAccount = { code: string; source: string; target: string; confidence: number };

export type PipelineCopy = {
  ariaLabel: string;
  title: string;
  titleSuffix: string;
  pause: string;
  resume: string;
  stages: {
    erp: [string, string];
    agent: [string, string];
    gate: [string, string];
    review: [string, string];
    dw: [string, string];
    bi: [string, string];
  };
  confidence: string;
  autoApproved: string;
  needsReview: string;
  approved: string;
  stored: string;
  ready: string;
};

export type RouterCopy = {
  label: string;
  automatic: string;
  inReview: string;
  listLabel: string;
  srAutomatic: string;
  srReview: string;
  /** Plantilla serializable para la isla: {value}, {auto}, {review} */
  valueText: string;
};

export type CopyEmailCopy = { idle: string; copied: string; error: string; srCopied: string; srError: string };

export type SiteContent = {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  ids: {
    main: string;
    home: string;
    profile: string;
    projects: string;
    experience: string;
    stack: string;
    education: string;
    contact: string;
  };
  seo: { title: string; description: string };
  person: { role: string; location: string };
  ui: {
    skip: string;
    navLabel: string;
    nav: { projects: string; experience: string; stack: string; education: string };
    themeToDark: string;
    themeToLight: string;
    switchLang: { label: string; short: string; aria: string };
    cta: { contact: string; projects: string; cv: string };
    newTab: string;
    backToTop: string;
    monogram: string;
    profileHeading: string;
    techOf: (name: string) => string;
    technologies: string;
  };
  hero: { eyebrow: string; lead: string; accent: string; sub: string };
  profile: { lead: string; body: string; detail: string };
  metrics: Metric[];
  projects: {
    heading: string;
    matchcount: {
      name: string;
      kind: string;
      role: string;
      pitch: string;
      highlights: Highlight[];
      tech: string[];
      /** Cifra real del CV mostrada como matriz de puntos (solo escritorio). */
      stat: { value: number; label: string; legend: string };
    };
    dashbi: { name: string; kind: string; role: string; pitch: string; highlights: Highlight[]; tech: string[] };
    router: { title: string; body: string; note: string };
  };
  experience: { eyebrow: string; heading: string; roles: Role[] };
  stack: { heading: string; groups: StackGroup[] };
  education: {
    heading: string;
    school: string;
    location: string;
    degree: string;
    scene: string;
    sceneAlt: string;
    status: string;
    courseworkLabel: string;
    coursework: string[];
    certificationLabel: string;
    certification: { name: string; issuer: string };
    languagesLabel: string;
    languages: { name: string; level: string }[];
  };
  contact: { eyebrow: string; headline: string; body: string };
  /** Asunto y cuerpo prellenados del correo que abre el botón de contacto (mailto). */
  mail: { subject: string; body: string };
  islands: { pipeline: PipelineCopy; router: RouterCopy; copyEmail: CopyEmailCopy };
  samples: SampleAccount[];
};
