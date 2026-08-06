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
  PostImage,
} from "../BlogLayout/BlogLayout";
import {
  ProjectArchitecture,
  EngineeringDecisions,
} from "../BlogLayout/ProjectExplanation";

// typography
import {
  PageTitle,
  SectionHeading,
  Paragraph,
  Strong,
  TextList,
  TextListItem,
  TextLink,
  InlineHighlight,
} from "../Typography/Typography";

// icons
import { AWSSVG, AWSEC2SVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import { CodeBlockWithCopy } from "../Code/Code";

// code blocks
import {
  awsDeployEc2UserDataScript,
  awsDeployEc2UserDataScriptRoot,
} from "../../helpers/codeblocks";

// images
import NavigateToIAM from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_navigate_to_iam_roles.png";
import CreateRole from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_role.png";
import TrustedEntity from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_trusted_entity.png";
import Permissions from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_add_permissions.png";
import Name from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_name.png";
import WithoutKeyPair from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_without_key_pair.png";
import Anywhere from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_open.png";
import InstanceProfile from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_instance_profile.png";
import InstanceRunning from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_running.png";
import MetaData from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_meta_data.png";
import MetaData2 from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_meta_data_2.png";
import CreateTargetGroup from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_target_group.png";
import CreateTargetGroup2 from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_target_group_2.png";
import AdvancedHealthCheckSettings from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_advanced_health_check.png";
import RegisterTargets from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_register_targets.png";
import RegisterTargets2 from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_register_targets_2.png";
import CreateLoadBalancerSG from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_lb_security_group.png";
import CreateLoadBalancer from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_lb.png";
import CreateLoadBalancer2 from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_lb_2.png";
import TargetGroupUnused from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_target_group_unused.png";
import TargetGroupInProgress from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_target_group_in_progress.png";
import TargetGroupHealthy from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_target_group_healthy.png";
import LoadBalancerResource from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_load_balancer_resource_view.png";
import MetaData3 from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_meta_data_lb.png";
import SgLockedDown from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_change_to_lb_tg.png";
import CreateLaunchTemplate from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_create_template.png";
import AutoScalingGuidance from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_guidance.png";
import SelectLaunchTemplate from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_group_launch_template.png";
import AutoScalingGroupAttachLB from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_attach_lb.png";
import AutoScalingGroupHealthChecks from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_health_checks.png";
import AutoScalingGroupSize from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_group_size.png";
import AutoScalingGroupUpdatingCapacity from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_updating_capacity.png";
import AutoScalingGroupAtDesiredCapacity from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_desired_capacity.png";
import AutoScalingGroupUpdated from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_auto_scaling_updated.png";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const awsSignup = "https://signin.aws.amazon.com/signup?request_type=register";

const awsIAMPost =
  "https://www.heyitsmeharv.com/blog/aws-identity-access-management";

const awsImdsDocs =
  "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html";

const deployEc2Architecture = `[entry] Entry Point
  (instance public IP - no ALB)
  (or ALB DNS name - once one's in front)
    [alb] Application Load Balancer
      [tg] Target Group
        [compute] Compute
          (one instance)
          (or an Auto Scaling Group)
            [refresh] Terminate one -> ASG launches a replacement
  [sg] Security Group
    (22 from your IP - key pair / EC2 Instance Connect)
    (80 from anywhere, or from the ALB's SG once locked down)
  [iam] Instance IAM Role
    (AmazonSSMManagedInstanceCore - enables SSM Session Manager)`;

const deployEc2Decisions = [
  {
    title: "Putting an ALB in front, or not",
    body: `Without one, the instance's own public IP is the entry point - simplest possible
setup, but that IP changes if the instance stops and starts, and nothing is checking
whether the app inside is actually responding before sending traffic its way. An ALB adds a
stable DNS name and a health check that actively gates traffic - and it's a hard
prerequisite for the next decision, since an Auto Scaling Group's instances have no shared
entry point without one. Worth it the moment the entry point needs to outlive any one
instance.`,
  },
  {
    title: "Adding an Auto Scaling Group, or not",
    body: `A single instance is one thing to reason about: it's either up or it isn't, and
someone has to notice if it dies and relaunch it. An ASG makes "the right number of
instances exist" AWS's problem instead of a human's - terminate one and a replacement
appears without anyone touching anything. That's worth the extra sizing decisions
(min/max/desired) the moment "someone will notice eventually and fix it by hand" stops being
an acceptable answer for whatever's running here.`,
  },
  {
    title: "EC2 Instance Connect vs SSM Session Manager vs a key pair",
    body: `A traditional key pair is the most familiar option, but it means generating a
key, keeping it safe, and leaving port 22 open indefinitely to whoever holds it. SSM Session
Manager needs no open port at all and logs every session to CloudWatch, at the cost of an
IAM instance role attached up front. EC2 Instance Connect sits between the two: no key to
generate or lose, one click from the console, and port 22 is only ever usable with a
temporary, AWS-issued key rather than a long-lived credential on a laptop. Attaching the SSM
role from the first instance onward is what makes all three genuinely comparable rather than
theoretical.`,
  },
  {
    title: "Default VPC instead of a custom one",
    body: `A custom VPC gets full control over CIDR ranges, subnet tiers, and routing - and
is the right call for a production network. None of that network design is the point of
this comparison, so the default VPC does the job instead: public subnets with a route to an
internet gateway already exist in every region, in every account, unless someone's deleted
it. That keeps the comparison focused on compute and load balancing, not subnet math.`,
  },
  {
    title: "Always scope SSH to a single IP",
    body: `Leaving port 22 open to 0.0.0.0/0 is the single most common EC2 security group
mistake, and it's tempting specifically because it's zero extra effort. EC2 Instance Connect
and SSM both narrow who can successfully authenticate once a connection is made, but neither
stops an open port from being scanned and hammered by everyone else on the internet in the
meantime. Scoping the rule to one /32 costs one extra step and turns the security group into
something that actually means what it says.`,
  },
];

const AWSDeployEC2 = () => {
  useEffect(() => {
    // window.scrollTo(0, 0);
    Analytics.pageview("/blog/deploy-to-ec2");
    Analytics.track("blog_page_viewed", { slug: "deploy-to-ec2" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Deploying to EC2</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <AWSSVG />
            </HeaderIcon>
            <HeaderIcon>
              <AWSEC2SVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          I want to walkthrough how we can deploy to an EC2 instance, how it can
          be configured to be secure, to scale, and to be resilient. The goal is
          to walk through different configurations and show the differences
          between them. Everything below happens in the AWS Console and can be
          easily replicated in any AWS account. You can register for a free AWS
          account if you don't have one already{" "}
          <TextLink href={awsSignup} target="_blank" rel="noopener noreferrer">
            here
          </TextLink>
          .
        </Paragraph>

        <SectionHeading>Before We Deploy</SectionHeading>

        <Paragraph>
          Before we can launch an EC2 instance, we need to create an IAM role
          that will be attached to the instance.{" "}
          <Strong>
            This role will allow the instance to use AWS Systems Manager (SSM)
            Session Manager, which provides a secure way to connect to the
            instance
          </Strong>
          . The specific policy we need is called{" "}
          <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight>. This
          way will make our lives a lot easier because we don't have to worry
          about SSH keys.
        </Paragraph>

        <Paragraph>
          Feel free to read up on my post about IAM roles and policies if you
          want to understand more about how they work -{" "}
          <TextLink href={awsIAMPost} target="_blank" rel="noopener noreferrer">
            AWS IAM
          </TextLink>
          .
        </Paragraph>

        <Paragraph>
          To create a role, you need to navigate through the AWS Console to the
          IAM service, then click on "Roles" under the service or in the left
          sidebar.
        </Paragraph>

        <PostImage src={NavigateToIAM} alt="Navigate to IAM roles" />

        <Paragraph>and then click on "Create role".</Paragraph>

        <PostImage src={CreateRole} alt="Create IAM role" />

        <Paragraph>
          Select "AWS service" as the trusted entity type, and then select "EC2"
          as the service that will use this role. This means that this role will
          be assumed by EC2 instances.
        </Paragraph>

        <PostImage src={TrustedEntity} alt="Choose an entity" />

        <Paragraph>
          Next, we need to attach the policy that allows the instance to use SSM
          Session Manager. Search for the policy called
          <InlineHighlight>AmazonSSMManagedInstanceCore</InlineHighlight> and
          select it.
        </Paragraph>

        <PostImage src={Permissions} alt="Select permissions for the role" />

        <Paragraph>
          Finally, give the role a name -{" "}
          <InlineHighlight>deploy-to-ec2-ssm</InlineHighlight>
          and then click "Create role". This role will be attached to the EC2
          instance when we launch it.
        </Paragraph>

        <PostImage src={Name} alt="Name for the role" />

        <SectionHeading>Single Instance, Open to the World</SectionHeading>
        <Paragraph>
          Now that we have the IAM role created, we can launch an EC2 instance.
          Navigate to the EC2 service in the AWS Console, and click on "Launch
          instances".
        </Paragraph>

        <Paragraph>
          The Launch Instance page has more on it than the handful of fields,
          let's walk through the ones we care about rather than clicking past:
        </Paragraph>

        <Paragraph>
          <Strong>Application and OS Images (AMI)</Strong> is the operating
          system image the instance boots from. We're using Amazon Linux 2023 -
          free, AWS-maintained. The quick-start list also offers Ubuntu, Windows
          Server, and other distributions.
        </Paragraph>

        <Paragraph>
          <Strong>Instance type</Strong> is the hardware shape: vCPUs, memory,
          and network performance bundled into a named size. We're using{" "}
          <InlineHighlight>t3.micro</InlineHighlight> (free-tier choice), from
          the <Strong>t</Strong> family - burstable performance, meaning it
          earns CPU credits at a low baseline and can burst above that briefly
          using them, which suits something that's mostly idle. Consistently
          busy workloads want an <Strong>m</Strong> (general purpose),{" "}
          <Strong>c</Strong> (compute-optimized), or <Strong>r</Strong>{" "}
          (memory-optimized) family instead.
        </Paragraph>

        <Paragraph>
          <Strong>Key pair</Strong> is the SSH key that would normally be used
          to connect to the instance. We're skipping this for now because we can
          use EC2 Instance Connect and SSM Session Manager thanks to the
          instance role.
        </Paragraph>

        <PostImage
          src={WithoutKeyPair}
          alt="EC2 launch wizard - proceed without a key pair"
        />

        <Paragraph>
          The default VPC covers networking -{" "}
          <Strong>Auto-assign public IP</Strong> enabled - and the security
          group has three rules: allow SSH traffic and HTTP/S from{" "}
          <Strong>Anywhere</Strong>, leave it deliberately open for now. Locking
          it down happens later, once there's something to compare it against.
        </Paragraph>

        <PostImage
          src={Anywhere}
          alt="EC2 launch wizard - HTTP from anywhere"
        />

        <Paragraph>
          <Strong>Configure storage</Strong> defaults to a single 8GB{" "}
          <InlineHighlight>gp3</InlineHighlight> root volume. We're leaving{" "}
          <InlineHighlight>Delete on termination</InlineHighlight> checked, so
          the volume doesn't linger (and keep costing money) after the instance
          it belongs to is gone.
        </Paragraph>

        <Paragraph>
          Under <Strong>Advanced details</Strong>, the{" "}
          <InlineHighlight>deploy-to-ec2-ssm</InlineHighlight> instance profile
          gets attached, and this script goes into <Strong>User data</Strong>.
          It installs nginx and writes a status page from the instance's own
          metadata.
        </Paragraph>

        <PostImage
          src={InstanceProfile}
          alt="EC2 launch wizard - instance profile"
        />

        <Paragraph>
          The reason we can do this is because of the{" "}
          <TextLink
            href={awsImdsDocs}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instance Metadata Service (IMDS)
          </TextLink>
          . Every EC2 instance can query itself for information, it's the exact
          same address on every instance, in every account, in every region -
          nothing to do with this specific VPC - and it's only reachable from
          inside the instance itself, never from outside it.
        </Paragraph>

        <CodeBlockWithCopy code={awsDeployEc2UserDataScript} />

        <Paragraph>
          <Strong>Launch instance</Strong>, then wait: the state column moves
          from <InlineHighlight>Pending</InlineHighlight> to{" "}
          <InlineHighlight>Running</InlineHighlight>, and status checks reach{" "}
          <InlineHighlight>3/3</InlineHighlight> a minute or so later.
        </Paragraph>

        <PostImage
          src={InstanceRunning}
          alt="EC2 instance Running with 3/3 status checks passed"
        />

        <Paragraph>
          The evidence that everything up to this point actually worked: the
          instance's public IPv4 address, opened directly in a browser, returns
          the status page - its own instance ID and Availability Zone reported
          back. That confirms three separate things at once: the security group
          let the request through, nginx started, and the user data script ran
          before anyone connected to anything.
        </Paragraph>

        <Banner title="HTTP not HTTPS" variant="warning">
          <Paragraph>
            Make sure you edit the address bar to use{" "}
            <InlineHighlight>http://</InlineHighlight>
            rather than <InlineHighlight>https://</InlineHighlight> - we didn't
            enable HTTPS, so server will be unreachable in the browser if you
            try to use it.
          </Paragraph>
        </Banner>

        <Carousel
          items={[
            {
              title: "Public IPv4 address",
              description:
                "The instance's public IP, opened directly in a browser.",
              src: MetaData,
            },
            {
              title: "Public DNS",
              description:
                "The instance's public DNS name, opened in a browser.",
              src: MetaData2,
            },
          ]}
        />

        <SectionHeading>The Problem With a Single Open Instance</SectionHeading>

        <Paragraph>
          At this point, "is this reachable" and "is this one specific instance
          alive" are the same question. Anyone on the internet can attempt a
          connection on port 80, and the moment this instance is replaced, its
          public IP goes with it. Putting a Load Balancer in front changes both
          of those at once.
        </Paragraph>

        <Paragraph>
          There are different kinds of load balancers but for this example,
          we'll use an Application Load Balancer. This distributes incoming HTTP
          and HTTPS traffic across multiple targets including EC2 instances
          based on request attributes.
        </Paragraph>

        <Paragraph>
          Load balancers have listeners which act as rules so that the load
          balancer knows how to route traffic. That traffic will be routed to a
          target group, which is a group of targets (EC2 instances) in this
          case.
        </Paragraph>

        <Paragraph>
          Before we create the load balancer, we'll do some prep work just like
          we did for the EC2 instance with the IAM role. We'll create a target
          group first, which we will put our EC2 instance into.
        </Paragraph>

        <Paragraph>
          In the EC2 console, under <Strong>Load Balancing</Strong> in the left
          sidebar, click <Strong>Target Groups</Strong>, then{" "}
          <Strong>Create target group</Strong>.
        </Paragraph>

        <PostImage
          src={CreateTargetGroup}
          alt="EC2 console left sidebar with Target Groups selected under Load Balancing, 
          and the Create target group button."
        />

        <Paragraph>
          <Strong>Choose a target type</Strong> stays on{" "}
          <Strong>Instances</Strong> - we're registering the running EC2
          instance directly, not an IP address, a Lambda function, or another
          load balancer. Give it a name,{" "}
          <InlineHighlight>deploy-to-ec2</InlineHighlight>, leave the protocol
          as <InlineHighlight>HTTP</InlineHighlight> on port{" "}
          <InlineHighlight>80</InlineHighlight>. Leave the VPC as the default
          one, since that's where we've deployed our instance into.
        </Paragraph>

        <PostImage
          src={CreateTargetGroup2}
          alt="Target group creation - target type, name, protocol, port, and VPC fields."
        />

        <Paragraph>
          Health checks are what actually decides whether a target should
          receive traffic, not just whether it exists. We want protocol{" "}
          <InlineHighlight>HTTP</InlineHighlight>, and the path set to wherever
          the application is being served, which in this case is
          <InlineHighlight>/</InlineHighlight>. As per our user data script.
        </Paragraph>

        <CodeBlockWithCopy code={awsDeployEc2UserDataScriptRoot} />

        <Paragraph>
          A quick gloss over what's under{" "}
          <Strong>Advanced health check settings</Strong>:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>Port</Strong> -{" "}
            <InlineHighlight>Traffic port</InlineHighlight> by default, meaning
            the health check hits the same port (80) as real requests.
            Overriding it only matters if health checks and application traffic
            genuinely need to go to different ports.
          </TextListItem>
          <TextListItem>
            <Strong>Healthy threshold</Strong> - consecutive successful checks
            before a target is marked healthy and starts receiving traffic.
          </TextListItem>
          <TextListItem>
            <Strong>Unhealthy threshold</Strong> - consecutive failed checks
            before a healthy target is pulled out of rotation.
          </TextListItem>
          <TextListItem>
            <Strong>Timeout</Strong> - how long a single check waits for a
            response before counting it as a failure.
          </TextListItem>
          <TextListItem>
            <Strong>Interval</Strong> - how often a check runs.
          </TextListItem>
          <TextListItem>
            <Strong>Success codes</Strong> - which HTTP status codes count as
            healthy.
          </TextListItem>
        </TextList>

        <Paragraph>
          The defaults are OK but I would recommend changing the interval to 15
          seconds, and the healthy/unhealthy thresholds to 3. This way, a target
          is marked healthy after 3 consecutive successful checks, and marked
          unhealthy after 3 consecutive failed checks. This makes the health
          check more responsive to changes in the target's health.
        </Paragraph>

        <PostImage
          src={AdvancedHealthCheckSettings}
          alt="Target group health check settings, including the advanced interval/threshold fields."
        />

        <Paragraph>
          <Strong>Next</Strong> moves to <Strong>Register targets</Strong> -
          select the running instance from the list, leave the port as{" "}
          <InlineHighlight>80</InlineHighlight>, click{" "}
          <Strong>Include as pending below</Strong>.
        </Paragraph>

        <PostImage
          src={RegisterTargets}
          alt="Registering the instance as a pending target"
        />

        <PostImage
          src={RegisterTargets2}
          alt="The instance added as a pending target, ready to create the target group"
        />

        <Paragraph>
          It won't show as healthy yet as there's no load balancer sending it
          traffic to health-check against.
        </Paragraph>

        <Paragraph>
          Once you've created the target group, its health check status shows as
          <InlineHighlight>Unused</InlineHighlight> rather than healthy or
          unhealthy, with <Strong>Load balancer: None associated</Strong> right
          there on the same page. That's to be expected because we've not
          attached a load balancer to it yet, which the status message implies.
        </Paragraph>

        <PostImage
          src={TargetGroupUnused}
          alt="Newly created target group showing the instance's health check status as Unused"
        />

        <Paragraph>
          One final prep task before creating the load balancer: create a
          security group for it by going to{" "}
          <Strong>EC2 → Security Groups → Create security group</Strong>.
        </Paragraph>

        <Paragraph>
          We want this to be the only thing that is internet-facing, so it needs
          a rule that allows HTTP from <Strong>Anywhere</Strong>. The instance's
          security group will be locked down to only allow traffic from this
          load balancer's security group once it's created.
        </Paragraph>

        <PostImage
          src={CreateLoadBalancerSG}
          alt="Create load balancer - security group configuration"
        />

        <Paragraph>
          With the target group and security group ready, let's go create our
          load balancer by going to{" "}
          <Strong>EC2 → Load Balancers → Create load balancer</Strong>, and
          choose <Strong>Application Load Balancer</Strong>. Give it a name,
          leave the scheme as <Strong>Internet-facing</Strong>, and under
          network mapping select at least two Availability Zones, even though
          there's only one instance behind it so far.
        </Paragraph>

        <Paragraph>
          Under <Strong>Listeners and routing</Strong>, the default listener on
          port <InlineHighlight>80</InlineHighlight> should forward to the
          target group created a moment ago - select it from the dropdown, then{" "}
          <Strong>Create load balancer</Strong>.
        </Paragraph>

        <PostImage
          src={CreateLoadBalancer}
          alt="Create load balancer - name, scheme, and Availability Zone mapping"
        />

        <Paragraph>
          The load balancer itself takes a few minutes to finish provisioning
          before its state shows <InlineHighlight>Active</InlineHighlight>.
        </Paragraph>

        <Paragraph>
          Back on the target group, <Strong>Load balancer</Strong> now names{" "}
          <InlineHighlight>deploy-to-ec2</InlineHighlight> instead of "None
          associated," and the target's health status has moved on from{" "}
          <InlineHighlight>Unused</InlineHighlight> to{" "}
          <InlineHighlight>Initial</InlineHighlight>. It will sit on "Target
          registration is in progress" while it waits for enough consecutive
          successful checks in order to be{" "}
          <InlineHighlight>Healthy</InlineHighlight>.
        </Paragraph>

        <PostImage
          src={TargetGroupInProgress}
          alt="Target group health check status moving from Unused to initial now that the ALB is checking it"
        />

        <Paragraph>
          And once the checks have completed, the target shows{" "}
          <InlineHighlight>Healthy</InlineHighlight>
          and should now be receiving traffic from the load balancer.
        </Paragraph>

        <PostImage
          src={TargetGroupHealthy}
          alt="Target group health check status showing healthy"
        />

        <Paragraph>
          If we navigate back to the load balancer you should now find that it
          is active and has a <Strong>DNS name</Strong> assigned.
        </Paragraph>

        <PostImage src={CreateLoadBalancer2} alt="Load balancer DNS name" />

        <Paragraph>
          Copy it, and open it in a new browser tab and you should be able to
          see the same status page that the instance's public IP returned
          earlier.
        </Paragraph>

        <PostImage
          src={MetaData3}
          alt="The status page loaded from the ALB's DNS name instead of the instance's direct IP"
        />

        <Paragraph>
          The load balancer's own <Strong>Resource map</Strong> tab draws the
          whole chain end to end - listener, rule, target group, target - and
          with the target now healthy, every hop in it shows green: one request
          path, confirmed working from the ALB's listener all the way down to
          the instance.
        </Paragraph>

        <PostImage
          src={LoadBalancerResource}
          alt="ALB resource map showing the full request path - listener, rule, target group, and target - all healthy"
        />

        <Paragraph>
          The last step is to lock down the instance's security group so that it
          only allows traffic from the load balancer's security group, rather
          than from anywhere. This is the security best practice that makes the
          load balancer the only entry point to the instance, and the only way
          for anyone on the internet to reach it.
        </Paragraph>

        <PostImage
          src={SgLockedDown}
          alt="Instance security group locked down to the ALB's security group only"
        />

        <Paragraph>
          The status page should still load from the ALB's DNS name, but if you
          try to open the instance's public IP directly in a browser, it should
          now fail to connect.
        </Paragraph>

        <SectionHeading>From One to Many</SectionHeading>

        <Paragraph>
          One instance behind the ALB is still one instance - if it dies, the
          target group has nothing healthy left to send traffic to.{" "}
          <Strong>Auto Scaling Group</Strong> fixes that, and we can set one up
          from templates.
        </Paragraph>

        <Paragraph>
          Select your running instance, then go to{" "}
          <Strong>
            Actions → Image and templates → Create template from instance
          </Strong>{" "}
          We want to copy the AMI, security group, IAM profile, and user data
          directly from the instance that's already running.
        </Paragraph>

        <PostImage
          src={CreateLaunchTemplate}
          alt="Create launch template from instance"
        />

        <Paragraph>
          There is an option you can select which will let you know what options
          aren't compatible to copy over to prevent any errors when creating the
          template.
        </Paragraph>

        <PostImage
          src={AutoScalingGuidance}
          alt="Auto Scaling guidance for creating a launch template"
        />

        <Paragraph>
          Now we have the launch template, we can create an Auto Scaling Group
          from it. Go to <Strong>EC2 → Auto Scaling Groups → Create</Strong>,
          name it, and select the launch template we just created. Selecting{" "}
          <InlineHighlight>Latest</InlineHighlight>, means any future change to
          the template rolls out to new instances automatically which is pretty
          neat.
        </Paragraph>

        <PostImage
          src={SelectLaunchTemplate}
          alt="Select launch template when creating an Auto Scaling Group"
        />

        <Paragraph>
          <Strong>Choose instance launch options</Strong> asks for the VPC and
          which subnets to launch into. Picking subnets across more than one
          Availability Zone is what makes the group resilient to an entire zone
          going down, not just to one instance dying.
        </Paragraph>

        <Paragraph>
          We want to <Strong>Attach to an existing load balancer</Strong>, and
          select the load balancer we have created.
        </Paragraph>

        <PostImage
          src={AutoScalingGroupAttachLB}
          alt="Attach Auto Scaling Group to Load Balancer"
        />

        <Paragraph>
          <Strong>Health checks</Strong> by default check only the EC2 status,
          which confirm the instance itself is running and nothing about whether
          the application inside is responding. Turning on{" "}
          <InlineHighlight>
            Elastic Load Balancing health checks
          </InlineHighlight>{" "}
          hands that judgment to the target group instead, so an instance that's
          up but serving nothing gets replaced too as well as instances that
          crash outright.
        </Paragraph>

        <PostImage
          src={AutoScalingGroupHealthChecks}
          alt="Auto Scaling Group health checks"
        />

        <Paragraph>
          <Strong>Configure group size and scaling</Strong> sets desired/min/max
          to 2/2/4. We could attach a scaling policy which could allow us to
          scale under load, or CPU usage etc. For this purpose we just want to
          change the count of our instances to match the desired.
        </Paragraph>

        <PostImage
          src={AutoScalingGroupSize}
          alt="Auto Scaling Group desired capacity"
        />

        <Paragraph>
          Everything after that isn't needed (notifications, tags) for this
          walkthrough. After finishing creating the autoscaling group we should
          see the autoscaling group tell us it's updating the capacity.
        </Paragraph>

        <PostImage
          src={AutoScalingGroupUpdatingCapacity}
          alt="Auto Scaling Group updating capacity"
        />

        <Paragraph>
          Once updated, it will increase our instance count to the desired
          amount with the same name, each with its own ID.
        </Paragraph>

        <Carousel
          items={[
            {
              title: "Auto Scaling Group at desired capacity",
              description:
                "The Auto Scaling Group has reached the desired capacity of 2 instances.",
              src: AutoScalingGroupAtDesiredCapacity,
            },
            {
              title: "Auto Scaling Group updated capacity",
              description:
                "The Auto Scaling Group has successfully updated its capacity to 2 instances.",
              src: AutoScalingGroupUpdated,
            },
          ]}
        />

        <Banner title="Incorrect Instance Count" variant="warning">
          <Paragraph>
            If you find that you have one more desired instance running, it's
            probably the original instance the launch template was built from.
            As it was never launched by the ASG the Desired min/max only ever
            describes instances the group launched itself, so that original
            instance keeps sitting alongside it, invisible to the group
            entirely.
          </Paragraph>
        </Banner>

        <Paragraph>
          To put the autoscaling group to the test you can pick one of the two
          instances and <Strong>terminate</Strong> it directly, on purpose. The
          instance count should drop to one and within a minute, a new instance
          appears on its own with a different instance ID, and the target group
          shows two healthy targets again.
        </Paragraph>

        <SectionHeading>Comparing the Three Ways Back In</SectionHeading>

        <Paragraph>
          Every configuration above attaches the same IAM role, so all three
          connection methods are available throughout, not just at the end.
          Clicking <Strong>Connect</Strong> on any instance surfaces the
          comparison directly:
        </Paragraph>

        {/*
          Screenshot: the "Connect to instance" dialog showing the EC2
          Instance Connect and Session Manager tabs.
          Save as: src/resources/images/blog/AWSDeployEC2/connect_dialog.jpeg
          import ConnectDialog from "../../resources/images/blog/AWSDeployEC2/connect_dialog.jpeg";
          <PostImage src={ConnectDialog} alt="EC2 Connect dialog showing Instance Connect and Session Manager tabs" />
        */}

        <TextList>
          <TextListItem>
            <Strong>EC2 Instance Connect</Strong> - the default tab, one click,
            a browser terminal opens immediately. AWS pushes a temporary key
            over SSH for that one session only - still port 22, but never a key
            anyone has to keep safe.
          </TextListItem>
          <TextListItem>
            <Strong>SSM Session Manager</Strong> - a different tab in the same
            dialog, the same one-click browser terminal, but no port 22 involved
            at all. Every session is logged to CloudWatch, which is exactly what
            the attached IAM role exists for.
          </TextListItem>
          <TextListItem>
            <Strong>A traditional key pair</Strong> - not actually available
            here, since these instances were launched without one from the first
            step onward. Included for comparison, not as something this setup
            supports.
          </TextListItem>
        </TextList>

        <Paragraph>
          Once connected, by either working method,{" "}
          <InlineHighlight>systemctl status nginx</InlineHighlight> and{" "}
          <InlineHighlight>curl localhost</InlineHighlight> confirm what's
          actually running versus what the ALB or a browser reports from
          outside.
        </Paragraph>

        <SectionHeading>What Else This Setup Supports</SectionHeading>

        <Paragraph>
          The user data script installs nginx and renders a status page because
          it gives every check above something concrete to test against - but
          nothing about the security group, IAM role, ALB, or ASG cares what's
          actually listening on port 80. The same setup supports several other
          directions just as well:
        </Paragraph>

        <TextList>
          <TextListItem>
            <Strong>A containerized app</Strong> - swap the script for{" "}
            <InlineHighlight>dnf install -y docker</InlineHighlight>,{" "}
            <InlineHighlight>systemctl enable --now docker</InlineHighlight>,
            then <InlineHighlight>docker run</InlineHighlight> with{" "}
            <InlineHighlight>-p 80:&lt;container-port&gt;</InlineHighlight>.
          </TextListItem>
          <TextListItem>
            <Strong>A language runtime app</Strong> - install Node or Python,
            put the application code on the instance, run it as a systemd
            service the same way nginx is enabled here.
          </TextListItem>
          <TextListItem>
            <Strong>A scheduled or batch job</Strong> - no web server at all;
            the ALB and ASG steps stop being relevant once there's no HTTP
            traffic to load balance.
          </TextListItem>
          <TextListItem>
            <Strong>A self-managed database</Strong> - worth pausing on rather
            than defaulting to: the ASG replaces instances whenever the launch
            template changes, which is exactly wrong for anything holding state
            on local disk. A single instance with a separately-managed EBS
            volume fits better than either the ALB or ASG step here.
          </TextListItem>
        </TextList>

        <SectionHeading>Gotchas</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>The HTTP checkbox, missed</Strong> - the launch wizard's SSH
            rule appears automatically; HTTP does not. Skip{" "}
            <Strong>Allow HTTP traffic from the internet</Strong> and the
            instance boots with nothing able to reach port 80 at all - no error
            at launch, just a page that never loads afterward. Fixable after the
            fact by editing the security group's inbound rules directly and
            adding the same rule there.
          </TextListItem>
          <TextListItem>
            <Strong>Editing a rule instead of replacing it</Strong> - locking
            the instance down to the ALB means changing its HTTP rule's source
            from <InlineHighlight>0.0.0.0/0</InlineHighlight> to the ALB's
            security group, but the console won't do that as an in-place edit. A
            rule created with a CIDR source stays a CIDR rule; typing a security
            group ID into the same field throws{" "}
            <Strong>
              "You may not specify a referenced group id for an existing IPv4
              CIDR rule."
            </Strong>{" "}
            The fix is to delete the old rule outright and add a new one,
            picking the ALB's security group from the autocomplete dropdown
            rather than pasting its ID as text.
          </TextListItem>
          <TextListItem>
            <Strong>Bookmarking the wrong address</Strong> - once the ALB is in
            place, the instance's own public IP still resolves, but the security
            group refuses it directly. The ALB's DNS name is the correct one to
            keep using from that point on.
          </TextListItem>
          <TextListItem>
            <Strong>A changing IP breaking SSH-based access</Strong> - EC2
            Instance Connect stops working the moment the network handing out
            the "My IP" address changes it. Re-checking{" "}
            <InlineHighlight>curl -s ifconfig.me</InlineHighlight> and updating
            the security group rule is the fix.
          </TextListItem>
          <TextListItem>
            <Strong>A target stuck unhealthy</Strong> - almost always a mismatch
            between the target group's health check path/port and what the
            application actually serves, not a networking problem in disguise.
          </TextListItem>
          <TextListItem>
            <Strong>Forgetting to attach the target group to the ASG</Strong> -
            an Auto Scaling Group created without it launches instances happily,
            but the ALB keeps sending everything to whatever was registered
            before.
          </TextListItem>
        </TextList>

        <ProjectArchitecture
          archOutline={deployEc2Architecture}
          type="tree"
          summary="The entry point and compute layer change shape as the ALB and ASG get added - the security group and IAM role stay in place from the very first step, which is what keeps every connection method and the user data script identical throughout."
        />

        <EngineeringDecisions
          title="Engineering Decisions"
          decisions={deployEc2Decisions}
        />

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          None of the individual pieces here are novel - a security group, a
          load balancer, an Auto Scaling Group. What this walkthrough adds is
          evidence at every step instead of an assumption: a curl that starts
          failing exactly when it should, a target that turns healthy on its
          own, an instance that comes back after being killed without anyone
          stepping in to fix it. That's a different kind of proof than reading
          that a configuration should work.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSDeployEC2;
