# jamesbruning-portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, developer/data-aesthetic personal portfolio for James Bruning (Senior Data Engineer) in Astro, featuring the iceberg-lakehouse-lab project, deployable to GitHub Pages or Netlify.

**Architecture:** Astro static site. All content lives in one typed data file (`src/data/content.ts`); presentational `.astro` components import from it. Design tokens in CSS custom properties; scroll animations via Intersection Observer. Static `dist/` output deploys to GH Pages (Actions) or Netlify.

**Tech Stack:** Astro 5, TypeScript, @fontsource (Inter + JetBrains Mono), vanilla CSS + JS. No UI framework.

---

## Conventions

- **Verification model:** this is a static site — "tests" are `npm run build` (must succeed) and `npm run dev` visual checks, not unit tests.
- **Node:** v20+. Package manager: npm.
- **Commits:** conventional commits, after each task.
- **Content rule:** never hardcode copy in components — import from `src/data/content.ts`.

## File Structure

| File | Responsibility |
|------|----------------|
| `astro.config.mjs` | site/base config for deploy |
| `package.json` | deps + scripts |
| `src/data/content.ts` | ALL content (profile, skills, experience, project, metrics) — single source of truth |
| `src/styles/global.css` | design tokens (CSS custom properties) + base/reset |
| `src/layouts/Layout.astro` | `<head>`, fonts, meta/OG, global style import, `<slot/>` |
| `src/components/Nav.astro` | sticky anchored nav |
| `src/components/Hero.astro` | hero + aurora background + metric chips |
| `src/components/About.astro` | narrative + superpowers |
| `src/components/Skills.astro` | grouped skill chips |
| `src/components/Experience.astro` | timeline of roles |
| `src/components/FeaturedProject.astro` | iceberg-lakehouse-lab centerpiece |
| `src/components/Impact.astro` | metric cards |
| `src/components/Contact.astro` | footer + links |
| `src/scripts/reveal.ts` | Intersection Observer scroll reveals |
| `src/pages/index.astro` | composes all components |
| `public/resume.pdf` | placeholder résumé |
| `public/favicon.svg` | favicon |
| `netlify.toml` | Netlify build config |
| `.github/workflows/deploy.yml` | GH Pages deploy |
| `README.md` | run + deploy docs |

---

### Task 1: Scaffold Astro project

**Files:** Create the Astro project in place; add font deps.

- [ ] **Step 1: Create the Astro project (empty template, TypeScript)**

Run (from `~/Projects/jamesbruning-portfolio`, which already has git + spec):
```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git --skip-houston
```
Expected: creates `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`. Answer "y" to proceed in a non-empty directory if prompted.

- [ ] **Step 2: Install dependencies + fonts**

```bash
npm install
npm install @fontsource/inter @fontsource/jetbrains-mono
```
Expected: `node_modules/` created; both font packages present.

- [ ] **Step 3: Verify dev server boots**

Run: `npm run dev -- --host` then open the printed localhost URL.
Expected: default Astro page renders. Stop the server (Ctrl-C).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro project with Inter + JetBrains Mono"
```

---

### Task 2: Content data file (single source of truth)

**Files:** Create `src/data/content.ts`

- [ ] **Step 1: Write `src/data/content.ts`**

```ts
export const profile = {
  name: "James Bruning",
  role: "Senior Data Engineer",
  location: "Chicago, Illinois",
  email: "jimtbruning@gmail.com",
  github: "https://github.com/jabrunin001",
  linkedin: "https://www.linkedin.com/in/jtb96/",
  tagline: "I turn legacy data chaos into self-serve platforms.",
  blurb:
    "Senior Data Engineer with 6+ years building institutional data capabilities in higher education — replacing legacy vendors, unifying fragmented sources, and automating away manual operational burden.",
  heroMetrics: [
    { value: "73→97%", label: "forecast accuracy" },
    { value: "120+", label: "data sources unified" },
    { value: "35→7 min", label: "batch processing" },
  ],
};

