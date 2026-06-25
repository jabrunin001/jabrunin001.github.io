export const profile = {
  name: "James Bruning",
  role: "Senior Engineer",
  location: "Chicago, Illinois",
  email: "jimtbruning@gmail.com",
  github: "https://github.com/jabrunin001",
  linkedin: "https://www.linkedin.com/in/jtb96/",
  headline: "Trusted data for modern teams.",
  sub: "I'm a Senior Engineer. I turn raw, messy source data into clean, tested datasets that teams can trust and decide on, usually with dbt, Snowflake, Spark, and Airflow.",
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
    desc: "Swap brittle vendor pipelines for Airflow, Spark, and Snowflake systems a team can actually own.",
    metric: "35 → 7 min batch processing",
  },
  {
    icon: "zap",
    title: "Automate the manual",
    desc: "Turn multi-hour, multi-system manual processes into one configurable command that checks its own work.",
    metric: "31 steps → one command",
  },
  {
    icon: "trending-up",
    title: "Forecast with ML",
    desc: "Put ML models into production against real budgets, with the validation and buy-in it takes to actually deploy them.",
    metric: "73% → 97% accuracy",
  },
];

export const projects = [
  {
    name: "charge-contract",
    tagline: "A data-contract gate for patient billing",
    motif: "gate",
    blurb:
      "Data contracts at the FHIR/HL7 → warehouse boundary keep patient-billing financials honest. A charges batch that arrives in dollars instead of cents passes every dbt schema test — still numeric, unique, non-null — yet drives patient payments off by exactly 100x. A declarative contract carries each field's unit and magnitude floor, catching at the boundary what schema tests cannot. Built on dbt + DuckDB with a Python CLI, an Airflow DAG, an OpenMetadata catalog, and a CI job that proves the control.",
    stack: ["dbt", "DuckDB", "Python", "Data Contracts", "CI"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/charge-contract/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/charge-contract", icon: "github" },
    ],
  },
  {
    name: "crypto-recon-mart",
    tagline: "On-chain settlement, reconciled",
    motif: "chain",
    blurb:
      "A crypto financial reconciliation mart where an off-chain double-entry ledger is reconciled against on-chain settlement and the breaks are the product. dbt models a star schema over DuckDB — Snowflake-ready — that classifies, ages, and prices every break, while an LLM triages the unresolved ones, advisory only and graded against ground-truth labels. Built with MetricFlow metrics, an Evidence dashboard, an Airflow DAG, and CI.",
    stack: ["dbt", "DuckDB", "Snowflake-ready", "Airflow", "Anthropic API"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/crypto-recon-mart/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/crypto-recon-mart", icon: "github" },
      { label: "Business value", url: "https://github.com/jabrunin001/crypto-recon-mart/blob/main/docs/business-value.md", icon: "external" },
    ],
  },
  {
    name: "ad-truth-layer",
    tagline: "A parity gate for the BI layer",
    motif: "parity",
    blurb:
      "An ads-performance analytics layer where the certified dbt model is the source of truth and the Looker measures must agree with it. A parity gate parses the real LookML, re-derives each measure in SQL, and catches a ROAS drift — gross revenue instead of net of refunds — that every dbt schema test still passes. Built on dbt + DuckDB + LookML with a Python CLI and a CI job that proves the control.",
    stack: ["dbt", "DuckDB", "LookML", "Python", "CI"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/ad-truth-layer/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/ad-truth-layer", icon: "github" },
      { label: "Business value", url: "https://github.com/jabrunin001/ad-truth-layer/blob/main/docs/business-value.md", icon: "external" },
    ],
  },
  {
    name: "ad-lakehouse",
    tagline: "Streaming ad-event lakehouse",
    motif: "stream",
    blurb:
      "An ad-serving event lakehouse. Synthetic ad events stream through Kafka and Spark Structured Streaming into Apache Iceberg, model up to campaign pacing and inventory fill in Trino, and run on Airflow. A GDPR right-to-be-forgotten delete rewrites about 15x less data by bucketing on user_id.",
    stack: ["Kafka", "Spark", "Iceberg", "Trino", "Airflow"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/ad-lakehouse/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/ad-lakehouse", icon: "github" },
      { label: "Business value", url: "https://github.com/jabrunin001/ad-lakehouse/blob/main/docs/business-value.md", icon: "external" },
    ],
  },
  {
    name: "iceberg-lakehouse-lab",
    tagline: "Apache Iceberg, end to end",
    motif: "layers",
    blurb:
      "A local Apache Iceberg lakehouse. MovieLens and synthetic events move through bronze, silver, and gold with dbt-spark, get checked by dbt tests and Great Expectations, and are queried with Trino.",
    stack: ["Iceberg", "Spark", "dbt", "Trino", "MinIO"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/iceberg-lakehouse-lab/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/iceberg-lakehouse-lab", icon: "github" },
      { label: "Writeup", url: "https://github.com/jabrunin001/iceberg-lakehouse-lab/blob/main/docs/blog/why-table-format-matters.md", icon: "external" },
    ],
  },
  {
    name: "certified-metrics-framework",
    tagline: "A trust layer for metrics",
    motif: "shield",
    blurb:
      "A metric is certified only when it is governed by one MetricFlow definition, fresh, and reconciled against an independently re-derived value — catching definition bugs that every schema test passes. Built on dbt + MetricFlow + DuckDB with a Python CLI and a CI job that proves the control works.",
    stack: ["dbt", "MetricFlow", "DuckDB", "Python", "CI"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/certified-metrics-framework/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/certified-metrics-framework", icon: "github" },
    ],
  },
  {
    name: "gtm-trusted-layer",
    tagline: "Metric trust console for GTM data",
    motif: "console",
    blurb:
      "A governed GTM metrics layer for usage-driven revenue. dbt and DuckDB certify eight business metrics only when they are documented, fresh, and reconciled against independent references, with a self-contained dashboard that shows the control catching a bad source definition.",
    stack: ["dbt", "DuckDB", "Python", "CI", "Data Quality"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/gtm-trusted-layer/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/gtm-trusted-layer", icon: "github" },
    ],
  },
  {
    name: "subledger-as-code",
    tagline: "Financial controls in dbt",
    motif: "ledger",
    blurb:
      "A runnable BNPL loan subledger with double-entry posting rules, source-to-ledger reconciliation, and tamper-evident evidence packs. It proves why balanced journal entries are not enough by injecting a wrong-account posting bug that only the substantive control catches.",
    stack: ["dbt", "DuckDB", "Python", "SOX Controls", "CI"],
    links: [
      { label: "Live demo", url: "https://jabrunin001.github.io/subledger-as-code/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/subledger-as-code", icon: "github" },
    ],
  },
  {
    name: "realtime-feature-pipeline",
    tagline: "Real-time ML features, no skew",
    motif: "pipeline",
    blurb:
      "Kafka viewing-events run through Spark Structured Streaming into Redis and Delta Lake, with point-in-time-correct training and a LightGBM model served over FastAPI with zero train/serve skew.",
    stack: ["Kafka", "Spark", "Redis", "Delta Lake", "FastAPI"],
    links: [
      { label: "Live dashboard", url: "https://jabrunin001.github.io/realtime-feature-pipeline/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/realtime-feature-pipeline", icon: "github" },
    ],
  },
  {
    name: "llm-eval-pipeline",
    tagline: "Evaluation pipeline for LLMs",
    motif: "chart",
    blurb:
      "An LLM evaluation pipeline: MMLU scored against three Claude models, modeled in dbt (staging to marts, with Wilson confidence intervals), and served as a live dashboard.",
    stack: ["dbt", "DuckDB", "Anthropic API", "Streamlit"],
    links: [
      { label: "Live dashboard", url: "https://jabrunin001.github.io/llm-eval-pipeline/", icon: "demo" },
      { label: "GitHub", url: "https://github.com/jabrunin001/llm-eval-pipeline", icon: "github" },
    ],
  },
];

export const experience = [
  {
    role: "Senior Engineer",
    org: "Northwestern University",
    period: "2021 — Present",
    bullets: [
      "Built a university-wide data mart in Azure SQL Server integrating 120+ sources via Azure Data Factory; migrated ETL to PySpark, cutting large-batch processing from 35 minutes to under 7 across 20+ pipelines.",
      "Built an ML financial-forecasting solution supporting $2M+ in staff salaries, raising forecast accuracy from 73% to 97%.",
      "Built a cross-office compliance data model (IRB, IACUC, IBC, Sponsored Research) that gave the org its first integrated view of research activity.",
      "Led the organization's first formal data-governance program within a 90-day window.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Northwestern University, School of Communication",
    period: "2019 — 2021",
    bullets: [
      "Built an automated validation pipeline that audited $20M in grant spending, raising accuracy to 99% and cutting processing time 65%.",
      "Built reusable data models from 20+ sources and a self-service query platform that cut ad-hoc reporting requests 300%.",
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
