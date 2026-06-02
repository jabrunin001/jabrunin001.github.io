# Portfolio Redesign (Stripe-style) — Design Spec

**Date:** 2026-06-02
**Status:** Approved (design), pending implementation plan
**Author:** James Bruning

## Purpose

A major redesign of the personal portfolio (jabrunin001.github.io) to look like a
polished, popular SaaS website rather than a generic AI-generated dev portfolio. Anchored
on **Stripe's** design language: light, structured, the signature skewed multicolor
gradient, strong type hierarchy, generous whitespace. The site treats James (Senior Data
Engineer) and his work as "the product."

**Primary goal:** a recruiter-facing site that reads as premium/credible SaaS-grade craft,
removing the "AI slop" tells of the current dark version.

## Decisions (locked during brainstorming)

| Decision | Choice |
|----------|--------|
| Reference aesthetic | **Stripe** (light, structured, angled multicolor gradient) |
| Palette | **Authentic Stripe** — navy `#0A2540`, blurple `#635BFF`, white + `#F6F9FC`, multicolor gradient |
| Scope | **Full rebuild** — light theme, new layout + sections (not a reskin) |
| Hero framing | Product-style headline ("Infrastructure for modern data teams.") + name as nav identity |
| Stack | Keep Astro + content-driven (`content.ts`); keep GH Pages deploy |

## "AI slop" tells being removed

Dark theme, aurora gradient blob, `// comment` section headers, monospace-everywhere,
generic "metric chips," vertical timeline cliché, predictable hero→about→skills→timeline
stack, the green palette.

## Visual Design System

- **Colors:**
  - Text/headings: `#0A2540` (Stripe navy)
  - Body text: `#425466` (Stripe slate)
  - Muted/labels: `#697386`
  - Accent (links, CTAs, eyebrows): `#635BFF` (blurple); hover `#7A73FF`
  - Background: `#FFFFFF`; alt section: `#F6F9FC` (pale blue); dark stat band: `#0A2540`
  - Border/hairline: `#E3E8EE`
  - Gradient: skewed multicolor mesh — cyan `#00D4FF` → blue `#635BFF` → purple `#A960EE` →
    pink `#FF6FD8` → warm `#FF9966`, applied as layered radial/linear, clipped with a
    diagonal bottom edge (`clip-path: polygon(...)`).
- **Type:** Inter only. Hierarchy: hero ~`clamp(2.6rem,6vw,4rem)` weight 700–800 tight
  tracking (-0.02em); section titles ~`2rem` weight 700; body `1.0625rem`/1.6 in slate;
  **uppercase blurple eyebrows** `0.8rem` letter-spacing `.08em` above section titles.
  JetBrains Mono used ONLY inside the hero terminal snippet and project code bits.
- **Components/craft:** pill primary buttons (blurple, white text, hover translateY(-1px) +
  shadow); secondary buttons (white, hairline border, navy text); soft layered card
  shadows (`0 2px 5px rgba(60,66,87,.08), 0 1px 1px rgba(0,0,0,.06)`); real inline SVG
  icons (Lucide-style strokes, no emoji); tabular figures (`font-variant-numeric:
  tabular-nums`) for stats; max content width ~1080px.
- **Motion:** subtle staggered fade/translate on scroll (Intersection Observer, reuse),
  150–250ms ease; respect `prefers-reduced-motion`.

## Page Structure

1. **Nav** — name-logo "James Bruning" (or "JB") left; links (work, project, experience);
   prominent blurple **"Get in touch"** pill right. Sticky, translucent white, hairline
   bottom border.
2. **Hero** — multicolor gradient band with diagonal `clip-path` bottom edge. Eyebrow
   "Senior Data Engineer · Chicago"; headline **"Infrastructure for modern data teams."**;
   sub = James's one-liner ("I turn legacy data chaos into self-serve platforms.");
   CTAs: primary "View work", secondary "Résumé". A **floating product card** (white, soft
   shadow) showing a JetBrains-Mono terminal snippet ending in `PASS=19 ✓` (green check).
3. **Stack strip** — credibility band: label "Working across" + tool names as a tidy,
   muted row (Snowflake, Airflow, dbt, Spark, Apache Iceberg, Trino, Azure, Python). The
   Stripe "trusted by logos" pattern, text-based.