export const about = {
  narrative:
    "I spent 6+ years transforming data infrastructure at Northwestern — replacing legacy vendors, building a university-wide data mart from 120+ sources, and pushing financial-forecast accuracy from 73% to 97%. I bring a modernization mindset: turning fragmented, manual data environments into unified, self-service platforms that teams actually trust.",
  superpowers: [
    "Legacy-to-modern data platform migrations (Airflow, Spark, Snowflake)",
    "Cross-functional data governance & stakeholder alignment",
    "End-to-end pipeline automation (31-step manual process → one script)",
    "Financial forecasting with ML (73% → 97% accuracy)",
    "Fast prototyping with AI tools (Anthropic API, React, Playwright)",
  ],
};

export const skillGroups = [
  { name: "Languages", items: ["Python", "SQL", "PySpark", "Spark SQL"] },
  { name: "Data Platforms", items: ["Azure Data Factory", "Azure SQL Server", "Snowflake"] },
  { name: "Engineering", items: ["Airflow", "dbt", "Docker", "Apache Iceberg", "Trino", "Playwright"] },
  { name: "BI & Visualization", items: ["Tableau", "Power BI", "Cognos"] },
  { name: "AI", items: ["Anthropic API (Claude)", "React"] },
];

export const experience = [
  {
    role: "Senior Data Engineer",
    org: "Northwestern University",
    location: "Chicago",
    period: "2021 — Present",
    bullets: [
      "Built a university-wide data mart in Azure SQL Server integrating 120+ sources via Azure Data Factory; migrated ETL to PySpark, cutting large-batch processing from 35 minutes to under 7 across 20+ pipelines.",
      "Built an ML financial-forecasting solution (Python) supporting $2M+ in staff salaries, raising forecast accuracy from 73% to 97%.",
      "Architected a unified cross-office compliance data model (IRB / IACUC / IBC / Sponsored Research) — the organization's first integrated view of research activity.",
      "Replaced a 31-step manual reporting process with a modular Python pipeline, cutting 3 hours of monthly work to 15 minutes.",
      "Led the organization's first formal data-governance program (data dictionary, named stewards, bicameral governance) within a 90-day window.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Northwestern University, School of Communication",
    location: "Chicago",
    period: "2019 — 2021",
    bullets: [
      "Engineered an automated validation pipeline auditing $20M in grant spending — raising accuracy to 99% and cutting processing time 65%.",
      "Designed reusable data models from 20+ sources powering BI dashboards for program evaluation.",
      "Migrated the grants database and built a self-service query platform, reducing ad-hoc reporting requests 300%.",
    ],
  },
];

export const education = [
  { degree: "M.S. Data Science", org: "Northwestern University", period: "2022 — 2024" },
  { degree: "B.A. Physics", org: "Indiana University", period: "2014 — 2018" },
];

export const project = {
  name: "iceberg-lakehouse-lab",
  pitch:
    "A local Apache Iceberg lakehouse: MovieLens + a synthetic playback-events stream flow through bronze → silver → gold with dbt-spark, validated by dbt tests + Great Expectations, and queried with Trino — all on object storage, the way modern data platforms run.",
  stack: ["Apache Iceberg", "Spark", "dbt", "Trino", "MinIO", "Great Expectations", "Docker"],
  features: [
    { title: "Time-travel & rollback", desc: "Snapshot isolation; recover from a bad load without a backup restore." },
    { title: "Schema evolution", desc: "Add a column with no data rewrite — old rows still read." },
    { title: "Hidden partitioning", desc: "Partition by days(event_ts) with no partition column, then evolve it." },
    { title: "Compaction & maintenance", desc: "rewrite_data_files + snapshot expiry." },
    { title: "Iceberg vs. plain Parquet", desc: "Why a table format matters: ACID, atomic commits, time-travel." },
  ],
  repo: "https://github.com/jabrunin001/iceberg-lakehouse-lab",
  blog: "https://github.com/jabrunin001/iceberg-lakehouse-lab/blob/main/docs/blog/why-table-format-matters.md",
};

export const impact = [
  { metric: "73 → 97%", label: "Forecast accuracy on $2M+ payroll" },
  { metric: "$20M", label: "Grant spending validated to 99% accuracy" },
  { metric: "31 → 1", label: "Manual reporting steps collapsed to one command" },
  { metric: "4–6 hrs → 2 min", label: "Annual report data assembly" },
  { metric: "35 → 7 min", label: "Batch processing across 20+ pipelines" },
  { metric: "First", label: "Formal data-governance program at the org" },
];
```

- [ ] **Step 2: Type-check**

Run: `npx astro check` (or `npx tsc --noEmit`).
Expected: no type errors in `content.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts && git commit -m "feat: content data file (single source of truth)"
```

---

### Task 3: Design tokens + global CSS

**Files:** Create `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
:root {
  --bg: #0b0f19;
  --bg-alt: #0e1320;
  --card: #151b2b;
  --border: #222b3d;
  --text: #e6eaf2;
  --muted: #8a93a6;
  --cyan: #22d3ee;
  --violet: #8b5cf6;
  --radius: 14px;
  --maxw: 1100px;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; scroll-padding-top: 80px; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--cyan); text-decoration: none; }

