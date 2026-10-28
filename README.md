# Lyle Daniel: portfolio

An animated one-page portfolio built with Vite, React, TypeScript, Tailwind v4, Motion, GSAP ScrollTrigger, Lenis and React Three Fiber. The design spec is in [docs/spec.md](docs/spec.md).

## Run locally

```bash
npm install
npm run dev
```

## Edit your content

All of the text lives in [src/data/portfolio.ts](src/data/portfolio.ts): profile, email, socials, projects, stack, experience and contact copy. The projects and experience are samples, so replace them with your own.

- **Résumé:** put `resume.pdf` in `public/` and set `resumeUrl: 'resume.pdf'`.
- **Project visuals:** each project picks a coded mockup (`flow`, `terminal`, `dashboard` or `chat`) in [src/components/ProjectVisual.tsx](src/components/ProjectVisual.tsx).

## Deploy

### GitHub Pages
1. Push this folder to a GitHub repo on the `main` branch.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the site with the right base path (`/<repo-name>/`) and publishes it.

### Netlify
Connect the same repo in Netlify. `netlify.toml` already sets the build command and the publish folder, and the site is served from `/`.
