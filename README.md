# Arun Boddapati's Portfolio

Personal portfolio of **Arun Boddapati**, AI / ML Data Science Lead in translational bioinformatics. An immersive single-page experience built with React, Three.js, and GSAP.

**Live:** https://arunbodd.bio

## Highlights

- Interactive Three.js neural-network hero (with a graceful fallback when WebGL is unavailable)
- Smooth scroll + GSAP scroll animations, light/dark themes
- Scrollytelling career timeline, research-index publications, bento skills grid
- Contact form (EmailJS) + Calendly scheduling
- Google Scholar citation counts pulled from a cached `public/data/scholar.json`

## Tech

React · styled-components · Three.js · GSAP · Lenis · react-router · GitHub Pages · GitHub Actions

## Running locally

```bash
git clone https://github.com/arunbodd/Portfolio.git
cd Portfolio
npm install
npm start        # http://localhost:3000
npm run build    # production build
```

Contact-form (EmailJS) and Calendly settings are read from a local `.env` (see `src/config.js`); without them the contact form falls back to opening your mail app. In CI the EmailJS keys come from the `emailJS` environment's secrets.

## Refreshing citation counts

```bash
npm run update-citations
```

This rewrites `public/data/scholar.json` (totals, h-index, and per-paper counts) from the Google Scholar profile. Commit and push the result to deploy it.

A monthly GitHub Action tries the same thing, but Google Scholar blocks datacenter IPs and usually returns 403 to the runner — so treat the local command as the real refresh path. A skipped CI run surfaces a warning annotation and job summary rather than passing silently.

## License

© Arun Boddapati. All rights reserved.

This is a personal portfolio: its content, copy, and design are **not** offered as a template or licensed for reuse. Third-party libraries remain under their own licenses.
