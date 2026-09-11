# Maintenance notes

Operational notes for arunbodd.bio. Not a setup guide for reuse — see the
license note in [README.md](README.md).

## Local development

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build
npm test         # config/unit tests
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
pushes to the `gh-pages` branch. GitHub Pages serves that at the apex domain
via `public/CNAME`.

The old `arunbodd.github.io/Portfolio` URL 301-redirects to `arunbodd.bio`.

## Configuration

Runtime config lives in `src/config.js`, read from `REACT_APP_*` vars:

| Variable | Purpose |
|---|---|
| `REACT_APP_EMAILJS_SERVICE_ID` | Contact form |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Contact form |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Contact form |
| `REACT_APP_CALENDLY_URL` | Booking link (has a hardcoded fallback) |
| `REACT_APP_GA_ID` | Google Analytics 4 (has a hardcoded fallback) |

Locally these come from `.env` (gitignored). In CI they come from the
**`emailJS`** GitHub environment's secrets — note the deploy job must declare
`environment: emailJS`, otherwise the secrets resolve to empty strings and the
contact form silently falls back to `mailto:`.

Without EmailJS keys the form degrades gracefully to opening the visitor's
mail app, so a missing key is never a hard failure — which also means it can
break quietly. Check that the built bundle contains the service ID if the form
seems to have reverted to mailto.

## Refreshing citation counts

```bash
npm run update-citations
```

Rewrites `public/data/scholar.json` (totals, h-index, and per-paper counts)
from the Google Scholar profile. Commit and push to deploy.

**Run this locally.** The monthly `update-citations.yml` workflow attempts the
same thing, but Google Scholar blocks datacenter IPs and returns HTTP 403 to
GitHub Actions runners. The script exits 0 on failure (a stale cached value is
still valid data and shouldn't fail the build), so a blocked run previously
looked identical to a successful no-op — it went unnoticed for 46 days. It now
emits a warning annotation and a job summary when it skips.

Per-paper counts are matched to the curated list in `src/pages/Publications.js`
by title, tolerant of small differences. Papers absent from the Scholar profile
keep their curated fallback counts, so a few entries there don't auto-update.

## Contact form email templates

EmailJS is configured with two linked templates. The form sends exactly three
variables: `from_name`, `reply_to`, `message` — templates must use those names.

- **Contact Us** — the message to you. `To Email` is your address; `Reply To`
  must be `{{reply_to}}` so replying reaches the sender.
- **Auto-Reply** — the acknowledgement to the visitor. `To Email` must be
  `{{reply_to}}`; `Reply To` should be your address.

The link lives on **Contact Us → Auto-Reply tab**, pointing at the Auto-Reply
template (not the reverse). Auto-reply consumes an extra request, so each
submission costs 2 of the free tier's 200/month.

## Writing

Articles are Markdown files fetched at runtime and rendered with
`react-markdown` + `remark-gfm` (footnotes). Three places to touch for a new
post:

1. **Body** — `public/content/writing/<slug>.md`. Body only: no title or
   byline (those render from metadata). Conventions the renderer relies on:
   `## PART ...` / `### ...` headings; the TL;DR as a blockquote whose first
   line is `> **TL;DR** — ...`; citations as GFM footnotes `[^n]` with
   `[^n]: source, https://...` definitions at the end (the renderer labels
   that section "References" and numbers by first appearance); figures as
   `![caption](/content/writing/img/<file>.png)` on their own line. No HTML.
2. **Metadata** — `src/pages/writing/posts.js`. Series issues go in `posts`
   (ordered; drives prev/next), standalone pieces in `briefs`, links out in
   `external`. `readingMinutes` is words ÷ 230.
3. **Sitemap** — add the `/writing/<slug>` URL to `public/sitemap.xml`.

Figures were pulled from the source PDFs with PyMuPDF (`page.get_images()`,
skipping anything under 400×200 px) into `public/content/writing/img/`. Keep
web-size copies only; the jobs-report pages are rendered at 1800 px wide.

Do not put static assets in a directory that shares a name with a route
(e.g. `public/writing/`): GitHub Pages will 301 the route to a trailing slash
before the SPA fallback runs.
