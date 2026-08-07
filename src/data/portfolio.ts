export type Experience = {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  skills: string[];
};

export type Project = {
  title: string;
  date: string;
  image?: string;
  imageAlt?: string;
  githubLink?: string;
  liveLink?: string;
  description: string[];
  featured?: boolean;
};

export type BlogPost = {
  title: string;
  publishedAt: string;
  href?: string;
};

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const site = {
  name: 'mayank bansal',
  initials: 'mb',
  url: 'https://mayank.fyi',
  title: 'mayank bansal • your friendly neighbourhood developer',
  description: 'mayank bansal portfolio, backend developer and software engineer.',
  socialDescription: 'portfolio website for mayank bansal',
  socialImage:
    'https://res.cloudinary.com/dwuyp1nss/image/upload/v1735586934/mayankbansal.xyz/g2s0ah77imvhuzpac1nu.jpg',
  socialImageAlt: 'mayank bansal portfolio',
};

export const links = {
  email: 'mailto:mayankbansal125@gmail.com',
  calendar: 'https://cal.com/mayankbansal',
  github: 'https://github.com/MayankBansal12',
  repositories: 'https://github.com/MayankBansal12?tab=repositories',
  twitter: 'https://x.com/SimplerMayank',
  linkedin: 'https://www.linkedin.com/in/mayank-bansal200604012/',
  substack: 'https://mayank12.substack.com/',
  subscribe: 'https://mayank12.substack.com/subscribe',
  anonymousNote: 'https://mayank.sayout.net/',
};

export const home = {
  hero: {
    heading: "hey. i'm mayank.",
    role: 'just an engineer trying to create things that matter',
    pointers: [
      "i'm inspired by the people on the internet, working and creating stuff out of their passion and love for the craft.",
      "i've worked with early-stage teams, moving between frontend, backend, and deployments wherever the product needed me.",
      "i'm currently working on a bunch of experiments to push the limits of myself and what i can do with models.",
    ],
    availability: {
      visible: true,
      text: "i'm available for hire",
    },
    calendarCta: 'book an intro call',
    emailCta: 'reach out on email',
    socialHeading: 'find me around the internet',
  },
  sections: {
    experience: {
      title: 'experience',
      note: 'click a row to see details',
    },
    projects: {
      title: 'selected projects',
      note: 'things i have built',
      viewAllLabel: 'view all repositories',
    },
    writing: {
      title: 'writing',
      note: 'need to clear up my drafts :)',
      viewAllLabel: 'view more writings',
    },
    skills: {
      title: 'skills & tools',
      note: 'used at work and in projects',
    },
  },
};

export const githubActivity = {
  username: 'MayankBansal12',
  title: 'github activity',
  description: 'a sketch of recent rhythm',
  profileLabel: 'profile',
  previewLabel: 'activity preview',
};

export const newsletter = {
  eyebrow: '',
  heading: 'join my newsletter',
  description: 'notes on software, products, and whatever i am learning along the way.',
  emailLabel: 'email address',
  placeholder: 'you@example.com',
  buttonLabel: 'subscribe',
  helpText: "you'll finish signing up on substack.",
};

export const experiences: Experience[] = [
  {
    id: 'evol',
    company: 'evol',
    companyUrl: 'https://evoljewels.com',
    role: 'SDE',
    period: "feb '26 - present",
    location: 'hyderabad',
    summary: 'building agentic systems and internal tools.',
    highlights: [
      'building a nest.js and next.js ERP with postgresql and drizzle for core workflows.',
      'developing langgraph workflows for design generation, editing, routing, and fallbacks.',
      'stabilized a raspberry pi and ESP32 vending kiosk for a 50+ user live store launch.',
    ],
    skills: ['nest.js', 'next.js', 'postgresql', 'drizzle', 'langgraph', 'IoT'],
  },
  {
    id: 'echio',
    company: 'echio',
    companyUrl: 'https://echio.in',
    role: 'SDE Intern -> SDE',
    period: "may '24 - nov '25",
    location: 'remote',
    summary:
      'met my first set of mentors here and had a lot of fun working on different things.',
    highlights: [
      'designed an HLS transcoding pipeline with azure queues and docker-based parallel workers.',
      'reduced high-traffic API latency by 50% using redis caching and backend rate limiting.',
      're-architected spring boot services for modularity, reliability, and better error handling.',
      'automated instagram and youtube analytics ingestion with cron jobs and health monitoring.',
      'migrated CI/CD to blacksmith and watchtower, cutting build times by over 50%.',
      'built admin dashboards and internal tooling with react.js and shadcn/ui.',
    ],
    skills: ['java', 'spring boot', 'redis', 'azure', 'docker', 'CI/CD', 'react'],
  },
  {
    id: 'real-dev-squad',
    company: 'real dev squad',
    companyUrl: 'https://realdevsquad.com',
    role: 'SDE (Volunteering)',
    period: "aug '24 - present",
    location: 'remote',
    summary: 'hanging out on nights & weekends, working and making some good friends',
    highlights: [
      'migrated legacy features to ember.js, helping deprecate the old platform.',
      'added unit and integration tests for a new react.js project.',
      'migrated a core service from next.js to tanstack router for better navigation and DX.',
      'built an MCP server that exposes internal APIs as tools for AI agents.',
      'led four developers to revamp a project with GenAI and image-validation features.',
    ],
    skills: ['ember.js', 'react', 'tanstack router', 'typescript', 'MCP', 'GenAI'],
  },
];

