import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const feedPath = 'feed.xml';
const outputDir = join('src', 'content', 'writing');
const postsDir = join(outputDir, 'posts');

const decodeEntities = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#8217;', "'")
    .replaceAll('&#8220;', '"')
    .replaceAll('&#8221;', '"')
    .replaceAll('&#8211;', '-')
    .replaceAll('&#8212;', '-')
    .replaceAll('&#8594;', '->')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));

const stripCdata = (value) => {
  const trimmed = value.trim();
  if (trimmed.startsWith('<![CDATA[') && trimmed.endsWith(']]>')) {
    return trimmed.slice(9, -3);
  }
  return decodeEntities(trimmed);
};

const getTag = (item, tagName) => {
  const escaped = tagName.replace(':', '\\:');
  const match = item.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return match ? stripCdata(match[1]) : '';
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSlug = (sourceUrl, title) => {
  try {
    const url = new URL(sourceUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const substackSlug = parts[0] === 'p' ? parts[1] : parts.at(-1);
    return slugify(substackSlug || title);
  } catch {
    return slugify(title);
  }
};

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replaceAll('/', '-');

const feed = readFileSync(feedPath, 'utf8');
const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);

if (items.length === 0) {
  throw new Error(`No RSS items found in ${feedPath}`);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(postsDir, { recursive: true });

const posts = items.map((item) => {
  const title = getTag(item, 'title');
  const description = getTag(item, 'description');
  const sourceUrl = getTag(item, 'link');
  const contentHtml = getTag(item, 'content:encoded');
  const publishedDate = new Date(getTag(item, 'pubDate'));
  const slug = getSlug(sourceUrl, title);

  return {
    slug,
    title,
    description,
    publishedAt: formatDate(publishedDate),
    publishedAtISO: publishedDate.toISOString(),
    sourceUrl,
    contentHtml,
  };
});

const index = posts.map(({ contentHtml: _contentHtml, ...post }) => post);

writeFileSync(join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);

for (const post of posts) {
  writeFileSync(join(postsDir, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`);
}

console.log(`Imported ${posts.length} writing posts into ${basename(outputDir)}/`);
