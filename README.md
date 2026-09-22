# mayank bansal portfolio

it is a static site built using next.js and typescript.

## Updating writings

Run `pnpm import:writings` to fetch the Substack RSS feed and update
`src/content/writing/`. For an offline import, run
`pnpm import:writings path/to/feed.xml`. Existing posts are retained when they
drop out of the feed; matching posts are refreshed and the index is sorted newest first.

The **Update writings** GitHub Actions workflow runs weekly (Mondays at 06:23 UTC) and can
also be started from the Actions tab with **Run workflow**. It opens or updates
one `chore: update writings from Substack` PR when content changes. Merge that PR
to publish the updates. The workflow must be merged into the default branch for
scheduled runs and the Run workflow button to become available.

In **Settings → Actions → General → Workflow permissions**, enable **Allow
GitHub Actions to create and approve pull requests**. The workflow grants its
`GITHUB_TOKEN` `contents: write` and `pull-requests: write`; no extra secret is needed.

The importer first requests the feed directly, then retries with a Bing crawler
User-Agent if the request fails or returns something other than non-empty RSS XML.
This header currently allows the feed through Substack's Cloudflare protection
without a proxy, dependency, or API key. Cloudflare rules can change; each request
has a 60-second timeout, and the logs identify which strategy succeeded or failed.

If both fetch strategies fail, or posts are invalid, the import fails before it
writes content. Check the workflow logs if updates stop arriving.
PRs created with `GITHUB_TOKEN` do not trigger other
push/pull-request workflows automatically.
