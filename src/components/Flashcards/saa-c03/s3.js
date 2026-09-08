/**
 * S3 deck - drawn from the "Amazon Simple Storage Service (S3)" post
 * (/blog/aws-s3). Each card's `ref` is the section it came from.
 */
export const s3 = {
  id: "s3",
  title: "S3",
  postSlug: "aws-s3",
  cards: [
    {
      id: "s3-bucket-naming",
      type: "definition",
      front: "Key rules for an S3 bucket name?",
      back: "Globally unique, 3-63 characters, no uppercase and no underscores, not an IP address, must start with a lowercase letter or number. Created within a specific region.",
      ref: "Buckets and Objects",
    },
    {
      id: "s3-object-size",
      type: "definition",
      front:
        "Max object size, and when is multipart upload required vs recommended?",
      back: "Up to 5 TB per object. Multipart upload is a must above 5 GB and recommended above 100 MB.",
      ref: "Buckets and Objects",
    },
    {
      id: "s3-object-tags",
      type: "cloze",
      front: "An S3 object can have up to ___ tags.",
      back: "10.",
      ref: "Object Tags",
    },
    {
      id: "s3-durability",
      type: "cloze",
      front:
        "Every S3 storage class offers ___ nines of durability. S3 Standard availability is ___%.",
      back: "11 nines (99.999999999%); 99.99% availability.",
      ref: "Storage Classes",
    },
    {
      id: "s3-intelligent-tiering",
      type: "scenario",
      front:
        "Data with unknown or changing access patterns, and you don't want operational overhead. Storage class?",
      back: "S3 Intelligent-Tiering - automatically moves objects between frequent and infrequent access tiers as patterns change, with no retrieval fee.",
      ref: "Storage Classes",
    },
    {
      id: "s3-one-zone-ia",
      type: "scenario",
      front:
        "Infrequently accessed data that can be easily recreated if lost. Cheapest sensible class?",
      back: "S3 One Zone-IA - lower cost than Standard-IA, stored in a single AZ (99.5% availability), for recreatable or non-critical data.",
      ref: "Storage Classes",
    },
    {
      id: "s3-glacier-instant",
      type: "scenario",
      front:
        "Rarely accessed archive that must be retrievable in milliseconds when needed. Class?",
      back: "S3 Glacier Instant Retrieval - low cost, milliseconds access, 90-day minimum storage duration.",
      ref: "Storage Classes",
    },
    {
      id: "s3-glacier-flexible",
      type: "definition",
      front: "S3 Glacier Flexible Retrieval - retrieval options and times?",
      back: "Expedited (1-5 minutes), Standard (3-5 hours), Bulk (5-12 hours). 90-day minimum storage duration.",
      ref: "Storage Classes",
    },
    {
      id: "s3-glacier-deep-archive",
      type: "scenario",
      front:
        "Long-term archive, retrieval within 12-48 hours is acceptable, lowest possible cost. Class?",
      back: "S3 Glacier Deep Archive - lowest storage cost. Standard retrieval 12 hours, Bulk 48 hours, 180-day minimum storage duration.",
      ref: "Storage Classes",
    },
    {
      id: "s3-lifecycle-rules",
      type: "definition",
      front: "What actions can an S3 Lifecycle rule perform?",
      back: "Transition actions (move objects to a different storage class based on age), expiration actions (permanently delete after a period), and aborting incomplete multipart uploads. Rules target objects by prefix or tag.",
      ref: "Lifecycle Rules",
    },
    {
      id: "s3-requester-pays",
      type: "scenario",
      front:
        "You want to share large datasets with other accounts but not pay for their downloads. Feature?",
      back: "A Requester Pays bucket - the requester (who must be authenticated in AWS) pays the request and data-download cost instead of the bucket owner.",
      ref: "Requester Pays",
    },
    {
      id: "s3-versioning",
      type: "definition",
      front:
        "S3 versioning: what happens on delete, and what about pre-existing objects?",
      back: "A delete inserts a delete marker instead of removing the object; older versions stay intact. Objects created before versioning was enabled have a null version ID.",
      ref: "Versioning",
    },
    {
      id: "s3-replication-requirements",
      type: "definition",
      front: "What does S3 replication (CRR/SRR) require?",
      back: "Versioning enabled on both source and destination buckets, and an IAM role that lets S3 read the source and write the destination. Replication is asynchronous.",
      ref: "Replication",
    },
    {
      id: "s3-rtc",
      type: "definition",
      front: "What is S3 Replication Time Control (RTC)?",
      back: "A predictable, SLA-backed replication option: 99.99% of objects replicated within 15 minutes.",
      ref: "Replication",
    },
    {
      id: "s3-sse-s3",
      type: "definition",
      front: "SSE-S3 - keys, algorithm, default?",
      back: "AES-256 with keys handled, managed and owned by AWS. Enabled by default for new buckets and objects. Header: x-amz-server-side-encryption: AES256.",
      ref: "S3 Encryption",
    },
    {
      id: "s3-sse-kms",
      type: "comparison",
      front: "What does SSE-KMS give you over SSE-S3?",
      back: "Keys managed by AWS KMS, giving you user control over the key and the ability to audit key usage with CloudTrail. Header: x-amz-server-side-encryption: aws:kms.",
      ref: "S3 Encryption",
    },
    {
      id: "s3-sse-c",
      type: "definition",
      front: "What is SSE-C?",
      back: "Server-side encryption with keys fully managed by the customer outside AWS. S3 does not store the key - you provide it in HTTP headers on every request, and HTTPS is mandatory.",
      ref: "S3 Encryption",
    },
    {
      id: "s3-consistency",
      type: "definition",
      // The post's "Consistency Model" section still describes the pre-Dec-2020
      // model (overwrites/deletes eventually consistent). That is outdated.
      front: "What is S3's read-after-write consistency model?",
      back: "Strong read-after-write consistency for every operation - new objects, overwrites and deletes - in all regions, at no extra cost.",
      ref: "Consistency Model",
    },
    {
      id: "s3-request-rate",
      type: "definition",
      front: "S3 request rate limits per prefix?",
      back: "3,500 PUT/POST/DELETE per second and 5,500 GET per second per prefix. There's no limit on the number of prefixes, so spread objects across prefixes to scale further.",
      ref: "Performance",
    },
    {
      id: "s3-transfer-acceleration",
      type: "scenario",
      front: "Uploads to a bucket from far-away users are slow. Feature?",
      back: "S3 Transfer Acceleration - transfers files to an AWS edge location that forwards the data to the bucket in the target region. Compatible with multipart upload.",
      ref: "Performance",
    },
    {
      id: "s3-range-get",
      type: "definition",
      front: "How do you retrieve just part of a large S3 object?",
      back: "A Range GET - retrieves partial data from the object, improving download performance and saving bandwidth.",
      ref: "Performance",
    },
    {
      id: "s3-presigned-url",
      type: "scenario",
      front:
        "Let a user download (or upload) a private object without giving them AWS credentials or making the bucket public. How?",
      back: "A pre-signed URL - grants temporary access to a specific object.",
      ref: "Pre-Signed URLs",
    },
    {
      id: "s3-object-lock-modes",
      type: "comparison",
      front: "S3 Object Lock: Governance mode vs Compliance mode?",
      back: "Governance: a user with special permissions (e.g. s3:BypassGovernanceRetention) can still modify/delete. Compliance: even the root user cannot delete or alter the object during the retention period.",
      ref: "S3 Object Lock",
    },
    {
      id: "s3-object-lock-legal-hold",
      type: "definition",
      front: "What is an Object Lock legal hold?",
      back: "Prevents an object from being deleted or altered indefinitely, regardless of any retention period. Useful for litigation.",
      ref: "S3 Object Lock",
    },
    {
      id: "s3-mfa-delete",
      type: "definition",
      front:
        "Which two actions does S3 MFA Delete protect (on a versioned bucket)?",
      back: "Permanently deleting an object version, and suspending versioning on the bucket.",
      ref: "MFA Delete",
    },
    {
      id: "s3-glacier-vault-lock",
      type: "definition",
      front: "What is S3 Glacier Vault Lock?",
      back: "A vault lock policy that, once configured and locked, becomes immutable - it can't be altered or deleted - giving write-once-read-many (WORM) protection for compliance.",
      ref: "S3 Glacier Vault Lock",
    },
    {
      id: "s3-access-points",
      type: "scenario",
      front:
        "A large bucket is used by many apps and you want per-use-case access policies, with one restricted to a VPC. Feature?",
      back: "S3 Access Points - each provides a dedicated endpoint with its own access policy, and an access point can be configured to only allow access from a specific VPC.",
      ref: "S3 Access Points",
    },
    {
      id: "s3-object-lambda",
      type: "scenario",
      front:
        "You need to return transformed versions of S3 objects to callers without storing extra copies. Feature?",
      back: "S3 Object Lambda - a Lambda function transforms/processes the data as it's retrieved from S3.",
      ref: "S3 Object Lambda",
    },
    {
      id: "s3-event-notifications",
      type: "definition",
      front: "Where can S3 Event Notifications be sent?",
      back: "Amazon SNS, Amazon SQS, or an AWS Lambda function - triggered on object created/removed/restore/replication events.",
      ref: "Event Notifications",
    },
    {
      id: "s3-storage-gateway-types",
      type: "comparison",
      front: "The three Storage Gateway types?",
      back: "S3 File Gateway: S3 buckets exposed over NFS/SMB. Volume Gateway: iSCSI block storage backed by S3, backed up as EBS snapshots (cached = recent data local; stored = whole dataset local). Tape Gateway: a virtual tape library storing virtual tapes in S3 with auto-tiering to Glacier.",
      ref: "Types of Amazon Storage Gateways",
    },
    {
      id: "s3-transfer-family",
      type: "scenario",
      front:
        "Partners need to send files into S3 or EFS using SFTP/FTPS/FTP. Service?",
      back: "AWS Transfer Family - a managed secure file transfer service supporting SFTP, FTPS and FTP, integrated with S3 and EFS.",
      ref: "Transfer Family",
    },
    {
      id: "s3-datasync",
      type: "scenario",
      front:
        "Automate and accelerate moving large amounts of data from on-prem NFS/SMB storage into AWS. Service?",
      back: "AWS DataSync - a managed data transfer service between on-premises storage, AWS services (S3, EFS, FSx), and between AWS regions or accounts.",
      ref: "Data Sync",
    },
    {
      id: "s3-fsx-windows-vs-lustre",
      type: "comparison",
      front: "FSx for Windows File Server vs FSx for Lustre?",
      back: "Windows File Server: Windows-native SMB file system, Active Directory integrated, for Windows apps and file shares. Lustre: high-performance file system for HPC, machine learning, analytics and media processing, with S3 integration.",
      ref: "FSx",
    },
    {
      id: "s3-fsx-scratch-vs-persistent",
      type: "comparison",
      front: "FSx (Lustre) Scratch vs Persistent deployment?",
      back: "Scratch: temporary storage, data not replicated (lost if the server fails), high burst - for short-term processing / cost optimisation. Persistent: long-term storage, data replicated within the AZ, failed files replaced within minutes - for long-term processing / sensitive data.",
      ref: "FSx File System Deployment Options",
    },
  ],
};
