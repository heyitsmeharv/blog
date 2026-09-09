/**
 * Databases deck - drawn from the "AWS Databases" post (/blog/aws-databases).
 * Each card's `ref` is the section it came from.
 */
export const databases = {
  id: "databases",
  title: "Databases",
  postSlug: "aws-databases",
  cards: [
    {
      id: "db-rds-managed",
      type: "definition",
      front: "What does RDS manage, and what can't you do?",
      back: "Managed relational databases (PostgreSQL, MySQL, Oracle, SQL Server, DB2, MariaDB, plus RDS Custom). AWS handles OS maintenance/patching, backups and monitoring. No SSH access (except RDS Custom).",
      ref: "RDS Summary",
    },
    {
      id: "db-read-replicas",
      type: "definition",
      front: "RDS read replicas: how many, sync or async, readable?",
      back: "Up to 15. Replication is ASYNC (eventually consistent). Read-only (SELECT only) - you can promote a read replica to become the main instance. Same-AZ, cross-AZ, or cross-region.",
      ref: "Read Replicas",
    },
    {
      id: "db-multi-az",
      type: "definition",
      front: "What is RDS Multi-AZ?",
      back: "Mainly for disaster recovery: the app uses one DNS name for the main instance, which does SYNC replication to a standby in another AZ. On a problem with the main instance there's an automatic failover to the standby - no downtime, no app change.",
      ref: "RDS Multi AZ",
    },
    {
      id: "db-replica-vs-multi-az",
      type: "comparison",
      front: "Read replica vs Multi-AZ?",
      back: "Read replica: async, read-only, scales reads, can be cross-region. Multi-AZ: sync standby (not readable), automatic failover, for disaster recovery.",
      ref: "RDS Multi AZ",
    },
    {
      id: "db-rds-backups",
      type: "definition",
      front: "RDS automated backups vs manual snapshots?",
      back: "Automated: daily full backup + transaction logs every 5 minutes, restore to any point in time from oldest to ~5 minutes ago, retention up to 35 days, can be disabled. Manual: retained as long as you want.",
      ref: "RDS Backups",
    },
    {
      id: "db-rds-stopped-cost",
      type: "definition",
      front: "Does a stopped RDS instance still cost money?",
      back: "Yes - you still pay for the existing storage. For long stops, snapshot and restore instead.",
      ref: "RDS Backups",
    },
    {
      id: "db-rds-proxy",
      type: "scenario",
      front:
        "Apps are opening too many direct connections, straining RDS CPU/RAM, and you want faster failover. Service?",
      back: "RDS Proxy - pools and shares established connections, auto-scales, is multi-AZ, cuts failover time by up to 66%, enforces IAM authentication, and is only reachable from within a VPC.",
      ref: "RDS Proxy",
    },
    {
      id: "db-rds-storage-autoscaling",
      type: "definition",
      front: "How does RDS storage auto-scaling work?",
      back: "It automatically increases storage when the instance is running low on free space, up to a Maximum Storage Threshold you set. Helps with unpredictable workloads.",
      ref: "Auto Scaling Storage",
    },
    {
      id: "db-rds-event-notifications",
      type: "definition",
      front: "What do RDS Event Notifications tell you, and where do they go?",
      back: "Information about the DB instance itself (created, stopped, started) - not about the data. Near real-time (up to 5 minutes). Sent to SNS, or consumed via EventBridge.",
      ref: "RDS Event Notifications",
    },
    {
      id: "db-rds-aurora-encryption",
      type: "definition",
      front: "When must RDS/Aurora at-rest encryption be enabled?",
      back: "At launch time - it uses AWS KMS, and if not defined at launch the main instance and its read replicas can't be encrypted.",
      ref: "RDS & Aurora Security",
    },
    {
      id: "db-aurora-storage",
      type: "definition",
      front:
        "How does Aurora store data, and how does it compare to RDS on cost?",
      // The post says 128 TB. Current Aurora docs state the cluster volume grows
      // up to 256 TiB on recent engine versions (verified against "Amazon Aurora
      // storage"). 128 TiB was the previous ceiling.
      back: "6 copies of the data across 3 AZs, storage striped across hundreds of volumes, auto-grows in 10 GB increments up to 128 TiB (256 TiB on current engine versions). Compatible with PostgreSQL/MySQL. Roughly 20% more expensive than RDS.",
      ref: "Amazon Aurora",
    },
    {
      id: "db-aurora-endpoints",
      type: "comparison",
      front: "Aurora write endpoint vs read endpoint vs custom endpoint?",
      back: "Write endpoint: always the main instance (the only one that writes to storage). Read endpoint: connects to the read replicas. Custom endpoint: a chosen subset of instances - e.g. to run analytics without affecting performance.",
      ref: "Aurora Custom Endpoints",
    },
    {
      id: "db-aurora-serverless",
      type: "scenario",
      front:
        "A relational workload is infrequent, intermittent and unpredictable, and you don't want to size instances. Option?",
      back: "Aurora Serverless - an automated database that auto-scales based on usage.",
      ref: "Aurora Serverless",
    },
    {
      id: "db-aurora-global",
      type: "scenario",
      front:
        "You need a relational database with cross-region disaster recovery and sub-second replication. Option?",
      back: "Aurora Global - cross-region read replicas, good for DR, replicating into another region in less than a second.",
      ref: "Aurora Global",
    },
    {
      id: "db-aurora-backtrack",
      type: "definition",
      front: "What is Aurora Backtrack?",
      back: "Restore data to any point in time without using backups.",
      ref: "Features of Aurora",
    },
    {
      id: "db-aurora-cloning",
      type: "scenario",
      front:
        "You need a copy of a production Aurora cluster for a staging environment, fast and without impacting the live service. Option?",
      back: "Aurora cloning - creates a new cluster from an existing one using a copy-on-write protocol, faster than snapshot & restore.",
      ref: "Aurora Cloning",
    },
    {
      id: "db-aurora-backup-disable",
      type: "comparison",
      front: "Can automated backups be disabled on RDS? On Aurora?",
      back: "RDS: yes. Aurora: no.",
      ref: "Aurora Backups",
    },
    {
      id: "db-elasticache-purpose",
      type: "definition",
      front: "What is ElastiCache for, and what's the catch?",
      back: "An in-memory database (Redis or Memcached) for high performance and low latency - makes apps stateless and reduces load on the database for read-intensive workloads. Catch: using it involves a lot of application code changes.",
      ref: "Elasticache",
    },
    {
      id: "db-redis-vs-memcached",
      type: "comparison",
      front: "ElastiCache Redis vs Memcached?",
      back: "Redis: Multi-AZ with auto-failover, read replicas for HA, AOF persistence, backup/restore, sets and sorted sets. Memcached: multi-threaded, multi-node sharding, no replication/HA, non-persistent, no backup/restore.",
      ref: "Redis vs Memcached",
    },
    {
      id: "db-dynamodb",
      type: "definition",
      front: "What is DynamoDB?",
      back: "A fully managed NoSQL database offering fast, consistent, scalable, low-latency access - even at millions of requests per second.",
      ref: "Amazon DynamoDB",
    },
    {
      id: "db-dynamodb-capacity-modes",
      type: "comparison",
      front: "DynamoDB provisioned vs on-demand capacity mode?",
      back: "Provisioned (default): you set reads/writes per second (RCU/WCU), plan capacity ahead, optional auto-scaling. On-demand: auto-scales with no capacity planning, more expensive, great for unpredictable workloads and sudden spikes.",
      ref: "Read/Write Capacity Modes",
    },
    {
      id: "db-dax",
      type: "scenario",
      front:
        "DynamoDB reads are congested and you want microsecond latency without changing application logic. What do you add?",
      back: "DynamoDB Accelerator (DAX) - a fully-managed, highly available in-memory cache for DynamoDB, compatible with existing DynamoDB APIs. Default cache TTL is 5 minutes.",
      ref: "DynamoDB Accelerator (DAX)",
    },
    {
      id: "db-dax-vs-elasticache",
      type: "comparison",
      front: "DAX vs ElastiCache for caching DynamoDB - application impact?",
      back: "DAX requires no application logic changes (compatible with existing DynamoDB APIs). ElastiCache involves a lot of application code changes.",
      ref: "DynamoDB Accelerator (DAX)",
    },
    {
      id: "db-dynamodb-streams",
      type: "definition",
      front: "What are DynamoDB Streams, and their retention?",
      back: "An ordered stream of item-level modifications (create/update/delete), retained 24 hours. Used to react in real time, feed analytics, build derivative tables, do cross-region replication, or invoke Lambda on changes.",
      ref: "DynamoDB Streams",
    },
    {
      id: "db-dynamodb-global-tables",
      type: "scenario",
      front:
        "You need a DynamoDB table readable and writable with low latency in multiple regions. Feature and prerequisite?",
      back: "Global Tables - active-active replication where apps read and write in any region. DynamoDB Streams must be enabled first.",
      ref: "DynamoDB Global Tables",
    },
    {
      id: "db-dynamodb-ttl",
      type: "definition",
      front: "What does DynamoDB TTL do?",
      back: "Automatically deletes items after an expiry timestamp.",
      ref: "DynamoDB - Time To Live (TTL)",
    },
    {
      id: "db-documentdb",
      type: "scenario",
      front:
        "You have a MongoDB workload (storing/querying/indexing JSON) and want it managed by AWS. Service?",
      back: "Amazon DocumentDB - MongoDB-compatible, fully managed, replication across 3 AZs, storage auto-grows in 10 GB increments, scales to millions of requests per second.",
      ref: "DocumentDB",
    },
    {
      id: "db-neptune",
      type: "scenario",
      front:
        "Highly connected data - knowledge graphs, fraud detection, recommendation engines, social networking. Which database?",
      back: "Amazon Neptune - a fully managed graph database for highly connected datasets, highly available across 3 AZs with up to 15 read replicas.",
      ref: "Amazon Neptune",
    },
    {
      id: "db-qldb",
      type: "scenario",
      front:
        "You need an immutable, cryptographically verifiable history of every change to your data, with no decentralisation. Service?",
      back: "Amazon QLDB (Quantum Ledger Database) - immutable (no entry can be removed or modified), cryptographically verifiable, queried with SQL. (Amazon Managed Blockchain is the decentralised option.)",
      ref: "Amazon QLDB (Quantum Ledger Database)",
    },
    {
      id: "db-timestream",
      type: "scenario",
      front:
        "You need to store and analyse trillions of time-stamped events per day. Which database?",
      back: "Amazon Timestream - a fully managed, serverless time-series database that tiers recent data in memory and moves historical data to cheaper storage.",
      ref: "Amazon Timestream",
    },
    {
      id: "db-keyspaces",
      type: "scenario",
      front:
        "You have an Apache Cassandra (CQL) application and want a serverless managed version. Service?",
      back: "Amazon Keyspaces - a serverless, managed, Cassandra-compatible database. Tables replicated 3 times across AZs, PITR up to 35 days.",
      ref: "Amazon Keyspaces (for Apache Cassandra)",
    },
  ],
};
