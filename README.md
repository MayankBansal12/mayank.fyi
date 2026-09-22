# mayank bansal portfolio

it is a static site built using next.js and typescript.

## Updating writings

Run `pnpm import:writings` to fetch the Substack RSS feed and update
`src/content/writing/`. For an offline import, run
`pnpm import:writings path/to/feed.xml`. Existing posts are retained when they
drop out of the feed; matching posts are refreshed and the index is sorted newest first.

The **Update writings** GitHub Actions workflow runs daily at 06:23 UTC and can
also be started from the Actions tab with **Run workflow**. It opens or updates
one `chore: update writings from Substack` PR when content changes. Merge that PR
to publish the updates. The workflow must be merged into the default branch for
scheduled runs and the Run workflow button to become available.

In **Settings → Actions → General → Workflow permissions**, enable **Allow
GitHub Actions to create and approve pull requests**. The workflow grants its
`GITHUB_TOKEN` `contents: write` and `pull-requests: write`; no extra secret is needed.

HTTP errors (including Substack/Cloudflare blocking a runner), empty feeds, and
invalid posts fail the import before it writes content. Check the workflow logs
if updates stop arriving. PRs created with `GITHUB_TOKEN` do not trigger other
push/pull-request workflows automatically.
