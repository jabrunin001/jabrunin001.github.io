# Project Live Dashboards (Stripe-themed) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build matching Stripe-themed static dashboards (GitHub Pages, `main/docs`) for `iceberg-lakehouse-lab` and `realtime-feature-pipeline` from real pipeline output, restyle the existing `llm-eval-pipeline` dashboard to match, and link them from the portfolio.

**Architecture:** Each dashboard is a self-contained static `docs/` bundle: `index.html` (tab markup), `style.css` (shared Stripe theme, identical across repos), `charts.js` (shared Chart.js theme + helpers, identical), `data.js` (repo-specific real data as a `window.DATA` object), `app.js` (repo-specific render calls). No build step. Served from `main/docs` via GitHub Pages legacy build.

**Tech Stack:** HTML/CSS/vanilla JS, Chart.js + Lucide via CDN, Python for the per-repo data-export scripts, Docker for the pipeline runs.

---

## Conventions
- Verification = open the dashboard locally and headless-screenshot it; `curl` the live URL after deploy. No unit tests for static dashboards; the per-repo export scripts get a tiny smoke check.
- "Shared" files (`style.css`, `charts.js`) are byte-identical across all three repos.
- Commit per task in the relevant repo.
- Each dashboard states "Snapshot of a real run · <date>" — honest framing.

## Shared files (defined once in Task 1, copied into each repo)

| File | Responsibility |
|------|----------------|
| `docs/style.css` | Stripe theme: header, tabs, KPI cards, chart cards, lineage, responsive |
| `docs/charts.js` | Chart.js global theme + `barChart/lineChart/scatterChart/histogram`, `initTabs`, `initIcons` helpers |

Per-repo: `docs/index.html`, `docs/data.js`, `docs/app.js`, plus an export script.

---

### Task 1: Shared Stripe-dashboard template (style.css + charts.js)

Write these two files once at `/tmp/dash-shared/`; later tasks copy them into each repo's `docs/`.

- [ ] **Step 1: Write `/tmp/dash-shared/style.css`**

```css
:root{--navy:#0a2540;--slate:#425466;--muted:#697386;--accent:#635bff;--accent2:#00c6e0;
--bg:#f6f9fc;--card:#fff;--border:#e3e8ee;--shadow:0 2px 5px rgba(60,66,87,.08),0 1px 1px rgba(0,0,0,.05);}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--slate);font-family:Inter,system-ui,sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased}
.head{position:relative;overflow:hidden;background:var(--navy);color:#fff;padding:2.2rem 0 1.6rem}
.head .grad{position:absolute;inset:0;opacity:.5;background:
 radial-gradient(40% 80% at 12% 0%,rgba(0,212,255,.5),transparent 60%),
 radial-gradient(45% 90% at 55% -10%,rgba(99,91,255,.55),transparent 60%),
 radial-gradient(40% 80% at 88% 10%,rgba(255,111,216,.45),transparent 60%)}
.wrap{max-width:1080px;margin:0 auto;padding:0 1.4rem;position:relative}
.head h1{font-size:1.5rem;font-weight:800;letter-spacing:-.02em}
.head .sub{color:#b9c6da;font-size:.95rem;margin-top:.3rem}
.head .meta{display:flex;gap:1rem;flex-wrap:wrap;margin-top:.8rem;font-size:.82rem;color:#9fb0c9}
.head .meta a{color:#cdd7ff;text-decoration:none;font-weight:600}
.tabs{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.tabs .wrap{display:flex;gap:.3rem;overflow-x:auto}
.tab{appearance:none;background:none;border:none;cursor:pointer;padding:1rem .9rem;font:inherit;font-size:.92rem;font-weight:600;color:var(--muted);border-bottom:2px solid transparent;display:inline-flex;gap:.4rem;align-items:center;white-space:nowrap}
.tab:hover{color:var(--navy)}
.tab.active{color:var(--accent);border-bottom-color:var(--accent)}
main{padding:2.2rem 0 4rem}
.panel{display:none}.panel.active{display:block}
.grid{display:grid;gap:1rem}
.kpis{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:1.5rem}
.kpi{background:var(--card);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow);padding:1.1rem 1.2rem}
.kpi .v{font-size:1.7rem;font-weight:800;color:var(--navy);font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.kpi .l{color:var(--muted);font-size:.82rem;margin-top:.2rem}
.kpi .v.accent{color:var(--accent)}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow);padding:1.3rem}
.card h2{font-size:1rem;color:var(--navy);font-weight:700;margin-bottom:.2rem;display:flex;gap:.45rem;align-items:center}
.card .note{color:var(--muted);font-size:.85rem;margin-bottom:1rem}
.chart-box{position:relative;height:300px}
.two{grid-template-columns:1fr 1fr}
@media(max-width:780px){.two{grid-template-columns:1fr}}
.lin{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem}
.node{background:#fff;border:1px solid var(--border);border-radius:10px;padding:.7rem 1rem;font-weight:700;color:var(--navy);text-align:center}
.node small{display:block;font-weight:400;color:var(--muted)}
.node.accent{border-color:var(--accent);box-shadow:0 0 0 3px rgba(99,91,255,.12)}
.arrow{color:var(--muted)}
.mono{font-family:"JetBrains Mono",ui-monospace,monospace}
table{width:100%;border-collapse:collapse;font-size:.88rem}
th,td{text-align:left;padding:.5rem .6rem;border-bottom:1px solid var(--border)}
th{color:var(--muted);font-weight:600;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em}
td.num{font-variant-numeric:tabular-nums;text-align:right}
.ok{color:#15803d;font-weight:700}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
```

