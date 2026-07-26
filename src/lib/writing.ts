import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type WritingIndexItem = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedAtISO: string;
  sourceUrl: string;
};

export type WritingPost = WritingIndexItem & {
  contentHtml: string;
};

const writingDir = join(process.cwd(), 'src', 'content', 'writing');
const postsDir = join(writingDir, 'posts');

export function getAllWritings(): WritingIndexItem[] {
  const indexPath = join(writingDir, 'index.json');
  const content = readFileSync(indexPath, 'utf8');
  return JSON.parse(content) as WritingIndexItem[];
}

export function getWritingBySlug(slug: string): WritingPost | null {
  const postPath = join(postsDir, `${slug}.json`);

  if (!existsSync(postPath)) {
    return null;
  }

  const content = readFileSync(postPath, 'utf8');
  return JSON.parse(content) as WritingPost;
}

export function getWritingSlugs(): string[] {
  return readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => fileName.replace(/\.json$/, ''));
}
