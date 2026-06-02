# Stripe-Style Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Astro portfolio as a light, Stripe-style SaaS product page (navy/blurple, skewed multicolor gradient, structured sections) replacing the dark "AI-slop" version.

**Architecture:** Same content-driven Astro setup. All copy in `content.ts`; presentational components per section. Replace `global.css` with light Stripe tokens; swap the component set; remove dark-era components.

**Tech Stack:** Astro 5, TypeScript, Inter (+ JetBrains Mono for the one code snippet), vanilla CSS, inline SVG icons.

---

## Conventions
- Verification = `npm run build` (must pass) + `npm run preview` + headless screenshots. No unit tests for visual components.
- Commit after each task (conventional commits).
- Never hardcode copy in components — import from `src/data/content.ts`.
- When shooting "mobile" headless screenshots, use ≥500px width (Chrome macOS clamps min window ~500px).

## File Structure
| File | Responsibility |
|------|----------------|
| `src/styles/global.css` | Light Stripe tokens + base + buttons + eyebrow + card + reveal |
| `src/data/content.ts` | All content: profile(+headline), stack, valueProps, terminalSnippet, experience, education, project, stats |
| `src/layouts/Layout.astro` | Light theme `<head>`, fonts, meta/OG |
| `src/components/Icon.astro` | Inline SVG icons (layers/zap/trending-up/github/external/mail) |
| `src/components/Nav.astro` | Sticky translucent nav + blurple CTA |
| `src/components/Hero.astro` | Gradient band (clip-path) + headline + CTAs + terminal card |
| `src/components/StackStrip.astro` | "Working across" tool row |
| `src/components/ValueProps.astro` | 3-pillar "What I build" |
| `src/components/FeaturedProject.astro` | iceberg-lakehouse-lab showcase + CSS diagram |
| `src/components/Experience.astro` | Two-column experience rows + education |
| `src/components/Stats.astro` | Dark navy "by the numbers" band |
| `src/components/Contact.astro` | Gradient closing CTA |
| `src/components/Footer.astro` | Clean footer |
| `src/pages/index.astro` | Compose |
| (delete) `About.astro`, `Skills.astro`, `Impact.astro` | Superseded |

---

### Task 1: Light Stripe design tokens + base styles

**Files:** Modify `src/styles/global.css` (replace entire file)

- [ ] **Step 1: Replace `src/styles/global.css`**

```css
:root {
  /* Stripe-style palette */
  --navy: #0a2540;     /* headings */
  --slate: #425466;    /* body */
  --muted: #697386;    /* labels */
  --accent: #635bff;   /* blurple */
  --accent-hover: #7a73ff;
  --bg: #ffffff;
  --bg-alt: #f6f9fc;   /* pale blue */
  --border: #e3e8ee;
  --radius: 14px;
  --maxw: 1080px;
  --shadow: 0 2px 5px rgba(60,66,87,.08), 0 1px 1px rgba(0,0,0,.06);
  --shadow-lg: 0 15px 35px rgba(60,66,87,.10), 0 5px 15px rgba(0,0,0,.07);
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
html, body { overflow-x: hidden; max-width: 100%; }
body {
  background: var(--bg); color: var(--slate);
  font-family: var(--font-sans); line-height: 1.6;
  font-size: 17px; -webkit-font-smoothing: antialiased;
}
img, svg, pre { max-width: 100%; }
a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-hover); }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }

.container { max-width: var(--maxw); margin: 0 auto; padding: 0 1.5rem; }
section { padding: 6rem 0; }

.eyebrow {
  font-size: .8rem; font-weight: 600; letter-spacing: .08em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 1rem;
}
.section-title {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 700;
  letter-spacing: -0.02em; color: var(--navy); line-height: 1.15;
}
.lead { font-size: 1.15rem; color: var(--slate); max-width: 60ch; }

/* buttons */
.btn { display: inline-flex; align-items: center; gap: .5rem;
  padding: .7rem 1.3rem; border-radius: 999px; font-size: .98rem; font-weight: 600;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
.btn-primary { background: var(--accent); color: #fff; box-shadow: var(--shadow); }
.btn-primary:hover { background: var(--accent-hover); color: #fff; transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.btn-secondary { background: #fff; color: var(--navy); border: 1px solid var(--border); }
.btn-secondary:hover { color: var(--navy); border-color: #cdd5df; transform: translateY(-1px); }

.card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); }
.tnum { font-variant-numeric: tabular-nums; }

/* scroll reveal */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .hero-gradient { animation: none !important; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css && git commit -m "feat: light Stripe design tokens"
```

