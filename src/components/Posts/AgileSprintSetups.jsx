import React, { useEffect } from "react";
import styled from "styled-components";
import { renderArchitexter } from "architexter";

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
import { JIRASVG, ConfluenceSVG } from "../../resources/styles/icons";

// components
import BackButton from "../Button/BackButton";
import Banner from "../Banner/Banner";
import { CodeBlockWithCopy } from "../Code/Code";

const itemHierarchy = `[project] Project - a collection of epics that all drive toward a common goal.
  [epic] Epic - a large body of work that can be broken down into a number of smaller tasks.
    [story] Story / Task - a short requirement or request, written from the perspective of an end user.`;

const userStoryTemplate = `As a <type of user>,
I want <some goal or need>,
So that <the reason or benefit>.

// Example
As a customer,
I want to filter search results by price,
So that I can find products within my budget.`;

const acceptanceCriteriaTemplate = `Given <some starting context>,
When <an event or action occurs>,
Then <an expected outcome>.

// Example
Given I am viewing the search results page,
When I select a minimum and maximum price,
Then only products within that price range are displayed.`;

const statusFlow = `Concept User Story
  > needs user stories & acceptance criteria
  In Elaboration
    > awaiting more information
    Ready for Sprint
      > user stories, acceptance criteria & quote agreed
      Ready for Dev
        > pulled into the sprint
        In Development
          Blocked
          Code Review
            > approved
            Ready for QA
              > picked up
              In QA
                > passed
                Awaiting Deployment
                  Done
                  Cancelled`;

const PostContainer = styled(BasePostContainer)`
  animation: ${SlideInBottom} 0.5s forwards;
`;

