/**
 * Kinesis deck - drawn from the "Amazon Kinesis" post (/blog/aws-kinesis).
 * Each card's `ref` is the section it came from.
 */
export const kinesis = {
  id: "kinesis",
  title: "Kinesis",
  postSlug: "aws-kinesis",
  cards: [
    {
      id: "kinesis-family",
      type: "definition",
      front: "What are the parts of the Kinesis family?",
      back: "Data Streams (capture/process real-time streams), Data Firehose (managed loading of streaming data into stores), Data Analytics (SQL / Apache Flink on streams), and Video Streams (stream video from devices).",
      ref: "Kinesis Overview",
    },
    {
      id: "kinesis-shard-throughput",
      type: "cloze",
      front:
        "A Kinesis Data Streams shard ingests up to ___ MB/s and emits up to ___ MB/s.",
      back: "1 MB/s in, 2 MB/s out.",
      ref: "Kinesis Data Streams",
    },
    {
      id: "kinesis-record",
      type: "definition",
      front: "What makes up a Kinesis record?",
      back: "A sequence number, a partition key, and the data blob.",
      ref: "Kinesis Data Streams",
    },
    {
      id: "kinesis-retention",
      type: "comparison",
      front: "Data Streams vs Firehose - data storage and replay?",
      back: "Data Streams stores data up to 365 days and supports replay. Firehose has no data storage and doesn't support replay.",
      ref: "Kinesis Data Streams vs Firehose",
    },
    {
      id: "kinesis-capacity-modes",
      type: "comparison",
      front: "Kinesis Data Streams provisioned vs on-demand mode?",
      back: "Provisioned: manual capacity based on shard count, cost based on shard count, best for predictable traffic and cost control. On-demand: scales automatically (up to 200 MB/s write, 400 MB/s read), pay for data throughput, best for unpredictable variable traffic.",
      ref: "Comparison Between Provisioned and On-Demand Modes",
    },
    {
      id: "kinesis-ordering",
      type: "scenario",
      front:
        "100 trucks stream GPS data and each truck's data must stay in order. How?",
      back: "Use the truck ID as the partition key - the same key always goes to the same shard, and data is ordered within a shard.",
      ref: "Ordering Data into Kinesis",
    },
    {
      id: "kinesis-consumers",
      type: "comparison",
      front: "Kinesis shared consumers vs enhanced fan-out consumers?",
      back: "Shared (standard): consumers pull, sharing 2 MB/s per shard. Enhanced fan-out: each consumer gets its own dedicated pushed throughput of 2 MB/s per shard, reducing data-processing lag.",
      ref: "Consumers",
    },
    {
      id: "kinesis-firehose",
      type: "scenario",
      front:
        "You just need to load streaming data into S3, Redshift or OpenSearch with no code and no servers. Service?",
      back: "Kinesis Data Firehose - fully managed, auto-scaling, near-real-time delivery to S3 / Redshift / OpenSearch / third parties (e.g. Splunk) / custom HTTP, with optional Lambda transformation.",
      ref: "Kinesis Data Firehose",
    },
    {
      id: "kinesis-streams-vs-firehose",
      type: "comparison",
      front: "Kinesis Data Streams vs Firehose?",
      back: "Streams: you write producer/consumer code, real-time (~200 ms), data stored up to 365 days, supports replay, you manage scaling (shard splitting/merging). Firehose: fully managed, near-real-time, no data storage, no replay, automatic scaling, loads into destinations.",
      ref: "Kinesis Data Streams vs Firehose",
    },
    {
      id: "kinesis-data-analytics",
      type: "scenario",
      front:
        "You need real-time SQL analysis / anomaly detection over a Kinesis stream with no infrastructure to manage. Service?",
      back: "Kinesis Data Analytics - run SQL or Apache Flink applications on data from Kinesis Data Streams or Firehose.",
      ref: "Kinesis Data Analytics",
    },
    {
      id: "kinesis-vs-sqs-vs-sns",
      type: "comparison",
      front: "Kinesis vs SQS vs SNS (per the post's table)?",
      back: "Kinesis: real-time big data / analytics / ETL, replay possible, ordering at the shard level. SQS: consumers pull, data is deleted after being consumed, as many consumers as you want, ordering only on FIFO. SNS: pub/sub push to many subscribers, data is not persisted (lost if not delivered).",
      ref: "Kinesis vs SQS vs SNS",
    },
    {
      id: "kinesis-video-streams",
      type: "scenario",
      front:
        "Securely stream video from connected devices (security cameras, drones) into AWS for analytics and ML. Service?",
      back: "Kinesis Video Streams.",
      ref: "Kinesis Video Streams",
    },
  ],
};