---

### Task 2: Restructure content data

**Files:** Modify `src/data/content.ts` (replace entire file)

- [ ] **Step 1: Replace `src/data/content.ts`**

```ts
export const profile = {
  name: "James Bruning",
  role: "Senior Data Engineer",
  location: "Chicago, Illinois",
  email: "jimtbruning@gmail.com",
  github: "https://github.com/jabrunin001",
  linkedin: "https://www.linkedin.com/in/jtb96/",
  headline: "Infrastructure for modern data teams.",
  sub: "I'm a Senior Data Engineer who turns legacy data chaos into self-serve platforms teams actually trust — Airflow, Spark, Snowflake, dbt.",
};

export const stack = [
  "Snowflake", "Airflow", "dbt", "Spark", "Apache Iceberg", "Trino", "Azure", "Python",
];

export const terminalSnippet = [
  "$ make test",
  "  dim_movie ............. OK",
  "  fact_rating .......... OK",
  "  movie_engagement ..... OK",
  "  Done. PASS=19  ERROR=0",
];

export const valueProps = [
  {
    icon: "layers",
    title: "Modernize legacy platforms",
    desc: "Replace brittle vendor pipelines with Airflow, Spark, and Snowflake architectures a team can own and extend.",
    metric: "35 → 7 min batch processing",
  },
  {
    icon: "zap",
    title: "Automate the manual",
    desc: "Collapse multi-system, multi-hour manual processes into a single configurable command with built-in validation.",
    metric: "31 steps → one command",
  },
  {
    icon: "trending-up",
    title: "Forecast with ML",
    desc: "Ship production models against real budgets, with the validation and stakeholder buy-in to actually deploy them.",
    metric: "73% → 97% accuracy",
  },
];

export const project = {
  name: "iceberg-lakehouse-lab",
  pitch:
    "A local Apache Iceberg lakehouse: MovieLens + a synthetic event stream flow through bronze → silver → gold with dbt-spark, validated by dbt tests + Great Expectations, queried with Trino — on object storage, the way modern platforms run.",
  stack: ["Apache Iceberg", "Spark", "dbt", "Trino", "MinIO", "Great Expectations"],
  features: [
    "Time-travel & rollback",
    "Schema evolution",
    "Hidden partitioning",
    "Compaction & maintenance",
    "Iceberg vs. plain Parquet",
  ],
  repo: "https://github.com/jabrunin001/iceberg-lakehouse-lab",
  blog: "https://github.com/jabrunin001/iceberg-lakehouse-lab/blob/main/docs/blog/why-table-format-matters.md",
};

export const experience = [
  {
    role: "Senior Data Engineer",
    org: "Northwestern University",
    period: "2021 — Present",
    bullets: [
      "Built a university-wide data mart in Azure SQL Server integrating 120+ sources via Azure Data Factory; migrated ETL to PySpark, cutting large-batch processing from 35 minutes to under 7 across 20+ pipelines.",
      "Built an ML financial-forecasting solution supporting $2M+ in staff salaries, raising forecast accuracy from 73% to 97%.",
      "Architected a unified cross-office compliance data model (IRB / IACUC / IBC / Sponsored Research) — the org's first integrated view of research activity.",
      "Led the organization's first formal data-governance program within a 90-day window.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Northwestern University, School of Communication",
    period: "2019 — 2021",
    bullets: [
      "Engineered an automated validation pipeline auditing $20M in grant spending — raising accuracy to 99% and cutting processing time 65%.",
      "Built reusable data models from 20+ sources and a self-service query platform, reducing ad-hoc reporting requests 300%.",
    ],
  },
];

export const education = [
  { degree: "M.S. Data Science", org: "Northwestern University", period: "2022 — 2024" },
  { degree: "B.A. Physics", org: "Indiana University", period: "2014 — 2018" },
];

export const stats = [
  { value: "73→97%", label: "Forecast accuracy on $2M+ payroll" },
  { value: "$20M", label: "Grant spending validated to 99%" },
  { value: "120+", label: "Data sources unified" },
  { value: "35→7 min", label: "Batch across 20+ pipelines" },
];
```

