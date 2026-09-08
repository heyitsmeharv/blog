import { iam } from "./iam";
import { vpc } from "./vpc";
import { s3 } from "./s3";
import { ec2 } from "./ec2";
import { databases } from "./databases";
import { route53 } from "./route53";
import { cloudfront } from "./cloudfront";
import { sqs } from "./sqs";
import { sns } from "./sns";
import { kinesis } from "./kinesis";
import { containers } from "./containers";
import { serverless } from "./serverless";
import { dataAnalytics } from "./data-analytics";
import { machineLearning } from "./machine-learning";
import { monitoringAudit } from "./monitoring-audit";
import { securityEncryption } from "./security-encryption";

/* AWS Certified Solutions Architect - Associate (SAA-C03). */
export const saaC03 = {
  id: "saa-c03",
  code: "SAA-C03",
  name: "AWS Certified Solutions Architect - Associate",
  blurb:
    "The associate architecture exam: designing resilient, secure, cost-optimised and high-performing workloads on AWS. Scenario-heavy - most questions are 'which service/config fits this situation'.",
  decks: [
    iam,
    ec2,
    vpc,
    s3,
    databases,
    route53,
    cloudfront,
    sqs,
    sns,
    kinesis,
    containers,
    serverless,
    dataAnalytics,
    machineLearning,
    monitoringAudit,
    securityEncryption,
  ],
};