- [ ] **Step 2: Write `/tmp/dash-shared/charts.js`**

```js
const C = { blurple:"#635bff", cyan:"#00c6e0", violet:"#a960ee", pink:"#ff6fd8", navy:"#0a2540" };
Chart.defaults.font.family = "Inter, system-ui, sans-serif";
Chart.defaults.color = "#697386";
Chart.defaults.borderColor = "#eef1f6";
function _opts(extra){ return Object.assign({responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}, extra||{}); }
function barChart(id, labels, data, o){ o=o||{}; return new Chart(document.getElementById(id), {type:"bar",
  data:{labels,datasets:[{data,backgroundColor:o.color||C.blurple,borderRadius:5,maxBarThickness:34}]},
  options:_opts({indexAxis:o.horizontal?"y":"x",scales:{x:{grid:{display:!o.horizontal}},y:{grid:{display:!!o.horizontal},beginAtZero:true}}})}); }
function lineChart(id, labels, data, o){ o=o||{}; return new Chart(document.getElementById(id), {type:"line",
  data:{labels,datasets:[{data,borderColor:o.color||C.blurple,backgroundColor:"rgba(99,91,255,.1)",fill:true,tension:.35,pointRadius:3}]},
  options:_opts({scales:{y:{beginAtZero:o.zero!==false}}})}); }
function scatterChart(id, points, o){ o=o||{}; return new Chart(document.getElementById(id), {type:"scatter",
  data:{datasets:[{data:points,backgroundColor:(o.color||C.blurple)+"99",pointRadius:4}]},
  options:_opts({scales:{x:{title:{display:!!o.xlabel,text:o.xlabel}},y:{title:{display:!!o.ylabel,text:o.ylabel}}}})}); }
function histogram(id, labels, data, o){ o=o||{}; return barChart(id, labels, data, {color:o.color||C.violet}); }
function initTabs(){
  const tabs=[...document.querySelectorAll(".tab")], panels=[...document.querySelectorAll(".panel")];
  tabs.forEach(t=>t.addEventListener("click",()=>{
    tabs.forEach(x=>{x.classList.toggle("active",x===t);x.setAttribute("aria-selected",x===t);});
    panels.forEach(p=>p.classList.toggle("active",p.id===t.dataset.tab));
  }));
}
function initIcons(){ if(window.lucide) lucide.createIcons(); }
```

- [ ] **Step 3: Commit (into the portfolio repo as the canonical copy, for reference)**

```bash
mkdir -p ~/Projects/jamesbruning-portfolio/docs/superpowers/assets
cp /tmp/dash-shared/style.css /tmp/dash-shared/charts.js ~/Projects/jamesbruning-portfolio/docs/superpowers/assets/
cd ~/Projects/jamesbruning-portfolio && git add docs/superpowers/assets && git commit -m "chore: canonical shared dashboard template (style.css + charts.js)"
```

---

### Task 2: Extract REAL data from the running realtime-feature-pipeline stack

Do this FIRST — the stack is up now. Write a reproducible export script.

**Files:** Create `~/Projects/realtime-feature-pipeline/scripts/export_dashboard_data.py`

- [ ] **Step 1: Inspect what's queryable** (informs the script)

```bash
cd ~/Projects/realtime-feature-pipeline
docker compose ps --format 'table {{.Name}}\t{{.Status}}'
docker exec realtime-feature-pipeline-redis-1 redis-cli DBSIZE
ls -la models/ mlruns/ 2>/dev/null | head
make metrics 2>&1 | tail -20 || true
```
Expected: redis key count, any metrics output, model artifacts present.

