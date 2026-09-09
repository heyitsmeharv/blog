/**
 * SQS deck - drawn from the "Amazon Simple Queue Service (SQS)" post
 * (/blog/aws-sqs). Each card's `ref` is the section it came from.
 */
export const sqs = {
  id: "sqs",
  title: "SQS",
  postSlug: "aws-sqs",
  cards: [
    {
      id: "sqs-purpose",
      type: "definition",
      front: "What is SQS and how does a message's lifecycle work?",
      back: "A fully managed message queue that decouples and scales producers and consumers. A message persists in the queue until the consumer deletes it or it hits the retention limit.",
      ref: "Amazon Simple Queue Service",
    },
    {
      id: "sqs-consume-flow",
      type: "definition",
      front: "How does a consumer process SQS messages?",
      back: "Poll the queue (up to 10 messages per call), process, then call DeleteMessage. If it isn't deleted within the visibility timeout, it becomes visible again and can be processed twice.",
      ref: "Consumers",
    },
    {
      id: "sqs-visibility-timeout",
      type: "definition",
      front: "What is the SQS message visibility timeout, and its default?",
      back: "After a consumer polls a message it becomes invisible to other consumers. Default 30 seconds. If not processed in time it will be processed twice - the consumer can call ChangeMessageVisibility to get more time.",
      ref: "Message Visibility Timeout",
    },
    {
      id: "sqs-long-polling",
      type: "scenario",
      front:
        "Consumers keep making empty polls against a mostly-empty queue. How do you cut API calls?",
      back: "Long polling - the consumer waits (1 to 20 seconds) for messages to arrive if there are none, decreasing the number of API calls to SQS.",
      ref: "Long Polling",
    },
    {
      id: "sqs-standard-guarantees",
      type: "definition",
      front: "A Standard queue's delivery and ordering guarantees?",
      back: "At-least-once delivery (duplicate messages possible) and best-effort ordering (messages can arrive out of order). Nearly unlimited API calls per second, under 10 ms latency.",
      ref: "Standard Queue",
    },
    {
      id: "sqs-retention",
      type: "cloze",
      front:
        "An SQS message can stay in a queue for ___ by default and a maximum of ___.",
      back: "4 days by default, 14 days maximum.",
      ref: "Attributes",
    },
    {
      id: "sqs-message-size",
      type: "cloze",
      // The post says 256 KB. AWS has since raised the SQS maximum message size
      // to 1 MiB (verified against the "Amazon SQS message quotas" docs, which
      // now state a 1,048,576-byte maximum). Bigger payloads still need the
      // Extended Client Library, which stores the body in S3.
      front: "SQS message size limit: ___ per message.",
      back: "1 MiB (raised from the old 256 KB limit). For larger payloads use the SQS Extended Client Library, which keeps the body in S3 (up to 2 GB).",
      ref: "Attributes",
    },
    {
      id: "sqs-fifo",
      type: "definition",
      // The post only cites the 300 / 3,000 numbers. Those are the default
      // (non-high-throughput) per-queue limits; high throughput mode raises the
      // ceiling substantially (verified against the SQS message quotas docs).
      front: "What does a FIFO queue provide, and at what throughput?",
      back: "Messages sent in the order the queue receives them, and duplicate messages removed. Default throughput: 300 msg/s (send/receive/delete) without batching, 3,000 msg/s with batching. High throughput mode raises this to thousands of TPS per queue (tens of thousands in the largest regions).",
      ref: "FIFO Queue",
    },
    {
      id: "sqs-standard-vs-fifo",
      type: "scenario",
      front:
        "Messages must be processed in order and duplicates removed. Standard or FIFO queue?",
      back: "FIFO - it preserves send order and removes duplicates (Standard does neither).",
      ref: "FIFO Queue",
    },
    {
      id: "sqs-asg-scaling",
      type: "scenario",
      front:
        "A worker fleet on an ASG needs to scale with the SQS backlog. What drives it?",
      back: "The ApproximateNumberOfMessages metric tied to a CloudWatch alarm that triggers the ASG to ramp up capacity when breached.",
      ref: "SQS with Auto Scaling Groups (ASG)",
    },
    {
      id: "sqs-decouple-pattern",
      type: "scenario",
      front:
        "A front-end app is bottlenecked doing slow processing inline. How do you decouple it?",
      back: "The front-end sends a message to an SQS queue; a second tier polls the queue and does the slow work (e.g. inserting into an S3 bucket).",
      ref: "SQS To Decouple Between Application Tiers",
    },
    {
      id: "sqs-access-policy",
      type: "definition",
      front: "What is an SQS queue policy used for?",
      back: "Cross-account access to the queue, and allowing other services (SNS, S3, ...) to write to it.",
      ref: "Security",
    },
    {
      id: "sqs-security",
      type: "definition",
      front: "How is an SQS queue secured in transit and at rest?",
      back: "In transit: HTTPS. At rest: encryption with AWS KMS (client-side encryption is also possible). Access control via AWS IAM.",
      ref: "Security",
    },
  ],
};