const AgileSprintSetups = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Analytics.pageview("/blog/agile-sprint-setups");
    Analytics.track("blog_page_viewed", { slug: "agile-sprint-setups" });
  }, []);

  return (
    <PageWrapper>
      <PostTopBar>
        <BackButton to="/blog" />
      </PostTopBar>

      <PostContainer>
        <HeaderRow>
          <PageTitle>Agile & Sprint Setups</PageTitle>
          <IconWrapper>
            <HeaderIcon>
              <JIRASVG />
            </HeaderIcon>
            <HeaderIcon>
              <ConfluenceSVG />
            </HeaderIcon>
          </IconWrapper>
        </HeaderRow>

        <Paragraph>
          In this post, I'd like to share my personal experience with Agile and
          Scrum, and how I've seen them implemented in practice. I have found
          throughout working with various teams that, although Agile and Scrum
          are well documented and defined, people can have different opinions on
          what "correct" Agile looks like. This post is not a definitive guide,
          but rather a reference for the common patterns and practices I've
          observed in real-world Agile teams.
        </Paragraph>

        <Paragraph>
          Every team I've worked on has run Agile slightly differently, but the
          underlying shape is almost always the same: work is broken down into
          an priority order, each piece of work carries the same contextual
          fields, it moves through the same handful of statuses, and the same
          handful of ceremonies keep it all moving. This post will mostly focus
          on that shape.
        </Paragraph>

        <TextList>
          <TextListItem>
            <TextLink href="#what-is-agile-scrum">
              What is Agile & Scrum?
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#responsibilities">Responsibilities</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#discovery">Discovery</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#item-hierarchy">
              Item Hierarchy: Projects, Epics & Stories
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#anatomy-of-a-task">Anatomy of a Task</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#status-workflow">Status Workflow</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#ceremonies">Ceremonies</TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink href="#board-organisation">Board Organisation</TextLink>
          </TextListItem>
        </TextList>

        <SectionHeading id="what-is-agile-scrum">
          What is Agile & Scrum?
        </SectionHeading>

        <Paragraph>
          For those who aren't familiar, Agile is a set of principles for
          software development under which requirements and solutions evolve
          through the collaborative effort of self-organizing and
          cross-functional teams. There are several frameworks for implementing
          Agile methodologies, with Scrum being one of the most popular.{" "}
          <InlineHighlight>
            All you need to know for this post is that I'll be covering the
            Scrum framework in particular
          </InlineHighlight>
          .
        </Paragraph>

        <Banner title="Agile Frameworks" variant="info">
          <Paragraph>
            I said I would only be covering Scrum, but it's worth noting that
            there are other methodologies like Kanban and Lean that also fall
            under the Agile umbrella.
          </Paragraph>
        </Banner>

        <SectionHeading id="responsibilities">Responsibilities</SectionHeading>

        <Paragraph>
          In Scrum, there are three main roles: the Product Owner, the Scrum
          Master, and the Development Team. The Product Owner is responsible for
          defining the features of the product and deciding on release dates and
          content. The Scrum Master is responsible for ensuring that the team
          follows Agile practices and removes any impediments to progress. The
          Development Team is responsible for delivering potentially shippable
          increments of the product at the end of each sprint.
        </Paragraph>

        <Paragraph>
          In practice, these roles can be fluid, especially in smaller teams
          where one person may wear multiple hats. However, it's important to
          have clarity on who is responsible for what to avoid confusion and
          ensure accountability. Without clear responsibilities, the team can
          easily fall into a state of chaos where work is duplicated, missed, or
          delayed.
        </Paragraph>

        <Paragraph>
          I personally have found that development leads make for a good Product
          Owner. Someone who has a strong understanding of the product and the
          technical constraints can make informed decisions about what features
          to prioritize and how to scope them. The Scrum Master role can be
          filled by someone who is good at facilitating meetings and keeping the
          team on track, but it doesn't necessarily have to be a dedicated role
          in smaller teams.
        </Paragraph>

        <SectionHeading id="discovery">Discovery</SectionHeading>

        <Paragraph>
          Before any work can be done, there needs to be a discovery phase where
          the problem is understood, the solution is defined, and the work is
          scoped. I cannot stress enough how important this phase is. It is the
          foundation upon which the entire project is built, and if it is not
          done correctly, the project is likely to fail!
        </Paragraph>

        <SectionHeading id="item-hierarchy">
          Item Hierarchy: Projects, Epics & Stories
        </SectionHeading>

        <Paragraph>
          Work is organised into a hierarchy of items, each one a breakdown of
          the level above it. At the top level, we have Projects, which are
          collections of Epics that all drive toward a common goal. Each Epic is
          a large body of work that can be broken down into a number of smaller
          workloads, known as Stories or Tasks. These Stories are short
          requirements or requests, written from the perspective of an end user.
        </Paragraph>

        <Paragraph>
          Essentially, work is organised into three levels, each one a breakdown
          of the level above it:
        </Paragraph>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(itemHierarchy, "tree")}
        />

        <SectionHeading id="anatomy-of-a-task">
          Anatomy of a Task
        </SectionHeading>

        <Paragraph>
          A task is the smallest unit of work in the hierarchy, and it carries a
          set of fields that provide context and guidance for whoever picks it
          up. You can judge how well a task has been defined by how many
          questions a developer has to ask before they can start working on it.
          This is assuming that everything is well-defined, and the discovery of
          the project has been done correctly, which anyone who has worked in
          software development long enough knows that won't always be the case!
        </Paragraph>

        <SubSectionHeading>User Story</SubSectionHeading>

        <Paragraph>
          The user story frames the work from the perspective of whoever
          benefits from it, using the same three-part template every time:
        </Paragraph>

        <CodeBlockWithCopy code={userStoryTemplate} />

        <SubSectionHeading>Acceptance Criteria</SubSectionHeading>

        <Paragraph>
          Acceptance criteria define what "done" actually means for the story,
          written as one or more <InlineHighlight>Given</InlineHighlight>,{" "}
          <InlineHighlight>When</InlineHighlight>,{" "}
          <InlineHighlight>Then</InlineHighlight> statements:
        </Paragraph>

        <CodeBlockWithCopy code={acceptanceCriteriaTemplate} />

        <SubSectionHeading>Story Points</SubSectionHeading>

        <Paragraph>Oh boy, here we go...</Paragraph>

        <Paragraph>
          At first, the concept of this sounded really silly to me and seemed
          nonsensical. Why not just estimate how long a task will take in hours
          or days? Well, if we think about how how people gauge the size of
          anything, they look towards a reference point and that point might not
          be objectively accurate for everyone because{" "}
          <InlineHighlight>
            A) not everyone has the same skill set and B) not everyone has the
            same experience with the task at hand.
          </InlineHighlight>
        </Paragraph>

        <Paragraph>
          For example, even for something that's not software development
          related, if I asked you to estimate how long it would take to walk to
          the end of the street, you might say "10 minutes". You know there's a
          bus stop half way down the street, so you might think "if I walk to
          the bus stop, it will take me 5 minutes, and then another 5 minutes to
          walk the rest of the way". But if I asked someone else, they might say
          "15 minutes" because they don't know where the bus stop is, and they
          might think "It will take me longer than 10 minutes". So even though
          we're both estimating the same task, our estimates are different
          because we have different reference points.
        </Paragraph>

        <Paragraph>
          Story points are a way to normalise the estimation of tasks across a
          team, and they are usually based on the Fibonacci sequence (1, 2, 3,
          5, 8, 13, etc.) to reflect the increasing uncertainty of larger tasks.
          The worst thing about this process is that it's most ineffective at
          the very beginning of a project, when the team has no reference points
          to compare against. It's only with time and experience that a team can
          develop a shared understanding of what each story point value means in
          terms of effort, because they would have built up a bank of reference
          points to compare against.
        </Paragraph>

        <SubSectionHeading>Priority</SubSectionHeading>

        <Paragraph>
          A simple <Strong>High</Strong>, <Strong>Medium</Strong>,{" "}
          <Strong>Low</Strong> priority gives the team a quick way to decide
          what gets pulled into a sprint first, and what can reasonably wait.
        </Paragraph>

        <SubSectionHeading>Ownership</SubSectionHeading>

        <Paragraph>
          Three fields track who is accountable for a task at each stage:{" "}
          <Strong>Assignee</Strong> (who's building it),{" "}
          <Strong>Code Reviewed by</Strong> (who checked the implementation),
          and <Strong>QA'd by</Strong> (who verified it against the acceptance
          criteria). Keeping these separate means no single person is both
          building and signing off their own work.
        </Paragraph>

        <SectionHeading id="status-workflow">Status Workflow</SectionHeading>

        <Paragraph>
          A task moves through a fixed set of statuses from idea to done.
          Everything before <InlineHighlight>Ready for Dev</InlineHighlight> is
          backlog grooming; everything from{" "}
          <InlineHighlight>Ready for Dev</InlineHighlight> onward is what
          typically lives on the sprint board itself:
        </Paragraph>

        <CodeBlockWithCopy
          compact
          code={renderArchitexter(statusFlow, "flow")}
        />

        <TextList>
          <TextListItem>
            <Strong>Concept User Story</Strong> - the idea exists but still
            needs user stories and acceptance criteria written.
          </TextListItem>
          <TextListItem>
            <Strong>In Elaboration</Strong> - awaiting more information before
            it can be scoped properly.
          </TextListItem>
          <TextListItem>
            <Strong>Ready for Sprint</Strong> - has user stories, acceptance
            criteria, and a quote; ready to be picked up in sprint planning.
          </TextListItem>
          <TextListItem>
            <Strong>Ready for Dev</Strong> - pulled into the current sprint,
            waiting to be started.
          </TextListItem>
          <TextListItem>
            <Strong>Blocked</Strong> - work can't progress until something
            external is resolved.
          </TextListItem>
          <TextListItem>
            <Strong>In Development</Strong> - actively being built.
          </TextListItem>
          <TextListItem>
            <Strong>Code Review</Strong> - implementation is complete and
            awaiting review.
          </TextListItem>
          <TextListItem>
            <Strong>Ready for QA</Strong> - reviewed and approved, waiting to be
            picked up for testing.
          </TextListItem>
          <TextListItem>
            <Strong>In QA</Strong> - being tested against the acceptance
            criteria.
          </TextListItem>
          <TextListItem>
            <Strong>Awaiting Deployment</Strong> - passed QA, waiting to be
            released.
          </TextListItem>
          <TextListItem>
            <Strong>Done</Strong> - released and complete.
          </TextListItem>
          <TextListItem>
            <Strong>Cancelled</Strong> - no longer needed.
          </TextListItem>
        </TextList>

        <SectionHeading id="ceremonies">Ceremonies</SectionHeading>

        <Paragraph>
          The cadence of these meetings is crucial for maintaining momentum and
          depends on the length of the sprint. For example, if a team is running
          2-week sprints, they might have a standup every day, a sprint planning
          meeting at the start of the sprint, a sprint review and retrospective
          at the end of the sprint, and a backlog refinement session every week.
          The key is to find a rhythm that works for the team and stick to it.
        </Paragraph>

        <SubSectionHeading>Standups</SubSectionHeading>

        <Paragraph>
          A check-in where each person answers three questions:
        </Paragraph>

        <TextList>
          <TextListItem>What did I complete yesterday?</TextListItem>
          <TextListItem>What will I work on today?</TextListItem>
          <TextListItem>Am I blocked by anything?</TextListItem>
        </TextList>

        <Paragraph>
          Standups are usually held at the same time every day, and they should
          be short and focused. The goal is to keep everyone on the same page
          and identify any blockers early. You can instantly tell if a team gels
          and is running well by the time it takes to get through the standup.
        </Paragraph>

        <SubSectionHeading>Sprint Planning</SubSectionHeading>

        <Paragraph>
          Held at the start of a sprint to decide what goes in and what gets
          pushed back. New tasks are created here and labelled accordingly -{" "}
          <InlineHighlight>Concept User Story</InlineHighlight>,{" "}
          <InlineHighlight>In Elaboration</InlineHighlight>, or{" "}
          <InlineHighlight>Ready for Sprint</InlineHighlight> - depending on how
          well-defined they already are. It's vital that this step acts as a
          gatekeeper for the sprint, and that only tasks that are well-defined
          and ready to be worked on are pulled in. Anything that remotely looks
          suspect should be pushed back to the backlog for further refinement.
        </Paragraph>

        <SubSectionHeading>Sprint Review (Optional)</SubSectionHeading>

        <Paragraph>
          A chance to show off what's been completed during the sprint - as much
          a knowledge-transfer exercise as a demo.
        </Paragraph>

        <SubSectionHeading>Sprint Retrospective</SubSectionHeading>

        <Paragraph>
          A look back at the sprint that just ended: what worked well, and what
          didn't. The goal is to identify areas for improvement and make
          adjustments for the next sprint.
        </Paragraph>

        <SubSectionHeading>Quoting</SubSectionHeading>

        <Paragraph>
          A session dedicated to estimating pieces of work - putting a story
          point value against tasks so they're ready to be picked up in a future
          sprint.{" "}
          <InlineHighlight>
            {" "}
            This could also be done as part of sprint planning
          </InlineHighlight>
          , depending on how efficient the time management of the team is.
        </Paragraph>

        <SubSectionHeading>
          Sprint Refinement (Backlog Prioritisation)
        </SubSectionHeading>

        <Paragraph>
          An ongoing tidy-up of the board: reorganising priority, and adding
          user stories and acceptance criteria to tasks that don't have them
          yet, so they're not a bottleneck when a future sprint planning session
          comes around.
        </Paragraph>

        <Paragraph>
          This is key to having an efficient sprint cycle, and without the time
          and attention it can easily slow the whole process down as it will
          force the team to spend more time in sprint planning sessions trying
          to define tasks that should have been defined earlier.
        </Paragraph>

        <SectionHeading id="board-organisation">
          Board Organisation
        </SectionHeading>

        <Paragraph>
          The backlog is where the team can see all of the work that needs to be
          done, and the board is where they can see the work that is currently
          in progress. This separation helps to keep the team focused on the
          work at hand, and prevents them from getting overwhelmed by the sheer
          volume of work that needs to be done.
        </Paragraph>

        <Paragraph>
          The sprint board itself only needs to show the columns that represent
          active, in-sprint work - everything earlier in the lifecycle (
          <InlineHighlight>Concept User Story</InlineHighlight>,{" "}
          <InlineHighlight>In Elaboration</InlineHighlight>,{" "}
          <InlineHighlight>Ready for Sprint</InlineHighlight>) lives in the
          backlog rather than on the board:
        </Paragraph>

        <TextList>
          <TextListItem>Ready for Dev</TextListItem>
          <TextListItem>Blocked</TextListItem>
          <TextListItem>In Development</TextListItem>
          <TextListItem>Code Review</TextListItem>
          <TextListItem>Ready for QA</TextListItem>
          <TextListItem>In QA</TextListItem>
          <TextListItem>Awaiting Deployment</TextListItem>
          <TextListItem>Done</TextListItem>
        </TextList>

        <SectionHeading>Wrapping Up</SectionHeading>

        <Paragraph>
          I hope that this has been a useful reference for anyone looking to
          understand how Agile and Scrum can be implemented. The key to success
          is not just following the processes, but trying to foster a culture
          that supports this methodology. I might write a follow-up post in the
          future that covers creating a blueprint for an Agile sprint setup with
          either Jira or Azure DevOps...
        </Paragraph>

        <SectionHeading>References</SectionHeading>

        <TextList>
          <TextListItem>
            <TextLink
              href="https://www.atlassian.com/agile"
              target="_blank"
              rel="noreferrer"
            >
              atlassian.com/agile
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://www.atlassian.com/software/jira/guides"
              target="_blank"
              rel="noreferrer"
            >
              atlassian.com/software/jira/guides
            </TextLink>
          </TextListItem>
          <TextListItem>
            <TextLink
              href="https://scrumguides.org/"
              target="_blank"
              rel="noreferrer"
            >
              scrumguides.org
            </TextLink>
          </TextListItem>
        </TextList>
      </PostContainer>
    </PageWrapper>
  );
};

export default AgileSprintSetups;
