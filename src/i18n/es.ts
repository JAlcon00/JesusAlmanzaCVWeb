import type { SiteContent, StackGroup } from './types';

/** Contenido en español (ruta /es/). Guía de estilo: context.md §9. */

export const stackGroupsEs: StackGroup[] = [
  {
    label: 'Programación',
    icon: 'code',
    items: [
      { name: 'Python', logo: 'siPython' },
      { name: 'TypeScript', logo: 'siTypescript' },
      { name: 'JavaScript', logo: 'siJavascript' },
      { name: 'Java', logo: 'siOpenjdk' },
      { name: 'C#', fallback: 'code' },
      { name: 'Swift (SwiftUI)', logo: 'siSwift' },
    ],
  },
  {
    label: 'IA y datos',
    icon: 'brain',
    items: [
      { name: 'Agentes de IA', fallback: 'brain' },
      { name: 'Gemini API', logo: 'siGooglegemini' },
      { name: 'ETL', fallback: 'database' },
      { name: 'Data warehousing', fallback: 'database' },
      { name: 'Minería de datos', fallback: 'chart' },
      { name: 'BI', fallback: 'chart' },
    ],
  },
  {
    label: 'Bases de datos',
    icon: 'database',
    items: [
      { name: 'PostgreSQL', logo: 'siPostgresql' },
      { name: 'SQL Server', fallback: 'database' },
      { name: 'MySQL', logo: 'siMysql' },
      { name: 'SQLite', logo: 'siSqlite' },
      { name: 'MongoDB', logo: 'siMongodb' },
    ],
  },
  {
    label: 'Frameworks',
    icon: 'stack',
    items: [
      { name: 'Django', logo: 'siDjango' },
      { name: 'React', logo: 'siReact' },
      { name: 'Angular', logo: 'siAngular' },
      { name: '.NET MAUI', logo: 'siDotnet' },
      { name: 'Tailwind CSS', logo: 'siTailwindcss' },
    ],
  },
  {
    label: 'Nube y DevOps',
    icon: 'cloud',
    items: [
      { name: 'Google Cloud', logo: 'siGooglecloud' },
      { name: 'AWS', fallback: 'cloud' },
      { name: 'Docker', logo: 'siDocker' },
      { name: 'Git', logo: 'siGit' },
      { name: 'GitHub Actions', logo: 'siGithubactions' },
      { name: 'pytest', logo: 'siPytest' },
    ],
  },
];

