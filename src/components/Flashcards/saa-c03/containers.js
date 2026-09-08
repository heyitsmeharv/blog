/**
 * Containers deck - drawn from the "AWS Containers (ECS, EKS, Fargate)" post
 * (/blog/aws-containers). Each card's `ref` is the section it came from.
 */
export const containers = {
  id: "containers",
  title: "Containers",
  postSlug: "aws-containers",
  cards: [
    {
      id: "ctr-ecs",
      type: "definition",
      front: "What is Amazon ECS?",
      back: "A fully managed container orchestration service that runs and manages Docker containers on a cluster of EC2 instances or on AWS Fargate.",
      ref: "Amazon ECS",
    },
    {
      id: "ctr-ecs-objects",
      type: "definition",
      front: "ECS: task definition vs task vs service?",
      back: "Task definition: the blueprint (Docker image, CPU/memory, networking, env vars). Task: an instance of a task definition. Service: keeps a specified number of tasks running continuously, scales them on demand, and replaces failed tasks.",
      ref: "Task Definition",
    },
    {
      id: "ctr-launch-types",
      type: "comparison",
      front: "ECS EC2 launch type vs Fargate launch type?",
      back: "EC2: you provision and maintain the instances, each running the ECS agent to register with the cluster. Fargate: you don't provision infrastructure - tasks run based on the CPU/RAM you specify in the task definition.",
      ref: "Launch Types",
    },
    {
      id: "ctr-fargate-usecase",
      type: "scenario",
      front:
        "You want to run containers without managing the underlying infrastructure. Option?",
      back: "Fargate - a serverless compute engine for containers (a launch type for ECS, and EKS also integrates with Fargate).",
      ref: "Fargate Launch Type",
    },
    {
      id: "ctr-iam-roles",
      type: "comparison",
      front: "ECS EC2 instance profile vs ECS task role?",
      back: "Instance profile (EC2 launch type only): used by the ECS agent - call the ECS API, send logs to CloudWatch, pull images from ECR, read Secrets Manager / SSM Parameter Store. Task role: a role for a specific task, defined in the task definition (different services can have different roles).",
      ref: "IAM Roles for ECS",
    },
    {
      id: "ctr-task-role-scenario",
      type: "scenario",
      front:
        "One ECS service's containers need a permission that other services on the same cluster shouldn't have. How?",
      back: "Give that service its own ECS task role - you can use different task roles for different ECS services.",
      ref: "IAM Roles for ECS",
    },
    {
      id: "ctr-ecs-lb",
      type: "comparison",
      front: "ECS with ALB vs NLB?",
      back: "ALB: supported, works for most use cases. NLB: recommended for high-throughput / high-performance workloads, or when pairing with AWS PrivateLink.",
      ref: "ECS Load Balancers Integration",
    },
    {
      id: "ctr-ecs-efs",
      type: "scenario",
      front:
        "ECS tasks need to share persistent data, and tasks may run in any AZ. What do you mount?",
      back: "An Amazon EFS file system - tasks in any AZ can share the same data.",
      ref: "ECS - Data Volumes (EFS)",
    },
    {
      id: "ctr-ecs-autoscaling",
      type: "definition",
      front: "What metrics and policies does ECS Service Auto Scaling use?",
      back: "Via AWS Application Auto Scaling, on ECS service average CPU, ECS service average memory, or ALB request count per target - using target tracking, step, or scheduled scaling policies.",
      ref: "ECS Service Auto Scaling",
    },
    {
      id: "ctr-ecr",
      type: "definition",
      front: "What is Amazon ECR?",
      back: "A fully managed container registry for Docker images (private or public) with image vulnerability scanning, versioning, image tags, and lifecycle policies.",
      ref: "Amazon ECR (Elastic Container Registry)",
    },
    {
      id: "ctr-eks",
      type: "definition",
      front: "What does EKS manage, and what do you manage?",
      back: "AWS manages the Kubernetes control plane (API server, etcd) including scaling, patching and upgrades. You manage the worker nodes - or run them on Fargate.",
      ref: "Amazon EKS (Elastic Kubernetes Service)",
    },
    {
      id: "ctr-eks-node-types",
      type: "comparison",
      front:
        "EKS node options: managed node groups, self-managed nodes, Fargate?",
      back: "Managed node groups: EKS creates and manages the nodes in an EKS-managed ASG (On-Demand or Spot). Self-managed: you create and register the nodes, managed by an ASG, can use EKS-optimised AMIs (On-Demand or Spot). Fargate: no nodes to maintain - you define pod CPU/memory.",
      ref: "Node Types",
    },
  ],
};
