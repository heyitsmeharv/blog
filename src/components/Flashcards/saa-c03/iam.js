/**
 * IAM deck - drawn from the "AWS Identity and Access Management (IAM)" post
 * (/blog/aws-identity-access-management). Each card's `ref` is the section it
 * came from.
 */
export const iam = {
  id: "iam",
  title: "IAM",
  postSlug: "aws-identity-access-management",
  cards: [
    {
      id: "iam-global-service",
      type: "definition",
      front: "Is IAM regional or global?",
      back: "Global - it is not region-specific.",
      ref: "Useful information",
    },
    {
      id: "iam-root-account",
      type: "definition",
      front: "What should the root account be used for?",
      back: "Not day-to-day work. It's created by default and should not be used for daily tasks or shared.",
      ref: "Useful information",
    },
    {
      id: "iam-groups-contain",
      type: "definition",
      front: "What can an IAM group contain?",
      back: "Users - not other groups.",
      ref: "Useful information",
    },
    {
      id: "iam-user-multiple-groups",
      type: "definition",
      front:
        "If a user belongs to several groups, what permissions do they get?",
      back: "The combined permissions of all policies attached to every group they belong to.",
      ref: "IAM Policy Inheritance",
    },
    {
      id: "iam-inline-policy-on-user",
      type: "definition",
      front: "Must an IAM user belong to a group to have permissions?",
      back: "No - you can assign inline policies directly to a user to define their access.",
      ref: "IAM Policy Inheritance",
    },
    {
      id: "iam-role-purpose",
      type: "definition",
      front: "What is an IAM role for?",
      back: "Giving permissions to AWS services performing actions on your behalf (e.g. an EC2 instance accessing another service) or to external identities, which assume the role.",
      ref: "IAM Roles",
    },
    {
      id: "iam-least-privilege",
      type: "definition",
      front: "What is the least privilege principle?",
      back: "Don't give a user or service more permissions than it needs.",
      ref: "Useful information",
    },
    {
      id: "iam-policy-statement-elements",
      type: "definition",
      front: "Name the elements of an IAM policy statement.",
      back: "Sid (optional identifier), Effect (allow or deny), Principal (account/user/role the policy applies to - mainly in resource-based policies), Action (e.g. s3:PutObject), Resource (which resources), Condition (optional constraints).",
      ref: "IAM Policy Structure",
    },
    {
      id: "iam-effect-values",
      type: "cloze",
      front: "An IAM statement's Effect is either ___ or ___.",
      back: "Allow or Deny.",
      ref: "IAM Policy Structure",
    },
    {
      id: "iam-principal-where",
      type: "definition",
      front:
        "Which policy element identifies the account/user/role a policy applies to, and where is it mainly used?",
      back: "Principal - used mainly in resource-based policies.",
      ref: "IAM Policy Structure",
    },
    {
      id: "iam-evaluation-logic",
      type: "definition",
      // The post covers this only as a flowchart image ("IAM Policy Evaluation
      // Logic"); this is the standard single-account evaluation order.
      front:
        "How is an IAM authorization decision made within a single account?",
      back: "Everything is denied by default. An explicit Deny in any policy always wins. Otherwise an explicit Allow is required - with no matching Allow, the request stays denied.",
      ref: "IAM Policy Evaluation Logic",
    },
    {
      id: "iam-permission-boundary-what",
      type: "definition",
      front: "What does an IAM permission boundary do?",
      back: "Acts as a guardrail limiting the maximum permissions an identity can have - even if a user or role is granted broader permissions through policies, they can't exceed the boundary. It can be used alongside SCPs and identity-based policies.",
      ref: "IAM Permission Boundaries",
    },
    {
      id: "iam-permission-boundary-targets",
      type: "cloze",
      front:
        "Permission boundaries are supported for IAM ___ and ___, but not ___.",
      back: "users and roles, but not groups.",
      ref: "IAM Permission Boundaries",
    },
    {
      id: "iam-permission-boundary-use-case",
      type: "scenario",
      front:
        "You want to delegate IAM role creation to a team without losing control over what permissions those roles can ultimately have, and prevent privilege escalation. What do you use?",
      back: "Permission boundaries - even if an admin attaches a policy allowing more (e.g. ec2:*), the boundary prevents the role from using it.",
      ref: "IAM Permission Boundaries",
    },
    {
      id: "iam-cross-account-role-vs-resource-policy",
      type: "comparison",
      front:
        "Cross-account access: assuming an IAM role vs using a resource-based policy - what's the difference in permissions?",
      back: "Assume a role: you give up your original permissions and take on the role's permissions. Resource-based policy: the principal keeps their existing permissions and gains the additional access the resource policy grants.",
      ref: "IAM Roles vs Resource-based Policies",
    },
    {
      id: "iam-ec2-access-s3",
      type: "scenario",
      front:
        "An EC2 instance needs to access an AWS service. How do you grant it permission?",
      back: "Attach an IAM role to the instance stating what it can do and with which services.",
      ref: "IAM Roles",
    },
    {
      id: "iam-s3-bucket-vs-object-arn",
      type: "comparison",
      front:
        "In an S3 IAM policy, which actions target the bucket ARN vs the object ARN (bucket/*)?",
      back: "s3:ListBucket targets the bucket ARN (arn:aws:s3:::bucket) - bucket level. s3:PutObject / s3:GetObject / s3:DeleteObject target the object ARN (arn:aws:s3:::bucket/*) - object level.",
      ref: "IAM for S3",
    },
    {
      id: "iam-conditions",
      type: "definition",
      front: "What can IAM policy conditions be used to restrict?",
      back: "Restrict API calls to specific IP addresses, to specific AWS regions, based on tags (e.g. only start/stop instances with a certain tag), or require MFA for certain actions.",
      ref: "IAM Conditions",
    },
    {
      id: "iam-principal-org-id",
      type: "definition",
      front: "What does the aws:PrincipalOrgID condition key do?",
      back: "Used in a resource policy to allow access only to accounts that are members of a specific AWS Organization.",
      ref: "Principal Org ID",
    },
    {
      id: "iam-organizations",
      type: "definition",
      front: "What is AWS Organizations?",
      back: "A service to centrally manage and govern multiple AWS accounts in one organisation: consolidated billing, policy-based account management, security controls, and automation.",
      ref: "AWS Organizations",
    },
    {
      id: "iam-scp-management-account",
      type: "definition",
      front: "Do SCPs restrict the Organizations management account?",
      back: "No - SCPs don't restrict the management account (it can do anything).",
      ref: "Organisation SCP Hierarchy",
    },
    {
      id: "iam-identity-center",
      type: "definition",
      front: "What is AWS IAM Identity Center (formerly AWS Single Sign-On)?",
      back: "A centralised service for managing user identities and permissions across AWS accounts and integrated business apps. Identities come from its built-in identity store or an external identity provider like Okta. You assign permissions by attaching permission sets or policies to groups and mapping those groups to accounts or OUs.",
      ref: "IAM Identity Center",
    },
    {
      id: "iam-control-tower",
      type: "definition",
      front: "What does AWS Control Tower provide?",
      back: "A managed service that simplifies setting up and governing a secure, best-practice multi-account environment, using AWS Landing Zone concepts. Guardrails are preconfigured governance rules that maintain security, compliance and best practices across accounts.",
      ref: "Control Tower",
    },
  ],
};