export const es: SiteContent = {
  locale: 'es',
  htmlLang: 'es-MX',
  ogLocale: 'es_MX',
  ids: {
    main: 'contenido',
    home: 'inicio',
    profile: 'perfil',
    projects: 'proyectos',
    experience: 'experiencia',
    stack: 'stack',
    education: 'formacion',
    contact: 'contacto',
  },
  seo: {
    title: 'Jesús Almanza · Ingeniero de Software y Datos',
    description:
      'Ingeniero de software y datos, encargado de TI en Olson Capital. Diseño agentes de IA, data warehouses en la nube y backends de BI para el sector financiero.',
  },
  person: { role: 'ingeniero de software y datos', location: 'León, Gto., México' },
  ui: {
    skip: 'Saltar al contenido',
    navLabel: 'Principal',
    nav: { projects: 'Proyectos', experience: 'Experiencia', stack: 'Stack', education: 'Formación' },
    themeToDark: 'Cambiar a tema oscuro',
    themeToLight: 'Cambiar a tema claro',
    switchLang: { label: 'English', short: 'EN', aria: 'Read this page in English' },
    cta: { contact: 'Escríbeme', projects: 'Ver proyectos', cv: 'Descargar CV' },
    newTab: '(abre en una pestaña nueva)',
    backToTop: 'Volver arriba',
    monogram: 'Monograma de',
    profileHeading: 'Perfil profesional',
    techOf: (name) => `Tecnologías de ${name}`,
    technologies: 'Tecnologías',
  },
  hero: {
    eyebrow: 'Jesús Almanza · Software & Data Engineer',
    lead: 'Transformo datos contables en',
    accent: 'decisiones confiables.',
    sub: 'Soy ingeniero de software y datos: diseño agentes de IA, data warehouses y plataformas de BI para el sector financiero.',
  },
  profile: {
    lead: 'Estoy al frente de TI en Olson Capital, un grupo financiero mexicano, donde además diseño su arquitectura de datos.',
    body: 'Mi propósito es que la información contable del ERP llegue limpia, trazable y a tiempo a quienes toman las decisiones.',
    detail:
      'Diseñé y construí de principio a fin MatchCount, un agente de IA con Google Gemini que homologa las cuentas de CONTPAQi y las integra en un data warehouse PostgreSQL sobre Google Cloud. Actualmente desarrollo el backend en Django de DashBI, el tablero financiero del grupo.',
  },
  metrics: [
    { value: 4762, label: 'registros contables consolidados de dos empresas del grupo' },
    { value: 791, label: 'pruebas de backend aprobadas con pytest' },
    { value: 60, label: 'casos en la matriz de QA, validados contra el data warehouse en producción' },
    {
      value: 1,
      prefix: '<',
      suffix: ' s',
      label: 'de latencia mediana por endpoint a lo largo de cinco sprints de Scrum',
    },
  ],
  projects: {
    heading: 'Del ERP al tablero de la dirección.',
    matchcount: {
      name: 'MatchCount',
      kind: 'Pipeline de datos contables con IA',
      role: 'Único desarrollador, de principio a fin',
      pitch:
        'Un agente de IA con Google Gemini que traduce las cuentas de CONTPAQi al catálogo homologado del grupo, sin renunciar a la supervisión humana.',
      highlights: [
        {
          icon: 'flow',
          text: 'Homologa las cuentas del ERP CONTPAQi (SQL Server) con el catálogo del grupo y las carga en un data warehouse PostgreSQL en Google Cloud SQL.',
        },
        {
          icon: 'review',
          text: 'Clasifica por nivel de confianza: los casos dudosos se turnan a revisión humana y los registros revertidos se deshacen con un rollback controlado.',
        },
        {
          icon: 'model',
          text: 'Se apoya en un modelo de datos con migraciones SQL versionadas, vistas de Estado de Resultados, una taxonomía contable con flujo de aprobación y una vista de frescura de datos.',
        },
        {
          icon: 'lock',
          text: 'Protege el acceso con roles de mínimo privilegio y contratos de datos de solo lectura para los consumidores de BI.',
        },
      ],
      tech: ['Google Gemini', 'Python', 'CONTPAQi', 'SQL Server', 'PostgreSQL', 'Cloud SQL'],
      stat: {
        value: 4762,
        label: 'registros contables consolidados en el data warehouse, de dos empresas del grupo',
        legend: 'Cada punto representa unos 10 registros',
      },
    },
    dashbi: {
      name: 'DashBI',
      kind: 'Plataforma de BI financiera',
      role: 'Desarrollador backend',
      pitch:
        'El backend del tablero financiero del grupo: estados de resultados por empresa y consolidados, listos para analizar y decidir.',
      highlights: [
        {
          icon: 'api',
          text: 'API REST de solo lectura con lógica de ejercicio fiscal, periodos cerrados, comparativos multianuales y seguimiento de metas.',
        },
        {
          icon: 'shield',
          text: 'Gobernanza de datos aplicada mediante consultas parametrizadas de un solo SELECT, respaldadas por pruebas automatizadas y verificación de privilegios en el data warehouse.',
        },
      ],
      tech: ['Django 5.2', 'Python 3.12', 'pytest', 'PostgreSQL', 'Scrum'],
    },
    router: {
      title: 'Cuando la IA duda, decide una persona.',
      body: 'Ajusta el umbral de confianza y observa qué cuentas se homologan automáticamente y cuáles se turnan a revisión humana.',
      note: 'Ejemplo ilustrativo con cuentas de muestra',
    },
  },
  experience: {
    eyebrow: 'Experiencia',
    heading: 'Dirijo el área de TI sin dejar de programar.',
    roles: [
      {
        company: 'Olson Capital',
        location: 'México',
        title: 'Encargado de TI',
        titleAlt: 'IT Manager',
        period: 'ene. 2024 - actualidad',
        current: true,
        scene: 'olson-office',
        sceneAlt: 'Oficina corporativa de finanzas al anochecer, con vista a la ciudad',
        intro:
          'Tengo a mi cargo la tecnología de todo el grupo, incluida Alend SOFOM: infraestructura de datos, desarrollo de software interno y soporte tecnológico a usuarios.',
        items: [
          {
            icon: 'data',
            text: 'Construí MatchCount y desarrollo el backend de DashBI: la cadena que lleva la contabilidad del ERP hasta los reportes de la dirección.',
          },
          {
            icon: 'mentor',
            text: 'Superviso y oriento a una practicante de TI: le asigno tareas técnicas y reviso sus entregables.',
          },
          {
            icon: 'network',
            text: 'Administro la infraestructura de red, la seguridad de la información y el soporte a usuarios, incluido un programa de mantenimiento preventivo para los equipos de cómputo del personal.',
          },
          { icon: 'automation', text: 'Desarrollé herramientas internas que automatizan la captura manual de datos.' },
        ],
      },
      {
        company: 'Plastic Omnium',
        location: 'León, Gto.',
        title: 'Practicante de TI',
        titleAlt: 'IT Trainee',
        period: 'jun. 2022 - ene. 2023',
        current: false,
        scene: 'plastic-omnium-plant',
        sceneAlt: 'Línea de ensamblaje automotriz con brazos robóticos',
        intro:
          'Participé en la operación tecnológica de una planta de manufactura, del software industrial al mantenimiento de equipos.',
        items: [
          {
            icon: 'factory',
            text: 'Desarrollé aplicaciones de software industrial para optimizar la operación de la planta.',
          },
          {
            icon: 'team',
            text: 'Lideré a un equipo de técnicos en la implementación de nuevos procesos tecnológicos.',
          },
          {
            icon: 'wrench',
            text: 'Realicé el mantenimiento preventivo y correctivo de equipos de cómputo y sistemas industriales.',
          },
        ],
      },
    ],
  },
  stack: { heading: 'Tecnologías con las que construyo.', groups: stackGroupsEs },
  education: {
    heading: 'Formación',
    school: 'Universidad La Salle Bajío',
    location: 'León, Gto.',
    degree: 'Ingeniería en Software y Sistemas Computacionales',
    scene: 'study-space',
    sceneAlt: 'Espacio de estudio nocturno con laptop y cuadernos con diagramas de bases de datos',
    status: 'Egreso previsto: diciembre de 2026',
    courseworkLabel: 'Materias destacadas',
    coursework: [
      'Estructuras de Datos',
      'Algoritmos',
      'Bases de Datos',
      'Cómputo en la Nube',
      'Desarrollo Web y Móvil',
    ],
    certificationLabel: 'Certificación',
    certification: { name: 'Desarrollo Web con React', issuer: 'UNAM' },
    languagesLabel: 'Idiomas',
    languages: [
      { name: 'Español', level: 'Lengua materna' },
      { name: 'Inglés', level: 'Intermedio alto (B2)' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    headline: '¿Tus datos financieros necesitan un pipeline confiable?',
    body: 'Conversemos sobre tu ERP, tu data warehouse o tus tableros de BI. Atiendo en español e inglés.',
  },
  mail: {
    subject: 'Contacto desde tu sitio web',
    body: 'Hola, Jesús:\n\n',
  },
  islands: {
    pipeline: {
      ariaLabel:
        'Diagrama del flujo de MatchCount: las cuentas del ERP CONTPAQi pasan por un agente de IA con Gemini, un umbral de confianza con revisión humana para casos dudosos, un data warehouse en PostgreSQL y el tablero DashBI.',
      title: 'Simulación del flujo de MatchCount',
      titleSuffix: 'con cuentas de muestra',
      pause: 'Pausar simulación',
      resume: 'Reanudar simulación',
      stages: {
        erp: ['CONTPAQi', 'ERP en SQL Server'],
        agent: ['Agente Gemini', 'Propone la cuenta homologada'],
        gate: ['Umbral de confianza', 'Mínimo {t} para aprobación automática'],
        review: ['Revisión humana', 'Valida los casos dudosos'],
        dw: ['Data Warehouse', 'PostgreSQL en Cloud SQL'],
        bi: ['DashBI', 'Estado de Resultados'],
      },
      confidence: 'Confianza',
      autoApproved: 'Aprobación automática',
      needsReview: 'Requiere revisión',
      approved: 'Aprobada por contabilidad',
      stored: 'Registrada en el DW',
      ready: 'Disponible para reportes',
    },
    router: {
      label: 'Umbral de confianza',
      automatic: 'automáticas',
      inReview: 'en revisión humana',
      listLabel: 'Cuentas de muestra ordenadas por confianza',
      srAutomatic: ', automática',
      srReview: ', en revisión humana',
      valueText: '{value}: {auto} cuentas automáticas y {review} en revisión humana',
    },
    copyEmail: {
      idle: 'Copiar correo',
      copied: 'Correo copiado',
      error: 'No se pudo copiar',
      srCopied: '{email} copiado al portapapeles',
      srError: 'Copia manualmente: {email}',
    },
  },
  /* Cuentas de MUESTRA para las demos (no son datos de Olson Capital; en pantalla dice "ejemplo ilustrativo"). */
  samples: [
    { code: '1102-001', source: 'Bancos nacionales', target: 'Efectivo y equivalentes', confidence: 0.97 },
    { code: '4101-003', source: 'Ventas de contado', target: 'Ingresos por ventas', confidence: 0.94 },
    { code: '1199-010', source: 'Complementaria de activo', target: 'Otros activos', confidence: 0.58 },
    { code: '2101-002', source: 'Proveedores nacionales', target: 'Cuentas por pagar', confidence: 0.91 },
    { code: '1105-004', source: 'Clientes', target: 'Cuentas por cobrar', confidence: 0.88 },
    { code: '6105-004', source: 'Viáticos y gastos de viaje', target: 'Gastos de operación', confidence: 0.73 },
    { code: '1107-002', source: 'Deudores diversos', target: 'Otras cuentas por cobrar', confidence: 0.66 },
    { code: '4299-001', source: 'Otros ingresos varios', target: 'Otros ingresos', confidence: 0.47 },
  ],
};