4. **What I build** — eyebrow + headline; 3 feature columns, each an SVG icon + title +
   one-liner + proof metric:
   - *Modernize legacy platforms* — Airflow/Spark/Snowflake migrations · "35→7 min batch"
   - *Automate the manual* — end-to-end Python pipelines · "31 steps → one command"
   - *Forecast with ML* — production models on real budgets · "73%→97% accuracy"
5. **Featured project** — Stripe-style product showcase for `iceberg-lakehouse-lab`:
   eyebrow "Featured project", title, pitch, a **CSS-rendered architecture diagram**
   (MinIO ↔ REST catalog ↔ Spark/Trino — boxes + connectors, not ASCII), stack badges, the
   5 Iceberg capabilities as a small grid, GitHub + blog buttons.
6. **Experience** — eyebrow + headline; clean two-column rows (role/org/period left,
   bullets right) for the two Northwestern roles + an education line. No timeline.
7. **By the numbers** — a **dark navy band** (`#0A2540`) with 4 big tabular stats in
   gradient/white: `73→97%`, `$20M`, `120+`, `35→7 min`, each with a caption.
8. **Closing CTA** — gradient section: headline "Let's build something.", short line,
   blurple "Email me" button + LinkedIn/GitHub links.
9. **Footer** — clean: name + role, quick links, "Built with Astro", copyright.

## Architecture (Astro)

Reuse the content-driven pattern. Files:
- `src/data/content.ts` — extend: add `stack` (tool list), `valueProps` (3 pillars),
  `terminalSnippet` (hero card lines); keep `profile`, `experience`, `education`,
  `project`, `impact`, reword as needed.
- `src/styles/global.css` — replace with light Stripe tokens + base.
- `src/layouts/Layout.astro` — light theme, meta/OG, Inter (+ mono subset for snippet).
- Components (replace set): `Nav.astro`, `Hero.astro`, `StackStrip.astro` (new),
  `ValueProps.astro` (new), `FeaturedProject.astro`, `Experience.astro`, `Stats.astro`
  (replaces Impact), `Contact.astro`, `Footer.astro` (new).
- `src/components/icons/` — a few inline SVG icon snippets (or an `Icon.astro` with a name
  prop) for value-prop icons. Lucide-style, `currentColor`, 1.75 stroke.
- `src/scripts/reveal.ts` — keep (scroll reveal).
- Remove: `About.astro`, `Skills.astro`, `Impact.astro` (superseded), the aurora/mono/
  timeline styles.

Each component owns one section; content stays in `content.ts`.

## Accessibility

- Contrast: navy `#0A2540` on white ≈ 15:1; slate `#425466` on white ≈ 7:1; blurple
  `#635BFF` on white ≈ 4.6:1 (AA for normal text) — verify CTA text uses white on blurple
  (high contrast). Stat band: white/light text on navy.
- Keep `:focus-visible` rings (blurple), `prefers-reduced-motion`, semantic landmarks,
  alt/aria on icons (decorative icons `aria-hidden`), keyboard nav, no horizontal scroll.
- Gradient is decorative (`aria-hidden`); never the sole carrier of meaning.

## Testing / Verification

- `npm run build` clean; `npm run preview` renders all 9 sections.
- Headless screenshots at 1440 + 390 to verify gradient clip-path, layout, and mobile
  reflow (account for Chrome's ~500px min-window when shooting "mobile").
- Responsive checks 375 / 768 / 1280; reduced-motion disables reveal/gradient animation.
- Lighthouse a11y/perf sanity pass.

## Content Source

Copy/metrics from existing `content.ts` + CV. Confirmed links: GitHub
github.com/jabrunin001, LinkedIn linkedin.com/in/jtb96, project repo
github.com/jabrunin001/iceberg-lakehouse-lab. Résumé still a `public/resume.pdf`
placeholder (James to replace).

## Location & Deploy

Same repo `~/Projects/jamesbruning-portfolio` → `jabrunin001/jabrunin001.github.io`,
live at https://jabrunin001.github.io/. Existing GH Pages Actions workflow + `astro.config`
unchanged. The current green dark site history remains in git (revertable).
