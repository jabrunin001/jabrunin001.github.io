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