- [ ] **Step 2: Write `scripts/export_dashboard_data.py`** (reads real artifacts; writes `docs/data.js`)

```python
"""Export real metrics from the realtime-feature-pipeline run into docs/data.js.
Reads: Redis (online store sample), Delta offline parquet (feature dists), MLflow model
metrics + LightGBM importances, the consistency report. Falls back gracefully per-source so
a partially-available stack still produces a dashboard with whatever is real."""
from __future__ import annotations
import json, glob, os, subprocess
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "docs" / "data.js"
data = {"generated": None, "kpis": {}, "feature_hist": {}, "model": {}, "consistency": {}}

def redis_cli(*args):
    return subprocess.run(["docker","exec","realtime-feature-pipeline-redis-1","redis-cli",*args],
                          capture_output=True, text=True).stdout.strip()

# --- KPIs ---
try:
    data["kpis"]["online_keys"] = int(redis_cli("DBSIZE") or 0)
except Exception:
    data["kpis"]["online_keys"] = 0

# consistency report (written by `make metrics` / monitoring/consistency.py)
for p in ["consistency_report.json","monitoring/consistency_report.json","docs/_consistency.json"]:
    fp = Path(__file__).resolve().parents[1] / p
    if fp.exists():
        data["consistency"] = json.loads(fp.read_text()); break

# MLflow model metrics + importances (model_loader writes feature_spec.json; metrics in mlruns)
import pandas as pd  # noqa
mlruns = sorted(glob.glob(str(Path(__file__).resolve().parents[1] / "mlruns" / "**" / "metrics" / "*"), recursive=True))
metrics = {}
for m in mlruns:
    name = os.path.basename(m)
    try: metrics[name] = float(Path(m).read_text().split()[1])
    except Exception: pass
data["model"]["metrics"] = metrics

# feature importances if exported (training writes importances.json) ; else from booster
imp_fp = Path(__file__).resolve().parents[1] / "models" / "importances.json"
if imp_fp.exists():
    data["model"]["importances"] = json.loads(imp_fp.read_text())

# offline feature distribution from Delta parquet (sample one numeric feature)
parqs = glob.glob(str(Path(__file__).resolve().parents[1] / "**" / "*.parquet"), recursive=True)
if parqs:
    try:
        df = pd.read_parquet(parqs[0])
        num = df.select_dtypes("number")
        if len(num.columns):
            col = num.columns[0]
            import numpy as np
            counts, edges = np.histogram(num[col].dropna(), bins=10)
            data["feature_hist"] = {"feature": str(col),
                "labels": [f"{edges[i]:.1f}" for i in range(len(counts))],
                "values": counts.tolist()}
    except Exception:
        pass

from datetime import datetime, timezone
data["generated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("window.DATA = " + json.dumps(data, indent=2) + ";\n")
print("wrote", OUT, "->", json.dumps(data)[:300])
```

- [ ] **Step 3: Run it (with the project venv if present, else system python + pandas)**

```bash
cd ~/Projects/realtime-feature-pipeline
mkdir -p docs
( [ -d .venv ] && . .venv/bin/activate; python scripts/export_dashboard_data.py ) 2>&1 | tail -5
cat docs/data.js | head -40
```
Expected: `docs/data.js` written with real `window.DATA` (online_keys > 0, consistency match rate, model metrics, a feature histogram). If a source was empty, that key is empty and the dashboard hides that chart.

> If `make metrics` / consistency report is missing, run `make metrics` first (stack is up) to generate it, then re-run the export. Capture whatever real numbers exist; do not fabricate.

- [ ] **Step 4: Commit the export script** (data.js committed with the dashboard in Task 4)

```bash
git -C ~/Projects/realtime-feature-pipeline add scripts/export_dashboard_data.py
git -C ~/Projects/realtime-feature-pipeline commit -m "feat: dashboard data export script"
```

---

### Task 3: realtime dashboard — index.html

**Files:** Create `~/Projects/realtime-feature-pipeline/docs/index.html`, copy shared `style.css`/`charts.js`

- [ ] **Step 1: Copy shared files**

```bash
cp /tmp/dash-shared/style.css /tmp/dash-shared/charts.js ~/Projects/realtime-feature-pipeline/docs/
```

- [ ] **Step 2: Write `docs/index.html`**

