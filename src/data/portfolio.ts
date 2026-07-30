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
    intro:
      'i build backend systems, developer tools, and useful products while learning how far i can push an idea.',
    currentStatus:
      'currently working on core product development with java, spring boot, bun, docker, and the occasional next.js fix.',
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
  description: 'writes about stuff i learn or find interesting (from an ameteur point of view)',
  emailLabel: 'email address',
  placeholder: 'you@example.com',
  buttonLabel: 'subscribe',
  helpText: "you'll finish signing up on substack.",
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
    featured: true,
  },
  {
    title: 'feedback',
    date: "jul '24 - present",
    githubLink: 'https://github.com/MayankBansal12/Feedback',
    liveLink: 'https://feedback-easy.vercel.app/',
    description: [
      'a developer tool for collecting and managing product feedback through APIs and a focused dashboard.',
    ],
    featured: true,
  },
  {
    title: 'getogether',
    date: "may '24 - jun '24",
    githubLink: 'https://github.com/MayankBansal12/Getogether',
    liveLink: 'https://getogether-ten.vercel.app',
    description: [
      'a hackathon-built platform for organizing events, with work across the frontend and backend.',
    ],
    featured: true,
  },
  {
    title: 'pushnote',
    date: "oct '23 - nov '23",
    githubLink: 'https://github.com/MayankBansal12/pushnote',
    liveLink: 'https://pushnote-mayankbansal12.vercel.app',
    description: [
      'a collaborative project and task manager that won second place in a three-week hackathon.',
    ],
    featured: true,
  },
  {
    title: 'mb docs',
    date: "dec '23",
    githubLink: 'https://github.com/MayankBansal12/MB-Docs',
    liveLink: 'http://mb-docs.vercel.app/',
    description: ['a real-time collaborative document editor for writing together.'],
  },
  {
    title: 'examgpt',
    date: "sep '23",
    githubLink: 'https://github.com/MayankBansal12/Exam-GPT',
    liveLink: 'https://examgpt.vercel.app/',
    description: ['an oral-exam assistant that creates questions from an uploaded PDF.'],
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
  { label: 'backend', skills: ['java', 'spring boot', 'bun', 'node.js', 'express', 'REST APIs'] },
  { label: 'frontend', skills: ['javascript', 'typescript', 'react', 'next.js', 'html', 'css'] },
  { label: 'data', skills: ['postgresql', 'mongodb', 'prisma', 'socket.io'] },
  { label: 'infrastructure', skills: ['docker', 'azure', 'git', 'linux'] },
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
