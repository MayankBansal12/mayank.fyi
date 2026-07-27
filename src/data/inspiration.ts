export type Inspiration = {
  name: string;
  href: string;
  /** short optional note — who they are / why they stuck with you */
  note?: string;
};

/**
 * people who have inspired me in some way.
 * edit this list freely — names are rendered as underlined links that open in a new tab.
 */
export const inspiration: Inspiration[] = [
  {
    name: 'pieter levels',
    href: 'https://levels.io',
    note: 'indie hacker, ships in public',
  },
  {
    name: 'farza',
    href: 'https://farza.com',
    note: 'builder energy, content that sticks',
  },
  {
    name: 'paul graham',
    href: 'https://paulgraham.com',
    note: 'essays that rewire how you think',
  },
  {
    name: 'derek sivers',
    href: 'https://sive.rs',
    note: 'short writing, long aftertaste',
  },
  {
    name: 'tibo',
    href: 'https://x.com/tibo_maker',
    note: 'indie maker, always shipping',
  },
  {
    name: 'marc lou',
    href: 'https://marclou.com',
    note: 'ship fast, learn in public',
  },
  {
    name: 'dan abramov',
    href: 'https://overreacted.io',
    note: 'deep, patient engineering writing',
  },
  {
    name: 'steve jobs',
    href: 'https://en.wikipedia.org/wiki/Steve_Jobs',
    note: 'taste, focus, and the long game',
  },
  {
    name: 'linus torvalds',
    href: 'https://github.com/torvalds',
    note: 'build the tool, trust the craft',
  },
  {
    name: 'casey neistat',
    href: 'https://www.youtube.com/@CaseyNeistat',
    note: 'just start, film the process',
  },
];
