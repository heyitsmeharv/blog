/**
 * Route 53 deck - drawn from the "AWS Route 53" post (/blog/aws-route53).
 * Each card's `ref` is the section it came from.
 */
export const route53 = {
  id: "route53",
  title: "Route 53",
  postSlug: "aws-route53",
  cards: [
    {
      id: "r53-what",
      type: "definition",
      front: "What does Route 53 provide?",
      back: "A scalable, highly available DNS service: hosted zones, domain registration, traffic-routing policies, and health checks (enabling automatic DNS failover). Named after the traditional DNS port 53.",
      ref: "Route 53",
    },
    {
      id: "r53-record-types",
      type: "definition",
      front: "The main record types: A, AAAA, CNAME, NS?",
      back: "A: hostname to IPv4. AAAA: hostname to IPv6. CNAME: hostname to another hostname. NS: the name servers for a hosted zone, which control how traffic is routed for a domain.",
      ref: "Records",
    },
    {
      id: "r53-hosted-zones",
      type: "comparison",
      front: "Public vs private hosted zone?",
      back: "Public: records for routing traffic on the internet (public domain names). Private: records for routing traffic within one or more VPCs (private domain names).",
      ref: "Hosted Zones",
    },
    {
      id: "r53-cname-vs-alias",
      type: "comparison",
      front: "CNAME vs Alias record?",
      back: "CNAME points to another hostname but cannot be a root (apex) domain. Alias is Route 53-specific, works with root and non-root domains, is always type A/AAAA, is free, has native health-check support, and auto-recognises IP changes of the target. You can't set a TTL on an Alias.",
      ref: "CNAME vs Alias",
    },
    {
      id: "r53-alias-apex",
      type: "scenario",
      front:
        "You need mydomain.com (the root/apex) to point at an AWS resource. Record type?",
      back: "An Alias record - a CNAME can't be used for a root domain.",
      ref: "CNAME vs Alias",
    },
    {
      id: "r53-ttl",
      type: "comparison",
      front: "High vs low TTL on a Route 53 record?",
      back: "High TTL (days): less traffic on Route 53, but higher chance of serving an outdated record. Low TTL (seconds): more traffic and cost, but slim chance of an outdated record. TTL is mandatory on every record type except Alias.",
      ref: "TTL (Time To Live)",
    },
    {
      id: "r53-simple-routing",
      type: "definition",
      front: "Simple routing policy - behaviour and limitation?",
      back: "Routes to a single resource (or you can list multiple values and the client picks one at random). Cannot be associated with health checks.",
      ref: "Routing Policies - Simple Routing",
    },
    {
      id: "r53-weighted-routing",
      type: "scenario",
      front:
        "You want to send a percentage of traffic to a new version of a service (e.g. for testing). Routing policy?",
      back: "Weighted routing - assign a weight to each record (same name and type); weights don't have to sum to 100. Weight 0 = no traffic; all 0 = distributed equally. Supports health checks.",
      ref: "Routing Policies - Weighted Routing",
    },
    {
      id: "r53-latency-routing",
      type: "scenario",
      front:
        "You want each user directed to the resource with the lowest latency for them. Routing policy?",
      back: "Latency-based routing - users are directed to the resource with the least latency. Supports health checks and failover.",
      ref: "Routing Policies - Latency-based Routing",
    },
    {
      id: "r53-failover-routing",
      type: "scenario",
      front:
        "Active-passive: use the secondary resource only when the primary is unhealthy. Routing policy?",
      back: "Failover routing - a primary and a secondary; if the primary is deemed unhealthy, the secondary is used.",
      ref: "Routing Policies - Failover Routing",
    },
    {
      id: "r53-geolocation-routing",
      type: "scenario",
      front:
        "Users must be routed by their location regardless of latency (e.g. for website localisation or restricting content). Routing policy?",
      back: "Geolocation routing - based on the user's location. Set a default record for when there's no match on the user's location.",
      ref: "Routing Policies - Geolocation based Routing",
    },
    {
      id: "r53-geoproximity",
      type: "definition",
      front: "What does geoproximity routing do, and what does it require?",
      back: "Distributes traffic based on how close users are to the resource, with an adjustable bias to shift more or less traffic to a resource. Requires Route 53 Traffic Flow.",
      ref: "Routing Policies - Geoproximity based Routing",
    },
    {
      id: "r53-ip-based-routing",
      type: "scenario",
      front:
        "You want users from a particular ISP's IP range sent to a specific endpoint. Routing policy?",
      back: "IP-based routing - you provide client CIDR blocks and the corresponding endpoints.",
      ref: "Routing Policies - IP-based Routing",
    },
    {
      id: "r53-multivalue-routing",
      type: "definition",
      front: "What does multivalue answer routing return?",
      back: "Up to 8 records per query when routing to multiple resources. Can be associated with health checks.",
      ref: "Routing Policies - Multi Value based Routing",
    },
    {
      id: "r53-health-check-basics",
      type: "definition",
      front:
        "Route 53 endpoint health checks - protocols, threshold for 'healthy', interval?",
      back: "HTTP, HTTPS, TCP, run by ~15 global health checkers. Considered healthy if more than 18% of checkers report healthy and the endpoint returns a 2xx or 3xx status code. Default interval 30s (can be 10s at higher cost), default threshold 3.",
      ref: "Health Checks - Monitor an Endpoint",
    },
    {
      id: "r53-calculated-health-check",
      type: "definition",
      front: "What is a calculated health check?",
      back: "One health check that combines the results of up to 256 child health checks using OR/AND/NOT logic - you specify how many children must pass for the parent to pass.",
      ref: "Health Checks - Calculated Health Checks",
    },
    {
      id: "r53-private-health-check",
      type: "scenario",
      front:
        "Route 53's health checkers live outside the VPC and can't reach a private resource. How do you health-check it?",
      back: "Associate the health check with a CloudWatch alarm that monitors a metric of the private resource.",
      ref: "Health Checks - Private Hosted Zones",
    },
  ],
};
