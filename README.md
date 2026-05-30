# Where Do I Start? — Anime Recommendation Site

## Overview

"Where Do I Start?" is a scroll-driven anime recommendation site built for complete beginners to anime. It organises 60 hand-picked shows across six genre categories — Action, Romance, Isekai, Psychological, Comedy, and Slice of Life — in a cinematic, visually immersive experience. Users scroll through each genre section, hover over posters to preview show details, and leave with a clear idea of where to begin their anime journey.

**Live site:** [iamtakura.github.io/Anime_Rec](https://iamtakura.github.io/Anime_Rec)

---

## Purpose

This project was built primarily as a learning exercise. The goal was to get hands-on experience with three tools I had not worked with before — **Astro**, **Lenis**, and **GSAP ScrollTrigger** — by building something real and purposeful rather than following a tutorial.

Every decision in this project was driven by what would best demonstrate and stress-test those three tools together. The content, layout, and interactions were all chosen specifically because they would force a deep understanding of scroll-driven design.

---

## What I Learned

### Astro
My first project using Astro. Key takeaways were understanding the islands architecture, how Astro handles static site generation, the `<Image />` component and `import.meta.glob` for optimised image pipelines, and how to safely initialise client-side JavaScript libraries in an SSR-aware framework.

### Lenis
The core focus of the project. I learned how Lenis normalises scroll behaviour across browsers, how to sync it with GSAP's ticker for frame-perfect animation, and most importantly how to use scroll velocity as a live design input — driving the `skewY` text effect that reacts physically to how fast the user scrolls.

### GSAP + ScrollTrigger
Used throughout for staggered card entry animations, section background transitions, hero parallax, and the genre progress navigation. The critical skill here was learning the correct pattern for syncing ScrollTrigger with Lenis so both systems work together without conflicts.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro (static output) |
| Scroll | Lenis |
| Animations | GSAP + ScrollTrigger |
| Styling | Vanilla CSS with CSS custom properties |
| Data | Hardcoded JSON |
| Deployment | GitHub Pages via GitHub Actions |

---

## Features

- Smooth Lenis scrolling synced to GSAP ticker
- Scroll velocity-driven `skewY` effect on genre headings
- ScrollTrigger staggered anime card entry animations
- Hero parallax depth effect
- Per-genre color theming that transitions on scroll
- Fixed preview panel with hover-triggered poster and description swap
- Cinematic page intro sequence
- Custom lerp-based cursor with genre-aware color
- Fixed genre progress navigation sidebar
- Fully responsive with mobile tap-to-expand cards
- `prefers-reduced-motion` support
- Astro image optimisation pipeline — all 60 posters converted to `.webp`

---

## Data

All anime data is stored in `/src/data/anime-data.json`. Each entry includes title, year, episode count, studio, rating, description, and image filename. Data was manually curated — no external API is used, which keeps the site fast, stable, and dependency-free.

---

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`

---

## Deployment

Deployed to GitHub Pages via GitHub Actions. On every push to `master` the workflow builds the Astro project and deploys the `dist/` folder automatically.

---

## Acknowledgements

Built as a personal learning project. Anime selections and descriptions are original curation. All poster images are sourced for personal/educational use.
