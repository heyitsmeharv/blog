/**
 * Security & Encryption deck - drawn from the "Amazon Security & Encryption"
 * post (/blog/aws-security-encryption). Each card's `ref` is the section it
 * came from.
 */
export const securityEncryption = {
  id: "security-encryption",
  title: "Security & Encryption",
  postSlug: "aws-security-encryption",
  cards: [
    {
      id: "sec-encryption-types",
      type: "comparison",
      front: "Server-side encryption vs client-side encryption?",
      back: "Server-side: AWS encrypts data before writing to disk and decrypts on access, keys managed by KMS or service-owned keys. Client-side: your app encrypts before sending and decrypts after retrieval - AWS only ever sees ciphertext.",
      ref: "Encryption Overview",
    },
    {
      id: "sec-kms-what",
      type: "definition",
      front: "What does KMS provide?",
      back: "Centralised key management with fine-grained IAM controls and detailed CloudTrail auditing. For symmetric keys you never get the raw key material - you call the KMS API to use the key.",
      ref: "KMS (Key Management Service)",
    },
    {
      id: "sec-kms-symmetric-vs-asymmetric",
      type: "comparison",
      front: "KMS symmetric vs asymmetric CMKs?",
      back: "Symmetric (AES-256): one key to encrypt and decrypt; what most AWS services use (S3, EBS, RDS, SQS, DynamoDB); API-only. Asymmetric (RSA/ECC): public/private pair for encrypt-decrypt or sign-verify; the public key is downloadable, so parties outside AWS who can't call the KMS API can still encrypt.",
      ref: "KMS Key Types",
    },
    {
      id: "sec-kms-key-types",
      type: "comparison",
      front:
        "KMS AWS-owned vs AWS-managed vs customer-managed vs imported keys?",
      back: "AWS-owned: no direct visibility, used by default SSE for S3/SQS/DynamoDB. AWS-managed (e.g. aws/rds, aws/ebs): rotate automatically every year. Customer-managed: ~$1/month per key, you control policy and rotation. Imported: you supply key material, charged at the key rate.",
      ref: "Types of KMS Keys & Pricing",
    },
    {
      id: "sec-kms-key-policy",
      type: "definition",
      front: "Why can't IAM alone grant access to a KMS key?",
      back: "Every key has a key policy (like an S3 bucket policy). You can't grant access without the key policy allowing it, even if IAM says 'Allow'. The default key policy grants the account root; a custom key policy is required for cross-account use.",
      ref: "KMS Key Policies",
    },
    {
      id: "sec-kms-rotation",
      type: "definition",
      // The post predates two KMS changes (verified against the KMS "Rotate AWS
      // KMS keys" docs): customer-managed keys now have a real on-demand rotation
      // API plus a configurable rotation period, and imported (EXTERNAL) key
      // material now supports on-demand rotation too.
      front: "KMS key rotation by key type?",
      back: "AWS-managed keys: automatic every ~1 year, can't be disabled. Customer-managed symmetric keys: optional automatic rotation (default 365 days, configurable 90-2560) plus true on-demand rotation. Imported key material: on-demand rotation by importing new material - no automatic rotation. Asymmetric, HMAC and custom-key-store keys: manual only (create a new key and repoint the alias).",
      ref: "Key Rotation",
    },
    {
      id: "sec-kms-multi-region",
      type: "scenario",
      front:
        "A multi-region database (e.g. DynamoDB Global Tables) needs the same key usable in each region. Feature?",
      back: "KMS multi-region keys - replica keys in other regions that share the same key ID and key material (managed independently), enabling encryption/decryption across regions.",
      ref: "KMS Multi-Region Keys",
    },
    {
      id: "sec-encrypted-snapshot-copy",
      type: "scenario",
      front:
        "You're copying an encrypted EBS snapshot across accounts or regions. What's needed?",
      back: "Policies that allow decrypt on the source KMS key and encrypt on the destination KMS key.",
      ref: "Copying Snapshots Across Regions / Accounts",
    },
    {
      id: "sec-param-store-vs-secrets-manager",
      type: "comparison",
      front: "SSM Parameter Store vs Secrets Manager?",
      back: "Parameter Store: configuration & secrets, KMS optional, rotation manual or via Lambda, free (except API calls). Secrets Manager: primarily secrets, KMS mandatory, automated rotation, paid. Secrets Manager also stores DB credentials (RDS, Redshift, etc.) and can replicate secrets to other regions.",
      ref: "Secrets Manager vs SSM Parameter Store",
    },
    {
      id: "sec-secrets-manager-rotation",
      type: "scenario",
      front: "You need automatic rotation of database credentials. Service?",
      back: "AWS Secrets Manager - built for automatic secret rotation, and it stores database credentials (RDS, Redshift, etc.).",
      ref: "AWS Secrets Manager",
    },
    {
      id: "sec-acm",
      type: "definition",
      front: "What does ACM manage, and what's the export limitation?",
      back: "The lifecycle of SSL/TLS certificates - issuance, renewal and deployment. It auto-renews DNS-validated public certs (email-validated ones need manual approval at renewal). Public ACM certs cannot be exported for external use.",
      ref: "AWS Certificate Manager (ACM)",
    },
    {
      id: "sec-acm-validation",
      type: "comparison",
      front: "ACM DNS validation vs email validation?",
      back: "DNS validation (add a CNAME record): ACM renews the cert automatically. Email validation: requires manual approval at renewal.",
      ref: "Requesting Public Certificates",
    },
    {
      id: "sec-waf-what",
      type: "definition",
      front: "What is AWS WAF and what can it attach to?",
      back: "Protects web applications from common exploits (SQL injection, XSS, bad bots) by inspecting HTTP(S) requests against Web ACL rules before they reach the backend. Attaches to ALB, API Gateway, CloudFront, AppSync GraphQL APIs, and Cognito user pools - not NLB.",
      ref: "AWS Web Application Firewall (WAF)",
    },
    {
      id: "sec-waf-rules",
      type: "definition",
      front: "What can a WAF rule match on, and what are the rule actions?",
      back: "IPs (up to 10,000 per IP set), string patterns, SQL injection and XSS signatures, geo-match, and rate-based rules for basic DDoS mitigation. Actions: Block, Allow, Count.",
      ref: "Web ACLs & Rules",
    },
    {
      id: "sec-waf-fixed-ip",
      type: "scenario",
      front:
        "You need WAF protection plus fixed IP addresses, but WAF doesn't support NLB. Pattern?",
      back: "AWS Global Accelerator in front of an ALB that has the WAF Web ACL attached.",
      ref: "Fixed IP with WAF & Load Balancer",
    },
    {
      id: "sec-shield-tiers",
      type: "comparison",
      front: "AWS Shield Standard vs Advanced?",
      back: "Standard: enabled by default at no extra cost; protects against most common network/transport-layer DDoS attacks. Advanced: enhanced detection and mitigation, DDoS cost protection, detailed visibility, and 24/7 access to the AWS DDoS Response Team.",
      ref: "Tiers of Service",
    },
    {
      id: "sec-firewall-manager",
      type: "scenario",
      front:
        "You need to enforce WAF Web ACLs, Shield Advanced and security-group policies consistently across every account in the organisation. Service?",
      back: "AWS Firewall Manager - centrally defines and enforces org-wide security policies (WAF, Shield Advanced, VPC security groups, Network Firewall) via AWS Organizations, keeping them in sync as accounts/resources are added.",
      ref: "AWS Firewall Manager",
    },
    {
      id: "sec-guardduty",
      type: "scenario",
      front:
        "You want continuous detection of malicious activity (compromised credentials, reconnaissance, data exfiltration, crypto-mining) with no agents. Service?",
      back: "Amazon GuardDuty - continuously analyses CloudTrail, VPC Flow Logs, DNS logs and other sources using ML, anomaly detection and threat-intelligence feeds.",
      ref: "AWS GuardDuty",
    },
    {
      id: "sec-inspector",
      type: "scenario",
      front:
        "You need to scan workloads for CVEs and security issues. Service?",
      back: "Amazon Inspector - automated vulnerability management that continuously analyses EC2 instances, container images (e.g. in ECR) and other supported resources.",
      ref: "AWS Inspector",
    },
    {
      id: "sec-macie",
      type: "scenario",
      front:
        "You need to discover and classify sensitive data (PII, financial data) in S3. Service?",
      back: "Amazon Macie - uses ML to discover and classify sensitive data in S3.",
      ref: "AWS Macie",
    },
    {
      id: "sec-detection-trio",
      type: "comparison",
      front: "GuardDuty vs Inspector vs Macie?",
      back: "GuardDuty: threat detection from data-source analysis. Inspector: vulnerability management (CVEs, misconfigurations) of workloads. Macie: sensitive-data discovery and classification in S3.",
      ref: "AWS GuardDuty",
    },
  ],
};