export const projects: Project[] = [
  {
    title: 'sketchicon',
    date: "aug '26",
    image: '/projects/sketchicon.png',
    imageAlt: 'Sketchicon hand-drawn React icon library',
    githubLink: 'https://github.com/MayankBansal12/sketchicon',
    liveLink: 'https://sketchicon.com',
    description: ['1,700+ deterministic, customizable hand-drawn SVG icons for React.'],
    featured: true,
  },
  {
    title: 'shift-read',
    date: "jul '26",
    image: '/projects/shift-read.png',
    imageAlt: 'Shift reader homepage with a URL input',
    githubLink: 'https://github.com/MayankBansal12/shift-read',
    liveLink: 'https://shft.page',
    description: [
      'a focused reader that translates any article while preserving its structure and formatting.',
    ],
    featured: true,
  },
  {
    title: 'chess with llm',
    date: "aug '26",
    image: '/projects/chess-with-llm.png',
    imageAlt: 'Chess with LLM model selection screen',
    githubLink: 'https://github.com/MayankBansal12/chess-with-llm',
    liveLink: 'https://chess.mayank.fyi/',
    description: ['a chess arena for playing legal, timed matches against open-weight LLM models.'],
    featured: true,
  },
  {
    title: 'wavmo playground',
    date: "dec '25",
    image: '/projects/wavmo-playground.gif',
    imageAlt: 'Wavmo AI writing workspace and agent chat',
    githubLink: 'https://github.com/MayankBansal12/wavmo-playground',
    liveLink: 'https://docs.mayank.fyi',
    description: [
      'an agentic writing workspace that plans, drafts, reviews, and improves technical documents.',
    ],
    featured: true,
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'what shipping small tools taught me about product work',
    publishedAt: '14-02-2025',
  },
  {
    title: 'learning spring boot by working in production',
    publishedAt: '28-01-2025',
  },
  {
    title: 'docker beyond the commands i memorized',
    publishedAt: '09-01-2025',
  },
];

export const skillGroups = [
  { label: 'languages', skills: ['typescript', 'javascript', 'java', 'go', 'sql'] },
  { label: 'frontend', skills: ['react', 'next.js', 'ember.js', 'tailwind css'] },
  {
    label: 'backend & AI',
    skills: [
      'node.js',
      'bun',
      'nest.js',
      'spring boot',
      'fastify',
      'REST APIs',
      'websockets',
      'langgraph',
      'MCP',
    ],
  },
  { label: 'data', skills: ['postgresql', 'mongodb', 'redis', 'drizzle', 'prisma'] },
  { label: 'infrastructure', skills: ['docker', 'azure', 'CI/CD', 'nginx', 'traefik', 'linux'] },
];

export const socials: Social[] = [
  {
    label: 'github',
    handle: 'mayankbansal12',
    href: links.github,
  },
  {
    label: 'twitter',
    handle: 'simplermayank',
    href: links.twitter,
  },
  {
    label: 'linkedin',
    handle: '--mb2004--',
    href: links.linkedin,
  },
  {
    label: 'substack',
    handle: 'mayank12',
    href: links.substack,
  },
  {
    label: 'leave an anonymous note',
    handle: 'sayout',
    href: links.anonymousNote,
  },
];