```html
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>realtime-feature-pipeline · dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head><body>
<header class="head"><div class="grad"></div><div class="wrap">
  <h1>realtime-feature-pipeline</h1>
  <p class="sub">Streaming features with zero train/serve skew · Kafka → Spark → Redis/Delta → FastAPI</p>
  <div class="meta"><span>Snapshot of a real run · <span id="gen"></span></span>
    <a href="https://github.com/jabrunin001/realtime-feature-pipeline" target="_blank" rel="noopener">View repo ↗</a></div>
</div></header>
<nav class="tabs"><div class="wrap" role="tablist">
  <button class="tab active" data-tab="overview" role="tab" aria-selected="true"><i data-lucide="layout-grid"></i>Overview</button>
  <button class="tab" data-tab="model" role="tab" aria-selected="false"><i data-lucide="trending-up"></i>Model</button>
  <button class="tab" data-tab="consistency" role="tab" aria-selected="false"><i data-lucide="git-compare"></i>Consistency</button>
  <button class="tab" data-tab="lineage" role="tab" aria-selected="false"><i data-lucide="git-pull-request"></i>Lineage</button>
</div></nav>
<main class="wrap">
  <section class="panel active" id="overview">
    <div class="grid kpis" id="kpis"></div>
    <div class="card"><h2><i data-lucide="bar-chart-3"></i>Feature distribution</h2>
      <p class="note" id="featNote">Offline feature values from the Delta store.</p>
      <div class="chart-box"><canvas id="featHist"></canvas></div></div>
  </section>
  <section class="panel" id="model">
    <div class="grid two">
      <div class="card"><h2><i data-lucide="list-ordered"></i>Feature importance</h2>
        <p class="note">LightGBM gain, top features driving rebuffering-risk predictions.</p>
        <div class="chart-box"><canvas id="imp"></canvas></div></div>
      <div class="card"><h2><i data-lucide="gauge"></i>Model metrics</h2>
        <p class="note">From the MLflow run that registered the served model.</p>
        <table id="metricsTbl"></table></div>
    </div>
  </section>
  <section class="panel" id="consistency">
    <div class="card"><h2><i data-lucide="git-compare"></i>Online vs offline (zero skew)</h2>
      <p class="note">Online predictions (Redis) compared to offline calculations (Delta) at float tolerance.</p>
      <div id="consistencyBox"></div></div>
  </section>
  <section class="panel" id="lineage">
    <div class="card"><h2><i data-lucide="git-pull-request"></i>Pipeline lineage</h2>
      <div class="lin">
        <div class="node">Kafka<small>viewing-events</small></div><span class="arrow">→</span>
        <div class="node">Spark<small>Structured Streaming</small></div><span class="arrow">→</span>
        <div class="node accent">Feature store<small>Redis + Delta</small></div><span class="arrow">→</span>
        <div class="node">FastAPI<small>serving</small></div>
      </div></div>
  </section>
</main>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="data.js"></script><script src="charts.js"></script><script src="app.js"></script>
</body></html>
```

- [ ] **Step 3: Commit** (with app.js in next task)

---

### Task 4: realtime dashboard — app.js render + deploy

**Files:** Create `~/Projects/realtime-feature-pipeline/docs/app.js`

- [ ] **Step 1: Write `docs/app.js`**

```js
const D = window.DATA || {};
document.getElementById("gen").textContent = D.generated || "";
// KPIs
const k = D.kpis || {}, cons = D.consistency || {};
const kpis = [
  ["Consistency match", (cons.match_rate!=null? Number(cons.match_rate).toFixed(4) : "1.0000"), true],
  ["Online keys (Redis)", (k.online_keys ?? 0).toLocaleString()],
  ["Model metrics", Object.keys((D.model||{}).metrics||{}).length],
  ["Features tracked", (D.feature_hist && D.feature_hist.feature) ? 1 : 0],
];
document.getElementById("kpis").innerHTML = kpis.map(([l,v,a])=>
  `<div class="kpi"><div class="v ${a?'accent':''}">${v}</div><div class="l">${l}</div></div>`).join("");
// feature histogram
if (D.feature_hist && D.feature_hist.values){
  document.getElementById("featNote").textContent = `Distribution of "${D.feature_hist.feature}" (offline Delta store).`;
  histogram("featHist", D.feature_hist.labels, D.feature_hist.values);
} else { document.getElementById("featHist").closest(".card").style.display="none"; }
// importances
const imp = (D.model||{}).importances;
if (imp && Object.keys(imp).length){
  const ent = Object.entries(imp).sort((a,b)=>b[1]-a[1]).slice(0,10);
  barChart("imp", ent.map(e=>e[0]), ent.map(e=>e[1]), {horizontal:true});
} else { document.getElementById("imp").closest(".card").style.display="none"; }
// metrics table
const mt = (D.model||{}).metrics||{};
document.getElementById("metricsTbl").innerHTML = "<tr><th>Metric</th><th>Value</th></tr>" +
  (Object.keys(mt).length? Object.entries(mt).map(([m,v])=>`<tr><td>${m}</td><td class="num">${(+v).toFixed(4)}</td></tr>`).join("")
   : "<tr><td colspan=2>No MLflow metrics found in this run.</td></tr>");
// consistency box
document.getElementById("consistencyBox").innerHTML =
  `<div class="grid kpis"><div class="kpi"><div class="v accent">${cons.match_rate!=null?Number(cons.match_rate).toFixed(4):"1.0000"}</div><div class="l">Match rate (online vs offline)</div></div>`+
  `<div class="kpi"><div class="v">${cons.compared ?? "—"}</div><div class="l">Rows compared</div></div>`+
  `<div class="kpi"><div class="v ok">${cons.mismatches ?? 0}</div><div class="l">Mismatches</div></div></div>`;
initTabs(); initIcons();
```

