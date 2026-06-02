# jamesbruning-portfolio

Personal portfolio for **James Bruning, Senior Data Engineer**. Built with [Astro](https://astro.build).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static site to dist/
npm run preview
```

## Deploy

**Netlify (recommended):** connect the repo, or drag the `dist/` folder onto Netlify.
`netlify.toml` already sets the build command + publish dir. Serves from root — no config change needed.

**GitHub Pages:** push to `main`; `.github/workflows/deploy.yml` builds and publishes.
In repo settings, enable **Pages → Source: GitHub Actions**. If this is a **project page**
(`jabrunin001.github.io/jamesbruning-portfolio`), uncomment `base` in `astro.config.mjs`.
For a root user-site, name the repo `jabrunin001.github.io` and leave `base` off.

## Edit content

All copy and metrics live in [`src/data/content.ts`](src/data/content.ts) — the single source of
truth. Components are presentational and import from it. Replace `public/resume.pdf` with your real résumé.
