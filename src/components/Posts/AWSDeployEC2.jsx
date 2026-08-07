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
  SubSectionHeading,
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
import EC2SSHOption from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_ssh_option.png";
import EC2Connect from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_connect.png";

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const awsSignup = "https://signin.aws.amazon.com/signup?request_type=register";

const awsIAMPost =
  "https://www.heyitsmeharv.com/blog/aws-identity-access-management";

const awsImdsDocs =
  "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html";

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

        <Paragraph>
          There's a <TextLink href="#blockers">blockers section</TextLink> at
          the end of this post that covers some of the things that could trip
          you up while following this post. If you hit any issues, I would check
          there first.
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

        <SectionHeading>How to "Connect" to an Instance</SectionHeading>

        <Paragraph>
          Now that we've finished with the configuration side of things, we can
          look into the ways in which we can try and connect to EC2 instances.
        </Paragraph>

        <Paragraph>
          You might be thinking - "haven't we already been connecting to our EC2
          instance?" And we have, but that was through our browsers using HTTP
          traffic on port 80. I want to show you how to connect to an instance
          through SSH (Secure Shell) which uses port 22.
        </Paragraph>

        <Paragraph>
          You might have recalled seeing this as an option whilst configuring a
          security group for our EC2 instance.
        </Paragraph>

        <PostImage
          src={EC2SSHOption}
          alt="EC2 launch wizard security group step, with the Allow SSH traffic from checkbox highlighted"
        />

        <Paragraph>
          A traditional key pair and <Strong>EC2 Instance Connect</Strong> both
          rely on that rule - underneath, they're both an SSH connection on port
          22, just with different ways of proving who's allowed to open it. The
          third method, <Strong>Session Manager</Strong>, never touches port 22
          at all - it depends on something else entirely: the IAM role attached
          to the instance right at the beginning of this post, before there was
          even anything running to connect to. That's exactly why it mattered
          then.
        </Paragraph>

        <Paragraph>
          At the beginning of the post I wanted us to make an IAM role to attach
          to our EC2 instance. Now we're going to find out exactly why that was
          relevant.
        </Paragraph>

        <Paragraph>
          Select an instance and click <Strong>Connect</Strong> to see all of
          the options.
        </Paragraph>

        <PostImage src={EC2Connect} alt="EC2 Connection options" />

        <Paragraph>
          That warning banner is the port distinction from earlier showing up
          for real: <Strong>Port 22 (SSH) is not authorized</Strong>, because
          this instance's security group was never given a rule for it - only
          port 80 was. EC2 Instance Connect still needs an inbound path on port
          22 to push its temporary key over, no key pair required doesn't mean
          no port required, and the console says so directly rather than just
          hanging.
        </Paragraph>

        <Paragraph>
          <Strong>EC2 Instance Connect</Strong> is the tab AWS opens by default.
          Username and port are pre-filled -{" "}
          <InlineHighlight>ec2-user</InlineHighlight> and{" "}
          <InlineHighlight>22</InlineHighlight> - and once port 22 is actually
          authorized, clicking <Strong>Connect</Strong> opens a browser tab with
          a terminal already logged in. Nothing was generated or downloaded to
          get there: AWS pushes a temporary key over SSH for that one session
          only, then throws it away. Port 22 is genuinely required, but there's
          no long-lived credential anywhere for it to be stolen from.
        </Paragraph>

        <Paragraph>
          <Strong>Session Manager</Strong> is the next tab over, and it asks for
          nothing at all - no username, no port, just a <Strong>Connect</Strong>{" "}
          button - because there's no SSH connection being configured underneath
          it. All it needs is already in place: the SSM Agent running on the
          instance (preinstalled on Amazon Linux 2023) and the IAM role attached
          back in the very first step. Click it, and the same style of browser
          terminal opens, except logged in as{" "}
          <InlineHighlight>ssm-user</InlineHighlight> instead of{" "}
          <InlineHighlight>ec2-user</InlineHighlight>, with every command typed
          in that session logged to CloudWatch.
        </Paragraph>

        {/*
          Screenshot: the Session Manager tab, showing that it requires no
          fields at all beyond the Connect button.
          Save as: src/resources/images/blog/AWSDeployEC2/aws_deploy_ec2_connect_session_manager_tab.png
          import ConnectSessionManagerTab from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_connect_session_manager_tab.png";
          <PostImage src={ConnectSessionManagerTab} alt="Session Manager tab showing no fields required beyond the Connect button" />
        */}

        <Paragraph>
          <Strong>SSH client</Strong> is the traditional option, and the one tab
          in this dialog that quietly doesn't work for these instances. AWS
          still prints the exact command someone would run from their own
          terminal -{" "}
          <InlineHighlight>ssh -i "key.pem" ec2-user@...</InlineHighlight> - but
          there is no <InlineHighlight>key.pem</InlineHighlight>. These
          instances were launched with{" "}
          <Strong>Proceed without a key pair</Strong> back at the very start, so
          the instructions are generic rather than broken - AWS has no way of
          knowing a key pair was never created until someone actually tries the
          command and it fails.
        </Paragraph>

        {/*
          Screenshot: the SSH client tab, showing the ssh command it expects
          a key pair for.
          Save as: src/resources/images/blog/AWSDeployEC2/aws_deploy_ec2_connect_ssh_client_tab.png
          import ConnectSshClientTab from "../../resources/images/blog/AWSDeployEC2/aws_deploy_ec2_connect_ssh_client_tab.png";
          <PostImage src={ConnectSshClientTab} alt="SSH client tab showing the ssh command that would be needed, with no key pair available" />
        */}

        <Paragraph>A quick side-by-side of the three:</Paragraph>

        <TextList>
          <TextListItem>
            <Strong>EC2 Instance Connect</Strong> - one click, still requires
            port 22 open in the security group - but backed by a one-time key
            instead of a long-lived one.
          </TextListItem>
          <TextListItem>
            <Strong>SSM Session Manager</Strong> - one click, no port 22 at all,
            and every session logged to CloudWatch - at the cost of needing the
            IAM role and agent in place beforehand.
          </TextListItem>
          <TextListItem>
            <Strong>A traditional key pair</Strong> - the most familiar option,
            and not actually available here, since these instances never had one
            generated for them in the first place.
          </TextListItem>
        </TextList>

        <Paragraph>
          Once connected, by either working method,{" "}
          <InlineHighlight>systemctl status nginx</InlineHighlight> and{" "}
          <InlineHighlight>curl localhost</InlineHighlight> confirm what's
          actually running versus what the ALB or a browser reports from
          outside.
        </Paragraph>

        <SectionHeading id="blockers">Blockers</SectionHeading>

        <TextList>
          <TextListItem>
            <Strong>The HTTP checkbox, missed</Strong> - Skipping the{" "}
            <Strong>Allow HTTP traffic from the internet</Strong> option means
            the instance boots with nothing able to reach port 80 at all. If
            that happens you'll get a page that never loads afterward.
          </TextListItem>
          <TextListItem>
            <Strong>Port 22 not authorized</Strong> - the flip side of the same
            mistake. EC2 Instance Connect and a traditional key pair both need
            port 22 open in the security group, and if it isn't, the console
            says so directly rather than hanging:{" "}
            <Strong>"Port 22 (SSH) is not authorized."</Strong> Session Manager
            is unaffected either way, since it never touches port 22.
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
            <Strong>Forgetting to attach the target group to the ASG</Strong> -
            an Auto Scaling Group created without it launches instances happily,
            but the ALB keeps sending everything to whatever was registered
            before.
          </TextListItem>
        </TextList>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          I hope you've found this walkthrough useful as we've not just explored
          EC2 but the services around which support it, and that it helps you
          get started with deploying to EC2 instances.
        </Paragraph>
      </PostContainer>
    </PageWrapper>
  );
};

export default AWSDeployEC2;