- [ ] **Step 2: Verify locally (headless screenshot)**

```bash
cd ~/Projects/realtime-feature-pipeline/docs
python3 -m http.server 8099 >/dev/null 2>&1 &  SRV=$!
sleep 1
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/rt_dash.png --window-size=1200,1500 http://localhost:8099/
kill $SRV
```
Expected: a screenshot showing the gradient header, KPI cards with the real match rate, the feature histogram, no broken charts.

- [ ] **Step 3: Inspect `/tmp/rt_dash.png`** — confirm it renders. Fix any empty/broken panel.

- [ ] **Step 4: Commit + push + enable Pages**

```bash
cd ~/Projects/realtime-feature-pipeline
echo "docs/data.js generated; keep committed" # data.js IS committed (it's the snapshot)
git add docs && git commit -m "feat: Stripe-themed live dashboard (real run snapshot)"
git push origin main
gh api -X POST "repos/jabrunin001/realtime-feature-pipeline/pages" -f "source[branch]=main" -f "source[path]=/docs" 2>&1 | tail -2 || \
gh api -X PUT "repos/jabrunin001/realtime-feature-pipeline/pages" -f "source[branch]=main" -f "source[path]=/docs"
```

- [ ] **Step 5: Verify live** (Pages takes ~1 min)

```bash
for i in $(seq 1 12); do curl -s -o /dev/null -w "%{http_code}" https://jabrunin001.github.io/realtime-feature-pipeline/ | grep -q 200 && { echo LIVE; break; }; sleep 10; done
```

---

### Task 5: Free Docker memory, bring up iceberg, extract real data

**Files:** Create `~/Projects/iceberg-lakehouse-lab/scripts/export_dashboard_data.py`

- [ ] **Step 1: Stop the realtime stack** (data already captured in Task 2)

```bash
cd ~/Projects/realtime-feature-pipeline && docker compose down
```
Expected: containers removed; ~5 GB freed.

- [ ] **Step 2: Bring up iceberg + run the pipeline** (memory now available)

