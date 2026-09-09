/**
 * EC2 deck - drawn from the "Amazon Elastic Compute Cloud (EC2)" post
 * (/blog/aws-elastic-compute-cloud). Each card's `ref` is the section it came
 * from.
 */
export const ec2 = {
  id: "ec2",
  title: "EC2",
  postSlug: "aws-elastic-compute-cloud",
  cards: [
    {
      id: "ec2-on-demand",
      label: "On-Demand instances",
      type: "definition",
      front: "On-Demand instances - pricing and when to use?",
      back: "Pay by the second with no long-term commitment; highest cost but no upfront payment. Recommended for short-term, uninterrupted workloads where you can predict behaviour.",
      ref: "On-Demand Instance",
    },
    {
      id: "ec2-reserved-instances",
      label: "Reserved Instances",
      type: "scenario",
      front:
        "A database runs with steady, predictable load long-term. Purchasing option?",
      back: "Reserved Instances - a heavy billing discount vs On-Demand for a 1-year or 3-year commitment, with No / Partial / All upfront payment. Recommended for steady-state usage like databases.",
      ref: "Reserved Instance",
    },
    {
      id: "ec2-spot-instances",
      label: "Spot Instances",
      type: "scenario",
      front:
        "Fault-tolerant batch jobs / data analysis that can be interrupted. Cheapest option?",
      // The post frames interruption purely as "spot price > your max bid". Per
      // the current Spot interruptions docs, AWS reclaims instances mainly when
      // it needs the capacity back, with a 2-minute notice; exceeding your
      // optional max price is a secondary reason.
      back: "Spot Instances - the most cost-efficient in AWS, using spare capacity. AWS can reclaim it at any time with a 2-minute interruption notice when it needs the capacity back (or if the Spot price rises above your optional max price). Not for critical jobs or databases.",
      ref: "Spot Instance",
    },
    {
      id: "ec2-dedicated-hosts",
      label: "Dedicated Hosts",
      type: "scenario",
      front:
        "Software with a complicated licensing model, or strong regulatory/compliance needs. Purchasing option?",
      back: "Dedicated Hosts - a physical server (cores, sockets, vCPUs) allocated to you. The most expensive option. Purchased On-Demand or Reserved.",
      ref: "Dedicated Hosts",
    },
    {
      id: "ec2-user-data",
      label: "EC2 user data",
      type: "definition",
      front: "What is EC2 user data?",
      back: "A bootstrap script that runs once when the instance first starts - used to prep the server, e.g. install custom software.",
      ref: "EC2 User Data",
    },
    {
      id: "ec2-ami",
      label: "AMI",
      type: "definition",
      front: "What is an AMI?",
      back: "A customisation of an EC2 instance used to pre-package any software you want on your instances (similar purpose to a user-data script).",
      ref: "Amazon Machine Image (AMI)",
    },
    {
      id: "ec2-sg-allow-only",
      label: "Security group rules & defaults",
      type: "definition",
      front:
        "What kind of rules can a security group have, and what are the defaults?",
      back: "Allow rules only - referencing an IP address or another security group. By default all inbound is blocked and all outbound is allowed. Security groups live outside the instance and can be attached to multiple instances; they're locked to a region/VPC combination.",
      ref: "Security Groups",
    },
    {
      id: "ec2-sg-timeout",
      label: "Connection times out",
      type: "scenario",
      front:
        "Your application on EC2 isn't accessible - the connection times out. Most likely cause?",
      back: "A security group issue.",
      ref: "Security Groups",
    },
    {
      id: "ec2-placement-cluster",
      label: "Cluster placement group",
      type: "scenario",
      front:
        "A big-data job needs low latency and high network throughput between instances. Placement group?",
      back: "Cluster - a low-latency group in a single AZ. Downside: if the rack fails, all instances fail at once.",
      ref: "Placement Groups",
    },
    {
      id: "ec2-placement-spread",
      label: "Spread placement group",
      type: "scenario",
      front:
        "Critical instances that must be isolated on separate hardware. Placement group?",
      back: "Spread - instances spread across underlying hardware (max 7 per group per AZ), can span AZs, isolated from each other.",
      ref: "Placement Groups",
    },
    {
      id: "ec2-placement-partition",
      label: "Partition placement group",
      type: "definition",
      front:
        "What does a Partition placement group do, and how large can it get?",
      back: "Spreads instances across many partitions that rely on different sets of racks within an AZ (up to 7 partitions per AZ, can span multiple AZs). Scales to hundreds of instances per group.",
      ref: "Placement Groups",
    },
    {
      id: "ec2-eni",
      label: "Elastic Network Interface (ENI)",
      type: "definition",
      front: "What is an Elastic Network Interface (ENI) and what's its scope?",
      back: "A virtual network card that gives an instance network access. It's bound to the AZ it was created in. Can hold a primary + secondary private IPv4s, one Elastic IP per private IP, a public IPv4, security groups, and a MAC address.",
      ref: "Elastic Network Interfaces (ENI)",
    },
    {
      id: "ec2-ebs-az-bound",
      label: "EBS volume & AZ constraint",
      type: "definition",
      front: "What is an EBS volume, and what's its AZ constraint?",
      back: "A network drive you attach to a running instance; data persists even after the instance terminates. It's bound to one AZ - use the snapshot feature to get around that.",
      ref: "Elastic Block Store (EBS)",
    },
    {
      id: "ec2-ebs-on-stop-vs-terminate",
      label: "Root EBS on stop vs terminate",
      type: "definition",
      front:
        "What happens to a root EBS volume when an instance is stopped vs terminated?",
      back: "Terminate: root EBS volumes are destroyed. Stop: the EBS volume is kept intact for when it starts again.",
      ref: "Hibernate",
    },
    {
      id: "ec2-snapshot-features",
      label: "Snapshot: Archive / Recycle Bin / FSR",
      type: "definition",
      front:
        "EBS snapshot features: Archive, Recycle Bin, Fast Snapshot Restore?",
      back: "Archive: up to 75% cheaper, up to 72 hours to restore. Recycle Bin: retain deleted snapshots for recovery (1 day to 1 year). Fast Snapshot Restore: force full initialisation so there's no latency on first use - the most costly.",
      ref: "Snapshots",
    },
    {
      id: "ec2-instance-store",
      label: "Instance Store vs EBS",
      type: "comparison",
      front: "Instance Store vs EBS?",
      back: "Instance Store is a high-performance disk physically attached to the hardware - better I/O than a network drive, but risk of data loss if the hardware fails, so back it up regularly. EBS is a network drive that persists.",
      ref: "Instance Store",
    },
    {
      id: "ec2-ebs-volume-types",
      label: "EBS volume types",
      type: "comparison",
      front: "EBS volume types: gp2/gp3, io1/io2, st1, sc1?",
      back: "gp2/gp3 (SSD): general purpose, balances price and performance. io1/io2 (SSD): highest performance, for mission-critical low-latency or high-throughput workloads. st1 (HDD): low cost, for frequently accessed throughput-intensive workloads. sc1 (HDD): lowest cost, for less frequently accessed workloads.",
      ref: "Volume Types",
    },
    {
      id: "ec2-ebs-multi-attach",
      label: "EBS Multi-Attach",
      type: "definition",
      front: "Which EBS volumes support Multi-Attach, and with what limits?",
      back: "Only io1/io2. The same volume can attach to up to 16 instances in the same AZ - used to achieve higher application availability.",
      ref: "Multi-Attach (io1 / io2)",
    },
    {
      id: "ec2-ebs-encryption",
      label: "EBS encryption",
      type: "definition",
      front: "How are EBS volumes encrypted?",
      back: "With KMS (AES-256) keys. Any snapshot of an encrypted volume is also encrypted.",
      ref: "Encryption",
    },
    {
      id: "ec2-hibernate",
      label: "EC2 hibernate",
      type: "definition",
      front: "What does EC2 hibernate do, and what are its requirements?",
      back: "Preserves the in-memory (RAM) state so start-up is much faster (skipping OS boot and user-data scripts). The EBS volume must be encrypted and big enough to store the memory.",
      ref: "Hibernate",
    },
    {
      id: "ec2-efs",
      label: "Shared file system across AZs",
      type: "scenario",
      front:
        "Many EC2 instances across different AZs need to share the same file system. Service?",
      back: "Amazon EFS - a highly available, scalable network file system mountable on many instances across AZs. Linux AMIs only.",
      ref: "Elastic File System (EFS)",
    },
    {
      id: "ec2-elb-types",
      label: "ALB vs NLB vs GWLB",
      type: "comparison",
      front: "ALB vs NLB vs GWLB - protocols?",
      back: "ALB: HTTP, HTTPS, WebSocket - routes on path, hostname or query-string headers; good for microservices and containers. NLB: TCP, TLS, UDP - high performance, handles millions of requests/sec. GWLB: works with the GENEVE protocol on port 6081 - screens traffic through firewall/inspection appliances.",
      ref: "Types of Load Balancers",
    },
    {
      id: "ec2-alb-client-ip",
      label: "Client IP behind an ALB",
      type: "definition",
      front:
        "How does an application server behind an ALB see the client's IP?",
      back: "Not directly - it's inserted into the X-Forwarded-For header (with X-Forwarded-Port and X-Forwarded-Proto for the port and protocol).",
      ref: "Application Load Balancer",
    },
    {
      id: "ec2-nlb-ip",
      label: "NLB IP addresses",
      type: "definition",
      front: "What's notable about a Network Load Balancer's IP addresses?",
      back: "One static IP per AZ, and you can assign an Elastic IP.",
      ref: "Network Load Balancer",
    },
    {
      id: "ec2-gwlb",
      label: "Screen traffic through appliances",
      type: "scenario",
      front:
        "You want to screen traffic through firewall / inspection appliances before it reaches its destination. Which load balancer?",
      back: "Gateway Load Balancer - filters traffic through instances acting as a firewall or inspection system, using the GENEVE protocol on port 6081.",
      ref: "Gateway Load Balancer",
    },
    {
      id: "ec2-cross-zone-lb",
      label: "Cross-zone load balancing defaults",
      type: "comparison",
      front: "Cross-zone load balancing: ALB vs NLB defaults?",
      back: "ALB: enabled by default and free. NLB: disabled by default and you are charged for it.",
      ref: "Cross-Zone Load Balancing",
    },
    {
      id: "ec2-sni",
      label: "Server Name Indication (SNI)",
      type: "definition",
      front: "What does SNI solve, and which load balancers support it?",
      back: "Loading multiple SSL/TLS certificates onto one endpoint - the client indicates the hostname in the initial TLS handshake and the server returns the matching cert (or the default). Supported on ALB and NLB.",
      ref: "Server Name Indication",
    },
    {
      id: "ec2-asg-health",
      label: "ASG unhealthy instance",
      type: "definition",
      front:
        "What does an Auto Scaling Group do when an instance becomes unhealthy?",
      back: "It terminates the unhealthy instance and launches a replacement, keeping the group at its desired capacity (within the min/max you set). New instances are automatically registered with the load balancer.",
      ref: "Auto Scaling Groups (ASG)",
    },
    {
      id: "ec2-asg-launch-template",
      label: "ASG launch template",
      type: "definition",
      front: "What does an ASG Launch Template specify?",
      back: "AMI ID, instance type, key pair, security groups, and block device mapping.",
      ref: "Auto Scaling Group Attributes",
    },
    {
      id: "ec2-asg-cloudwatch",
      label: "ASG automatic scaling",
      type: "definition",
      front: "How does an ASG scale automatically?",
      back: "Via scaling policies tied to CloudWatch alarms - e.g. when the average CPU across the ASG's instances goes above 75%, tell the ASG to add instances (scale out).",
      ref: "CloudWatch Alarms & Scaling",
    },
  ],
};
