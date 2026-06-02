# Project Live Dashboards (Stripe-themed) — Design Spec

**Date:** 2026-06-02
**Status:** Approved (design), pending implementation plan
**Author:** James Bruning

## Purpose

Give James's three portfolio projects matching live, static dashboards on GitHub Pages —
similar in utility to the existing `llm-eval-pipeline` dashboard, and styled to match the
Stripe-themed portfolio. A recruiter can click "Live dashboard" on any project card and
see real output from an actual pipeline run, not just a repo.

Scope:
1. Build a NEW Stripe-themed dashboard for `iceberg-lakehouse-lab` (real data).
2. Build a NEW Stripe-themed dashboard for `realtime-feature-pipeline` (real data).
3. Restyle the EXISTING `llm-eval-pipeline` dashboard to the same Stripe theme (keep its
   data + tabs).
4. Wire "Live dashboard" links into the portfolio for iceberg + realtime.

## Decisions (locked during brainstorming)

| Decision | Choice |
|----------|--------|
| Pattern | Static `docs/index.html` + `data.js` + `style.css`, Chart.js + Lucide via CDN, tabbed; served from `main/docs` on GitHub Pages (matches llm-eval) |
| Data | **Real** for all. realtime: extract from the running stack. iceberg: re-run + export. llm-eval: keep existing real data. |
| Theme | Stripe: light `#f6f9fc` canvas, white cards, navy `#0a2540`, blurple `#635bff`, Inter, subtle gradient header |
| llm-eval | Restyle to match (data/tabs unchanged) |
| Framing | Read-only snapshot of a real run (not live-updating), stated honestly in each dashboard |

## Shared Stripe-Dashboard System

A consistent look reused across all three repos' `docs/` (each self-contained, since they
are separate repos):
- **Palette/type:** canvas `#f6f9fc`; cards `#fff` with soft shadow `0 2px 5px
  rgba(60,66,87,.08)`; headings navy `#0a2540`; body slate `#425466`; accent blurple
  `#635bff`; border `#e3e8ee`; Inter (Google Fonts) + a mono fallback for code/ids.
- **Header:** a slim gradient strip (cyan→blurple→pink, low opacity) echoing the portfolio
  hero, with the repo name, a one-line subtitle, and a "Snapshot of a real run · <date>"
  note. A "View repo ↗" link back to GitHub.
- **Tab bar:** pill/underline tabs (Overview + domain tabs + Lineage).
- **KPI cards:** label + big tabular number (+ optional sub-caption).
- **Charts:** Chart.js, blurple/cyan/violet series, light gridlines `#eef1f6`, tooltips on,
  `aria-label` + a text summary near each chart for accessibility.
- **Files per repo:** `docs/index.html`, `docs/style.css`, `docs/app.js` (tab + render
  logic), `docs/data.js` (the baked-in real data as a JS object).

## Dashboard 1 — iceberg-lakehouse-lab

Data: re-run `make up/seed/ingest/build/test/demo`; export gold marts via Trino to JSON +
capture metadata.
- **Overview** — KPI cards: 9,742 movies / 100,836 ratings / 14,000 events; 12 tables
  (5 bronze, 4 silver, 3 gold); dbt tests 19/19; Great Expectations 4/4; 7 daily partitions.
- **Engagement** — from gold marts: top titles by unique viewers (bar); daily active users
  over the 7 days (line); completion-rate vs avg-rating (scatter).
- **Iceberg features** — 5 capabilities with real demo numbers: time-travel/rollback (row
  counts), schema evolution (column added, 14,000 NULLs), hidden partitioning (7 partitions),
  compaction (files before/after), snapshot expiry (2→1).
- **Lineage** — bronze → silver → gold table flow.

## Dashboard 2 — realtime-feature-pipeline

Data: extract from the currently-running stack (Kafka/Redis/MinIO/MLflow/serving) before it
is stopped to free Docker memory for the iceberg re-run.
- **Overview** — KPI cards: consistency match rate 1.0000; events processed; features
  computed; model name/version (MLflow); serving latency (sampled from the FastAPI app).
- **Features** — session-feature distributions (e.g., watch time, rebuffer counts, bitrate)
  and freshness.
- **Model** — rebuffering-risk model: metrics (AUC/accuracy from MLflow); LightGBM feature
  importance (bar); prediction-score distribution (histogram).
- **Consistency** — online (Redis) vs offline (Delta) zero-skew: match rate + a few sampled
  online-vs-offline rows; point-in-time correctness note.
- **Lineage** — Kafka → Spark Structured Streaming → Redis + Delta → FastAPI.

## Dashboard 3 — llm-eval-pipeline (restyle only)

Keep `docs/data.js` and the four tabs (Overview / Performance / Completions / Lineage).
Replace `docs/` styling with the shared Stripe system. No data changes.

## Data Sequencing (Docker ~7.7 GB)

1. While the realtime stack is up: extract its metrics/data → write `realtime` `data.js`.
2. Stop the realtime stack (`docker compose down`) to free memory.
3. Bring up iceberg (`make up` …), run pipeline + demos, export → write `iceberg` `data.js`.
4. Tear down iceberg stack when done.

## Deploy & Wiring

- For iceberg + realtime repos: commit `docs/`, push, enable Pages via
  `gh api -X POST repos/{owner}/{repo}/pages -f source[branch]=main -f source[path]=/docs`
  (legacy build, same as llm-eval). Verify the live URL serves.
- llm-eval: already on `main/docs`; just push the restyle.
- Portfolio `content.ts`: add a `{ label: "Live dashboard", url: ".../", icon: "external" }`
  link to the iceberg and realtime project cards. Rebuild + deploy portfolio.
- Resulting live URLs:
  - https://jabrunin001.github.io/iceberg-lakehouse-lab/
  - https://jabrunin001.github.io/realtime-feature-pipeline/
  - https://jabrunin001.github.io/llm-eval-pipeline/ (restyled)

## Accessibility

Semantic landmarks; tabs keyboard-operable with `aria-selected`; each chart has an
`aria-label` and an adjacent text summary; AA contrast (navy/slate on light, white on
blurple); `prefers-reduced-motion` respected for any transitions; charts not color-only
(labels/legends present).

## Testing / Verification

- Each dashboard: open locally (file:// or a simple server), verify all tabs render, charts
  draw, numbers match the exported data, no console errors. Headless screenshot per
  dashboard before deploy.
- After deploy: `curl` each Pages URL for HTTP 200 + a known string.
- Portfolio: rebuild, confirm the two new "Live dashboard" links resolve.

## Non-Goals (YAGNI)

No live/auto-refreshing data, no backend, no auth, no build step. Dashboards are static
snapshots. No new charts beyond those listed. No change to pipeline code (only adding
`docs/` + a small export script per repo).

## Location

Coordinating spec/plan: this file (portfolio repo `docs/superpowers/`). Dashboard code:
each project repo's `docs/`. Real-data export scripts: each project repo (e.g.,
`scripts/export_dashboard_data.py` or a `make dashboard-data` target), so the dashboard is
reproducible, not hand-pasted.