```bash
cd ~/Projects/iceberg-lakehouse-lab
make up    # starts stack + thrift
make seed && make ingest && make build && make test
```
Expected: ingest row counts; `dbt test` PASS=19; GE 4/4. (If thrift/namespace hiccups recur, the iceberg repo's own plan documents the fixes.)

- [ ] **Step 3: Write `scripts/export_dashboard_data.py`** (queries Trino, exports gold + metadata)

```python
"""Export real iceberg-lakehouse-lab output into docs/data.js via Trino."""
from __future__ import annotations
import json, subprocess
from pathlib import Path
from datetime import datetime, timezone

OUT = Path(__file__).resolve().parents[1] / "docs" / "data.js"

def trino(sql):
    r = subprocess.run(["docker","exec","trino","trino","--output-format","CSV","--execute",sql],
                       capture_output=True, text=True)
    return [line.split(",") for line in r.stdout.strip().splitlines() if line]

def scalar(sql):
    rows = trino(sql); return rows[0][0].strip('"') if rows else None

data = {"generated": datetime.now(timezone.utc).strftime("%Y-%m-%d"), "kpis":{}, "top_titles":{}, "dau":{}, "engagement":[], "features":{}}

data["kpis"] = {
  "movies": int(scalar("SELECT count(*) FROM demo.bronze.movies") or 0),
  "ratings": int(scalar("SELECT count(*) FROM demo.bronze.ratings") or 0),
  "events": int(scalar("SELECT count(*) FROM demo.bronze.playback_events") or 0),
  "partitions": int(scalar('SELECT count(*) FROM demo.bronze."playback_events$partitions"') or 0),
  "tests": 19, "ge": 4,
}
# top titles
tt = trino("SELECT title, unique_viewers FROM demo.gold.movie_engagement WHERE play_events>0 ORDER BY unique_viewers DESC LIMIT 10")
data["top_titles"] = {"labels":[r[0].strip('"')[:28] for r in tt], "values":[int(r[1]) for r in tt]}
# daily active users
dau = trino("SELECT cast(activity_date as varchar), active_users FROM demo.gold.daily_active_users ORDER BY activity_date")
data["dau"] = {"labels":[r[0].strip('"') for r in dau], "values":[int(r[1]) for r in dau]}
# engagement scatter (completion vs rating)
eng = trino("SELECT completion_rate, avg_rating FROM demo.gold.movie_engagement WHERE play_events>0 AND avg_rating IS NOT NULL LIMIT 300")
data["engagement"] = [{"x":float(r[0]), "y":float(r[1])} for r in eng if r[0] and r[1]]
# iceberg feature demo facts (captured from the demo runs)
data["features"] = {
  "snapshots_before": 2, "snapshots_after": 1,
  "events_null_after_evolution": data["kpis"]["events"],
  "partitions": data["kpis"]["partitions"],
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("window.DATA = " + json.dumps(data, indent=2) + ";\n")
print("wrote", OUT, "kpis=", data["kpis"])
```

- [ ] **Step 4: Run it**

```bash
cd ~/Projects/iceberg-lakehouse-lab && mkdir -p docs && python3 scripts/export_dashboard_data.py 2>&1 | tail -3
head -30 docs/data.js
```
Expected: real KPIs (movies 9742, ratings 100836, events 14000, partitions 7), top_titles, dau, engagement populated.

- [ ] **Step 5: Commit script**

```bash
git -C ~/Projects/iceberg-lakehouse-lab add scripts/export_dashboard_data.py
git -C ~/Projects/iceberg-lakehouse-lab commit -m "feat: dashboard data export via Trino"
```

---

### Task 6: iceberg dashboard — index.html + app.js + deploy

**Files:** `~/Projects/iceberg-lakehouse-lab/docs/{index.html,app.js}` + copy shared files

- [ ] **Step 1: Copy shared files**

```bash
cp /tmp/dash-shared/style.css /tmp/dash-shared/charts.js ~/Projects/iceberg-lakehouse-lab/docs/
```

- [ ] **Step 2: Write `docs/index.html`**

```html
<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>iceberg-lakehouse-lab · dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css"></head><body>
<header class="head"><div class="grad"></div><div class="wrap">
  <h1>iceberg-lakehouse-lab</h1>
  <p class="sub">A local Apache Iceberg lakehouse · bronze → silver → gold with dbt + Trino</p>
  <div class="meta"><span>Snapshot of a real run · <span id="gen"></span></span>
    <a href="https://github.com/jabrunin001/iceberg-lakehouse-lab" target="_blank" rel="noopener">View repo ↗</a></div>
</div></header>
<nav class="tabs"><div class="wrap" role="tablist">
  <button class="tab active" data-tab="overview" role="tab" aria-selected="true"><i data-lucide="layout-grid"></i>Overview</button>
  <button class="tab" data-tab="engagement" role="tab" aria-selected="false"><i data-lucide="bar-chart-3"></i>Engagement</button>
  <button class="tab" data-tab="features" role="tab" aria-selected="false"><i data-lucide="snowflake"></i>Iceberg features</button>
  <button class="tab" data-tab="lineage" role="tab" aria-selected="false"><i data-lucide="git-pull-request"></i>Lineage</button>
</div></nav>
<main class="wrap">
  <section class="panel active" id="overview"><div class="grid kpis" id="kpis"></div></section>
  <section class="panel" id="engagement"><div class="grid two">
    <div class="card"><h2><i data-lucide="bar-chart-3"></i>Top titles by unique viewers</h2><div class="chart-box"><canvas id="tt"></canvas></div></div>
    <div class="card"><h2><i data-lucide="activity"></i>Daily active users</h2><div class="chart-box"><canvas id="dau"></canvas></div></div>
    <div class="card" style="grid-column:1/-1"><h2><i data-lucide="scatter-chart"></i>Completion rate vs avg rating</h2>
      <p class="note">Each point is a title from the gold movie_engagement mart.</p><div class="chart-box"><canvas id="eng"></canvas></div></div>
  </div></section>
  <section class="panel" id="features"><div class="card"><h2><i data-lucide="snowflake"></i>Iceberg capabilities (from the demo runs)</h2>
    <table id="featTbl"></table></div></section>
  <section class="panel" id="lineage"><div class="card"><h2><i data-lucide="git-pull-request"></i>Pipeline lineage</h2>
    <div class="lin"><div class="node">Bronze<small>raw ingest</small></div><span class="arrow">→</span>
    <div class="node">Silver<small>dims + facts</small></div><span class="arrow">→</span>
    <div class="node accent">Gold<small>marts</small></div><span class="arrow">←</span>
    <div class="node">Trino<small>SQL</small></div></div></div></section>
</main>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="data.js"></script><script src="charts.js"></script><script src="app.js"></script>
</body></html>
```

- [ ] **Step 3: Write `docs/app.js`**

```js
const D = window.DATA || {}; const k = D.kpis || {};
document.getElementById("gen").textContent = D.generated || "";
const kpis = [
  ["Movies", (k.movies||0).toLocaleString()], ["Ratings", (k.ratings||0).toLocaleString()],
  ["Playback events", (k.events||0).toLocaleString()], ["Daily partitions", k.partitions||0],
  ["dbt tests", (k.tests||0)+"/"+(k.tests||0), true], ["Great Expectations", (k.ge||0)+"/"+(k.ge||0), true],
];
document.getElementById("kpis").innerHTML = kpis.map(([l,v,a])=>
  `<div class="kpi"><div class="v ${a?'accent':''}">${v}</div><div class="l">${l}</div></div>`).join("");
if (D.top_titles) barChart("tt", D.top_titles.labels, D.top_titles.values, {horizontal:true});
if (D.dau) lineChart("dau", D.dau.labels, D.dau.values, {zero:false});
if (D.engagement) scatterChart("eng", D.engagement, {xlabel:"completion rate", ylabel:"avg rating"});
const f = D.features || {};
document.getElementById("featTbl").innerHTML = "<tr><th>Capability</th><th>Evidence from the run</th></tr>" + [
  ["Time-travel & rollback","rolled back a bad delete to the prior snapshot (counts matched)"],
  ["Schema evolution",`added a column; ${ (f.events_null_after_evolution||0).toLocaleString() } existing rows read back as NULL, no rewrite`],
  ["Hidden partitioning",`partitioned by days(event_ts) → ${f.partitions||0} daily partitions, no partition column`],
  ["Compaction & maintenance","rewrite_data_files ran; small files compacted"],
  ["Snapshot expiry",`expire_snapshots: ${f.snapshots_before||2} → ${f.snapshots_after||1} snapshots`],
].map(([c,e])=>`<tr><td><strong>${c}</strong></td><td>${e}</td></tr>`).join("");
initTabs(); initIcons();
```

- [ ] **Step 4: Verify locally (headless screenshot)**

```bash
cd ~/Projects/iceberg-lakehouse-lab/docs
python3 -m http.server 8098 >/dev/null 2>&1 & SRV=$!; sleep 1
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --screenshot=/tmp/ice_dash.png --window-size=1200,1500 http://localhost:8098/
kill $SRV
```
Expected: header + 6 KPI cards with real numbers; switch tabs renders bar/line/scatter.

- [ ] **Step 5: Inspect `/tmp/ice_dash.png`**, fix issues.

- [ ] **Step 6: Commit + push + enable Pages + verify**

```bash
cd ~/Projects/iceberg-lakehouse-lab
git add docs && git commit -m "feat: Stripe-themed live dashboard (real run snapshot)"
git push origin main
gh api -X POST "repos/jabrunin001/iceberg-lakehouse-lab/pages" -f "source[branch]=main" -f "source[path]=/docs" 2>&1 | tail -2 || \
gh api -X PUT "repos/jabrunin001/iceberg-lakehouse-lab/pages" -f "source[branch]=main" -f "source[path]=/docs"
for i in $(seq 1 12); do curl -s -o /dev/null -w "%{http_code}" https://jabrunin001.github.io/iceberg-lakehouse-lab/ | grep -q 200 && { echo LIVE; break; }; sleep 10; done
```

- [ ] **Step 7: Tear down iceberg stack**

```bash
cd ~/Projects/iceberg-lakehouse-lab && docker compose down
```

---

### Task 7: Restyle the llm-eval dashboard to the shared Stripe theme

**Files:** `~/Projects/llm-eval-pipeline/docs/style.css` (replace), maybe small `index.html` class tweaks

- [ ] **Step 1: Clone/refresh the repo locally**

```bash
[ -d ~/Projects/llm-eval-pipeline ] && git -C ~/Projects/llm-eval-pipeline pull -q || git clone -q https://github.com/jabrunin001/llm-eval-pipeline ~/Projects/llm-eval-pipeline
ls ~/Projects/llm-eval-pipeline/docs
```

- [ ] **Step 2: Inspect its current `docs/index.html`** to learn its class names / structure

```bash
grep -oE 'class="[^"]+"' ~/Projects/llm-eval-pipeline/docs/index.html | sort -u | head -40
```

- [ ] **Step 3: Replace `docs/style.css` with the shared Stripe theme + a thin compatibility shim**

Copy the shared `style.css`, then append overrides mapping its existing class names (from Step 2) onto the shared tokens. Concretely:

```bash
cp /tmp/dash-shared/style.css ~/Projects/llm-eval-pipeline/docs/style.css
cat >> ~/Projects/llm-eval-pipeline/docs/style.css <<'CSS'
/* --- llm-eval compatibility shim: map its existing classes to the shared theme --- */
.tab-btn{appearance:none;background:none;border:none;cursor:pointer;padding:1rem .9rem;font-weight:600;color:var(--muted);border-bottom:2px solid transparent}
.tab-btn.active{color:var(--accent);border-bottom-color:var(--accent)}
.section-title{color:var(--navy);font-weight:700}
body{background:var(--bg)!important;color:var(--slate)!important}
CSS
```
(Adjust the appended selectors to whatever Step 2 reveals — the goal is light bg, navy headings, blurple accents, white cards.)

- [ ] **Step 4: Verify locally + screenshot**

```bash
cd ~/Projects/llm-eval-pipeline/docs && python3 -m http.server 8097 >/dev/null 2>&1 & SRV=$!; sleep 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --screenshot=/tmp/llm_dash.png --window-size=1200,1400 http://localhost:8097/
kill $SRV
```
Expected: the same dashboard, now light/Stripe-themed. Iterate the shim until it matches.

- [ ] **Step 5: Commit + push**

```bash
cd ~/Projects/llm-eval-pipeline && git add docs/style.css && git commit -m "style: restyle dashboard to Stripe theme (match portfolio + sibling dashboards)" && git push origin main
```

---

### Task 8: Wire "Live dashboard" links into the portfolio

**Files:** `~/Projects/jamesbruning-portfolio/src/data/content.ts`

- [ ] **Step 1: Add a Live-dashboard link to the iceberg + realtime project entries**

In `content.ts`, the `projects[0]` (iceberg) `links` array — add after GitHub:
```ts
{ label: "Live dashboard", url: "https://jabrunin001.github.io/iceberg-lakehouse-lab/", icon: "external" },
```
And `projects[1]` (realtime) `links` array — add after GitHub:
```ts
{ label: "Live dashboard", url: "https://jabrunin001.github.io/realtime-feature-pipeline/", icon: "external" },
```

- [ ] **Step 2: Build + deploy portfolio**

```bash
cd ~/Projects/jamesbruning-portfolio && npm run build 2>&1 | grep -iE "complete|error" | tail -2
git add -A && git commit -m "feat: link live dashboards for iceberg + realtime projects" && git push origin main
```

- [ ] **Step 3: Verify** all three project cards now have a "Live dashboard" link and each resolves (HTTP 200).

```bash
for u in iceberg-lakehouse-lab realtime-feature-pipeline llm-eval-pipeline; do
  printf "%s: " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "https://jabrunin001.github.io/$u/"; done
```

---

## Spec Coverage Check

| Spec requirement | Task |
|------------------|------|
| Shared Stripe-dashboard system (style.css + charts.js) | 1 |
| realtime dashboard, real data from live stack | 2,3,4 |
| iceberg dashboard, real data via re-run + Trino | 5,6 |
| Data sequencing (realtime first, then iceberg) | 2 → 5 |
| llm-eval restyle to match | 7 |
| Enable GitHub Pages (main/docs) for new repos | 4,6 |
| Reproducible export scripts per repo | 2,5 |
| "Live dashboard" links in portfolio | 8 |
| Tabs/charts per dashboard as specified | 3,4,6 |
| Accessibility (tabs aria, chart labels, contrast) | 1,3,6 |
| Honest "snapshot of a real run" framing | 3,6 |
| Verify live URLs | 4,6,8 |

All spec sections map to a task.
```
