/**
 * SNS deck - drawn from the "Amazon Simple Notification Service (SNS)" post
 * (/blog/aws-sns). Each card's `ref` is the section it came from.
 */
export const sns = {
  id: "sns",
  title: "SNS",
  postSlug: "aws-sns",
  cards: [
    {
      id: "sns-purpose",
      type: "definition",
      front: "What pattern does SNS implement?",
      back: "Publish/subscribe. A publisher sends one message to a topic; the topic delivers it to every subscription. The producer only sends to the one topic, not to each endpoint directly.",
      ref: "Amazon Simple Notification Service",
    },
    {
      id: "sns-subscriber-types",
      type: "definition",
      front:
        "What kinds of endpoint can subscribe to an SNS topic (per the post)?",
      back: "HTTP endpoints, email addresses, and SQS queues.",
      ref: "How To Publish",
    },
    {
      id: "sns-fan-out",
      type: "scenario",
      front:
        "One event needs to reach several systems independently, without losing messages. Pattern?",
      back: "Fan-out - publish once to an SNS topic that has multiple SQS queues subscribed. A fully decoupled approach that helps prevent data loss.",
      ref: "SNS and SQS: Fan Out",
    },
    {
      id: "sns-fan-out-policy",
      type: "definition",
      front:
        "What's required for SNS fan-out to an SQS queue, and does it cross regions?",
      back: "The SQS queue's access policy must allow SNS to write to it. Fan-out also works for cross-region delivery.",
      ref: "SNS and SQS: Fan Out",
    },
    {
      id: "sns-message-filtering",
      type: "scenario",
      front:
        "You want a particular subscription to receive only some of a topic's messages. How?",
      back: "SNS message filtering - a JSON filter policy on the subscription. A subscription with no filter policy receives all messages.",
      ref: "Message Filtering",
    },
    {
      id: "sns-security",
      type: "definition",
      front: "How is an SNS topic secured?",
      back: "Encryption at rest with AWS KMS, HTTPS in transit, access control via AWS IAM, and an SNS topic policy for cross-account access or letting other services (e.g. S3) publish.",
      ref: "Security",
    },
  ],
};
