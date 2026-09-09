/**
 * Monitoring & Audit deck - drawn from the "AWS Monitoring & Audit" post
 * (/blog/aws-monitoring-audit). Each card's `ref` is the section it came from.
 */
export const monitoringAudit = {
  id: "monitoring-audit",
  title: "Monitoring & Audit",
  postSlug: "aws-monitoring-audit",
  cards: [
    {
      id: "mon-three-services",
      type: "comparison",
      front: "CloudWatch vs CloudTrail vs Config - one line each?",
      back: "CloudWatch: performance monitoring - metrics, logs, dashboards, alarms, events. CloudTrail: API-level auditing - who did what, when, from where. Config: configuration history, compliance evaluation, change timelines.",
      ref: "CloudWatch vs CloudTrail vs Config",
    },
    {
      id: "mon-ec2-default-metrics",
      type: "scenario",
      front:
        "You need OS-level metrics (memory, disk) and logs from an EC2 instance in CloudWatch. What's needed?",
      back: "By default EC2 doesn't send OS-level logs or detailed metrics. Install the CloudWatch unified agent (with an IAM role) - it sends logs plus system metrics like CPU, memory, disk, netstat, processes and swap, and uses SSM Parameter Store for config.",
      ref: "CloudWatch Agent & Unified Agent (EC2 / On-Prem)",
    },
    {
      id: "mon-agent-types",
      type: "comparison",
      front: "CloudWatch Logs Agent vs CloudWatch Unified Agent?",
      back: "Logs Agent: legacy, only sends logs to CloudWatch Logs. Unified Agent: newer, sends logs AND additional system metrics, config via SSM Parameter Store.",
      ref: "Agent Types",
    },
    {
      id: "mon-logs-components",
      type: "definition",
      front: "CloudWatch Logs: log group vs log stream, and retention?",
      back: "Log group: a logical group of log streams sharing retention, access policies and tags. Log stream: log events from a single source. Retention is set per log group, from 1 day to indefinite.",
      ref: "CloudWatch Logs",
    },
    {
      id: "mon-logs-insights",
      type: "definition",
      front: "What is CloudWatch Logs Insights for, and not for?",
      back: "An on-demand query engine for log data (filtering, aggregation, visualisation) - great for troubleshooting. Not for real-time processing.",
      ref: "CloudWatch Logs Insights",
    },
    {
      id: "mon-subscription-filters",
      type: "scenario",
      front: "You need real-time processing of log events. Feature?",
      back: "CloudWatch Logs subscription filters - push matching log events to Kinesis Data Streams, Kinesis Data Firehose, or AWS Lambda.",
      ref: "CloudWatch Logs Subscriptions",
    },
    {
      id: "mon-metric-filter",
      type: "scenario",
      front:
        "You want an alarm when a particular pattern appears in your logs. How?",
      back: "A CloudWatch Logs metric filter that matches the pattern, then a CloudWatch alarm on the resulting metric.",
      ref: "CloudWatch Alarms",
    },
    {
      id: "mon-alarm-states",
      type: "definition",
      front: "The three CloudWatch alarm states?",
      back: "OK (within threshold), ALARM (threshold breached), INSUFFICIENT_DATA (not enough recent datapoints).",
      ref: "CloudWatch Alarms",
    },
    {
      id: "mon-alarm-targets",
      type: "definition",
      front: "What actions can a CloudWatch alarm trigger?",
      back: "EC2 actions (stop, terminate, reboot, recover), Auto Scaling (scale out / in), and SNS notifications.",
      ref: "Alarm Targets",
    },
    {
      id: "mon-composite-alarms",
      type: "definition",
      front: "What is a composite alarm?",
      back: "An alarm that monitors the state of other alarms using AND/OR logic - ideal for reducing alert noise.",
      ref: "Composite Alarms",
    },
    {
      id: "mon-eventbridge",
      type: "definition",
      front: "What is Amazon EventBridge?",
      back: "A serverless event bus connecting AWS services, SaaS apps and your own apps. Rules match events by pattern or schedule (cron) and route to targets like Lambda, Step Functions, SNS, SQS, Kinesis, ECS tasks and Systems Manager.",
      ref: "EventBridge",
    },
    {
      id: "mon-eventbridge-buses",
      type: "definition",
      front: "EventBridge bus types?",
      back: "Default bus (receives many AWS service events), custom buses (your applications), partner buses (SaaS integrations). A schema registry can discover event schemas and generate code bindings.",
      ref: "Schema Registry",
    },
    {
      id: "mon-eventbridge-root-login",
      type: "scenario",
      front: "You want to be notified whenever the root user logs in. How?",
      back: "An EventBridge rule that reacts to the root user login event and sends a notification (e.g. to SNS).",
      ref: "EventBridge",
    },
    {
      id: "mon-cloudtrail",
      type: "definition",
      front: "What does CloudTrail record and where does it deliver?",
      back: "API-level audit logs - who did what, when, and from where. Delivered to S3, and optionally to CloudWatch Logs.",
      ref: "CloudTrail",
    },
    {
      id: "mon-cloudtrail-event-types",
      type: "comparison",
      front: "CloudTrail management events vs data events?",
      back: "Management events: operations that change resource configuration (create an EC2 instance, modify a security group) - logged by default. Data events: high-volume actions on resources (S3 object-level APIs, Lambda invocations) - disabled by default due to volume/cost, enabled per resource.",
      ref: "CloudTrail Events",
    },
    {
      id: "mon-cloudtrail-retention",
      type: "definition",
      front:
        "How long does CloudTrail keep events without a trail, and how do you keep them longer?",
      back: "90 days of recent management events in the console for free. For long-term retention and analytics, create a trail delivering to S3 and query it via Athena.",
      ref: "Events Retention & Trails",
    },
    {
      id: "mon-cloudtrail-insights",
      type: "definition",
      front: "What is CloudTrail Insights?",
      back: "Analyses management events to detect unusual activity - e.g. spikes in API calls or abnormal error rates - and surfaces them as insight events.",
      ref: "CloudTrail Insights",
    },
    {
      id: "mon-config",
      type: "definition",
      front: "What does AWS Config do?",
      back: "Continuously records the configuration of your AWS resources and evaluates them against compliance rules - for configuration audit, change tracking and policy enforcement.",
      ref: "Config",
    },
    {
      id: "mon-config-rules-no-block",
      type: "definition",
      front: "Do AWS Config rules block non-compliant actions?",
      back: "No - they only detect and flag resources as COMPLIANT or NON_COMPLIANT. There are hundreds of AWS managed rules, or write custom rules backed by Lambda or Guard.",
      ref: "Config Rules",
    },
    {
      id: "mon-config-remediation",
      type: "scenario",
      front: "You want non-compliant resources fixed automatically. How?",
      back: "Attach a remediation action (an SSM Automation document) to the Config rule - Config runs it when a resource is NON_COMPLIANT.",
      ref: "Remediation",
    },
  ],
};
