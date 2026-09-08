/**
 * Serverless deck - drawn from the "Amazon Serverless" post
 * (/blog/aws-serverless). Each card's `ref` is the section it came from.
 */
export const serverless = {
  id: "serverless",
  title: "Serverless",
  postSlug: "aws-serverless",
  cards: [
    {
      id: "sl-what",
      type: "definition",
      front: "What does 'serverless' mean?",
      back: "Not that there are no servers - you just don't manage, provision or see them. You focus on code and config; AWS handles capacity, scaling and patching. The term now covers any fully managed service, not just compute.",
      ref: "What Is Serverless?",
    },
    {
      id: "sl-lambda-basics",
      type: "definition",
      front: "What is AWS Lambda, in one line?",
      back: "A serverless compute service that runs your code in response to events, on demand, scaling automatically with traffic. You pay per request and compute duration.",
      ref: "Lambda",
    },
    {
      id: "sl-lambda-limits",
      type: "definition",
      front: "Lambda's key limits: max runtime, memory, deployment size?",
      back: "Max execution time 900 seconds (15 minutes). Memory 128 MB to 10 GB (1 MB increments). Deployment: 50 MB zipped, 250 MB uncompressed. /tmp disk 512 MB to 10 GB.",
      ref: "Lambda Limitations (Execution & Deployment)",
    },
    {
      id: "sl-lambda-too-long",
      type: "scenario",
      front:
        "A job reliably takes ~25 minutes. Can it run in a single Lambda invocation?",
      back: "No - Lambda's maximum execution time is 900 seconds (15 minutes).",
      ref: "Lambda Limitations (Execution & Deployment)",
    },
    {
      id: "sl-reserved-concurrency",
      type: "scenario",
      front:
        "A critical Lambda must be guaranteed capacity within the account's 1,000 concurrency limit. What do you set?",
      back: "Reserved concurrency on that function - it guarantees capacity for the critical workload.",
      ref: "Lambda Concurrency and Throttling",
    },
    {
      id: "sl-throttling",
      type: "definition",
      front:
        "What happens when Lambda invocations exceed available concurrency?",
      back: "Synchronous: the caller gets a 429 (throttle) error. Asynchronous: Lambda retries for up to 6 hours with exponential backoff; failed events can go to a DLQ or a destination if configured.",
      ref: "Lambda Concurrency and Throttling",
    },
    {
      id: "sl-provisioned-concurrency",
      type: "scenario",
      front:
        "A user-facing Lambda has cold-start latency you can't tolerate. Fix?",
      back: "Provisioned concurrency - a pool of warm environments allocated before invocation, so cold starts never happen and latency is consistent. Application Auto Scaling can manage it.",
      ref: "Cold Starts and Provisioned Concurrency",
    },
    {
      id: "sl-snapstart",
      type: "definition",
      front: "What is Lambda SnapStart?",
      back: "Snapshots a fully initialised execution environment and reuses it, giving up to ~10x faster cold starts for supported runtimes (e.g. Java), at no extra cost.",
      ref: "Lambda SnapStart",
    },
    {
      id: "sl-edge-lambda-vs-cf-functions",
      type: "comparison",
      front: "Lambda@Edge vs CloudFront Functions?",
      back: "Lambda@Edge: multiple runtimes, viewer + origin triggers, 5-10s, up to 10 GB memory, network and request-body access - for heavier logic like image processing or complex auth. CloudFront Functions: JavaScript only, viewer triggers only, sub-millisecond, 2 MB, millions of requests/sec - for simple header/URL rewrites.",
      ref: "Lambda@Edge vs CloudFront Functions",
    },
    {
      id: "sl-apigw-what",
      type: "definition",
      front: "What is API Gateway and what can it integrate with?",
      back: "A managed service to create, publish, secure, monitor and manage APIs - a front door between backends and clients. Integration types: Lambda, HTTP endpoints, and direct AWS service integrations (S3, DynamoDB, Step Functions).",
      ref: "API Gateway",
    },
    {
      id: "sl-apigw-types",
      type: "comparison",
      front: "API Gateway REST vs HTTP vs WebSocket APIs?",
      back: "REST: full-featured (legacy but still widely used). HTTP: lighter, cheaper, lower latency, for most common API use cases. WebSocket: stateful, real-time communication over WebSockets.",
      ref: "API Types",
    },
    {
      id: "sl-apigw-endpoint-types",
      type: "comparison",
      front: "API Gateway endpoint types: edge-optimized, regional, private?",
      back: "Edge-optimized: fronted by CloudFront for global clients. Regional: for clients in the same region. Private: accessible only within a VPC via VPC endpoints.",
      ref: "Endpoint Types",
    },
    {
      id: "sl-step-functions",
      type: "scenario",
      front:
        "You need to orchestrate a multi-step workflow across Lambda, SQS and SNS with retries, parallel steps and a human approval step. Service?",
      back: "AWS Step Functions - models workflows as state machines in Amazon States Language, with parallel execution, retries with backoff, error handling, and human approval via callbacks.",
      ref: "Step Functions",
    },
  ],
};
