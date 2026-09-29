import type { SiteContent } from './types';
import { stackGroupsEs } from './es';

/**
 * English content (default language, route /). Source: page 1 of the CV (English version).
 * Style: first person, active verbs, American English, no em-dashes, no invented metrics.
 */

const stackLabels: Record<string, string> = {
  Programación: 'Programming',
  'IA y datos': 'AI & data',
  'Bases de datos': 'Databases',
  Frameworks: 'Frameworks',
  'Nube y DevOps': 'Cloud & DevOps',
};
const stackItems: Record<string, string> = {
  'Agentes de IA': 'AI agents',
  'Minería de datos': 'Data mining',
};

export const en: SiteContent = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  ids: {
    main: 'content',
    home: 'home',
    profile: 'profile',
    projects: 'projects',
    experience: 'experience',
    stack: 'stack',
    education: 'education',
    contact: 'contact',
  },
  seo: {
    title: 'Jesús Almanza · Software & Data Engineer',
    description:
      'Software and data engineer, IT Manager at Olson Capital. I build AI agents, cloud data warehouses and BI backends for the financial sector.',
  },
  person: { role: 'software and data engineer', location: 'León, Gto., Mexico' },
  ui: {
    skip: 'Skip to content',
    navLabel: 'Main',
    nav: { projects: 'Projects', experience: 'Experience', stack: 'Stack', education: 'Education' },
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    switchLang: { label: 'Español', short: 'ES', aria: 'Ver esta página en español' },
    cta: { contact: 'Get in touch', projects: 'View projects', cv: 'Download CV' },
    newTab: '(opens in a new tab)',
    backToTop: 'Back to top',
    monogram: 'Monogram of',
    profileHeading: 'Professional profile',
    techOf: (name) => `${name} technologies`,
    technologies: 'Technologies',
  },
  hero: {
    eyebrow: 'Jesús Almanza · Software & Data Engineer',
    lead: 'I turn accounting data into',
    accent: 'decisions you can trust.',
    sub: 'Software and data engineer building AI agents, data warehouses and BI platforms for the financial sector.',
  },
  profile: {
    lead: 'I lead IT at Olson Capital, a Mexican financial group, where I also design its data architecture.',
    body: 'My job is to make sure accounting data from the ERP reaches decision-makers clean, traceable and on time.',
    detail:
      "I designed and built MatchCount end to end: an AI agent powered by Google Gemini that maps CONTPAQi accounts into a PostgreSQL data warehouse on Google Cloud. I also develop the Django backend of DashBI, the group's financial dashboard.",
  },
  metrics: [
    { value: 4762, label: 'accounting records consolidated from two group companies' },
    { value: 791, label: 'passing backend tests with pytest' },
    { value: 60, label: 'QA test cases validated against the live data warehouse' },
    { value: 1, prefix: '<', suffix: ' s', label: 'median endpoint latency across five Scrum sprints' },
  ],
  projects: {
    heading: 'From the ERP to the boardroom.',
    matchcount: {
      name: 'MatchCount',
      kind: 'AI accounting-data pipeline',
      role: 'Sole developer, end to end',
      pitch:
        "An AI agent powered by Google Gemini that maps CONTPAQi accounts to the group's standardized chart of accounts, with people kept in the loop.",
      highlights: [
        {
          icon: 'flow',
          text: "Maps CONTPAQi ERP accounts (SQL Server) to the group's chart of accounts and loads them into a PostgreSQL data warehouse on Google Cloud SQL.",
        },
        {
          icon: 'review',
          text: 'Classifies by confidence: low-confidence mappings are routed to human review, and reverted records are undone with a controlled rollback.',
        },
        {
          icon: 'model',
          text: 'Built on a data model with versioned SQL migrations, income-statement views, an accounting taxonomy with an approval workflow and a data-freshness view.',
        },
        {
          icon: 'lock',
          text: 'Secures access with least-privilege roles and read-only data contracts for downstream BI consumers.',
        },
      ],
      tech: ['Google Gemini', 'Python', 'CONTPAQi', 'SQL Server', 'PostgreSQL', 'Cloud SQL'],
      stat: {
        value: 4762,
        label: 'accounting records consolidated into the data warehouse from two group companies',
        legend: 'Each dot represents about 10 records',
      },
    },
    dashbi: {
      name: 'DashBI',
      kind: 'Financial BI platform',
      role: 'Backend developer',
      pitch:
        "The backend behind the group's financial dashboard: company-level and consolidated income statements, ready for analysis and decisions.",
      highlights: [
        {
          icon: 'api',
          text: 'Read-only REST API with fiscal-year and closed-period logic, multi-year comparisons and target tracking.',
        },
        {
          icon: 'shield',
          text: 'Data governance enforced through parameterized single-SELECT queries, backed by automated tests and data warehouse privilege checks.',
        },
      ],
      tech: ['Django 5.2', 'Python 3.12', 'pytest', 'PostgreSQL', 'Scrum'],
    },
    router: {
      title: 'When the AI hesitates, a person decides.',
      body: 'Move the confidence threshold and see which accounts are mapped automatically and which go to human review.',
      note: 'Illustrative example with sample accounts',
    },
  },
  experience: {
    eyebrow: 'Experience',
    heading: 'I run IT and still write the code.',
    roles: [
      {
        company: 'Olson Capital',
        location: 'Mexico',
        title: 'IT Manager',
        period: 'Jan 2024 - Present',
        current: true,
        scene: 'olson-office',
        sceneAlt: 'Corporate finance office at dusk overlooking the city',
        intro:
          'I lead technology for the entire group, including Alend SOFOM: data infrastructure, internal software development and end-user technology.',
        items: [
          {
            icon: 'data',
            text: 'I built MatchCount and develop the DashBI backend: the chain that carries accounting data from the ERP to executive reports.',
          },
          {
            icon: 'mentor',
            text: 'I supervise and mentor an IT intern, assigning technical tasks and reviewing deliverables.',
          },
          {
            icon: 'network',
            text: 'I manage network infrastructure, information security and end-user support, including a preventive maintenance program for employee workstations.',
          },
          { icon: 'automation', text: 'I built internal tools that automate manual data entry.' },
        ],
      },
      {
        company: 'Plastic Omnium',
        location: 'León, Gto.',
        title: 'IT Trainee',
        period: 'Jun 2022 - Jan 2023',
        current: false,
        scene: 'plastic-omnium-plant',
        sceneAlt: 'Automotive assembly line with robotic arms',
        intro:
          'I supported the technology operations of a manufacturing plant, from industrial software to equipment maintenance.',
        items: [
          { icon: 'factory', text: 'Developed industrial software applications to streamline plant operations.' },
          { icon: 'team', text: 'Led a team of technicians in rolling out new technology processes.' },
          {
            icon: 'wrench',
            text: 'Performed preventive and corrective maintenance on computer equipment and industrial systems.',
          },
        ],
      },
    ],
  },
  stack: {
    heading: 'Tools I build with.',
    groups: stackGroupsEs.map((g) => ({
      ...g,
      label: stackLabels[g.label] ?? g.label,
      items: g.items.map((t) => ({ ...t, name: stackItems[t.name] ?? t.name })),
    })),
  },
  education: {
    heading: 'Education',
    school: 'Universidad La Salle Bajío',
    location: 'León, Gto.',
    degree: 'B.Eng. in Software and Computer Systems Engineering',
    scene: 'study-space',
    sceneAlt: 'Late-night study space with a laptop and notebooks full of database diagrams',
    status: 'Expected graduation: December 2026',
    courseworkLabel: 'Relevant coursework',
    coursework: ['Data Structures', 'Algorithms', 'Databases', 'Cloud Computing', 'Web & Mobile Development'],
    certificationLabel: 'Certification',
    certification: { name: 'Web Development with React', issuer: 'UNAM' },
    languagesLabel: 'Languages',
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Upper-intermediate (B2)' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    headline: 'Does your financial data need a pipeline you can trust?',
    body: "Let's talk about your ERP, your data warehouse or your BI dashboards. I work in Spanish and English.",
  },
  mail: {
    subject: 'Hello from your website',
    body: 'Hi Jesús,\n\n',
  },
  islands: {
    pipeline: {
      ariaLabel:
        'MatchCount flow diagram: CONTPAQi ERP accounts go through a Gemini AI agent, a confidence threshold with human review for uncertain cases, a PostgreSQL data warehouse and the DashBI dashboard.',
      title: 'MatchCount flow simulation',
      titleSuffix: 'with sample accounts',
      pause: 'Pause simulation',
      resume: 'Resume simulation',
      stages: {
        erp: ['CONTPAQi', 'SQL Server ERP'],
        agent: ['Gemini agent', 'Proposes the mapped account'],
        gate: ['Confidence threshold', 'Minimum {t} for auto-approval'],
        review: ['Human review', 'Validates uncertain cases'],
        dw: ['Data warehouse', 'PostgreSQL on Cloud SQL'],
        bi: ['DashBI', 'Income statement'],
      },
      confidence: 'Confidence',
      autoApproved: 'Auto-approved',
      needsReview: 'Needs review',
      approved: 'Approved by accounting',
      stored: 'Stored in the DW',
      ready: 'Ready for reporting',
    },
    router: {
      label: 'Confidence threshold',
      automatic: 'automatic',
      inReview: 'in human review',
      listLabel: 'Sample accounts sorted by confidence',
      srAutomatic: ', automatic',
      srReview: ', in human review',
      valueText: '{value}: {auto} automatic accounts and {review} in human review',
    },
    copyEmail: {
      idle: 'Copy email',
      copied: 'Email copied',
      error: "Couldn't copy",
      srCopied: '{email} copied to clipboard',
      srError: 'Copy it manually: {email}',
    },
  },
  /* SAMPLE accounts for the demos (not Olson Capital data; labeled "illustrative example" on screen). */
  samples: [
    { code: '1102-001', source: 'Domestic banks', target: 'Cash and cash equivalents', confidence: 0.97 },
    { code: '4101-003', source: 'Cash sales', target: 'Sales revenue', confidence: 0.94 },
    { code: '1199-010', source: 'Asset contra account', target: 'Other assets', confidence: 0.58 },
    { code: '2101-002', source: 'Domestic suppliers', target: 'Accounts payable', confidence: 0.91 },
    { code: '1105-004', source: 'Customers', target: 'Accounts receivable', confidence: 0.88 },
    { code: '6105-004', source: 'Travel and per diem', target: 'Operating expenses', confidence: 0.73 },
    { code: '1107-002', source: 'Sundry debtors', target: 'Other receivables', confidence: 0.66 },
    { code: '4299-001', source: 'Miscellaneous income', target: 'Other income', confidence: 0.47 },
  ],
};