- [ ] **Step 2: Type-check**

Run: `cd ~/Projects/jamesbruning-portfolio && npx astro check 2>&1 | tail -5`
Expected: no errors referencing `content.ts` (pre-existing component errors are fine; they're replaced in later tasks).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts && git commit -m "feat: restructure content for Stripe layout"
```

---

### Task 3: Light layout shell

**Files:** Modify `src/layouts/Layout.astro`

- [ ] **Step 1: Replace `src/layouts/Layout.astro`**

```astro
---
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "../styles/global.css";
import { profile } from "../data/content";
const title = `${profile.name} — ${profile.role}`;
const description = profile.sub;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro && git commit -m "feat: light layout shell"
```

---

### Task 4: Inline SVG icon component

**Files:** Create `src/components/Icon.astro`

- [ ] **Step 1: Write `src/components/Icon.astro`**

```astro
---
interface Props { name: string; size?: number; }
const { name, size = 24 } = Astro.props;
const paths: Record<string, string> = {
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  "trending-up": '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
};
const d = paths[name] ?? "";
---
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
     stroke-linejoin="round" aria-hidden="true" set:html={d}></svg>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Icon.astro && git commit -m "feat: inline SVG icon component"
```

---

### Task 5: Nav

**Files:** Modify `src/components/Nav.astro` (replace)

- [ ] **Step 1: Replace `src/components/Nav.astro`**

```astro
---
import { profile } from "../data/content";
const links = [
  { href: "#work", label: "What I build" },
  { href: "#project", label: "Project" },
  { href: "#experience", label: "Experience" },
];
---
<header class="nav">
  <div class="container nav-inner">
    <a href="#top" class="brand">{profile.name}</a>
    <nav aria-label="Primary">
      {links.map((l) => <a href={l.href}>{l.label}</a>)}
    </nav>
    <a href="#contact" class="btn btn-primary nav-cta">Get in touch</a>
  </div>
</header>

<style>
  .nav { position: sticky; top: 0; z-index: 50;
    background: rgba(255,255,255,.8); backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border); }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 1rem; }
  .brand { color: var(--navy); font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; flex-shrink: 0; }
  nav { display: flex; gap: 1.6rem; }
  nav a { color: var(--slate); font-size: .95rem; font-weight: 500; }
  nav a:hover { color: var(--navy); }
  .nav-cta { padding: .5rem 1rem; font-size: .9rem; }
  @media (max-width: 760px) { nav { display: none; } }
  @media (max-width: 420px) { .brand { font-size: .95rem; } .nav-cta { padding: .45rem .8rem; } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro && git commit -m "feat: Stripe-style nav with CTA"
```

---

### Task 6: Hero with gradient band + terminal card

**Files:** Modify `src/components/Hero.astro` (replace)

- [ ] **Step 1: Replace `src/components/Hero.astro`**

```astro
---
import { profile, terminalSnippet } from "../data/content";
---
<section id="top" class="hero">
  <div class="hero-gradient" aria-hidden="true"></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">{profile.role} · {profile.location}</p>
      <h1>{profile.headline}</h1>
      <p class="lead hero-sub">{profile.sub}</p>
      <div class="cta">
        <a class="btn btn-primary" href="#project">View work</a>
        <a class="btn btn-secondary" href="/resume.pdf" target="_blank" rel="noopener">Résumé</a>
      </div>
    </div>
    <div class="card term" role="img" aria-label="Terminal output: dbt test suite passing with 19 of 19 checks">
      <div class="term-bar"><span></span><span></span><span></span></div>
      <pre class="term-body">{terminalSnippet.map((l) => (
        <code class={l.includes("PASS") ? "pass" : ""}>{l}{"\n"}</code>
      ))}</pre>
    </div>
  </div>
</section>

<style>
  .hero { position: relative; padding: 7rem 0 5rem; overflow: hidden; }
  .hero-gradient {
    position: absolute; inset: 0 0 auto 0; height: 680px; z-index: 0;
    background:
      radial-gradient(45% 60% at 12% 8%, rgba(0,212,255,.45), transparent 60%),
      radial-gradient(50% 70% at 48% -5%, rgba(99,91,255,.45), transparent 60%),
      radial-gradient(45% 65% at 82% 12%, rgba(255,111,216,.40), transparent 60%),
      radial-gradient(40% 60% at 98% 45%, rgba(255,153,102,.40), transparent 60%),
      linear-gradient(120deg, rgba(0,212,255,.12), rgba(169,96,238,.12), rgba(255,111,216,.10));
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    animation: drift 18s ease-in-out infinite alternate;
  }
  @keyframes drift { to { transform: translateX(-30px) translateY(10px) scale(1.04); } }
  .hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr .9fr; gap: 3rem; align-items: center; }
  .hero-copy h1 { font-size: clamp(2.6rem, 6vw, 4rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; color: var(--navy); }
  .hero-sub { margin-top: 1.4rem; }
  .cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
  .term { padding: 0; overflow: hidden; box-shadow: var(--shadow-lg); }
  .term-bar { display: flex; gap: .4rem; padding: .8rem 1rem; border-bottom: 1px solid var(--border); background: #fbfcfe; }
  .term-bar span { width: 11px; height: 11px; border-radius: 50%; background: #d7dde5; }
  .term-body { padding: 1.2rem 1.3rem; font-family: var(--font-mono); font-size: .82rem; line-height: 1.7; color: var(--slate); }
  .term-body .pass { color: #15803d; font-weight: 500; }
  @media (max-width: 880px) {
    .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .term { max-width: 460px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro && git commit -m "feat: hero with Stripe gradient + terminal card"
```

---

### Task 7: Stack strip

**Files:** Create `src/components/StackStrip.astro`

- [ ] **Step 1: Write `src/components/StackStrip.astro`**

```astro
---
import { stack } from "../data/content";
---
<section class="strip" aria-label="Technologies">
  <div class="container strip-inner">
    <span class="label">Working across</span>
    <ul>{stack.map((s) => <li>{s}</li>)}</ul>
  </div>
</section>

<style>
  .strip { padding: 2.5rem 0; border-bottom: 1px solid var(--border); }
  .strip-inner { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .label { font-size: .8rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); flex-shrink: 0; }
  ul { list-style: none; display: flex; flex-wrap: wrap; gap: 1.5rem; }
  li { color: var(--navy); font-weight: 600; font-size: 1rem; opacity: .75; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StackStrip.astro && git commit -m "feat: stack credibility strip"
```

---

### Task 8: Value props (What I build)

**Files:** Create `src/components/ValueProps.astro`

- [ ] **Step 1: Write `src/components/ValueProps.astro`**

```astro
---
import { valueProps } from "../data/content";
import Icon from "./Icon.astro";
---
<section id="work">
  <div class="container reveal">
    <p class="eyebrow">What I build</p>
    <h2 class="section-title">From fragmented data to platforms teams trust.</h2>
    <div class="grid">
      {valueProps.map((p) => (
        <article class="vp">
          <div class="ic"><Icon name={p.icon} size={22} /></div>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <p class="metric tnum">{p.metric}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .section-title { margin-bottom: 3rem; max-width: 20ch; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  .vp .ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
    background: rgba(99,91,255,.1); color: var(--accent); margin-bottom: 1.2rem; }
  .vp h3 { color: var(--navy); font-size: 1.2rem; font-weight: 700; margin-bottom: .6rem; }
  .vp p { color: var(--slate); }
  .vp .metric { margin-top: 1rem; font-weight: 700; color: var(--accent); }
  @media (max-width: 760px) { .grid { grid-template-columns: 1fr; gap: 2.5rem; } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ValueProps.astro && git commit -m "feat: value-props section"
```

---

### Task 9: Featured project + CSS architecture diagram

**Files:** Modify `src/components/FeaturedProject.astro` (replace)

- [ ] **Step 1: Replace `src/components/FeaturedProject.astro`**

```astro
---
import { project } from "../data/content";
import Icon from "./Icon.astro";
---
<section id="project" class="alt">
  <div class="container reveal">
    <p class="eyebrow">Featured project</p>
    <h2 class="section-title">{project.name}</h2>
    <p class="lead">{project.pitch}</p>

    <div class="diagram" aria-label="Architecture: PySpark and dbt write Iceberg tables on MinIO via a REST catalog; Trino queries them">
      <div class="node">PySpark<span>ingest + dbt</span></div>
      <div class="arrow">→</div>
      <div class="node accent">Iceberg<span>bronze · silver · gold</span></div>
      <div class="arrow">←</div>
      <div class="node">Trino<span>SQL queries</span></div>
      <div class="base"><span>MinIO (S3)</span><span>REST catalog</span></div>
    </div>

    <div class="badges">{project.stack.map((s) => <span>{s}</span>)}</div>

    <ul class="feats">{project.features.map((f) => <li>{f}</li>)}</ul>

    <div class="links">
      <a class="btn btn-primary" href={project.repo} target="_blank" rel="noopener">
        <Icon name="github" size={18} /> View on GitHub
      </a>
      <a class="btn btn-secondary" href={project.blog} target="_blank" rel="noopener">
        <Icon name="external" size={18} /> Read the writeup
      </a>
    </div>
  </div>
</section>

<style>
  .alt { background: var(--bg-alt); }
  .section-title { margin: .4rem 0 1rem; font-family: var(--font-mono); font-size: clamp(1.4rem,3vw,1.9rem); }
  .lead { margin-bottom: 2.5rem; }
  .diagram { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center;
    gap: 1rem; background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
    box-shadow: var(--shadow); padding: 2rem 1.5rem; position: relative; }
  .node { text-align: center; padding: 1rem; border: 1px solid var(--border); border-radius: 10px;
    color: var(--navy); font-weight: 700; }
  .node span { display: block; font-weight: 400; font-size: .8rem; color: var(--muted); margin-top: .25rem; }
  .node.accent { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(99,91,255,.12); }
  .arrow { color: var(--muted); font-size: 1.3rem; }
  .base { grid-column: 1 / -1; display: flex; justify-content: center; gap: 3rem; margin-top: 1rem;
    padding-top: 1rem; border-top: 1px dashed var(--border); color: var(--muted); font-size: .85rem; }
  .badges { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.8rem; }
  .badges span { font-size: .8rem; font-weight: 600; padding: .35rem .7rem; border-radius: 999px;
    background: #fff; border: 1px solid var(--border); color: var(--slate); }
  .feats { list-style: none; display: flex; flex-wrap: wrap; gap: .6rem 1.5rem; margin-top: 1.5rem; }
  .feats li { color: var(--slate); font-size: .95rem; position: relative; padding-left: 1.2rem; }
  .feats li::before { content: "✓"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
  .links { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
  @media (max-width: 760px) {
    .diagram { grid-template-columns: 1fr; }
    .arrow { transform: rotate(90deg); }
    .base { flex-direction: column; gap: .4rem; align-items: center; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturedProject.astro && git commit -m "feat: Stripe-style project showcase + CSS diagram"
```

---

### Task 10: Experience (two-column)

**Files:** Modify `src/components/Experience.astro` (replace)

- [ ] **Step 1: Replace `src/components/Experience.astro`**

```astro
---
import { experience, education } from "../data/content";
---
<section id="experience">
  <div class="container reveal">
    <p class="eyebrow">Experience</p>
    <h2 class="section-title">Six years modernizing institutional data.</h2>
    <div class="rows">
      {experience.map((job) => (
        <article class="row">
          <div class="meta">
            <h3>{job.role}</h3>
            <p class="org">{job.org}</p>
            <p class="period tnum">{job.period}</p>
          </div>
          <ul>{job.bullets.map((b) => <li>{b}</li>)}</ul>
        </article>
      ))}
      <article class="row">
        <div class="meta"><h3>Education</h3></div>
        <ul class="edu">
          {education.map((e) => <li><strong>{e.degree}</strong> — {e.org} <span class="tnum">({e.period})</span></li>)}
        </ul>
      </article>
    </div>
  </div>
</section>

<style>
  .section-title { margin: .4rem 0 3rem; max-width: 18ch; }
  .rows { display: grid; gap: 2.5rem; }
  .row { display: grid; grid-template-columns: 280px 1fr; gap: 2rem;
    padding-top: 2.5rem; border-top: 1px solid var(--border); }
  .row:first-child { border-top: none; padding-top: 0; }
  .meta h3 { color: var(--navy); font-size: 1.15rem; font-weight: 700; }
  .meta .org { color: var(--slate); margin-top: .2rem; }
  .meta .period { color: var(--muted); font-size: .9rem; margin-top: .2rem; }
  ul { list-style: none; display: grid; gap: .7rem; }
  ul li { color: var(--slate); position: relative; padding-left: 1.2rem; }
  ul li::before { content: "—"; position: absolute; left: 0; color: var(--accent); }
  .edu li::before { content: ""; }
  .edu strong { color: var(--navy); }
  @media (max-width: 760px) { .row { grid-template-columns: 1fr; gap: 1rem; } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.astro && git commit -m "feat: two-column experience section"
```

---

### Task 11: Stats band (dark)

**Files:** Create `src/components/Stats.astro`

- [ ] **Step 1: Write `src/components/Stats.astro`**

```astro
---
import { stats } from "../data/content";
---
<section class="stats">
  <div class="container reveal">
    <div class="grid">
      {stats.map((s) => (
        <div class="stat">
          <div class="val tnum">{s.value}</div>
          <div class="lbl">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .stats { background: var(--navy); }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .stat .val { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.02em;
    background: linear-gradient(120deg, #8ad4ff, #b69cff); -webkit-background-clip: text;
    background-clip: text; -webkit-text-fill-color: transparent; color: #b69cff; }
  .lbl { color: #8ea2c0; font-size: .92rem; margin-top: .5rem; }
  @media (max-width: 760px) { .grid { grid-template-columns: 1fr 1fr; gap: 2.5rem 1.5rem; } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Stats.astro && git commit -m "feat: dark stats band"
```

---

### Task 12: Closing CTA (Contact)

**Files:** Modify `src/components/Contact.astro` (replace)

- [ ] **Step 1: Replace `src/components/Contact.astro`**

```astro
---
import { profile } from "../data/content";
import Icon from "./Icon.astro";
---
<section id="contact" class="contact">
  <div class="contact-gradient" aria-hidden="true"></div>
  <div class="container reveal inner">
    <h2 class="section-title">Let's build something.</h2>
    <p class="lead">Open to Senior / Staff Data Engineering roles — remote, hybrid, or Chicago.</p>
    <div class="links">
      <a class="btn btn-primary" href={`mailto:${profile.email}`}><Icon name="mail" size={18} /> Email me</a>
      <a class="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn btn-secondary" href={profile.github} target="_blank" rel="noopener"><Icon name="github" size={18} /> GitHub</a>
    </div>
  </div>
</section>

<style>
  .contact { position: relative; text-align: center; overflow: hidden; }
  .contact-gradient { position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(40% 70% at 25% 30%, rgba(99,91,255,.16), transparent 60%),
      radial-gradient(40% 70% at 75% 60%, rgba(255,111,216,.14), transparent 60%);
  }
  .inner { position: relative; z-index: 1; }
  .lead { margin: 1rem auto 0; }
  .links { display: flex; flex-wrap: wrap; gap: .8rem; justify-content: center; margin-top: 2rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro && git commit -m "feat: closing CTA section"
```

---

### Task 13: Footer

**Files:** Create `src/components/Footer.astro`

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { profile } from "../data/content";
---
<footer class="footer">
  <div class="container foot-inner">
    <div>
      <p class="name">{profile.name}</p>
      <p class="role">{profile.role} · {profile.location}</p>
    </div>
    <nav class="foot-links">
      <a href="#work">What I build</a>
      <a href="#project">Project</a>
      <a href="#experience">Experience</a>
      <a href={`mailto:${profile.email}`}>Email</a>
    </nav>
  </div>
  <div class="container sub"><span>Built with Astro</span><span>© 2026 {profile.name}</span></div>
</footer>

<style>
  .footer { border-top: 1px solid var(--border); padding: 3rem 0 2rem; background: #fff; }
  .foot-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
  .name { color: var(--navy); font-weight: 700; }
  .role { color: var(--muted); font-size: .9rem; margin-top: .2rem; }
  .foot-links { display: flex; flex-wrap: wrap; gap: 1.4rem; }
  .foot-links a { color: var(--slate); font-size: .92rem; font-weight: 500; }
  .foot-links a:hover { color: var(--navy); }
  .sub { display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 1.5rem;
    border-top: 1px solid var(--border); color: var(--muted); font-size: .82rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro && git commit -m "feat: footer"
```

---

### Task 14: Compose page + remove dark-era components

**Files:** Modify `src/pages/index.astro`; Delete `About.astro`, `Skills.astro`, `Impact.astro`

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import Layout from "../layouts/Layout.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import StackStrip from "../components/StackStrip.astro";
import ValueProps from "../components/ValueProps.astro";
import FeaturedProject from "../components/FeaturedProject.astro";
import Experience from "../components/Experience.astro";
import Stats from "../components/Stats.astro";
import Contact from "../components/Contact.astro";
import Footer from "../components/Footer.astro";
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <StackStrip />
    <ValueProps />
    <FeaturedProject />
    <Experience />
    <Stats />
    <Contact />
  </main>
  <Footer />
  <script>
    import "../scripts/reveal.ts";
  </script>
</Layout>
```

- [ ] **Step 2: Delete superseded components**

```bash
rm src/components/About.astro src/components/Skills.astro src/components/Impact.astro
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: completes with 0 errors; `dist/index.html` written.

- [ ] **Step 4: Update favicon to Stripe palette**

Replace `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#635bff"/>
  <text x="32" y="43" font-family="Inter, sans-serif" font-size="30" font-weight="700" fill="#ffffff" text-anchor="middle">jb</text>
</svg>
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: compose Stripe redesign, remove dark-era components"
```

---

### Task 15: Visual verification + deploy

- [ ] **Step 1: Build + preview + screenshot**

```bash
npm run build
(npm run preview >/tmp/prev.log 2>&1 &) ; sleep 4
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/redesign_hero.png --window-size=1440,900 http://localhost:4321/
"$CH" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/redesign_full.png --window-size=1440,5200 http://localhost:4321/
"$CH" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/redesign_mobile.png --window-size=500,1600 http://localhost:4321/
pkill -f "astro preview"
```
Expected: three PNGs. Verify: gradient band with diagonal bottom edge, terminal card, light sections, dark stats band, no horizontal overflow on mobile, all sections present.

- [ ] **Step 2: Fix any visual issues found, rebuild, re-screenshot** (iterate until clean)

- [ ] **Step 3: Deploy**

```bash
git push origin main
```
Then confirm the `deploy` workflow succeeds and https://jabrunin001.github.io/ serves the redesign (HTTP 200, contains "Infrastructure for modern data teams").

---

## Spec Coverage Check

| Spec requirement | Task |
|------------------|------|
| Light Stripe tokens (navy/blurple/pale-blue) | 1 |
| Content restructure (stack, valueProps, terminal, stats) | 2 |
| Light layout shell | 3 |
| SVG icons (no emoji) | 4 |
| Stripe nav + CTA pill | 5 |
| Hero gradient + clip-path + terminal card | 6 |
| Stack credibility strip | 7 |
| What-I-build 3 pillars | 8 |
| Featured project + CSS diagram | 9 |
| Two-column experience (no timeline) | 10 |
| Dark "by the numbers" stat band | 11 |
| Gradient closing CTA | 12 |
| Footer | 13 |
| Remove About/Skills/Impact, aurora, mono headers, timeline | 14 |
| Accessibility (focus, reduced-motion, aria, responsive) | 1,4,6,12,15 |
| Favicon recolor | 14 |
| Deploy (GH Pages) | 15 |

All spec sections map to a task.
```
