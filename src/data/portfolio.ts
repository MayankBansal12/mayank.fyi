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
  githubLink?: string;
  liveLink?: string;
  description: string[];
  skills: string[];
  featured?: boolean;
  seed: number;
};

export type BlogPost = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  readingTime: string;
  href?: string;
};

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const profile = {
  name: 'mayank bansal',
  role: 'backend developer & software engineer',
  intro:
    'i build backend systems, developer tools, and useful products while learning how far i can push an idea.',
  now: 'currently working on core product development with java, spring boot, bun, docker, and the occasional next.js fix.',
  email: 'mailto:mayankbansal125@gmail.com',
  calendar: 'https://cal.com/mayankbansal',
  substack: 'https://mayank12.substack.com/subscribe',
};

export const experiences: Experience[] = [
  {
    id: 'echio',
    company: 'echio',
    companyUrl: 'https://echio.in',
    role: 'backend developer',
    period: "jan '24 - present",
    location: 'remote',
    summary: 'building and operating the backend behind an early-stage product.',
    highlights: [
      'developing core product APIs with java and spring boot, plus website services with bun.',
      'built an azure function for media optimization using blob triggers and node.js.',
      'manage docker deployments and occasionally fix issues in the next.js frontend.',
    ],
    skills: ['java', 'spring boot', 'bun', 'node.js', 'azure', 'docker', 'next.js'],
  },
  {
    id: 'teaching-assistant',
    company: 'java & dsa program',
    role: 'teaching assistant intern',
    period: 'during second year',
    summary: 'helped other students learn java, data structures, and problem solving.',
    highlights: [
      'supported students while strengthening my own computer science fundamentals.',
      'used the experience to become more confident communicating technical ideas clearly.',
    ],
    skills: ['java', 'data structures', 'algorithms', 'mentoring'],
  },
];

export const projects: Project[] = [
  {
    title: 'browserpop',
    date: "dec '24",
    githubLink: 'https://github.com/MayankBansal12/browser-pop-main',
    liveLink: 'https://browserpop.vercel.app/',
    description: [
      'a browser extension for blocking distracting sites, planning focus hours, and managing browser activity.',
    ],
    skills: ['html', 'css', 'javascript', 'browser APIs'],
    featured: true,
    seed: 201,
  },
  {
    title: 'feedback',
    date: "jul '24 - present",
    githubLink: 'https://github.com/MayankBansal12/Feedback',
    liveLink: 'https://feedback-easy.vercel.app/',
    description: [
      'a developer tool for collecting and managing product feedback through APIs and a focused dashboard.',
    ],
    skills: ['typescript', 'APIs', 'documentation', 'product engineering'],
    featured: true,
    seed: 202,
  },
  {
    title: 'getogether',
    date: "may '24 - jun '24",
    githubLink: 'https://github.com/MayankBansal12/Getogether',
    liveLink: 'https://getogether-ten.vercel.app',
    description: [
      'a hackathon-built platform for organizing events, with work across the frontend and backend.',
    ],
    skills: ['react', 'express', 'postgresql', 'prisma'],
    featured: true,
    seed: 203,
  },
  {
    title: 'pushnote',
    date: "oct '23 - nov '23",
    githubLink: 'https://github.com/MayankBansal12/pushnote',
    liveLink: 'https://pushnote-mayankbansal12.vercel.app',
    description: [
      'a collaborative project and task manager that won second place in a three-week hackathon.',
    ],
    skills: ['react', 'express', 'REST APIs', 'team project'],
    featured: true,
    seed: 204,
  },
  {
    title: 'mb docs',
    date: "dec '23",
    githubLink: 'https://github.com/MayankBansal12/MB-Docs',
    liveLink: 'http://mb-docs.vercel.app/',
    description: ['a real-time collaborative document editor for writing together.'],
    skills: ['react', 'socket.io', 'mongodb', 'quill'],
    seed: 205,
  },
  {
    title: 'examgpt',
    date: "sep '23",
    githubLink: 'https://github.com/MayankBansal12/Exam-GPT',
    liveLink: 'https://examgpt.vercel.app/',
    description: ['an oral-exam assistant that creates questions from an uploaded PDF.'],
    skills: ['react', 'express', 'openAI', 'pdf.js', 'speech APIs'],
    seed: 206,
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'what shipping small tools taught me about product work',
    publishedAt: 'draft',
    summary: 'notes on narrowing an idea, finding the useful core, and resisting feature creep.',
    tags: ['building', 'product'],
    readingTime: '5 min read',
  },
  {
    title: 'learning spring boot by working in production',
    publishedAt: 'draft',
    summary:
      'the practical lessons that only appeared after APIs met users, logs, and deployments.',
    tags: ['java', 'backend'],
    readingTime: '7 min read',
  },
  {
    title: 'docker beyond the commands i memorized',
    publishedAt: 'draft',
    summary:
      'a working mental model for images, containers, networking, and repeatable deployments.',
    tags: ['docker', 'learning'],
    readingTime: '6 min read',
  },
];

export const skillGroups = [
  { label: 'backend', skills: ['java', 'spring boot', 'bun', 'node.js', 'express', 'REST APIs'] },
  { label: 'frontend', skills: ['javascript', 'typescript', 'react', 'next.js', 'html', 'css'] },
  { label: 'data', skills: ['postgresql', 'mongodb', 'prisma', 'socket.io'] },
  { label: 'infrastructure', skills: ['docker', 'azure', 'git', 'linux'] },
];

export const socials: Social[] = [
  {
    label: 'github',
    handle: 'mayankbansal12',
    href: 'https://github.com/MayankBansal12',
  },
  {
    label: 'twitter',
    handle: 'simplermayank',
    href: 'https://x.com/SimplerMayank',
  },
  {
    label: 'linkedin',
    handle: '--mb2004--',
    href: 'https://www.linkedin.com/in/mayank-bansal200604012/',
  },
  {
    label: 'substack',
    handle: 'mayank12',
    href: 'https://mayank12.substack.com/',
  },
  {
    label: 'anonymous note',
    handle: 'sayout',
    href: 'https://mayank.sayout.net/',
  },
];
