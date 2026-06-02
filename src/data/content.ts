export const profile = {
  name: "James Bruning",
  role: "Senior Data Engineer",
  location: "Chicago, Illinois",
  email: "jimtbruning@gmail.com",
  github: "https://github.com/jabrunin001",
  linkedin: "https://www.linkedin.com/in/jtb96/",
  headline: "Infrastructure for modern data teams.",
  sub: "I'm a Senior Data Engineer. I turn legacy data systems into platforms teams can run themselves, usually with Airflow, Spark, Snowflake, and dbt.",
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
    name: "iceberg-lakehouse-lab",
    blurb:
      "A local Apache Iceberg lakehouse. MovieLens and synthetic events move through bronze, silver, and gold with dbt-spark, get checked by dbt tests and Great Expectations, and are queried with Trino.",
    stack: ["Iceberg", "Spark", "dbt", "Trino", "MinIO"],
    links: [
      { label: "GitHub", url: "https://github.com/jabrunin001/iceberg-lakehouse-lab", icon: "github" },
      { label: "Writeup", url: "https://github.com/jabrunin001/iceberg-lakehouse-lab/blob/main/docs/blog/why-table-format-matters.md", icon: "external" },
    ],
  },
  {
    name: "realtime-feature-pipeline",
    blurb:
      "Kafka viewing-events run through Spark Structured Streaming into Redis and Delta Lake, with point-in-time-correct training and a LightGBM model served over FastAPI with zero train/serve skew.",
    stack: ["Kafka", "Spark", "Redis", "Delta Lake", "FastAPI"],
    links: [
      { label: "GitHub", url: "https://github.com/jabrunin001/realtime-feature-pipeline", icon: "github" },
    ],
  },
  {
    name: "llm-eval-pipeline",
    blurb:
      "Analytics engineering for LLM evals: MMLU scored against three Claude models, modeled in dbt (staging to marts, with Wilson confidence intervals), and served as a live dashboard.",
    stack: ["dbt", "DuckDB", "Anthropic API", "Streamlit"],
    links: [
      { label: "GitHub", url: "https://github.com/jabrunin001/llm-eval-pipeline", icon: "github" },
      { label: "Live dashboard", url: "https://jabrunin001.github.io/llm-eval-pipeline/", icon: "external" },
    ],
  },
];

export const experience = [
  {
    role: "Senior Data Engineer",
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