.container { max-width: var(--maxw); margin: 0 auto; padding: 0 1.5rem; }

section { padding: 6rem 0; }
section:nth-of-type(even) { background: var(--bg-alt); }

h2.section-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 2.5rem;
}
h2.section-title::before {
  content: "// ";
  color: var(--cyan);
  font-family: var(--font-mono);
  font-weight: 500;
}

.mono { font-family: var(--font-mono); }

/* scroll-reveal */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css && git commit -m "feat: design tokens + global styles"
```

---

### Task 4: Layout shell

**Files:** Create `src/layouts/Layout.astro`

- [ ] **Step 1: Write `src/layouts/Layout.astro`**

```astro
---
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "../styles/global.css";
import { profile } from "../data/content";
const title = `${profile.name} — ${profile.role}`;
const description = profile.blurb;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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
git add src/layouts/Layout.astro && git commit -m "feat: layout shell with fonts + meta tags"
```

---

### Task 5: Nav

**Files:** Create `src/components/Nav.astro`

- [ ] **Step 1: Write `src/components/Nav.astro`**

```astro
---
const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "work" },
  { href: "#project", label: "project" },
  { href: "#contact", label: "contact" },
];
---
<header class="nav">
  <div class="container nav-inner">
    <a href="#top" class="brand mono">◦ jb</a>
    <nav>
      {links.map((l) => <a href={l.href} class="mono">{l.label}</a>)}
    </nav>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: color-mix(in srgb, var(--bg) 80%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .brand { font-weight: 600; color: var(--text); font-size: 1.1rem; }
  nav { display: flex; gap: 1.4rem; }
  nav a { color: var(--muted); font-size: .9rem; transition: color .2s; }
  nav a:hover { color: var(--cyan); }
  @media (max-width: 620px) { nav { gap: .9rem; } nav a:nth-child(n+4) { display: none; } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro && git commit -m "feat: sticky nav"
```

---

### Task 6: Hero

**Files:** Create `src/components/Hero.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import { profile } from "../data/content";
---
<section id="top" class="hero">
  <div class="aurora" aria-hidden="true"></div>
  <div class="container hero-inner">
    <p class="mono kicker">{profile.location}</p>
    <h1>{profile.name}</h1>
    <p class="role">{profile.role}</p>
    <p class="tagline">{profile.tagline}</p>
    <div class="cta">
      <a class="btn primary" href="#project">View work</a>
      <a class="btn" href={profile.github} target="_blank" rel="noopener">GitHub</a>
      <a class="btn" href={`mailto:${profile.email}`}>Email</a>
      <a class="btn" href="/resume.pdf" target="_blank" rel="noopener">Résumé</a>
    </div>
    <div class="chips">
      {profile.heroMetrics.map((m) => (
        <div class="chip"><span class="mono val">{m.value}</span><span class="lbl">{m.label}</span></div>
      ))}
    </div>
  </div>
</section>

<style>
  .hero { position: relative; padding: 8rem 0 6rem; overflow: hidden; }
  .aurora {
    position: absolute; inset: -40% -10% auto -10%; height: 600px;
    background: radial-gradient(closest-side, color-mix(in srgb, var(--violet) 35%, transparent), transparent 70%),
                radial-gradient(closest-side, color-mix(in srgb, var(--cyan) 30%, transparent), transparent 70%);
    background-position: 20% 0, 80% 10%; background-repeat: no-repeat;
    filter: blur(40px); opacity: .5; animation: drift 16s ease-in-out infinite alternate;
  }
  @keyframes drift { to { transform: translateX(40px) translateY(20px) scale(1.05); } }
  .hero-inner { position: relative; }
  .kicker { color: var(--muted); font-size: .85rem; margin-bottom: 1rem; }
  h1 { font-size: clamp(2.6rem, 7vw, 4.5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
  .role { font-size: clamp(1.1rem, 3vw, 1.6rem); color: var(--muted); margin-top: .4rem; }
  .tagline { font-size: clamp(1.2rem, 3.5vw, 1.9rem); color: var(--cyan); font-weight: 600; margin-top: 1.4rem; max-width: 22ch; }
  .cta { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
  .btn {
    padding: .7rem 1.2rem; border: 1px solid var(--border); border-radius: 10px;
    color: var(--text); font-size: .95rem; transition: all .2s;
  }
  .btn:hover { border-color: var(--cyan); transform: translateY(-1px); }
  .btn.primary {
    background: linear-gradient(135deg, var(--cyan), var(--violet)); color: #06121a; font-weight: 700; border: none;
    box-shadow: 0 8px 30px -8px color-mix(in srgb, var(--cyan) 60%, transparent);
  }
  .chips { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 3rem; }
  .chip { display: flex; flex-direction: column; }
  .chip .val { font-size: 1.6rem; font-weight: 500; color: var(--text); }
  .chip .lbl { color: var(--muted); font-size: .85rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro && git commit -m "feat: hero with aurora background + metric chips"
```

---

### Task 7: About

**Files:** Create `src/components/About.astro`

- [ ] **Step 1: Write `src/components/About.astro`**

```astro
---
import { about } from "../data/content";
---
<section id="about">
  <div class="container reveal">
    <h2 class="section-title">about</h2>
    <p class="narrative">{about.narrative}</p>
    <ul class="powers">
      {about.superpowers.map((p) => <li><span class="mono arrow">→</span>{p}</li>)}
    </ul>
  </div>
</section>

<style>
  .narrative { font-size: 1.2rem; max-width: 70ch; color: var(--text); }
  .powers { list-style: none; margin-top: 2rem; display: grid; gap: .8rem; }
  .powers li { display: flex; gap: .7rem; color: var(--muted); align-items: baseline; }
  .arrow { color: var(--cyan); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.astro && git commit -m "feat: about section"
```

---

### Task 8: Skills

**Files:** Create `src/components/Skills.astro`

- [ ] **Step 1: Write `src/components/Skills.astro`**

```astro
---
import { skillGroups } from "../data/content";
---
<section id="skills">
  <div class="container reveal">
    <h2 class="section-title">skills</h2>
    <div class="grid">
      {skillGroups.map((g) => (
        <div class="group">
          <h3 class="mono">{g.name}</h3>
          <div class="chips">{g.items.map((i) => <span class="tag">{i}</span>)}</div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .group h3 { color: var(--cyan); font-size: .9rem; font-weight: 500; margin-bottom: .9rem; }
  .chips { display: flex; flex-wrap: wrap; gap: .5rem; }
  .tag {
    padding: .4rem .8rem; background: var(--card); border: 1px solid var(--border);
    border-radius: 8px; font-size: .85rem; color: var(--text);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.astro && git commit -m "feat: skills section"
```

---

### Task 9: Experience

**Files:** Create `src/components/Experience.astro`

- [ ] **Step 1: Write `src/components/Experience.astro`**

```astro
---
import { experience, education } from "../data/content";
---
<section id="experience">
  <div class="container reveal">
    <h2 class="section-title">work</h2>
    <div class="timeline">
      {experience.map((job) => (
        <article class="job">
          <div class="head">
            <h3>{job.role} <span class="org">· {job.org}</span></h3>
            <span class="mono period">{job.period}</span>
          </div>
          <ul>{job.bullets.map((b) => <li>{b}</li>)}</ul>
        </article>
      ))}
    </div>
    <div class="edu">
      {education.map((e) => (
        <p><span class="deg">{e.degree}</span><span class="mono">{e.org} · {e.period}</span></p>
      ))}
    </div>
  </div>
</section>

<style>
  .timeline { display: grid; gap: 2.5rem; border-left: 2px solid var(--border); padding-left: 1.8rem; }
  .job { position: relative; }
  .job::before {
    content: ""; position: absolute; left: -2.25rem; top: .5rem; width: 10px; height: 10px;
    border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 4px color-mix(in srgb, var(--cyan) 20%, transparent);
  }
  .head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .4rem; align-items: baseline; }
  .head h3 { font-size: 1.2rem; }
  .org { color: var(--muted); font-weight: 400; }
  .period { color: var(--muted); font-size: .85rem; }
  .job ul { margin-top: .9rem; padding-left: 1.1rem; display: grid; gap: .5rem; }
  .job li { color: var(--muted); }
  .edu { margin-top: 2.5rem; display: grid; gap: .5rem; }
  .edu p { display: flex; flex-wrap: wrap; gap: .6rem; align-items: baseline; }
  .edu .deg { font-weight: 600; }
  .edu .mono { color: var(--muted); font-size: .85rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.astro && git commit -m "feat: experience timeline + education"
```

---

### Task 10: Featured Project

**Files:** Create `src/components/FeaturedProject.astro`

- [ ] **Step 1: Write `src/components/FeaturedProject.astro`**

```astro
---
import { project } from "../data/content";
---
<section id="project">
  <div class="container reveal">
    <h2 class="section-title">featured project</h2>
    <div class="card">
      <div class="top">
        <h3 class="mono">{project.name}</h3>
        <div class="links">
          <a class="btn" href={project.repo} target="_blank" rel="noopener">GitHub ↗</a>
          <a class="btn" href={project.blog} target="_blank" rel="noopener">Blog ↗</a>
        </div>
      </div>
      <p class="pitch">{project.pitch}</p>
      <div class="stack">{project.stack.map((s) => <span class="badge">{s}</span>)}</div>
      <pre class="arch mono" aria-label="architecture diagram">{`raw data ─▶ PySpark ─▶ ◇ Iceberg (bronze▸silver▸gold) ◀─ Trino
                         │            │
                    MinIO (S3)   REST catalog`}</pre>
      <div class="features">
        {project.features.map((f) => (
          <div class="feat"><strong>{f.title}</strong><span>{f.desc}</span></div>
        ))}
      </div>
    </div>
  </div>
</section>

<style>
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; }
  .top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; align-items: center; }
  .top h3 { font-size: 1.3rem; color: var(--cyan); }
  .links { display: flex; gap: .6rem; }
  .btn { padding: .5rem 1rem; border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: .85rem; }
  .btn:hover { border-color: var(--cyan); }
  .pitch { margin-top: 1rem; color: var(--text); max-width: 75ch; }
  .stack { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.2rem; }
  .badge { font-family: var(--font-mono); font-size: .78rem; padding: .3rem .6rem; border-radius: 6px;
           background: color-mix(in srgb, var(--violet) 18%, transparent); color: var(--text); }
  .arch { margin-top: 1.5rem; padding: 1rem; background: var(--bg); border: 1px solid var(--border);
          border-radius: 10px; font-size: .8rem; color: var(--muted); overflow-x: auto; white-space: pre; }
  .features { margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px,1fr)); gap: 1rem; }
  .feat { display: grid; gap: .25rem; padding: 1rem; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; }
  .feat strong { color: var(--text); font-size: .95rem; }
  .feat span { color: var(--muted); font-size: .85rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturedProject.astro && git commit -m "feat: featured project (iceberg-lakehouse-lab)"
```

---

### Task 11: Impact

**Files:** Create `src/components/Impact.astro`

- [ ] **Step 1: Write `src/components/Impact.astro`**

```astro
---
import { impact } from "../data/content";
---
<section id="impact">
  <div class="container reveal">
    <h2 class="section-title">impact</h2>
    <div class="grid">
      {impact.map((i) => (
        <div class="card"><span class="mono metric">{i.metric}</span><span class="label">{i.label}</span></div>
      ))}
    </div>
  </div>
</section>

<style>
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 1rem; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.6rem; display: grid; gap: .5rem; }
  .metric { font-size: 1.7rem; font-weight: 500;
            background: linear-gradient(135deg, var(--cyan), var(--violet));
            -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .label { color: var(--muted); font-size: .9rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Impact.astro && git commit -m "feat: impact metric cards"
```

---

### Task 12: Contact / footer

**Files:** Create `src/components/Contact.astro`

- [ ] **Step 1: Write `src/components/Contact.astro`**

```astro
---
import { profile } from "../data/content";
---
<section id="contact">
  <div class="container reveal center">
    <h2 class="section-title">contact</h2>
    <p class="lead">Open to Senior / Staff Data Engineering roles — remote, hybrid, or Chicago.</p>
    <div class="links">
      <a class="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
      <a class="btn" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn" href={profile.github} target="_blank" rel="noopener">GitHub</a>
    </div>
    <p class="foot mono">Built with Astro · {profile.name}</p>
  </div>
</section>

<style>
  .center { text-align: center; }
  .lead { color: var(--text); font-size: 1.1rem; max-width: 50ch; margin: 0 auto; }
  .links { display: flex; flex-wrap: wrap; gap: .8rem; justify-content: center; margin-top: 2rem; }
  .btn { padding: .7rem 1.2rem; border: 1px solid var(--border); border-radius: 10px; color: var(--text); }
  .btn:hover { border-color: var(--cyan); }
  .btn.primary { background: linear-gradient(135deg, var(--cyan), var(--violet)); color: #06121a; font-weight: 700; border: none; }
  .foot { color: var(--muted); font-size: .8rem; margin-top: 3rem; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro && git commit -m "feat: contact + footer"
```

---

### Task 13: Scroll-reveal script

**Files:** Create `src/scripts/reveal.ts`

- [ ] **Step 1: Write `src/scripts/reveal.ts`**

```ts
// Adds .is-visible to .reveal elements as they scroll into view.
const els = document.querySelectorAll<HTMLElement>(".reveal");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add("is-visible"));
}
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/reveal.ts && git commit -m "feat: intersection-observer scroll reveals"
```

---

### Task 14: Compose the page

**Files:** Overwrite `src/pages/index.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
import Layout from "../layouts/Layout.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import About from "../components/About.astro";
import Skills from "../components/Skills.astro";
import Experience from "../components/Experience.astro";
import FeaturedProject from "../components/FeaturedProject.astro";
import Impact from "../components/Impact.astro";
import Contact from "../components/Contact.astro";
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <FeaturedProject />
    <Impact />
    <Contact />
  </main>
  <script>
    import "../scripts/reveal.ts";
  </script>
</Layout>
```

- [ ] **Step 2: Build + visually verify**

Run: `npm run build` then `npm run preview` and open the URL.
Expected: build succeeds with 0 errors; all 7 sections render top-to-bottom; nav anchors jump correctly; hero aurora animates; cards/timeline styled.

- [ ] **Step 3: Responsive check**

In the browser devtools, check 375px, 768px, 1280px widths.
Expected: no horizontal overflow; nav collapses extra links on narrow; grids reflow.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro && git commit -m "feat: compose full page + wire reveal script"
```

---

### Task 15: Assets — favicon + résumé placeholder

**Files:** Create `public/favicon.svg`, `public/resume.pdf`

- [ ] **Step 1: Write `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0f19"/>
  <text x="32" y="42" font-family="monospace" font-size="30" fill="#22d3ee" text-anchor="middle">jb</text>
</svg>
```

- [ ] **Step 2: Create a placeholder résumé PDF**

```bash
printf '%%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f \ntrailer<</Root 1 0 R/Size 4>>\n%%%%EOF\n' > public/resume.pdf
```
Expected: a tiny valid placeholder PDF. (James replaces with his real résumé later.)

- [ ] **Step 3: Commit**

```bash
git add public/favicon.svg public/resume.pdf && git commit -m "feat: favicon + résumé placeholder"
```

---

### Task 16: Deploy config (GH Pages + Netlify) + README

**Files:** Modify `astro.config.mjs`; Create `netlify.toml`, `.github/workflows/deploy.yml`, `README.md`

- [ ] **Step 1: Write `astro.config.mjs`**

```js
import { defineConfig } from "astro/config";

// Netlify / custom domain / user-site: serve from root (default).
// GitHub Pages PROJECT site: uncomment `base` below and set it to the repo name.
export default defineConfig({
  site: "https://jabrunin001.github.io",
  // base: "/jamesbruning-portfolio",
});
```

- [ ] **Step 2: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 3: Write `.github/workflows/deploy.yml`**

```yaml
name: deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Write `README.md`**

```markdown
# jamesbruning-portfolio

Personal portfolio for James Bruning, Senior Data Engineer. Built with Astro.

## Develop
\`\`\`bash
npm install
npm run dev
\`\`\`

## Build
\`\`\`bash
npm run build   # outputs to dist/
npm run preview
\`\`\`

## Deploy

**Netlify (recommended):** connect the repo, or drag the `dist/` folder to Netlify.
`netlify.toml` already sets build command + publish dir. Serves from root — no config change.

**GitHub Pages:** push to `main`; `.github/workflows/deploy.yml` builds and publishes.
Enable Pages → Source: GitHub Actions in repo settings. If this is a **project page**
(`jabrunin001.github.io/jamesbruning-portfolio`), uncomment `base` in `astro.config.mjs`.
For a root user-site, name the repo `jabrunin001.github.io` and leave `base` off.

## Edit content
All copy lives in `src/data/content.ts`. Drop your real résumé at `public/resume.pdf`.
```

- [ ] **Step 5: Build to confirm config is valid**

Run: `npm run build`
Expected: succeeds; `dist/index.html` exists.

- [ ] **Step 6: Commit**

```bash
git add astro.config.mjs netlify.toml .github/workflows/deploy.yml README.md
git commit -m "chore: deploy config (GH Pages + Netlify) + README"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|------------------|------|
| Astro project, static output | 1 |
| Dark developer/data design system (tokens) | 3 |
| Inter + JetBrains Mono fonts | 1, 4 |
| Content-driven (single source of truth) | 2 |
| Hero (name/role/tagline/CTAs/metric chips/aurora) | 6 |
| About (narrative + superpowers) | 7 |
| Skills (grouped chips) | 8 |
| Experience timeline + education | 9 |
| Featured project (iceberg-lakehouse-lab) | 10 |
| Impact metric cards | 11 |
| Contact/footer (email, LinkedIn, GitHub; no phone) | 12 |
| Scroll-reveal motion + reduced-motion | 3, 13 |
| Résumé CTA → public/resume.pdf | 6, 15 |
| Accessibility (semantic, contrast, alt) | 4–14 |
| GitHub Pages deploy | 16 |
| Netlify deploy | 16 |
| Confirmed URLs (github/linkedin/repo) | 2 |
| Exclude Netflix/OSS research; omit phone | (by omission — not in content.ts) |

All spec requirements map to a task. Phone number and Netflix/OSS research are intentionally absent from `content.ts`.
