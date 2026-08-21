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
    items: ['AWS', 'AWS Lambda', 'EC2', 'S3', 'SQS', 'DynamoDB', 'Google Cloud', 'Docker'],
  },
  {
    label: 'Messaging & Real-time',
    items: ['Kafka', 'RabbitMQ', 'MQTT', 'Event-Driven Architecture'],
  },
  {
    label: 'Data Stores',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'Redis', 'Elasticsearch'],
  },
  {
    label: 'Integrations & Tooling',
    items: [
      'Avalara',
      'Meta Marketing API',
      'Spreedly',
      'Tipalti',
      'HubSpot',
      'AfterShip',
      'Twilio',
      'SendGrid',
      'FCM',
      'Tally',
      'Jupyter',
      'Git',
    ],
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
          'Architected and maintained scalable backend microservices for Payments, Inventory, Products, Livestream, Affiliate, and Meta Audience Sync using Python (Django, FastAPI), NestJS, and Kafka, on MongoDB, Cassandra, Redis, and MySQL.',
          'Built the Payments service on Spreedly for card tokenization and gateway processing, with Avalara integrated for real-time US sales-tax calculation across jurisdictions.',
          'Own the Social service (social-v1) end to end — posts, offers, and product+post collections — and am now leading its migration to social-v2 with major architectural changes.',
          'Built Reviews & Ratings (bulk import and single-user submission flows), buyer-to-seller Q&A, and product FAQ services to support the storefront.',
          'Led Product Management, Product Category, and Product Attribution services, plus shipment tracking integrated with AfterShip.',
          'Built the Affiliate program end to end — signup flow, Tipalti payouts, and a two-way HubSpot sync — alongside the Meta Audience Sync pipeline for marketing.',
          'Built livestream commerce offers (one-time offers and flash sales) and the notification service driving FCM push plus Twilio/SendGrid SMS and email to customers.',
        ],
        stack: [
          'Python',
          'Django',
          'FastAPI',
          'NestJS',
          'Kafka',
          'MongoDB',
          'Cassandra',
          'Redis',
          'MySQL',
          'Spreedly',
          'Avalara',
          'AfterShip',
          'HubSpot',
          'Tipalti',
          'FCM',
        ],
      },
      {
        project: 'Klub Works',
        site: 'klub.ai',
        siteUrl: 'https://klub.ai',
        mode: 'Remote',
        period: 'Apr 2022 — Apr 2023',
        highlights: [
          'Built backend services for brand and store onboarding — signup and application flows for requesting revenue-based financing — using NestJS and PostgreSQL.',
          'Integrated a partner Bank API to retrieve applicant bank details, implemented as an AWS Lambda function, to power the underwriting flow.',
          'Designed and implemented REST APIs and backend workflows for seamless frontend integration, while collaborating with cross-functional teams to deliver scalable and production-ready solutions in an Agile environment.',
        ],
        stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'AWS Lambda', 'REST APIs', 'Microservices', 'Agile'],
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
        site: 'appscrip.com',
        siteUrl: 'https://appscrip.com',
        mode: 'On-site',
        period: 'Jul 2016 — 2021',
        highlights: [
          'Developed and maintained scalable social platform products — WhatsApp, TikTok, Instagram, and Tinder style applications — covering real-time chat and calling, short-video feeds, and photo/reel sharing, using Node.js with MQTT for real-time messaging.',
          'Built reusable libraries and shared backend modules — chat delivery, presence, and media pipelines — to accelerate development, improve code reusability, and reduce overall engineering effort across multiple projects.',
          'Contributed to successful product development for platforms like Sales-Paddock and 24 Messenger while collaborating with cross-functional teams in an Agile environment to deliver projects on time.',
        ],
        stack: ['Node.js', 'MQTT', 'MongoDB', 'Redis', 'Real-time APIs'],
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
          'Added Excel export and data export to Tally accounting software, and built an in-house accounting module for ledgers, invoicing, and financial reporting.',
          'Implemented automated email and SMS notifications to customers and clients for container status and payment updates.',
          'Designed optimized MySQL database schemas and implemented backend business logic in Java to ensure reliable performance, data consistency, and scalable application architecture.',
          'Collaborated directly with business stakeholders to gather requirements, customize workflows, troubleshoot production issues, and deliver production-ready solutions within project timelines.',
        ],
        stack: ['Java', 'MySQL', 'Tally Integration', 'Excel Export', 'Email/SMS Notifications', 'Accounting', 'Desktop Application'],
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
      'Payment microservices built on Spreedly for checkout, settlement, and refunds, with Avalara integrated for real-time US sales-tax calculation across jurisdictions. Built for correctness under retry and partial failure.',
    stack: ['Python', 'FastAPI', 'Kafka', 'MySQL', 'Spreedly', 'Avalara'],
  },
  {
    name: 'Livestream Commerce Backend',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Real-time livestream shopping service — one-time offers and flash sales pushed to viewers over MQTT while inventory stays consistent with the catalog services.',
    stack: ['NestJS', 'MQTT', 'Redis', 'Kafka'],
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
      'Distributed catalog, product category/attribution, and stock-tracking services backed by a polyglot data layer — Cassandra for write-heavy movement history, MongoDB for product documents, Redis for read paths.',
    stack: ['Django', 'MongoDB', 'Cassandra', 'Redis'],
  },
  {
    name: 'Affiliate Program & Payouts',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Affiliate signup flow through to payout, with Tipalti handling affiliate payments and a two-way HubSpot sync keeping affiliate and marketing data consistent.',
    stack: ['Python', 'FastAPI', 'Tipalti', 'HubSpot'],
  },
  {
    name: 'Reviews, Q&A & Fulfillment Tracking',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Customer engagement services — bulk-imported and single-user reviews and ratings, buyer-to-seller Q&A, and product FAQs — plus shipment tracking integrated with AfterShip and FCM/SMS/email notifications.',
    stack: ['Python', 'FastAPI', 'AfterShip', 'FCM', 'MySQL'],
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
      'Chat, calling, short-video, and matchmaking products (WhatsApp, TikTok, Instagram, and Tinder-style apps) built on a shared set of reusable backend modules — real-time messaging over MQTT, presence, media pipelines, and feed ranking.',
    stack: ['Node.js', 'MQTT', 'MongoDB', 'Redis'],
  },
  {
    name: 'Logistics Management System',
    context: 'Amardeep Logistics',
    blurb:
      'End-to-end desktop LMS built from scratch: shipment tracking, billing, invoicing, inventory, and reporting, on a hand-designed relational schema — with Excel and Tally export and a built-in accounting module.',
    stack: ['Java', 'MySQL', 'Tally Integration', 'Accounting'],
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
  { href: '/resume', label: 'Resume' },
  { href: '/#contact', label: 'Contact' },
];
