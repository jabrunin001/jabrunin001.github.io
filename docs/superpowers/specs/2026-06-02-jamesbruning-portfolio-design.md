# jamesbruning-portfolio — Design Spec

**Date:** 2026-06-02
**Status:** Approved (design), pending implementation plan
**Author:** James Bruning

## Purpose

A personal portfolio website for **James Bruning, Senior Data Engineer**, aimed at
recruiters and hiring managers. It leads with James as a candidate and features the
`iceberg-lakehouse-lab` project as the standout proof point. Built in Astro, deployable
to GitHub Pages or Netlify.

**Primary goal:** a beautiful, fast, recruiter-ready single-page site James can put on
his résumé/LinkedIn. Dark "developer/data" aesthetic that signals serious data engineer.

## Decisions (locked during brainstorming)

| Decision | Choice |
|----------|--------|
| Audience / purpose | Personal portfolio for recruiters; candidate-focused |
| Visual direction | Modern dark — developer/data (slate + cyan/violet + mono accents) |
| Build approach | Astro (component-based, static output) |
| Hosting | Both GitHub Pages (Actions workflow) and Netlify (`netlify.toml`) |
| Privacy | Include email, LinkedIn, GitHub; **omit phone number** |
| Scope | Public/candidate content only — **exclude** the Netflix-target list and OSS-strategy research |
| Résumé | "Résumé" CTA → `public/resume.pdf` placeholder (James drops in his PDF) |

## Non-Goals (YAGNI)

- No CMS, no blog engine, no backend, no contact form (mailto link only).
- No analytics in v1.
- No Netflix research / OSS roadmap content (private strategy, not published).
- No phone number on the public site.

## Visual Design System

- **Colors:** base `#0B0F19`; alt section `#0E1320`; card `#151B2B`; border `#222B3D`;
  text `#E6EAF2`; muted text `#8A93A6`; primary accent **cyan `#22D3EE`**; secondary
  **violet `#8B5CF6`** (used in gradients/glows).
- **Type:** headings — Geist or Inter (bold, geometric sans); code/labels/metrics —
  JetBrains Mono. Loaded via self-hosted `@fontsource` packages (no external CDN
  blocking render).
- **Motion:** aurora/grid gradient behind hero; scroll-reveal fade-ups via Intersection
  Observer; glow on button/card hover. All motion gated behind
  `@media (prefers-reduced-motion: reduce)`.
- **Layout:** single page, sticky anchored nav, mobile-first responsive, max content
  width ~1100px, generous vertical rhythm.

## Page Structure (single page, anchored nav)

1. **Hero** — name "James Bruning"; role "Senior Data Engineer"; tagline *"I turn legacy
   data chaos into self-serve platforms."*; CTAs: View work · GitHub · Email · Résumé;
   three metric chips: `73→97%` forecast accuracy, `120+` data sources, `35→7 min`
   batch processing. Animated aurora background.
2. **About** — exit-story narrative + superpowers (legacy→modern migrations, governance,
   end-to-end automation, ML forecasting, fast AI-tool prototyping).
3. **Skills** — grouped chips: Languages (Python, SQL, PySpark, Spark SQL) · Data
   Platforms (Azure ADF/SQL Server, Snowflake) · Engineering (Airflow, dbt, Docker,
   Playwright) · BI (Tableau, Power BI, Cognos) · AI (Anthropic API, React).
4. **Experience** — vertical timeline:
   - **Senior Data Engineer — Northwestern University** (2021–Present): university-wide
     data mart (120+ sources, ADF, PySpark 35→7 min), ML forecasting 73→97%, cross-office
     compliance data model, governance program, automation pipelines, AI request tool.
   - **Data Analyst — Northwestern, School of Communication** (2019–2021): $20M grant
     validation pipeline (accuracy→99%), reusable data models (20+ sources), grants DB
     migration + self-service platform.
5. **Featured Project ⭐ — iceberg-lakehouse-lab** — the centerpiece card: one-line pitch;
   stack badges (Apache Iceberg · Spark · dbt · Trino · MinIO · Docker); a styled
   architecture diagram (MinIO ↔ REST catalog ↔ Spark/Trino); the 5 Iceberg capabilities
   (time-travel/rollback, schema evolution, hidden partitioning, compaction, vs-parquet);
   buttons to GitHub repo + blog post.
6. **Impact** — metric cards for quantified wins: 73→97% forecast accuracy; $20M grants
   validated; 31 steps → 1 command; 4–6 hrs → 2 min annual report; 300% fewer ad-hoc
   requests; first formal data-governance program.
7. **Contact / footer** — email (mailto), LinkedIn, GitHub; built-with note.

## Architecture (Astro)

```
jamesbruning-portfolio/
├── astro.config.mjs          # site/base config (GH Pages vs Netlify)
├── package.json
├── netlify.toml              # Netlify build settings
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
├── public/
│   ├── resume.pdf            # placeholder; James replaces
│   └── favicon.svg
├── src/
│   ├── data/content.ts       # ALL content (typed) — single source of truth
│   ├── styles/global.css     # design tokens (CSS custom props) + base styles
│   ├── layouts/Layout.astro  # <head>, fonts, meta/OG tags, slot
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── FeaturedProject.astro
│   │   ├── Impact.astro
│   │   └── Contact.astro
│   ├── scripts/reveal.ts     # Intersection Observer scroll reveals
│   └── pages/index.astro     # composes the components
```

- **Content-driven:** every string/number lives in `src/data/content.ts`; components are
  presentational and import from it. Editing content never requires touching markup.
- **Each component** has one section's responsibility; understandable and styleable in
  isolation.
- **Accessibility:** semantic landmarks (`header`/`nav`/`main`/`section`/`footer`),
  descriptive link text, alt text on the diagram, WCAG-AA contrast, reduced-motion
  support, keyboard-focusable nav.

## Hosting / Deploy

- **GitHub Pages:** `.github/workflows/deploy.yml` runs `npm ci && npm run build` and
  publishes `dist/` via the official Pages actions. `astro.config.mjs` sets
  `site`/`base` for a project page (`/jamesbruning-portfolio/`). Documented in README.
- **Netlify:** `netlify.toml` with `command = "npm run build"`, `publish = "dist"`.
  Netlify serves from root (no base path) — README notes the one config difference.
- Recommend Netlify for a custom domain / no sub-path; GH Pages is the zero-extra-service
  option.

## Testing / Verification

- `npm run build` succeeds with no errors.
- `npm run preview` renders all sections; nav anchors scroll correctly.
- Manual checks: responsive at 375px / 768px / 1280px; reduced-motion disables animation;
  Lighthouse pass (performance + a11y) as a quality gate.

## Content Source

All copy/metrics come from James's CV (`~/CareerOps/career-ops/cv.md`) and profile
(`config/profile.yml`). Project details come from `~/Projects/iceberg-lakehouse-lab`.

**Confirmed links:**
- GitHub: https://github.com/jabrunin001
- LinkedIn: https://www.linkedin.com/in/jtb96/
- Email: jimtbruning@gmail.com
- Featured project repo: https://github.com/jabrunin001/iceberg-lakehouse-lab

## Location

New repo at `~/Projects/jamesbruning-portfolio`, destined for James's public GitHub.
