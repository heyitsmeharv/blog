/**
 * Data & Analytics deck - drawn from the "AWS Data and Analytics" post
 * (/blog/aws-data-analytics). Each card's `ref` is the section it came from.
 */
export const dataAnalytics = {
  id: "data-analytics",
  title: "Data & Analytics",
  postSlug: "aws-data-analytics",
  cards: [
    {
      id: "da-athena",
      label: "Query S3 with SQL, serverless",
      type: "scenario",
      front:
        "You want to analyse data directly in S3 with standard SQL and no servers to run. Service?",
      back: "Amazon Athena - a serverless interactive query service over S3 data (CSV, JSON, ORC, Avro, Parquet), commonly used with QuickSight for dashboards.",
      ref: "Athena",
    },
    {
      id: "da-athena-optimisation",
      label: "Optimise Athena queries",
      type: "definition",
      front: "How do you optimise Athena queries?",
      back: "Use columnar formats (Parquet/ORC) so only needed columns are read, compress the data (Gzip/Snappy), use partition pruning (filter on partition keys in WHERE), use the Glue Data Catalog for schema, and avoid very small files (aim for 128 MB-1 GB).",
      ref: "Optimisation in AWS Athena",
    },
    {
      id: "da-athena-federated",
      label: "Athena Federated Query",
      type: "definition",
      front: "What is Athena Federated Query?",
      back: "Querying data across sources other than S3 - relational databases, NoSQL stores, custom sources - via data source connectors that run as Lambda functions. Higher latency than querying S3 directly.",
      ref: "Federated Query",
    },
    {
      id: "da-redshift",
      label: "What Redshift is",
      type: "definition",
      front: "What is Redshift and how is it built for analytics?",
      back: "A fully managed, petabyte-scale cloud data warehouse queried with standard SQL and BI tools. Uses columnar storage, compression and zone maps to minimise I/O, and a massively parallel processing (MPP) architecture across nodes.",
      ref: "Redshift",
    },
    {
      id: "da-redshift-nodes",
      label: "Leader vs compute nodes",
      type: "definition",
      front: "Redshift cluster: leader node vs compute nodes?",
      back: "The leader node coordinates query execution and manages metadata; the compute nodes do the heavy lifting and return intermediate results to the leader.",
      ref: "Redshift Cluster Architecture",
    },
    {
      id: "da-athena-vs-redshift",
      label: "Athena vs Redshift",
      type: "comparison",
      front: "Athena vs Redshift - what each is?",
      back: "Athena: a serverless query service for analysing data directly in S3 with SQL. Redshift: a provisioned or serverless petabyte-scale data warehouse for analysing large volumes with SQL and BI tools.",
      ref: "Redshift",
    },
    {
      id: "da-redshift-spectrum",
      label: "Query S3 from Redshift",
      type: "scenario",
      front:
        "Your Redshift cluster needs to query data in S3 without loading it into tables. Feature?",
      back: "Redshift Spectrum - the cluster initiates the query, and a fleet of Spectrum nodes reads directly from S3.",
      ref: "Redshift Spectrum",
    },
    {
      id: "da-redshift-snapshots",
      label: "Redshift snapshots & DR",
      type: "definition",
      front: "Redshift snapshots - types and DR?",
      back: "Stored in S3, incremental. Automated (retention up to 35 days) and manual (kept until deleted). Can be copied to other regions for disaster recovery.",
      ref: "Snapshots and Disaster Recovery",
    },
    {
      id: "da-opensearch",
      label: "Search & log analytics",
      type: "scenario",
      front:
        "You need search and log-analytics / observability over your data. Service?",
      back: "Amazon OpenSearch Service (formerly Amazon Elasticsearch Service) - a managed service for running OpenSearch clusters.",
      ref: "OpenSearch",
    },
    {
      id: "da-dynamodb-opensearch",
      label: "DynamoDB + OpenSearch pattern",
      type: "definition",
      front: "The DynamoDB + OpenSearch pattern?",
      back: "DynamoDB is the system of record; a stream/Lambda pipeline indexes items into OpenSearch for rich search. The app queries OpenSearch to find IDs, then fetches full items from DynamoDB.",
      ref: "DynamoDB + OpenSearch Pattern",
    },
    {
      id: "da-emr",
      label: "EMR & node types",
      type: "definition",
      front: "What is EMR and what are its node types?",
      back: "A managed big-data platform running distributed frameworks (Hadoop, Spark, ...) on EC2 clusters. Master node: manages the cluster. Core nodes: run tasks and store data in HDFS. Task nodes: run tasks only, no persistent HDFS.",
      ref: "EMR (Elastic MapReduce)",
    },
    {
      id: "da-emr-purchasing",
      label: "Buying EMR nodes",
      type: "scenario",
      front:
        "How should you buy EMR nodes to save cost without risking the cluster?",
      back: "Master node on On-Demand/Reserved (critical to cluster health). Core nodes typically Reserved (Spot possible with a fault-tolerant design). Task nodes are ideal for Spot.",
      ref: "Purchasing Options & Best Practices",
    },
    {
      id: "da-quicksight",
      label: "QuickSight & SPICE",
      type: "definition",
      front: "What is QuickSight and what is SPICE?",
      back: "A cloud-scale BI service for interactive dashboards, fully managed, with users (standard) and groups (enterprise) for access. SPICE is its in-memory engine for very fast visual exploration; dashboards are read-only views.",
      ref: "QuickSight",
    },
    {
      id: "da-glue",
      label: "AWS Glue",
      type: "definition",
      front: "What does AWS Glue provide?",
      back: "Serverless data integration: the Glue Data Catalog for central metadata (e.g. schema for Athena tables), crawlers and visual/code ETL jobs to discover schemas and transform data, plus job scheduling and workflow orchestration.",
      ref: "Glue",
    },
    {
      id: "da-lake-formation",
      label: "Fine-grained data lake access",
      type: "scenario",
      front:
        "You need centralised, fine-grained access control on a data lake, enforced across Athena, Redshift and EMR. Service?",
      back: "AWS Lake Formation - simplifies building and securing data lakes, automating ingestion, cataloging, security enforcement and fine-grained access control across the analytics services.",
      ref: "Lake Formation",
    },
  ],
};
