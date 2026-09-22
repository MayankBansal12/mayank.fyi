import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const script = new URL('../import-substack-feed.mjs', import.meta.url);
const item = (slug, date, title = slug) => `<item>
  <title><![CDATA[${title}]]></title>
  <description>A &amp; B</description>
  <link>https://mayank12.substack.com/p/${slug}</link>
  <pubDate>${date}</pubDate>
  <content:encoded><![CDATA[<p>Post content</p>]]></content:encoded>
</item>`;

test('imports, updates, retains archives, and rejects bad feeds without changing output', (t) => {
  const cwd = mkdtempSync(join(tmpdir(), 'writing-import-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const run = (xml) => {
    writeFileSync(join(cwd, 'feed.xml'), `<rss><channel>${xml}</channel></rss>`);
    return spawnSync(process.execPath, [script.pathname, 'feed.xml'], {
      cwd,
      env: { ...process.env, TZ: 'America/Los_Angeles' },
      encoding: 'utf8',
    });
  };
  const indexPath = join(cwd, 'src/content/writing/index.json');
  const postsPath = join(cwd, 'src/content/writing/posts');
  const snapshot = () => [
    readFileSync(indexPath, 'utf8'),
    ...readdirSync(postsPath)
      .sort()
      .map((file) => readFileSync(join(postsPath, file), 'utf8')),
  ];

  assert.equal(run(item('old', '2025-01-01T01:00:00Z')).status, 0);
  const feed =
    item('new', '2026-01-01T01:00:00Z') + item('old', '2025-01-01T01:00:00Z', 'Updated title');
  assert.equal(run(feed).status, 0);
  const index = JSON.parse(readFileSync(indexPath, 'utf8'));
  assert.deepEqual(
    index.map((post) => post.slug),
    ['new', 'old'],
  );
  assert.equal(index[0].publishedAt, '01-01-2026');
  assert.equal(index[0].description, 'A & B');
  assert.equal(index[1].title, 'Updated title');
  assert.equal(index[0].contentHtml, undefined);
  assert.equal(
    JSON.parse(readFileSync(join(postsPath, 'new.json'), 'utf8')).contentHtml,
    '<p>Post content</p>',
  );

  const before = snapshot();
  assert.equal(run(feed).status, 0);
  assert.deepEqual(snapshot(), before, 'identical feed produces no changes');
  assert.equal(run(item('new', '2026-01-01T01:00:00Z')).status, 0);
  assert.deepEqual(snapshot(), before, 'older posts survive rolling feed truncation');

  for (const invalid of [
    '',
    '<html>Blocked</html>',
    item('bad', 'invalid'),
    item('bad', '2026-01-01') + item('bad', '2026-01-01'),
    item('bad', '2026-01-01').replace('<p>Post content</p>', ''),
  ]) {
    assert.notEqual(run(invalid).status, 0);
    assert.deepEqual(snapshot(), before, 'bad input leaves content untouched');
  }

  // Exercise HTTP failure without depending on Substack or external network access.
  const mock = join(cwd, 'mock-fetch.mjs');
  writeFileSync(mock, 'globalThis.fetch = async () => ({ ok: false, status: 403 });');
  const failure = spawnSync(process.execPath, ['--import', mock, script.pathname], {
    cwd,
    encoding: 'utf8',
  });
  assert.notEqual(failure.status, 0);
  assert.match(failure.stderr, /HTTP 403/);
  assert.deepEqual(snapshot(), before);

  writeFileSync(
    mock,
    `import assert from 'node:assert/strict';
    let calls = 0;
    process.on('exit', () => assert.equal(calls, 1));
    globalThis.fetch = async (url) => {
    calls++;
    if (url !== 'https://mayank12.substack.com/feed.xml') throw new Error('Unexpected URL');
    return { ok: true, text: async () => ${JSON.stringify(`<rss><channel>${feed}</channel></rss>`)} };
  };`,
  );
  const success = spawnSync(process.execPath, ['--import', mock, script.pathname], {
    cwd,
    encoding: 'utf8',
  });
  assert.equal(success.status, 0, success.stderr);
  assert.deepEqual(snapshot(), before);

  for (const firstResponse of [
    'return { ok: false, status: 403 };',
    "throw new TypeError('Network failure');",
    "throw new DOMException('Request timed out', 'TimeoutError');",
    "return { ok: true, text: async () => { throw new Error('Body read failed'); } };",
    ...[
      '<html>Just a moment...</html>',
      `<html><rss><channel>${feed}</channel></rss></html>`,
      `<rss><channel>${feed}`,
      '<rss><channel></channel></rss>',
    ].map((body) => `return { ok: true, text: async () => ${JSON.stringify(body)} };`),
  ]) {
    writeFileSync(
      mock,
      `import assert from 'node:assert/strict';
      let calls = 0;
      const signals = new Set();
      process.on('exit', () => assert.equal(calls, 2));
      globalThis.fetch = async (url, options) => {
        assert.equal(url, 'https://mayank12.substack.com/feed.xml');
        assert.ok(options.signal instanceof AbortSignal);
        assert.ok(!signals.has(options.signal));
        signals.add(options.signal);
        calls++;
        if (calls === 1) {
          assert.deepEqual(options.headers, {});
          ${firstResponse}
        }
        assert.equal(options.headers['User-Agent'],
          'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)');
        return { ok: true, text: async () => ${JSON.stringify(`<?xml version="1.0"?><rss version="2.0"><channel>${feed}</channel></rss>`)} };
      };`,
    );
    const fallback = spawnSync(process.execPath, ['--import', mock, script.pathname], {
      cwd,
      encoding: 'utf8',
    });
    assert.equal(fallback.status, 0, fallback.stderr);
    assert.match(fallback.stdout, /Fetched Substack RSS using crawler User-Agent/);
    assert.deepEqual(snapshot(), before);
  }

  writeFileSync(
    mock,
    `let calls = 0;
    globalThis.fetch = async () => {
      if (++calls === 1) return { ok: false, status: 403 };
      return { ok: true, text: async () => '<html>Just a moment...</html>' };
    };`,
  );
  const invalidFallback = spawnSync(process.execPath, ['--import', mock, script.pathname], {
    cwd,
    encoding: 'utf8',
  });
  assert.notEqual(invalidFallback.status, 0);
  assert.match(invalidFallback.stderr, /direct: HTTP 403; crawler User-Agent: Response is not/);
  assert.deepEqual(snapshot(), before, 'failed fallback leaves content untouched');
});
