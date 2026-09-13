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
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'PHP', 'SQL', 'No-SQL'],
  },
  {
    label: 'Backend & Frameworks',
    items: ['Django', 'FastAPI', 'NestJS', 'Node.js', 'REST APIs', 'gRPC', 'Microservices'],
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
      'Braintree',
      'PayPal',
      'Apple Pay',
      'Google Pay',
      'Tipalti',
      'HubSpot',
      'AfterShip',
      'Twilio',
      'Amazon SNS',
      'MSG91',
      'Bandwidth',
      'Infobip',
      'Bird',
      'SendGrid',
      'Mailgun',
      'Amazon SES',
      'Mailjet',
      'Novu',
      'FCM',
      'Google Moderation APIs',
      'Auth0',
      'RBAC',
      'Tally',
      'Jupyter',
      'Git',
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export type ClientProject = {
  name: string;
  url: string;
};

export type Role = {
  project: string;
  site?: string;
  siteUrl?: string;
  mode: string;
  period: string;
  highlights: string[];
  stack: string[];
  /** Named client deliverables built under this role, each linking out. */
  clientProjects?: ClientProject[];
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
          'Built the Payments service on Spreedly — cards are tokenized client-side through a Spreedly iFrame, exchanged for a gateway vendor token, then charged server-side, keeping raw card data out of our infrastructure — with Avalara integrated for real-time US sales-tax calculation across jurisdictions.',
          'Extended checkout from scratch with Apple Pay and Google Pay wallet payments, and a Spreedly Account Updater integration that auto-refreshes stored cards on expiry or re-issue to cut declined charges for returning and subscription customers.',
          'Extended the Payments service to also serve Truly-Free Home (TFH), a single-brand storefront, migrating it off its prior Sticky-based payment setup when the business requirement changed — one service now handles both TFH and the Truly-Free (TF) marketplace, where multiple stores, affiliates, and customers transact, each platform routed to its own separate Spreedly/Braintree gateway credentials via a platform column recorded on every payment for routing and monitoring.',
          'Added PayPal as a checkout option on top of the existing Spreedly integration for both platforms — Spreedly routes the purchase through each platform’s own Braintree gateway, which settles with PayPal, reusing the same purchase/refund pipeline already built for cards and wallets.',
          'Own the Social service (social-v1) end to end — posts, offers, and product+post collections — and am now leading its migration to social-v2 with major architectural changes.',
          'Built a content moderation pipeline in social-v1 covering post text, images, and video, plus comments and product images/descriptions — scoring each against Google’s moderation APIs and comparing category scores (toxicity, harassment, unsafe imagery, etc.) against admin-configured thresholds per content type to auto-approve or auto-reject, with a manual force-approve/force-reject override for admins.',
          'Built Reviews & Ratings (bulk import and single-user submission flows), buyer-to-seller Q&A, and product FAQ services to support the storefront.',
          'Led Product Management, Product Category, and Product Attribution services, plus shipment tracking integrated with AfterShip.',
          'Built the Affiliate program end to end — signup flow, Tipalti payouts, and a two-way HubSpot sync — alongside the Meta Audience Sync pipeline for marketing.',
          'Built livestream commerce offers (one-time offers and flash sales) and the notification service driving FCM push, SMS through the same multi-vendor SMS service built at Appscrip In-House, and email through Novu.',
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
          'Braintree',
          'PayPal',
          'Apple Pay',
          'Google Pay',
          'Avalara',
          'AfterShip',
          'HubSpot',
          'Tipalti',
          'FCM',
          'Novu',
          'Google Moderation APIs',
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
          'Designed and integrated role-based access control (RBAC) for platform users and internal operations teams, extending the existing Auth0 authentication (login, OTP verification, OTP login, and email verification) with the roles/permissions model, including changes on the Auth0 side to support it.',
        ],
        stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'AWS Lambda', 'REST APIs', 'Microservices', 'Auth0', 'RBAC', 'Agile'],
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
          'Delivered 100+ client projects on this in-house product line. Most were clone builds — TikTok-, Instagram-, and Tinder-style apps, among others — customized against our base app and redeployed per client; 10+ were individual/custom builds such as Sales Paddock, an insurance-industry app, Intrvu, and others.',
          'Developed and maintained the shared social platform base — real-time chat and calling, short-video feeds, and photo/reel sharing — using Node.js with MQTT for real-time messaging, plus reusable libraries and shared backend modules (chat delivery, presence, media pipelines) that every clone build customized from rather than rebuilt.',
          'Designed and built a vendor-agnostic SMS and email notification service (gRPC) used across client apps for OTP verification, transactional messages, and marketing campaigns — one send function per channel handles every vendor, with per-client vendor credentials, a "from" parameter since a single client can route different use cases through different vendors, and message content resolved by a unique template_name rather than raw text passed over the wire.',
          'Supported SMS through Twilio, Amazon SNS, MSG91, Bandwidth, Infobip, and Bird, and email through SendGrid, Mailgun, Amazon SES, and Mailjet, including multi-file attachment support on the email side.',
          'For one client, built 24 Messenger, a secure Android messenger — end-to-end encrypted one-to-one chat carrying text, images, video, and audio, with an in-app audio player, a built-in wallet to send and receive money with contacts, and a lightweight social layer (post, like, share, favorites, search).',
          'For another client, built backend services for Sales Paddock, a horse-industry marketplace, including a map-based discovery feature so buyers could find horses, tack, and services by location.',
        ],
        stack: [
          'Node.js',
          'MQTT',
          'MongoDB',
          'Redis',
          'Real-time APIs',
          'gRPC',
          'End-to-End Encryption',
          'Wallet/Payments',
          'Geolocation',
          'Twilio',
          'Amazon SNS',
          'MSG91',
          'Bandwidth',
          'Infobip',
          'Bird',
          'SendGrid',
          'Mailgun',
          'Amazon SES',
          'Mailjet',
        ],
        clientProjects: [
          { name: '24 Messenger', url: 'https://24-messenger.en.softonic.com/android' },
          { name: 'Sales Paddock', url: 'https://salespaddock.com' },
        ],
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
      'Payment microservices built on Spreedly: PCI-safe card capture through a Spreedly iFrame, vendor-token exchange, and server-side charging for checkout, settlement, and refunds. Added Apple Pay and Google Pay wallet checkout and a Spreedly Account Updater flow to keep stored cards alive, with Avalara for real-time US sales-tax across jurisdictions. One service now serves two platforms — the Truly-Free (TF) marketplace and the single-brand Truly-Free Home (TFH) storefront, migrated off its prior Sticky-based setup — each routed to its own separate Spreedly/Braintree gateway credentials via a platform column recorded on every payment. Most recently added PayPal on both platforms by routing Spreedly through Braintree, which settles with PayPal. Built for correctness under retry and partial failure.',
    stack: ['Python', 'FastAPI', 'Kafka', 'MySQL', 'Spreedly', 'Braintree', 'PayPal', 'Apple Pay', 'Google Pay', 'Avalara'],
  },
  {
    name: 'Livestream Commerce Backend',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Real-time livestream shopping service — one-time offers and flash sales pushed to viewers over MQTT while inventory stays consistent with the catalog services.',
    stack: ['NestJS', 'MQTT', 'Redis', 'Kafka'],
  },
  {
    name: 'Social Platform & Content Moderation',
    context: 'Truly-Free · Appscrip',
    blurb:
      'Own the Social service (social-v1) end to end — posts, offers, and product+post collections — now leading its migration to social-v2. Built the moderation pipeline on top of it: post text/images/video, comments, and product images/descriptions are scored through Google’s moderation APIs and checked against admin-configured thresholds per content type and category to auto-approve or auto-reject, with a manual override for admins to force-approve or force-reject any item.',
    stack: ['Python', 'MongoDB', 'Google Moderation APIs'],
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
      'Backend services for Klub’s financing platform — brand onboarding, deal structuring, and repayment workflows exposed as REST APIs to multiple frontends. Designed and integrated role-based access control (RBAC) for platform users and internal operations teams on top of the existing Auth0 authentication (login, OTP verification/login, email verification), including the required Auth0-side changes.',
    stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'REST APIs', 'Auth0', 'RBAC'],
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
    name: 'Vendor-Agnostic SMS & Email Service',
    context: 'Appscrip In-House',
    blurb:
      'Shared gRPC notification service for OTP, transactional messages, and marketing campaigns across every client app, later reused by Truly-Free’s SMS. One send function per channel works against any configured vendor — SMS across Twilio, Amazon SNS, MSG91, Bandwidth, Infobip, and Bird; email across SendGrid, Mailgun, Amazon SES, and Mailjet with multi-file attachments — since a single client can route different use cases through different vendors. Callers pass a unique template_name rather than raw content, so message copy stays out of the request.',
    stack: ['Node.js', 'gRPC', 'Twilio', 'Amazon SNS', 'MSG91', 'SendGrid', 'Mailgun', 'Amazon SES'],
  },
  {
    name: '24 Messenger',
    context: 'Appscrip In-House · Android',
    blurb:
      'Secure Android messenger built on the shared real-time backend — end-to-end encrypted chat with text, image, video, and audio messages, an in-app audio player, a built-in wallet to send and receive money with contacts, and a lightweight social layer (post, like, share, favorites, search).',
    stack: ['Node.js', 'MQTT', 'MongoDB', 'Redis', 'End-to-End Encryption', 'Wallet/Payments'],
    liveUrl: 'https://24-messenger.en.softonic.com/android',
  },
  {
    name: 'Sales Paddock',
    context: 'Appscrip In-House',
    blurb:
      'Marketplace backend for the horse industry, with a map-based discovery feature so buyers can find horses, tack, and services by location.',
    stack: ['Node.js', 'MongoDB', 'Geolocation', 'REST APIs'],
    liveUrl: 'https://salespaddock.com',
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
