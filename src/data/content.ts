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
