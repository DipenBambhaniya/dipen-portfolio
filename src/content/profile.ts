/**
 * Single source of truth for every piece of resume content on the site.
 * Edit here — the components read from this file, nothing is hard-coded in JSX.
 */

export const profile = {
  name: 'Dipen Bambhaniya',
  pronouns: 'He/Him',
  title: 'Lead Software Engineer',
  headline:
    'Python · Node.js · AWS · Microservices · Payments · Distributed Systems',
  location: 'Bengaluru, India',
  yearsOfExperience: '10+',
  email: 'work.dipen@gmail.com',
  phone: '+91 96208 26142',
  linkedin: 'https://www.linkedin.com/in/dipen-bambhaniya/',
  resumePath: '/resume.pdf',
  summary: [
    'Lead Software Engineer with over a decade of experience architecting backend systems that handle payments, inventory, and real-time commerce at scale.',
    'I work primarily in Python and TypeScript, designing event-driven microservices on AWS with Kafka, and building the distributed data layers — MongoDB, Cassandra, Redis, PostgreSQL — that keep them fast under load.',
    'Most recently I have led backend technical initiatives at Appscrip: third-party integrations, production optimization, and cross-team system design for a US retail brand.',
  ],
} as const;

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'No-SQL', 'Java'],
  },
  {
    label: 'Backend & Frameworks',
    items: ['Django', 'FastAPI', 'NestJS', 'Node.js', 'REST APIs', 'Microservices'],
  },
  {
    label: 'Cloud & Infrastructure',
    items: ['AWS', 'EC2', 'S3', 'SQS', 'DynamoDB', 'Google Cloud', 'Docker'],
  },
  {
    label: 'Messaging & Real-time',
    items: ['Kafka', 'RabbitMQ', 'MQTT', 'Socket.io', 'Event-Driven Architecture'],
  },
  {
    label: 'Data Stores',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'Redis', 'Elasticsearch'],
  },
  {
    label: 'Integrations & Tooling',
    items: ['Avalara', 'Meta Marketing API', 'Twilio', 'SendGrid', 'Jupyter', 'Git'],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export type Role = {
  project: string;
  site?: string;
  siteUrl?: string;
  mode: string;
  period: string;
  highlights: string[];
  stack: string[];
};

export type Company = {
  company: string;
  location: string;
  period: string;
  roleTitle?: string;
  roles: Role[];
};

export const experience: Company[] = [
  {
    company: 'Appscrip',
    location: 'Bengaluru, India',
    period: 'Jul 2016 — Present',
    roles: [
      {
        project: 'Truly-Free',
        site: 'trulyfree.com',
        siteUrl: 'https://trulyfree.com',
        mode: 'Remote',
        period: 'May 2023 — Present',
        highlights: [
          'Architected and maintained scalable backend microservices for Payments, Inventory, Products, Livestream, Affiliate, and Meta Audience Sync using Python (Django, FastAPI), NestJS, and Kafka.',
          'Built high-performance distributed systems using MongoDB, Cassandra, Redis, and MySQL, improving API responsiveness, scalability, and real-time data processing.',
          'Led backend technical initiatives including third-party integrations (Avalara, Meta), event-driven architecture, production optimization, and cross-team system design collaboration.',
        ],
        stack: ['Python', 'Django', 'FastAPI', 'NestJS', 'Kafka', 'MongoDB', 'Cassandra', 'Redis', 'MySQL'],
      },
      {
        project: 'Klub Works',
        site: 'klub.ai',
        siteUrl: 'https://klub.ai',
        mode: 'Remote',
        period: 'Apr 2022 — Apr 2023',
        highlights: [
          'Developed and maintained scalable backend applications for Klub using NestJS and PostgreSQL, enabling reliable and high-performance business operations across multiple services.',
          'Designed and implemented REST APIs and backend workflows for seamless frontend integration, while collaborating with cross-functional teams to deliver scalable and production-ready solutions in an Agile environment.',
        ],
        stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'REST APIs', 'Microservices', 'Agile'],
      },
      {
        project: "Byju's",
        site: 'byjus.com',
        siteUrl: 'https://byjus.com',
        mode: 'Remote',
        period: 'Nov 2021 — Apr 2022',
        highlights: [
          'Developed and maintained scalable backend systems using Node.js, Python, and Kafka, ensuring reliable service communication and high system availability.',
          'Improved backend performance and system efficiency through optimization, debugging, and performance tuning across distributed services.',
          'Mentored new team members on Node.js, MongoDB, and backend development best practices while collaborating with cross-functional teams to deliver projects successfully in an Agile environment.',
        ],
        stack: ['Node.js', 'Python', 'Kafka', 'MongoDB', 'Distributed Systems'],
      },
      {
        project: 'Appscrip In-House Products',
        mode: 'On-site',
        period: 'Jul 2016 — 2021',
        highlights: [
          'Developed and maintained scalable social platform products — WhatsApp, TikTok, Instagram, and Tinder style applications — using Node.js and modern backend technologies, focusing on real-time communication and high-performance APIs.',
          'Built reusable libraries and shared backend modules to accelerate development, improve code reusability, and reduce overall engineering effort across multiple projects.',
          'Contributed to successful product development for platforms like Sales-Paddock and 24 Messenger while collaborating with cross-functional teams in an Agile environment to deliver projects on time.',
        ],
        stack: ['Node.js', 'Socket.io', 'MongoDB', 'Redis', 'Real-time APIs'],
      },
    ],
  },
  {
    company: 'Amardeep Logistics Pvt. Ltd.',
    location: 'Gujarat, India',
    period: 'Jun 2015 — Jun 2016',
    roleTitle: 'Software Developer — Logistics Management System',
    roles: [
      {
        project: 'Logistics Management System',
        mode: 'On-site',
        period: 'Jun 2015 — Jun 2016',
        highlights: [
          'Designed and developed a complete desktop-based Logistics Management System from scratch using Java and MySQL to streamline shipment tracking, billing, inventory, and operational workflows.',
          'Built and maintained core business modules including order management, customer handling, invoice generation, reporting, and inventory tracking to improve operational efficiency.',
          'Designed optimized MySQL database schemas and implemented backend business logic in Java to ensure reliable performance, data consistency, and scalable application architecture.',
          'Collaborated directly with business stakeholders to gather requirements, customize workflows, troubleshoot production issues, and deliver production-ready solutions within project timelines.',
        ],
        stack: ['Java', 'MySQL', 'Desktop Application', 'Database Design'],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects showcase
// ---------------------------------------------------------------------------

export type Project = {
  name: string;
  context: string;
  blurb: string;
  stack: string[];
  /** Fill these in when you have something public to link to. */
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    name: 'Payments & Tax Platform',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Payment microservices handling checkout, settlement, and refunds, with Avalara integrated for real-time US sales-tax calculation across jurisdictions. Built for correctness under retry and partial failure.',
    stack: ['Python', 'FastAPI', 'Kafka', 'MySQL', 'Avalara'],
  },
  {
    name: 'Livestream Commerce Backend',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Real-time livestream shopping service — viewer presence, in-stream product drops, and cart events pushed over sockets while inventory stays consistent with the catalog services.',
    stack: ['NestJS', 'Socket.io', 'Redis', 'Kafka'],
  },
  {
    name: 'Meta Audience Sync',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Event-driven pipeline that continuously syncs customer segments to the Meta Marketing API, translating internal domain events into audience membership changes without hammering rate limits.',
    stack: ['Python', 'Kafka', 'Meta Marketing API', 'Cassandra'],
  },
  {
    name: 'Inventory & Product Catalog Services',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Distributed catalog and stock-tracking services backed by a polyglot data layer — Cassandra for write-heavy movement history, MongoDB for product documents, Redis for read paths.',
    stack: ['Django', 'MongoDB', 'Cassandra', 'Redis'],
  },
  {
    name: 'Revenue-Based Financing Backend',
    context: 'Klub Works',
    blurb:
      'Backend services for Klub’s financing platform — brand onboarding, deal structuring, and repayment workflows exposed as REST APIs to multiple frontends.',
    stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'REST APIs'],
  },
  {
    name: 'Learning Platform Services',
    context: "Byju's",
    blurb:
      'Distributed backend services for a large-scale edtech platform, with Kafka carrying inter-service communication and a sustained focus on latency and availability tuning.',
    stack: ['Node.js', 'Python', 'Kafka', 'MongoDB'],
  },
  {
    name: 'Real-Time Social Platform Suite',
    context: 'Appscrip In-House',
    blurb:
      'Messaging, short-video, feed, and matchmaking products built on a shared set of reusable backend modules — chat delivery, presence, media pipelines, and feed ranking.',
    stack: ['Node.js', 'Socket.io', 'MongoDB', 'Redis'],
  },
  {
    name: 'Logistics Management System',
    context: 'Amardeep Logistics',
    blurb:
      'End-to-end desktop LMS built from scratch: shipment tracking, billing, invoicing, inventory, and reporting, on a hand-designed relational schema.',
    stack: ['Java', 'MySQL'],
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export type Education = {
  institution: string;
  location: string;
  degree: string;
  period: string;
  grade?: string;
  skills?: string[];
  coursework?: string[];
};

export const education: Education[] = [
  {
    institution: 'SRK Institute of Management & Computer Education',
    location: 'Anjar, Kutch',
    degree: 'M.Sc. in Information Technology',
    period: '2013 — May 2015',
    grade: 'CGPA 8.05/10 · Grade A+',
    skills: ['MySQL', '.NET Framework'],
    coursework: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Web Technologies',
      'Cloud Computing',
      'Machine Learning',
      'Distributed Systems',
      'Object-Oriented Programming',
      'Data Mining',
    ],
  },
  {
    institution: 'SRK Institute of Management & Computer Education',
    location: 'Anjar, Kutch',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2011 — 2013',
    grade: 'Grade A+',
    skills: ['JavaScript', 'C++'],
  },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#education', label: 'Education' },
  { href: '/blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];
