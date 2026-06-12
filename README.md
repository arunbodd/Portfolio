# Arun Boddapati — Portfolio

Personal portfolio of **Arun Boddapati**, AI / ML Data Science Lead in translational bioinformatics. An immersive single-page experience built with React, Three.js, and GSAP.

**Live:** https://arunbodd.github.io/Portfolio

## Highlights

- Interactive Three.js neural-network hero (with a graceful fallback when WebGL is unavailable)
- Smooth scroll + GSAP scroll animations, light/dark themes
- Scrollytelling career timeline, research-index publications, bento skills grid
- Contact form (EmailJS) + Calendly scheduling
- Auto-updating Google Scholar citation count via a monthly GitHub Action

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

Contact-form (EmailJS) and Calendly settings are read from a local `.env` (see `src/config.js`); without them the contact form falls back to opening your mail app.

## License

© Arun Boddapati. All rights reserved.

This is a personal portfolio — its content, copy, and design are **not** offered as a template or licensed for reuse. Third-party libraries remain under their own licenses.
