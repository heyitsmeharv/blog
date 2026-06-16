import React, { useEffect } from "react";
import styled from "styled-components";

// helpers
import { Analytics } from "../../helpers/analytics";

// animations
import SlideInBottom from "../../animations/SlideInBottom";

// layout
import {
  PageWrapper,
  PostTopBar,
  PostContainer as BasePostContainer,
  HeaderRow,
  IconWrapper,
  HeaderIcon,
} from "../BlogLayout/BlogLayout";
import {
  ProjectArchitecture,
  EngineeringDecisions,
} from "../BlogLayout/ProjectExplanation";

// typography
import {
  PageTitle,
  SectionHeading,
  SubSectionHeading,
  Paragraph,
  Strong,
  TextLink,
  TextList,
  TextListItem,
  InlineHighlight,
} from "../Typography/Typography";

// icons
import {
  AWSSVG,
  AWSSSMSVG,
  AWSEC2SVG,
  TerraformSVG,
} from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";

// code blocks
import {
  awsPatchManagementCLIPackageManager,
  awsPatchManagementTerraformIAMRole,
  awsPatchManagementTerraformVPCEndpoints,
  awsPatchManagementTerraformBaseline,
  awsPatchManagementTerraformPatchGroup,
  awsPatchManagementTerraformMaintenanceWindow,
  awsPatchManagementTerraformScanAssociation,
  awsPatchManagementCLIComplianceStates,
  awsPatchManagementTerraformInspector,
  awsPatchManagementTerraformPrePatchTask,
  awsPatchManagementTerraformPostPatchTask,
  awsPatchManagementCLIEmergencyPatch,
  awsPatchManagementTerraformImageBuilder,
  awsPatchManagementTerraformImageBuilderIAM,
  awsPatchManagementPackerTemplate,
  awsPatchManagementCLIInstanceRefresh,
  awsPatchManagementTerraformAlerting,
  awsPatchManagementCLIComplianceReport,
  awsPatchManagementTerraformDataSync,
  awsPatchManagementTerraformModuleBasic,
  awsPatchManagementTerraformModuleComplete,
} from "../../helpers/codeblocks";

const repoUrl =
  "https://github.com/heyitsmeharv/terraform-aws-patch-management";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const ssmArchitecture = `[ec2] EC2 Fleet
  [tag] PatchGroup Tag
    [ssm] AWS Systems Manager
      [agent] SSM Agent (outbound HTTPS)
        [pm] Patch Manager
          [baseline] Patch Baseline
            (Security + Bugfix patches)
            (approve_after_days: 7 dev | 14 prod)
          [group] Patch Group
            (tag → baseline mapping)
          [scan] Scan Association (hourly)
          [window] Maintenance Window
            (dev Fri 22:00 UTC | stage Sat 01:00 | prod Sun 02:00)
            [t0] Priority 0 - EBS Snapshot
            [t1] Priority 1 - AWS-RunPatchBaseline (Install)
            [t2] Priority 2 - Health Check (curl)
        [compliance] Compliance Dashboard
          [config] AWS Config rule
          [hub] Security Hub (cross-account aggregation)
      [inspector] Inspector v2
        (continuous CVE scanning)
        [eb1] EventBridge → SNS (Critical findings)
  [imagebuilder] EC2 Image Builder
    (weekly Sun 01:00 UTC - before prod window)
    [recipe] Recipe = AL2023 base + patch component + hardening
      [ami] Golden AMI (patches baked in)
        [lt] Launch Template (new version)
          [asg] Auto Scaling Group → instance refresh
  [packer] Packer (alternative - GitHub Actions)
    > same output: tagged AMI → Launch Template → ASG refresh`;

const patchManagementDecisions = [
  {
    title: "SSM Patch Manager vs Golden AMI vs both",
    body: `Stateful workloads - databases, bastion hosts, long-lived build agents - cannot
be replaced without losing data or state. They need in-place patching via SSM Patch
Manager. Stateless ASG workloads can be thrown away and replaced, making them ideal
for the Golden AMI pattern. A mature setup uses both: SSM Patch Manager for anything
that can't be replaced, EC2 Image Builder for everything that can. The module supports
both patterns simultaneously.`,
  },
  {
    title: "The soak period length (7 days dev / 14 days prod)",
    body: `Zero-day approval for Critical patches sounds security-conscious but introduces
regression risk - a newly-released patch with a bug will reach production within hours.
Thirty days is safe from regression but leaves an unacceptably long exposure window for
actively-exploited CVEs. Seven days for dev and fourteen for prod, combined with staggered
maintenance windows (Friday → Saturday → Sunday), gives an effective ~21-day soak from
patch release to production. That's long enough to catch regressions in dev before they
reach prod, without sitting on a Critical CVE for a month.`,
  },
  {
    title: "RebootIfNeeded - never NoReboot",
    body: `Setting RebootOption to NoReboot avoids unplanned reboots but creates
InstalledPendingReboot compliance states: the patch is on disk, the dashboard shows
"installed", but the old vulnerable binary is still running in memory. The fleet looks
compliant while actually being exposed. RebootIfNeeded is the correct default - instances
only reboot when the installed package actually requires it (kernel, glibc, and similar
core libraries). Workloads that cannot tolerate automated reboots need a drain-and-reboot
procedure, not NoReboot.`,
  },
  {
    title: "EC2 Image Builder vs Packer",
    body: `Both produce the same output: a tagged AMI in your account. Image Builder is
fully managed inside AWS - no CI/CD pipeline dependency, built-in Inspector scanning as
a pipeline gate, and a native schedule. Packer runs in your repository alongside
application code - version-controlled, testable, and multi-cloud (the same template
builds for Azure and GCP). Choose Image Builder if you want no external dependency.
Choose Packer if you are already in the HashiCorp ecosystem or need multi-cloud builds.`,
  },
  {
    title: "Inspector v2 alongside SSM Patch Manager",
    body: `Inspector is detection; Patch Manager is remediation. Running only one leaves
a gap. Inspector without Patch Manager means you surface vulnerabilities but cannot
automate fixing them. Patch Manager without Inspector means you are blind between
maintenance windows - new CVEs published on Monday are unknown to you until Sunday's
window scans the fleet. Both together close the loop: Inspector alerts within minutes
of a new Critical CVE, and Patch Manager applies the fix on the next window or
immediately via send-command for zero-tolerance severities.`,
  },
];

const AWSPatchManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/aws-patch-management");
    Analytics.track("blog_page_viewed", { slug: "aws-patch-management" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>AWS Patch Management</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSSSMSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEC2SVG />
            </HeaderIcon>
            <HeaderIcon>
              <TerraformSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          By the end of this post you will understand how software
          vulnerabilities are discovered, scored, and tracked; how AWS SSM Patch
          Manager automates in-place patching across a fleet of EC2 instances;
          how EC2 Image Builder bakes patches into pre-hardened AMIs before any
          instance ever launches from them; and how to wire alerting, compliance
          reporting, and multi-account visibility together into a complete
          system. Here is a deployable{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            Terraform module on GitHub
          </TextLink>{" "}
          demonstrating the concepts in this post:
        </Paragraph>

        <TextList>
          <TextListItem>
            How vulnerabilities are discovered, scored (CVSS), and tracked (CVE)
          </TextListItem>
          <TextListItem>
            How SSM Patch Manager automates in-place patching on a schedule
          </TextListItem>
          <TextListItem>
            How EC2 Image Builder bakes patches into pre-hardened Golden AMIs
          </TextListItem>
          <TextListItem>
            How to detect new vulnerabilities between patch windows with
            Inspector v2
          </TextListItem>
          <TextListItem>
            How to alert on failures and report compliance to auditors
          </TextListItem>
        </TextList>

        <SectionHeading>
          Why Patch Management is an Operational Problem
        </SectionHeading>

        <Paragraph>
          Patching the operating system and software running <Strong>on</Strong>
          instances is your responsibility. Without a patch management system in
          place, you are exposed and vulnerable to security threats.
        </Paragraph>

        <Paragraph>
          This is something that comes with the territory when running EC2
          instances. If you use AWS Fargate (the serverless container runtime
          behind ECS and EKS), AWS patches the underlying compute for you. But
          the moment you run your own EC2 instances - whether directly or as ECS
          or EKS worker nodes - patching the OS on those instances is your
          responsibility.
        </Paragraph>

        <Paragraph>
          The <Strong>exposure window</Strong> is the time between "patch
          available" and "patch on every instance." Every step of the pipeline -
          testing, approval, scheduling, deployment - adds time to that window.
          The goal of patch management infrastructure is to make that window as
          small as operationally safe.
        </Paragraph>

        <Paragraph>
          SSH-ing into ten instances and running{" "}
          <InlineHighlight>sudo dnf update</InlineHighlight> is annoying but
          possible. Doing the same across 200 instances, in four AWS accounts,
          with different operating systems, different patch schedules, and a
          compliance audit scheduled for next month can be a massive burden
          without infrastructure to support it.
        </Paragraph>

        <SectionHeading>What is Patching?</SectionHeading>

        <Paragraph>
          Linux EC2 instances run software installed as packages:{" "}
          <InlineHighlight>openssl</InlineHighlight>,{" "}
          <InlineHighlight>curl</InlineHighlight>, the Linux kernel itself,
          application runtimes like Python or Node. Packages have version
          numbers - <InlineHighlight>openssl-3.0.7-1.amzn2023</InlineHighlight>{" "}
          for example. When a security vulnerability is found in a specific
          version, the maintainers release a new version with the fix.
          Installing that new version is what "patching" means. The
          vulnerability doesn't disappear from the old version, it just isn't
          present in the new one.
        </Paragraph>

        <Paragraph>
          On Amazon Linux 2023, the package manager is{" "}
          <InlineHighlight>dnf</InlineHighlight>. Running{" "}
          <InlineHighlight>dnf update openssl</InlineHighlight> downloads and
          installs the latest version. Running{" "}
          <InlineHighlight>dnf update --security</InlineHighlight> applies only
          packages where the update is classified as a security fix. The OS
          tracks what's installed, what's available, and which security
          advisories apply to each package. The commands below show these
          mechanics directly:
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementCLIPackageManager} />

        <Paragraph>
          Some patches require a reboot and some do not. When you update a
          package like <InlineHighlight>curl</InlineHighlight>, the new binary
          is written to disk and starts being used immediately by new processes.
          But some packages, notably the Linux kernel and core libraries like{" "}
          <InlineHighlight>glibc</InlineHighlight> - are loaded into memory when
          the OS starts. Updating them writes the new version to disk, but the
          old version stays running in memory. The fix only takes effect after
          the instance reboots and loads the new code. This is the origin of the{" "}
          <InlineHighlight>InstalledPendingReboot</InlineHighlight> compliance
          state covered later in the post, and the reason why{" "}
          <InlineHighlight>RebootIfNeeded</InlineHighlight> is the correct
          default.
        </Paragraph>

        <Banner title="What are the kernel and glibc?" variant="info">
          <Paragraph>
            The <Strong>Linux kernel</Strong> is the core of the operating
            system - it sits between your software and the hardware and manages
            everything from memory to networking. <Strong>glibc</Strong> is the
            standard C library that almost every Linux program depends on at
            startup. Both are loaded into memory when the instance boots, so
            updating them requires a reboot to take effect.
          </Paragraph>
        </Banner>

        <SectionHeading>
          The CVE Lifecycle (From Discovery to Your Instance)
        </SectionHeading>

        <Paragraph>
          Every publicly disclosed security vulnerability gets a unique
          identifier: <InlineHighlight>CVE-YYYY-NNNNN</InlineHighlight>. CVE
          stands for Common Vulnerabilities and Exposures. These identifiers are
          assigned by CVE Numbering Authorities - organisations like Red Hat,
          Microsoft, GitHub, and Amazon who are authorised to register
          vulnerabilities found in their products. Once assigned, the CVE and
          its details are published to the National Vulnerability Database (NVD)
          at nvd.nist.gov, where it receives a severity score.
        </Paragraph>

        <Paragraph>
          Amazon is a CVE Numbering Authority (CNA). When a vulnerability is
          found in software that ships with AWS-managed AMIs, Amazon releases a
          patched package, publishes a security advisory, and updates the SSM
          patch metadata that Patch Manager uses to classify packages as
          security fixes. You do not need to monitor the NVD directly - SSM does
          it for you. But understanding the source helps when a CVE is published
          and you need to assess your exposure before the next maintenance
          window fires.
        </Paragraph>

        <Paragraph>
          The industry-standard remediation timelines come from NIST SP 800-40r4
          (a US government security guide from the National Institute of
          Standards and Technology) and are expected by compliance frameworks
          like SOC 2 (Service Organisation Control - an auditing standard for
          data security) and ISO 27001 (an international standard for
          information security management): Critical within 15 days, High within
          30 days, Medium within 90 days, Low within 365 days. The soak period
          and maintenance window schedule in this module are designed to meet
          these timelines for Critical and High severity patches while still
          allowing regressions to surface in dev before they reach production.
        </Paragraph>

        <Banner title="Soak Period" variant="info">
          <Paragraph>
            The <Strong>soak period</Strong> is the waiting time between when a
            patch is released by the vendor and when your baseline automatically
            approves it for installation. It gives the broader community time to
            discover regressions in a new patch before it reaches your fleet. In
            SSM this is controlled by the{" "}
            <InlineHighlight>approve_after_days</InlineHighlight> field on a
            baseline approval rule.
          </Paragraph>
        </Banner>

        <Paragraph>
          The full lifecycle from discovery to your instance:
        </Paragraph>

        <TextList>
          <TextListItem>
            Researcher or automated scanner discovers the vulnerability
          </TextListItem>
          <TextListItem>CVE ID assigned by the relevant CNA</TextListItem>
          <TextListItem>NVD publishes the CVE with a CVSS score</TextListItem>
          <TextListItem>
            Vendor (Amazon, Red Hat, Canonical) releases a patched package
          </TextListItem>
          <TextListItem>
            AWS updates SSM patch metadata - the package is now classifiable as
            a security fix
          </TextListItem>
          <TextListItem>
            Your baseline approves the patch after the soak period
          </TextListItem>
          <TextListItem>
            Your maintenance window installs it on the next scheduled run
          </TextListItem>
          <TextListItem>
            Compliance state updates to{" "}
            <InlineHighlight>Installed</InlineHighlight>
          </TextListItem>
        </TextList>

        <SectionHeading>
          CVSS Scoring (Reading the Severity Number)
        </SectionHeading>

        <Paragraph>
          Every CVE receives a score from 0.0 to 10.0 using the Common
          Vulnerability Scoring System. The score is calculated from eight
          factors that describe how the vulnerability can be exploited and what
          damage it can cause. Understanding how the score is calculated matters
          because a 9.8 that requires physical access to exploit is considerably
          less urgent than a 7.5 that is remotely exploitable with active
          exploit code already in the wild.
        </Paragraph>

        <SubSectionHeading>The 8 CVSS Vectors</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Attack Vector (AV)</Strong> - how far away does an attacker
            need to be? Network (N) = from the internet. Adjacent (A) = must be
            on the same network. Local (L) = must have shell access. Physical
            (P) = must physically touch the machine.
          </TextListItem>
          <TextListItem>
            <Strong>Attack Complexity (AC)</Strong> - how hard is the attack?
            Low (L) = no special conditions. High (H) = requires specific
            configuration or race conditions.
          </TextListItem>
          <TextListItem>
            <Strong>Privileges Required (PR)</Strong> - does the attacker need
            an account? None (N) = no. Low (L) = regular user. High (H) = admin.
          </TextListItem>
          <TextListItem>
            <Strong>User Interaction (UI)</Strong> - does a user need to do
            something? None (N) = fully automated. Required (R) = a user must
            click something.
          </TextListItem>
          <TextListItem>
            <Strong>Scope (S)</Strong> - can the vulnerability escape the
            vulnerable component and affect others? Unchanged (U) = contained.
            Changed (C) = can escape.
          </TextListItem>
          <TextListItem>
            <Strong>Confidentiality (C)</Strong> - can the attacker read data?
            None / Low / High.
          </TextListItem>
          <TextListItem>
            <Strong>Integrity (I)</Strong> - can the attacker modify data? None
            / Low / High.
          </TextListItem>
          <TextListItem>
            <Strong>Availability (A)</Strong> - can the attacker cause denial of
            service? None / Low / High.
          </TextListItem>
        </TextList>

        <Paragraph>
          The score bands map directly to the{" "}
          <InlineHighlight>compliance_level</InlineHighlight> you set in an SSM
          Patch Baseline, and to the finding severities you will see in
          Inspector v2: Critical (9.0-10.0), High (7.0-8.9), Medium (4.0-6.9),
          Low (0.1-3.9). Inspector also factors in real-world exploitability
          from threat intelligence feeds - a theoretically lower-scored CVE with
          active exploit code in the wild may be prioritised higher than its raw
          CVSS number suggests. Full Inspector v2 coverage is in the{" "}
          <TextLink to="/blog/aws-security-encryption">
            AWS Security &amp; Encryption post
          </TextLink>
          .
        </Paragraph>

        <SectionHeading>Mutable vs Immutable Patching</SectionHeading>

        <Paragraph>
          There are two fundamentally different approaches to keeping EC2
          instances patched: mutable (in-place) and immutable (replace). Mutable
          means the thing is changed in place. Immutable means it is replaced
          rather than changed.
        </Paragraph>

        <Paragraph>
          <Strong>Mutable patching</Strong> communicates with the running
          instance via the SSM Agent over HTTPS and runs the package manager on
          a schedule. The instance keeps running with updated software installed
          on top of whatever was already there. This is what SSM Patch Manager
          does. It is the right choice for stateful workloads - databases,
          bastion hosts, long-lived build agents - where replacing the instance
          would lose data or state. The downside: instances accumulate
          configuration drift over time, and you have to actively manage them
          for as long as they run.
        </Paragraph>

        <Paragraph>
          <Strong>Immutable patching</Strong> bakes patches into a new AMI
          before any instance is launched from it. This pre-built, pre-patched
          AMI is called a <Strong>Golden AMI</Strong> - a known-good, hardened
          image that serves as the standard starting point for every instance in
          your fleet. When a new Golden AMI is built with all current patches
          applied, the Auto Scaling Group is updated to use it and instances are
          rotated out. Every instance always starts from a known-clean,
          reproducible baseline. There is no drift because there is no
          long-running instance to drift. The downside: rotating instances takes
          time, and there is a gap between AMI builds during which newly
          published CVEs are not yet baked in.
        </Paragraph>

        <Banner
          title="Both approaches coexist in a mature setup"
          variant="info"
        >
          <Paragraph>
            Use SSM Patch Manager for your long-lived stateful instances. Use
            Golden AMIs built with EC2 Image Builder for your autoscaling
            application tier. Both are covered in this post. The Terraform
            module supports both simultaneously.
          </Paragraph>
        </Banner>

        <SectionHeading>
          SSM Agent - How AWS Reaches Your Instances
        </SectionHeading>

        <Paragraph>
          AWS Systems Manager is a family of tools for managing EC2 instances at
          scale. It covers patching (Patch Manager), remote command execution
          (Run Command), session-based access without SSH (Session Manager),
          inventory and compliance (Fleet Manager, Compliance), and parameter
          and secret storage. This post focuses on the patching side. The
          parameter store and secrets capabilities are covered in the{" "}
          <TextLink to="/blog/aws-security-encryption">
            AWS Security &amp; Encryption post
          </TextLink>
          .
        </Paragraph>

        <Paragraph>
          The SSM Agent is a background process (
          <InlineHighlight>amazon-ssm-agent</InlineHighlight>) that runs on your
          EC2 instance and <Strong>connects outbound over HTTPS</Strong> to SSM
          endpoints in your AWS region. This is the component that receives and
          executes instructions from Patch Manager, Run Command, and all other
          SSM features. It comes pre-installed on Amazon Linux 2, AL2023, Ubuntu
          16.04+, and Windows Server 2016+.
        </Paragraph>

        <Paragraph>
          The agent needs outbound HTTPS access to three endpoints:{" "}
          <InlineHighlight>
            ssm.&#123;region&#125;.amazonaws.com
          </InlineHighlight>
          ,{" "}
          <InlineHighlight>
            ec2messages.&#123;region&#125;.amazonaws.com
          </InlineHighlight>
          , and{" "}
          <InlineHighlight>
            ssmmessages.&#123;region&#125;.amazonaws.com
          </InlineHighlight>
          . In public subnets with a NAT gateway this works automatically. VPC
          and subnet concepts are covered in the{" "}
          <TextLink to="/blog/aws-vpc">AWS VPC post</TextLink>. Without outbound
          HTTPS access, instances will never appear as managed in SSM.
        </Paragraph>

        <Paragraph>
          Every instance also needs an IAM instance profile carrying the{" "}
          <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight>{" "}
          managed policy. This grants the agent permission to register itself
          with SSM, download agent updates from S3, and write command output to
          CloudWatch Logs. IAM roles and instance profiles are covered in the{" "}
          <TextLink to="/blog/aws-identity-access-management">
            IAM post
          </TextLink>
          . One common mistake: attaching{" "}
          <InlineHighlight>AmazonSSMFullAccess</InlineHighlight> to the instance
          profile. That grants SSM admin permissions to the instance itself. Use
          the scoped <InlineHighlight>ManagedInstanceCore</InlineHighlight>{" "}
          policy instead.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformIAMRole} />

        <Paragraph>
          Once the agent is running with the right IAM and network access, the
          instance appears in the SSM Fleet Manager console. The agent polls for
          new instructions every 30 seconds. Ping status{" "}
          <InlineHighlight>Online</InlineHighlight> means it is ready to receive
          instructions. Any instance not showing as Online will not receive
          patches.
        </Paragraph>

        <Banner title="Instance not appearing in Fleet Manager?" variant="info">
          <Paragraph>
            This is the most common first stumbling block. Check in order: (1)
            confirm the instance profile has{" "}
            <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight>{" "}
            attached; (2) confirm outbound HTTPS is reachable to the three SSM
            endpoints above; (3) verify the agent is actually running:{" "}
            <InlineHighlight>
              sudo systemctl status amazon-ssm-agent
            </InlineHighlight>
            . Existing instances pick up a newly attached profile without a
            restart - SSM re-registers on the next heartbeat.
          </Paragraph>
        </Banner>

        <Banner title="Private subnets without NAT" variant="warning">
          <Paragraph>
            If your instances are in private subnets without a NAT gateway, the
            SSM endpoints are unreachable and no instance will appear as
            managed. The fix is three VPC Interface Endpoints - one each for{" "}
            <InlineHighlight>ssm</InlineHighlight>,{" "}
            <InlineHighlight>ec2messages</InlineHighlight>, and{" "}
            <InlineHighlight>ssmmessages</InlineHighlight>. These create private
            connections from your VPC directly to AWS services, bypassing the
            internet entirely.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={awsPatchManagementTerraformVPCEndpoints} />

        <SectionHeading>Patch Baselines (The Rulebook)</SectionHeading>

        <Paragraph>
          A patch baseline is the rulebook that defines which patches are
          approved for your fleet. When SSM evaluates an instance, it compares
          the list of available packages against the baseline to determine which
          ones should be installed and which ones affect compliance. If a patch
          is in the baseline and not installed, the instance is non-compliant.
          If a patch is not in the baseline, SSM ignores it entirely.
        </Paragraph>

        <Paragraph>
          AWS provides default baselines for each supported OS - for example,{" "}
          <InlineHighlight>
            AWS-AmazonLinux2023DefaultPatchBaseline
          </InlineHighlight>
          . The default auto-approves Critical patches after zero days and High
          after seven days. Zero-day approval for Critical sounds prudent but is
          risky - a newly-released patch with a regression will reach production
          almost immediately with no opportunity to catch it in dev first. A
          custom baseline lets you control the soak period per environment.
        </Paragraph>

        <Paragraph>
          Each approval rule has four key fields. The{" "}
          <InlineHighlight>patch_filter</InlineHighlight> narrows which patches
          the rule applies to using combinations of CLASSIFICATION and SEVERITY.
          The <InlineHighlight>approve_after_days</InlineHighlight> is the soak
          period - the number of days SSM waits after a patch's release date
          before approving it. The{" "}
          <InlineHighlight>compliance_level</InlineHighlight> maps to CVSS
          severity bands: setting this to{" "}
          <InlineHighlight>CRITICAL</InlineHighlight> means any instance missing
          a matching patch is flagged as critically non-compliant in SSM
          Compliance and in Security Hub. The{" "}
          <InlineHighlight>enable_non_security</InlineHighlight> flag controls
          whether non-security packages (Bugfixes, Enhancements) are included.
        </Paragraph>

        <Paragraph>
          Classification values for Amazon Linux 2023:{" "}
          <InlineHighlight>Security</InlineHighlight> (CVE fixes),{" "}
          <InlineHighlight>Bugfix</InlineHighlight> (non-security defect fixes),{" "}
          <InlineHighlight>Enhancement</InlineHighlight>,{" "}
          <InlineHighlight>Recommended</InlineHighlight>,{" "}
          <InlineHighlight>Newpackage</InlineHighlight>. A security-focused
          baseline targets Security and Bugfix at minimum.
        </Paragraph>

        <Paragraph>
          The module uses a single baseline per environment with{" "}
          <InlineHighlight>approve_after_days</InlineHighlight> driven by the
          environment name: seven days for dev and stage, fourteen days for
          prod. Combined with staggered maintenance windows (Friday dev,
          Saturday stage, Sunday prod), this creates an effective ~21-day soak
          from patch release to production.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformBaseline} />

        <SubSectionHeading>
          Scan vs Install - How the Dashboard Stays Current
        </SubSectionHeading>

        <Paragraph>
          SSM Patch Manager has two operations. <Strong>Install</Strong> is what
          the maintenance window runs once a week to apply patches.{" "}
          <Strong>Scan</Strong> is a separate, frequent operation that reads the
          installed package list, compares it against the baseline, and writes
          the result to the compliance dashboard - without installing anything.
          Scan runs as an SSM State Manager association on a schedule (hourly in
          this module). Without a scan association, the compliance dashboard
          only updates when the weekly maintenance window fires. With one, the
          dashboard reflects your current state within the hour.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformScanAssociation} />

        {/* ── Section 9 - Patch Groups ──────────────────────────────────────── */}
        <SectionHeading>
          Patch Groups (Targeting the Right Instances)
        </SectionHeading>

        <Paragraph>
          A patch group is a named set of instances that share a baseline. An
          instance joins a patch group by carrying the tag{" "}
          <InlineHighlight>PatchGroup = &lt;group-name&gt;</InlineHighlight>.
          The group name is then registered against a specific baseline - so
          instances tagged{" "}
          <InlineHighlight>PatchGroup = my-app-prod</InlineHighlight> use the
          prod baseline with its 14-day soak, while instances tagged{" "}
          <InlineHighlight>PatchGroup = my-app-dev</InlineHighlight> use the dev
          baseline with its 7-day soak.
        </Paragraph>

        <Paragraph>
          Instances without a <InlineHighlight>PatchGroup</InlineHighlight> tag
          fall into the default group for their OS, which maps to the
          AWS-managed default baseline. This is the unmanaged state - you lose
          per-environment control and inherit AWS's aggressive approval timings.
          Tag your EC2 Launch Templates (covered in the{" "}
          <TextLink to="/blog/aws-elastic-compute-cloud">EC2 post</TextLink>) so
          every new instance gets the correct tag automatically at launch. For
          existing running instances, add the{" "}
          <InlineHighlight>PatchGroup</InlineHighlight> tag directly to the
          instance - SSM re-evaluates tags on every scan cycle and picks it up
          within an hour, no restart required.
        </Paragraph>

        <Paragraph>
          One patch group maps to exactly one baseline. One baseline can back
          multiple patch groups.{" "}
          <InlineHighlight>aws_ssm_patch_group</InlineHighlight> is the
          Terraform resource that creates the link.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformPatchGroup} />

        {/* ── Section 10 - Maintenance Windows ─────────────────────────────── */}
        <SectionHeading>
          Maintenance Windows (Scheduling Patches)
        </SectionHeading>

        <Paragraph>
          A maintenance window is a scheduled time slot during which SSM will
          execute tasks against your managed instances. Think of it as a cron
          job managed by AWS - except it also handles concurrency limits, error
          thresholds, task ordering by priority, and notifications out of the
          box.
        </Paragraph>

        <Paragraph>
          The <InlineHighlight>schedule</InlineHighlight> field takes an SSM
          cron expression. The format is{" "}
          <InlineHighlight>
            cron(minutes hours day-of-month month day-of-week year)
          </InlineHighlight>
          . <InlineHighlight>cron(0 2 ? * SUN *)</InlineHighlight> means minute
          0, hour 2, any day-of-month (<InlineHighlight>?</InlineHighlight> when
          day-of-week is specified), any month, Sunday, any year - so: Sunday at
          02:00.{" "}
          <Strong>
            All SSM maintenance window cron expressions are evaluated in UTC.
          </Strong>{" "}
          A schedule of <InlineHighlight>cron(0 22 ? * FRI *)</InlineHighlight>{" "}
          fires at 22:00 UTC on Friday - which is 23:00 BST in summer and 22:00
          GMT in winter.
        </Paragraph>

        <Paragraph>
          The <InlineHighlight>duration</InlineHighlight> is the total window
          length in hours. The <InlineHighlight>cutoff</InlineHighlight> is how
          many hours before the window ends SSM stops accepting new task
          executions. Without a cutoff, a patching task that starts one minute
          before the window closes could run for hours into business hours.
        </Paragraph>

        <Paragraph>
          Instances are targeted by tag, not instance ID. Instance IDs change
          when instances are replaced - tag-based targeting is durable across
          rotations. If an instance is stopped when the window fires, SSM skips
          it - it will not be patched that cycle and will appear non-compliant
          until the next window runs or until you patch it manually.
        </Paragraph>

        <Paragraph>
          A maintenance window can contain multiple tasks with integer
          priorities. SSM executes them lowest-first. This module uses three:
          priority 0 (EBS snapshot before patching), priority 1 (install
          patches), priority 2 (post-patch health check). If the snapshot task
          fails, the patch task does not start.{" "}
          <InlineHighlight>max_concurrency = "50%"</InlineHighlight> patches at
          most half the fleet simultaneously, keeping the other half serving
          traffic. <InlineHighlight>max_errors = "20%"</InlineHighlight> aborts
          the task if more than 20% of instances fail, preventing a broken patch
          from rolling out to the entire fleet.
        </Paragraph>

        <Paragraph>
          The module defaults to Friday 22:00 for dev, Saturday 01:00 for stage,
          and Sunday 02:00 for prod (all UTC). A regression caught in dev on
          Friday gives you Friday night and Saturday to investigate before stage
          patches. A regression in stage on Saturday gives you Saturday night
          before prod patches on Sunday. Sunday 02:00 for prod is the
          lowest-traffic window for most workloads, with the rest of Sunday to
          monitor before the working week starts.
        </Paragraph>

        <CodeBlockWithCopy
          code={awsPatchManagementTerraformMaintenanceWindow}
        />

        {/* ── Section 11 - Compliance States ───────────────────────────────── */}
        <SectionHeading>
          Patch Compliance States (Reading the Dashboard)
        </SectionHeading>

        <Paragraph>
          SSM assigns a compliance state to every (instance, patch) pair. These
          states are what you see in the Patch Manager dashboard, in compliance
          summaries, and in Security Hub findings. Understanding them is
          essential - not all "patched" states are equal.
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>Installed</InlineHighlight> - the patch is
            installed and active. The new version is running.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledOther</InlineHighlight> - the patch is
            installed but was not required by the baseline (manually installed,
            or applied by another tool). Counts as compliant but worth
            monitoring for drift.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledPendingReboot</InlineHighlight> - SSM
            installed the package but it requires a reboot to take effect. The
            old vulnerable version is still running in memory. The instance
            shows as "patched" on paper but the vulnerable code is live.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>InstalledRejected</InlineHighlight> - the instance
            has a package that is in your{" "}
            <InlineHighlight>rejected_patches</InlineHighlight> list. Either the
            rejection list is wrong or something installed a package you
            explicitly blocked.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>Missing</InlineHighlight> - the baseline requires
            this patch but it is not installed. This is the state that triggers
            non-compliance.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>Failed</InlineHighlight> - SSM attempted to install
            the patch and the package manager returned an error. Common causes:
            package conflicts, disk space, network issues during download.
          </TextListItem>
          <TextListItem>
            <InlineHighlight>NotApplicable</InlineHighlight> - the patch does
            not apply to this instance's OS version or architecture.
          </TextListItem>
        </TextList>

        <Banner
          title="InstalledPendingReboot - the false-compliance trap"
          variant="warning"
        >
          <Paragraph>
            If <InlineHighlight>RebootOption = NoReboot</InlineHighlight>, every
            kernel or glibc update lands in{" "}
            <InlineHighlight>InstalledPendingReboot</InlineHighlight>. The
            dashboard shows a high installed count. The compliance score looks
            fine. But the old, vulnerable kernel is still running in memory.
            Always check this state explicitly when reading compliance reports,
            and always use <InlineHighlight>RebootIfNeeded</InlineHighlight> as
            the default.
          </Paragraph>
        </Banner>

        <CodeBlockWithCopy code={awsPatchManagementCLIComplianceStates} />

        {/* ── Section 12 - Inspector v2 ─────────────────────────────────────── */}
        <SectionHeading>
          AWS Inspector v2 (Continuous Vulnerability Detection)
        </SectionHeading>

        <Paragraph>
          Patch Manager applies known patches on a schedule. Between windows,
          new CVEs are published every day. Inspector v2 fills this gap - it
          continuously scans your managed instances against the NVD and threat
          intelligence feeds and surfaces vulnerabilities without waiting for
          the next maintenance window.{" "}
          <Strong>Inspector is detection; Patch Manager is remediation.</Strong>{" "}
          You need both.
        </Paragraph>

        <Paragraph>
          Inspector uses the SSM Agent's software inventory capability to read
          the list of installed packages and versions on each managed instance.
          It cross-references those versions against the vulnerability database
          and factors in real-world exploitability - a CVE with active exploit
          code in the wild is prioritised higher than a theoretical
          vulnerability with the same CVSS score. No separate scanner or agent
          is needed beyond what you have already set up. Inspector is covered in
          full in the{" "}
          <TextLink to="/blog/aws-security-encryption">
            AWS Security &amp; Encryption post
          </TextLink>
          ; here the focus is on the integration with patching.
        </Paragraph>

        <Paragraph>
          The alert pipeline: Inspector finding → EventBridge (AWS's serverless
          event routing service - it watches for events from AWS services and
          forwards matching events to targets you define) → SNS topic (
          <TextLink to="/blog/aws-sns">SNS</TextLink> delivers the notification
          to your email or on-call channel). For Critical findings you want this
          firing within minutes, not waiting for a weekly report.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformInspector} />

        {/* ── Section 13 - Testing and Staging ─────────────────────────────── */}
        <SectionHeading>
          Testing and Staging (The Patch Pipeline)
        </SectionHeading>

        <Paragraph>
          Patches can introduce regressions. A security fix in{" "}
          <InlineHighlight>openssl</InlineHighlight> might change TLS handshake
          behaviour that breaks a connection your application makes. A{" "}
          <InlineHighlight>glibc</InlineHighlight> update might change symbol
          resolution that a compiled binary depends on. The same discipline you
          apply to application deployments applies to OS patches - you discover
          these issues in dev, not prod.
        </Paragraph>

        <Paragraph>
          The staggered <InlineHighlight>approve_after_days</InlineHighlight> in
          the baselines (seven days for dev, fourteen for prod) combined with
          the staggered maintenance windows (Friday dev, Saturday stage, Sunday
          prod) means: a patch released on Monday is approved for dev seven days
          later. The dev window fires on Friday night. Stage approves fourteen
          days from release, with its window firing the Saturday after dev
          patched. Prod approves fourteen days from release, with its window
          firing Sunday - one day after stage. The effective soak from release
          to prod is approximately 21 days.
        </Paragraph>

        <Paragraph>
          The priority 0 task in the maintenance window creates an EBS snapshot
          of each instance's volumes before patching starts. For stateful
          workloads on the mutable path - databases, build agents - the EBS
          snapshot is the rollback path: restore the snapshot if a patch breaks
          something. For stateless ASG instances on the immutable path (Golden
          AMI), individual pre-patch snapshots are less critical - rollback
          means reverting to the previous Launch Template version and triggering
          a fresh instance refresh. Set{" "}
          <InlineHighlight>pre_patch_snapshot = false</InlineHighlight> for
          stateless ASG fleets.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformPrePatchTask} />

        <Paragraph>
          The priority 2 task runs a shell script on each instance after
          patching. The script curls the application's health check endpoint and
          asserts HTTP 200. If the health check fails, the instance fails the
          task. If enough instances fail to breach{" "}
          <InlineHighlight>max_errors</InlineHighlight>, the maintenance window
          execution is marked Failed - a clear automated signal without manually
          checking each instance.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformPostPatchTask} />

        <Banner
          title="Canary patching for significant baseline changes"
          variant="info"
        >
          <Paragraph>
            For major baseline changes - new OS version, significant kernel
            update - set{" "}
            <InlineHighlight>max_concurrency = "1"</InlineHighlight> for the
            first run. Patch one instance, observe for an hour, then increase
            concurrency. This prevents a bad patch from hitting the entire fleet
            before you notice.
          </Paragraph>
        </Banner>

        {/* ── Section 14 - Emergency Patching ──────────────────────────────── */}
        <SectionHeading>
          Emergency Patching (When You Can't Wait for Sunday)
        </SectionHeading>

        <Paragraph>
          A Critical CVE drops on Tuesday. CVSS 9.8. Active exploit code is
          already circulating on public repositories. Your prod maintenance
          window is Sunday. Five days of known, remotely-exploitable, no-auth
          exposure is not acceptable. The maintenance window is for routine
          patching - emergencies need an out-of-band mechanism.
        </Paragraph>

        <Paragraph>
          <InlineHighlight>aws ssm send-command</InlineHighlight> fires{" "}
          <InlineHighlight>AWS-RunPatchBaseline</InlineHighlight> with{" "}
          <InlineHighlight>Operation=Install</InlineHighlight> immediately,
          against your patch group tag, without waiting for the scheduled
          window. You control the timing, monitor the execution live, and verify
          compliance immediately after.
        </Paragraph>

        <Paragraph>
          Emergency patching checklist: (1) communicate to stakeholders -
          unscheduled reboots during business hours need notice; (2) trigger EBS
          snapshots for stateful workloads before starting; (3) run{" "}
          <InlineHighlight>send-command</InlineHighlight> with Install; (4) tail
          the CloudWatch Logs for command output; (5) run{" "}
          <InlineHighlight>list-resource-compliance-summaries</InlineHighlight>{" "}
          to confirm <InlineHighlight>Missing</InlineHighlight> →{" "}
          <InlineHighlight>Installed</InlineHighlight>; (6) document the
          emergency window with the CVE ID and timestamp for audit evidence.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementCLIEmergencyPatch} />

        {/* ── Section 15 - What is an AMI? ─────────────────────────────────── */}
        <SectionHeading>What is an AMI?</SectionHeading>

        <Paragraph>
          An AMI (Amazon Machine Image) is a pre-configured OS snapshot that EC2
          uses as a template when launching a new instance. It contains the
          operating system, pre-installed software, and initial configuration.
          When you launch an EC2 instance, you pick an AMI - the instance starts
          from that state. AMIs are covered in depth in the{" "}
          <TextLink to="/blog/aws-elastic-compute-cloud">EC2 post</TextLink>.
          What matters here is the implication: if the AMI already has all
          current security patches applied at build time, every instance
          launched from it starts patched - before user data runs, before the
          application starts, before any traffic arrives.
        </Paragraph>

        <Paragraph>
          A Launch Template is the configuration spec for launching instances
          from an AMI: which AMI, which instance type, which networking, which
          IAM profile, which tags, which user data. An Auto Scaling Group uses a
          Launch Template to know what to launch when it scales out. When you
          update the Launch Template to point to a new AMI and trigger an
          instance refresh, the ASG systematically replaces old instances
          (launched from the old AMI) with new instances (launched from the new,
          patched AMI).
        </Paragraph>

        {/* ── Section 16 - The Golden AMI Pattern ──────────────────────────── */}
        <SectionHeading>The Golden AMI Pattern</SectionHeading>

        <Paragraph>
          Instead of patching running instances, build a new AMI with patches
          already applied and rotate instances to it. Every instance in your ASG
          always starts from a known-good, reproducible, patched baseline. No
          instance has been running for two years accumulating configuration
          drift. No "I'm not sure what's on this box."
        </Paragraph>

        <Paragraph>
          Always start from an AWS-provided base AMI (
          <InlineHighlight>al2023-ami-*-x86_64</InlineHighlight>). AWS publishes
          and maintains these - starting from them means your Golden AMI
          inherits their hardening. Never maintain your own base from scratch;
          you would be responsible for every low-level OS decision that AWS
          already makes for you.
        </Paragraph>

        <Paragraph>
          At build time, capture the full list of installed packages:{" "}
          <InlineHighlight>
            rpm -qa --queryformat
            '%&#123;NAME&#125;|%&#123;VERSION&#125;|%&#123;RELEASE&#125;\n'
          </InlineHighlight>
          . Store this manifest as an artifact tagged to the AMI. When a new CVE
          is published, you can diff your current AMI's manifest against the
          vulnerable package version and know immediately whether your fleet is
          exposed - without scanning running instances. The cost of keeping
          three AMI generations is approximately £1.50/month in snapshot
          storage.
        </Paragraph>

        {/* ── Section 17 - EC2 Image Builder ───────────────────────────────── */}
        <SectionHeading>
          EC2 Image Builder (The AWS-Native Approach)
        </SectionHeading>

        <Paragraph>
          EC2 Image Builder is a fully managed AWS service that automates
          building, testing, and distributing AMIs on a schedule. No external
          CI/CD pipeline needed - everything lives in AWS. It is the closest
          thing AWS has to "a Dockerfile and a build pipeline, but for AMIs."
        </Paragraph>

        <SubSectionHeading>The Building Blocks</SubSectionHeading>

        <TextList>
          <TextListItem>
            <Strong>Component</Strong> - a single reusable build step defined as
            a YAML document with phases (build, validate, test). AWS provides
            managed components like{" "}
            <InlineHighlight>update-linux</InlineHighlight> which runs{" "}
            <InlineHighlight>dnf update</InlineHighlight>. You write custom
            components for hardening steps.
          </TextListItem>
          <TextListItem>
            <Strong>Recipe</Strong> - the ordered list of components that make
            up your AMI, plus the base image to start from. Recipe = base AMI +
            [patch component, hardening component, ...]. Analogous to a
            Dockerfile's <InlineHighlight>FROM</InlineHighlight> +{" "}
            <InlineHighlight>RUN</InlineHighlight> chain.
          </TextListItem>
          <TextListItem>
            <Strong>Infrastructure Configuration</Strong> - which EC2 instance
            type to run the build on, which IAM role, which VPC subnet, and an
            optional SNS topic for build failure notifications. Use at least
            t3.small - t3.micro (1GB RAM) can run out of memory during{" "}
            <InlineHighlight>dnf</InlineHighlight> dependency resolution,
            causing silent build failures.
          </TextListItem>
          <TextListItem>
            <Strong>Distribution Configuration</Strong> - where to send the
            finished AMI: which region, what to name it (with a build date
            timestamp), which tags to apply, and optional launch permissions for
            other accounts.
          </TextListItem>
          <TextListItem>
            <Strong>Pipeline</Strong> - wires everything together with a
            schedule. Pipeline = Recipe + Infrastructure Config + Distribution
            Config + cron schedule.
          </TextListItem>
        </TextList>

        <Paragraph>
          Image Builder can run an Inspector image scan as a test phase. If the
          scan finds Critical findings in the newly-built AMI, the pipeline
          fails and the AMI is not distributed - preventing a vulnerable AMI
          from reaching your ASG. This is enabled via the{" "}
          <InlineHighlight>image_scanning_configuration</InlineHighlight> block
          on the pipeline resource.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformImageBuilder} />

        <CodeBlockWithCopy code={awsPatchManagementTerraformImageBuilderIAM} />

        <SubSectionHeading>
          Closing the Loop - AMI to Launch Template
        </SubSectionHeading>

        <Paragraph>
          Image Builder creates the AMI, but something still needs to get the
          new AMI ID into the Launch Template and trigger the ASG instance
          refresh. The pattern: Image Builder emits an EventBridge event when a
          pipeline execution completes successfully (
          <InlineHighlight>
            ImageBuilder Pipeline Execution State Change
          </InlineHighlight>{" "}
          with state <InlineHighlight>AVAILABLE</InlineHighlight>). An
          EventBridge rule routes this to a Lambda function that calls{" "}
          <InlineHighlight>
            aws ec2 create-launch-template-version
          </InlineHighlight>{" "}
          with the new AMI ID, then calls{" "}
          <InlineHighlight>
            aws autoscaling start-instance-refresh
          </InlineHighlight>
          . For simpler environments, this step can be done manually by an
          operator after each build. The Packer section below shows the same
          chain automated via GitHub Actions.
        </Paragraph>

        {/* ── Section 18 - Packer ──────────────────────────────────────────── */}
        <SectionHeading>Packer (The HashiCorp Alternative)</SectionHeading>

        <Paragraph>
          Packer is an open-source tool by HashiCorp for building machine
          images. You define the image in HCL (the same language as Terraform),
          run <InlineHighlight>packer build</InlineHighlight>, and Packer
          launches a temporary EC2 instance, runs your provisioners (shell
          scripts), creates an AMI from the result, and terminates the temporary
          instance. Unlike Image Builder, Packer runs in your CI/CD pipeline
          rather than inside AWS.
        </Paragraph>

        <Paragraph>
          When to choose Packer over Image Builder: your team is already in the
          HashiCorp ecosystem (Terraform + Packer is a natural pair), you need
          multi-cloud image builds (Packer supports Azure and GCP with the same
          template), or you want the build logic version-controlled in your
          repository alongside your application code. The{" "}
          <TextLink to="/blog/github-ci-cd">GitHub CI/CD post</TextLink> covers
          GitHub Actions in depth; the Packer workflow integrates cleanly with
          OIDC authentication to AWS.
        </Paragraph>

        <Paragraph>
          Key Packer decisions for patch management: use{" "}
          <InlineHighlight>most_recent = true</InlineHighlight> in the source
          AMI filter so you always start from the latest AWS base AMI regardless
          of when the pipeline last ran. Use{" "}
          <InlineHighlight>ssh_interface = "session_manager"</InlineHighlight>{" "}
          to connect via SSM Session Manager - no port 22, no bastion. Use{" "}
          <InlineHighlight>dnf update -y --security</InlineHighlight> rather
          than a full upgrade to apply only security-relevant patches. Use{" "}
          <InlineHighlight>post-processor "manifest"</InlineHighlight> to output
          the AMI ID to a JSON file that the CI/CD step reads to update the
          Launch Template.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementPackerTemplate} />

        <Banner
          title="Image Builder and Packer produce the same output"
          variant="info"
        >
          <Paragraph>
            Both produce a tagged AMI in your account. Image Builder keeps the
            build logic inside AWS - fully managed, no CI/CD dependency, with
            built-in Inspector scanning as a pipeline gate. Packer keeps it in
            your repository - version-controlled, testable, and multi-cloud.
            Choose based on your team's tooling and whether you need the build
            logic alongside your application code.
          </Paragraph>
        </Banner>

        {/* ── Section 19 - ASG Instance Refresh ────────────────────────────── */}
        <SectionHeading>
          ASG Instance Refresh (Rolling Instances to a New AMI)
        </SectionHeading>

        <Paragraph>
          Whether the new AMI came from Image Builder or Packer, the mechanism
          for getting it onto running instances is the same: update the Launch
          Template to reference the new AMI ID, then trigger an ASG instance
          refresh. The refresh replaces instances in batches - terminating old
          instances and launching new ones from the updated template - without
          taking the group offline.
        </Paragraph>

        <Paragraph>
          <InlineHighlight>MinHealthyPercentage: 90</InlineHighlight> means at
          most 10% of the fleet is being replaced at any moment, so 90% remains
          serving traffic.{" "}
          <InlineHighlight>InstanceWarmup: 300</InlineHighlight> gives each new
          instance 300 seconds to pass EC2 health checks before the next batch
          is replaced. If a new instance fails its health check, the refresh
          pauses automatically - old instances keep running and nothing else is
          replaced until you investigate and resume or cancel. The ASG instance
          refresh is covered in the{" "}
          <TextLink to="/blog/aws-elastic-compute-cloud">EC2 post</TextLink>;
          here the focus is on how it integrates with the AMI rotation workflow.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementCLIInstanceRefresh} />

        {/* ── Section 20 - Alerting ─────────────────────────────────────────── */}
        <SectionHeading>
          Alerting (Know When Something Goes Wrong)
        </SectionHeading>

        <Paragraph>
          You need two alerting paths: operational (a patch task failed during a
          maintenance window or an Image Builder build failed) and detection
          (Inspector found a Critical vulnerability that warrants immediate
          attention, as covered in Section 12).
        </Paragraph>

        <Paragraph>
          Operational alerting: the maintenance window task already has a{" "}
          <InlineHighlight>notification_config</InlineHighlight> that fires an{" "}
          <TextLink to="/blog/aws-sns">SNS</TextLink> notification when a task
          times out, is cancelled, or fails. EventBridge supplements this with
          window-level alerting - watching for{" "}
          <InlineHighlight>
            SSM Maintenance Window Execution State Change
          </InlineHighlight>{" "}
          events where the status is FAILED or TIMED_OUT. This catches cases
          where individual task errors don't trigger the per-task notification
          but the overall window still failed. A second EventBridge rule watches
          for Image Builder pipeline failures. All alerts route to a single
          shared SNS topic.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformAlerting} />

        {/* ── Section 21 - Compliance Reporting ────────────────────────────── */}
        <SectionHeading>
          Compliance Reporting (Proving You're Patched)
        </SectionHeading>

        <Paragraph>
          For SOC 2, ISO 27001, and similar frameworks, you need to demonstrate
          that your fleet is patched and that you have a documented, automated
          process for keeping it that way. The evidence is: a point-in-time
          compliance summary (what is compliant, what is not, when it was
          checked), the maintenance window execution history (when patching ran,
          what succeeded, what failed), and records of any out-of-band patching
          done for emergency CVEs.
        </Paragraph>

        <Paragraph>
          The SSM Patch Manager dashboard in the console shows compliant and
          non-compliant counts per patch group with drill-down to individual
          instances and per-patch states. For programmatic reporting,{" "}
          <InlineHighlight>list-resource-compliance-summaries</InlineHighlight>{" "}
          with a filter on <InlineHighlight>NON_COMPLIANT</InlineHighlight>{" "}
          gives you a JSON list of every non-compliant instance. Pipe it to{" "}
          <InlineHighlight>jq</InlineHighlight> to extract into CSV for an
          auditor.
        </Paragraph>

        <Paragraph>
          The{" "}
          <InlineHighlight>
            ec2-managedinstance-patch-compliance-status-check
          </InlineHighlight>{" "}
          AWS Config rule (
          <TextLink to="/blog/aws-monitoring-audit">
            covered in the Monitoring &amp; Audit post
          </TextLink>
          ) continuously checks every managed instance against your baseline and
          creates Config findings for non-compliant ones. Those findings flow
          into Security Hub - AWS's centralised security findings dashboard -
          which aggregates them alongside Inspector findings and GuardDuty
          alerts for a single view across your account.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementCLIComplianceReport} />

        {/* ── Section 22 - Scaling to Multiple Accounts ────────────────────── */}
        <SectionHeading>Scaling to Multiple Accounts</SectionHeading>

        <Paragraph>
          With dev, stage, and prod in separate AWS accounts (covered in the{" "}
          <TextLink to="/blog/aws-multi-account-setup">
            AWS Multi-Account Setup post
          </TextLink>
          ), managing patch infrastructure per-account via Terraform is
          workable, but compliance visibility is fragmented - you would need to
          query each account separately. Two AWS Organizations features solve
          this at scale.
        </Paragraph>

        <Paragraph>
          <Strong>Quick Setup for SSM</Strong> is an AWS Organizations feature
          that provisions SSM prerequisites (IAM instance profiles, CloudWatch
          Agent configuration) across all member accounts automatically,
          including new accounts as they join. This solves the "every instance
          in every account needs{" "}
          <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight>"
          problem at org scale without Terraform loops.{" "}
          <Strong>Patch Policies</Strong> are the org-level equivalent of patch
          baselines - defined once in the delegated admin account and applied to
          targeted OUs. New accounts and new instances in those accounts inherit
          the policy automatically.
        </Paragraph>

        <Paragraph>
          For cross-account compliance visibility, Security Hub aggregation
          streams findings from all member accounts to a single dashboard in the
          management account. For raw data querying,{" "}
          <InlineHighlight>aws_ssm_resource_data_sync</InlineHighlight> syncs
          SSM compliance data to a central{" "}
          <TextLink to="/blog/aws-s3">S3</TextLink> bucket where Athena can
          query it across all accounts.
        </Paragraph>

        <CodeBlockWithCopy code={awsPatchManagementTerraformDataSync} />

        {/* ── Section 23 - Terraform Module Walkthrough ────────────────────── */}
        <SectionHeading>Terraform Module Walkthrough</SectionHeading>

        <Paragraph>
          The{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            terraform-aws-patch-management
          </TextLink>{" "}
          repository contains a reusable module under{" "}
          <InlineHighlight>infra/modules/patch-management/</InlineHighlight>{" "}
          with the following files:
        </Paragraph>

        <TextList>
          <TextListItem>
            <InlineHighlight>main.tf</InlineHighlight> - patch baseline and
            patch group with per-environment soak periods
          </TextListItem>
          <TextListItem>
            <InlineHighlight>maintenance.tf</InlineHighlight> - maintenance
            window, targets, all three task priorities, hourly scan association,
            S3 bucket for command output, CloudWatch log group
          </TextListItem>
          <TextListItem>
            <InlineHighlight>iam.tf</InlineHighlight> - SSM instance role,
            maintenance window service role, and Image Builder role
          </TextListItem>
          <TextListItem>
            <InlineHighlight>image_builder.tf</InlineHighlight> - full Image
            Builder pipeline (conditional on{" "}
            <InlineHighlight>enable_image_builder</InlineHighlight>)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>inspector.tf</InlineHighlight> - Inspector v2
            enablement and EventBridge rule for Critical findings (conditional)
          </TextListItem>
          <TextListItem>
            <InlineHighlight>alerting.tf</InlineHighlight> - shared SNS topic
            and EventBridge rules for window and pipeline failures
          </TextListItem>
          <TextListItem>
            <InlineHighlight>variables.tf</InlineHighlight> and{" "}
            <InlineHighlight>outputs.tf</InlineHighlight> - full variable
            surface and all module outputs
          </TextListItem>
        </TextList>

        <Paragraph>
          Terraform fundamentals are covered in the{" "}
          <TextLink to="/blog/infrastructure-as-code-with-terraform">
            IaC with Terraform post
          </TextLink>
          .
        </Paragraph>

        <SubSectionHeading>Basic Usage</SubSectionHeading>

        <CodeBlockWithCopy code={awsPatchManagementTerraformModuleBasic} />

        <SubSectionHeading>Complete Usage</SubSectionHeading>

        <CodeBlockWithCopy code={awsPatchManagementTerraformModuleComplete} />

        {/* ── Section 24 - Architecture at a Glance ────────────────────────── */}
        <ProjectArchitecture
          archOutline={ssmArchitecture}
          type="tree"
          summary="The full patch management system: SSM Patch Manager handles in-place patching for stateful workloads; EC2 Image Builder (or Packer) builds pre-patched Golden AMIs for stateless ASG fleets; Inspector provides continuous detection between windows; EventBridge routes failures and Critical findings to SNS."
        />

        {/* ── Section 25 - Engineering Decisions ───────────────────────────── */}
        <EngineeringDecisions
          title="Engineering Decisions"
          decisions={patchManagementDecisions}
        />

        {/* ── Section 26 - Wrapping Up ──────────────────────────────────────── */}
        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          Patch management is one of those topics that looks simple on the
          surface - "just run dnf update" - until you have to do it reliably
          across a fleet, in multiple accounts, with compliance evidence, and
          without taking production offline. This post has covered everything
          from what a package version number actually means through to
          multi-account patch policy rollout. The{" "}
          <TextLink href={repoUrl} target="_blank" rel="noreferrer">
            Terraform module
          </TextLink>{" "}
          gives you a deployable starting point that handles both the mutable
          and immutable patching paths, alerting, and compliance reporting out
          of the box.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSPatchManagement;
