/**
 * CloudFront deck - drawn from the "AWS CloudFront" post (/blog/aws-cloudfront).
 * Each card's `ref` is the section it came from.
 */
export const cloudfront = {
  id: "cloudfront",
  title: "CloudFront",
  postSlug: "aws-cloudfront",
  cards: [
    {
      id: "cf-what",
      label: "What CloudFront is / request flow",
      type: "definition",
      front: "What is CloudFront and how does a request flow?",
      back: "A CDN that caches content at global edge locations and regional edge caches. A request goes to the nearest edge; on a cache hit it's served directly, on a miss CloudFront fetches from the origin (e.g. S3, EC2) and caches it at the edge for future requests.",
      ref: "AWS CloudFront",
    },
    {
      id: "cf-security",
      label: "CloudFront security features",
      type: "definition",
      front: "What security features does CloudFront offer?",
      back: "AWS Shield for DDoS protection, SSL/TLS encryption, and integration with AWS WAF.",
      ref: "AWS CloudFront",
    },
    {
      id: "cf-s3-oac",
      label: "Serve S3 through CloudFront",
      type: "scenario",
      front:
        "You want to serve content from an S3 bucket through CloudFront, controlling access to the bucket. How?",
      back: "Use an Origin Access Control (OAC) together with a bucket policy that permits distribution through the CloudFront distribution.",
      ref: "S3 as an Origin",
    },
    {
      id: "cf-custom-origin",
      label: "EC2 / ALB origin networking",
      type: "definition",
      front:
        "What's the networking constraint when CloudFront uses an EC2 or load balancer origin?",
      back: "CloudFront has no private VPC connectivity, so the origin's security groups must be set up to allow traffic from the edge locations.",
      ref: "ALB as an Origin",
    },
    {
      id: "cf-geo-restriction",
      label: "Geo-restriction",
      type: "scenario",
      front:
        "You must restrict content to (or block it from) specific countries. Feature?",
      back: "CloudFront geo-restriction - a whitelist or blacklist of countries, based on the viewer's IP. Restricted viewers get an HTTP 403, optionally with a custom error page.",
      ref: "Geo-Restriction",
    },
    {
      id: "cf-price-classes",
      label: "Price classes",
      type: "comparison",
      front: "CloudFront price classes?",
      back: "Price Class All: all regions, best performance. Price Class 200: most regions, excludes the most expensive. Price Class 100: only the least expensive regions. Fewer edge locations = lower cost.",
      ref: "Pricing",
    },
    {
      id: "cf-cache-invalidation",
      label: "Cache invalidation",
      type: "scenario",
      front:
        "You updated a website but viewers still get the old cached objects. What do you do?",
      back: "Create a cache invalidation to remove objects from CloudFront edge caches before they expire (use '*' to invalidate all files).",
      ref: "Cache Invalidation",
    },
    {
      id: "cf-global-accelerator",
      label: "Global Accelerator",
      type: "definition",
      front: "What does AWS Global Accelerator provide?",
      back: "Two static IP addresses as a fixed entry point, and routing over the AWS global network to the nearest healthy endpoint (endpoints grouped by region), with health checks and failover. Integrated with AWS Shield.",
      ref: "Global Accelerator",
    },
    {
      id: "cf-global-accelerator-usecase",
      label: "Fixed entry IPs + failover",
      type: "scenario",
      front:
        "You need a fixed pair of entry IP addresses and traffic routed to the optimal healthy regional endpoint with failover. Service?",
      back: "AWS Global Accelerator - two static IPs, endpoint groups across AWS regions, health-checked, routed over the AWS global network.",
      ref: "Global Accelerator",
    },
  ],
};
