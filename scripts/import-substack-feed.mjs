import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const feedPath = process.argv[2];
const feedUrl = 'https://mayank12.substack.com/feed.xml';
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
    timeZone: 'UTC',
  })
    .format(date)
    .replaceAll('/', '-');

const fetchFeed = async () => {
  const strategies = [
    { name: 'direct', headers: {} },
    {
      name: 'crawler User-Agent',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      },
    },
  ];
  const errors = [];
  for (const { name, headers } of strategies) {
    try {
      const response = await fetch(feedUrl, { headers, signal: AbortSignal.timeout(60_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const xml = await response.text();
      if (
        !/^\s*(?:<\?xml\s[^?]*\?>\s*)?<rss\b[^>]*>\s*<channel\b[^>]*>[\s\S]*<\/channel>\s*<\/rss>\s*$/i.test(
          xml,
        ) ||
        !/<item>[\s\S]*?<\/item>/i.test(xml)
      ) {
        throw new Error('Response is not a non-empty RSS feed');
      }
      console.log(`Fetched Substack RSS using ${name}`);
      return xml;
    } catch (error) {
      errors.push(`${name}: ${error.message}`);
      console.warn(`Substack fetch failed (${name}): ${error.message}`);
    }
  }
  throw new Error(`Failed to fetch ${feedUrl}: ${errors.join('; ')}`);
};

// An explicit local file remains useful for offline imports and testing.
const feed = feedPath ? readFileSync(feedPath, 'utf8') : await fetchFeed();
const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => match[1]);

if (items.length === 0) {
  throw new Error(`No RSS items found in ${feedPath || feedUrl}`);
}

const importedPosts = items.map((item) => {
  const title = getTag(item, 'title');
  const description = getTag(item, 'description');
  const sourceUrl = getTag(item, 'link');
  const contentHtml = getTag(item, 'content:encoded');
  const publishedDate = new Date(getTag(item, 'pubDate'));
  const slug = getSlug(sourceUrl, title);

  if (
    !title ||
    !slug ||
    !sourceUrl.startsWith('https://mayank12.substack.com/p/') ||
    !contentHtml ||
    Number.isNaN(publishedDate.getTime())
  ) {
    throw new Error(`Invalid RSS item: ${title || '(missing title)'}`);
  }

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

if (new Set(importedPosts.map((post) => post.slug)).size !== importedPosts.length) {
  throw new Error('Duplicate post slugs in RSS feed');
}

// RSS feeds are rolling windows. Keep archived posts that are no longer in the feed.
// Validate and parse everything before writing any output.
const postsBySlug = new Map();
if (existsSync(postsDir)) {
  for (const file of readdirSync(postsDir).filter((file) => file.endsWith('.json'))) {
    const post = JSON.parse(readFileSync(join(postsDir, file), 'utf8'));
    postsBySlug.set(post.slug, post);
  }
}
for (const post of importedPosts) postsBySlug.set(post.slug, post);
const posts = [...postsBySlug.values()].sort(
  (a, b) => b.publishedAtISO.localeCompare(a.publishedAtISO) || a.slug.localeCompare(b.slug),
);
const index = posts.map(({ contentHtml: _contentHtml, ...post }) => post);

mkdirSync(postsDir, { recursive: true });
writeFileSync(join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);

for (const post of posts) {
  writeFileSync(join(postsDir, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`);
}

console.log(`Imported ${posts.length} writing posts into ${basename(outputDir)}/`);
