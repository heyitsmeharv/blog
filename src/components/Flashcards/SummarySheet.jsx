import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { Analytics } from "../../helpers/analytics";
import SlideInBottom from "../../animations/SlideInBottom";
import { posts } from "../../helpers/posts";
import { getExam } from "./decks";
import { DeckIcon } from "./deckIcons";
import { summaryImagesFor } from "./summaryImages";

/**
 * Splits a deck's cards into the summary sheet's three blocks, preserving order:
 *   - reference: definition + cloze cards, grouped by their post section (`ref`)
 *   - comparisons: every `comparison` card
 *   - scenarios: every `scenario` card ("when to use")
 * Each card appears in exactly one block.
 */
function partitionCards(cards) {
  const reference = [];
  const comparisons = [];
  const scenarios = [];

  for (const card of cards) {
    if (card.type === "comparison") comparisons.push(card);
    else if (card.type === "scenario") scenarios.push(card);
    else reference.push(card);
  }

  const order = [];
  const byRef = new Map();
  for (const card of reference) {
    const key = card.ref || "Other";
    if (!byRef.has(key)) {
      byRef.set(key, []);
      order.push(key);
    }
    byRef.get(key).push(card);
  }

  return {
    sections: order.map((ref) => ({ ref, cards: byRef.get(ref) })),
    comparisons,
    scenarios,
  };
}

const Page = styled.div`
  min-height: calc(100vh - 6.5rem);
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.primary};
  animation: ${SlideInBottom} 0.5s forwards;

  @media print {
    min-height: 0;
    padding: 0;
    background: #fff;
    color: #000;
    animation: none;
  }
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;

  @media print {
    max-width: none;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.6rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.mutedText};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  @media print {
    display: none;
  }
`;

const Sheet = styled.article`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.secondary}55;
  border-radius: 1.2rem;
  padding: 2.6rem 2.8rem 3rem;

  @media print {
    border: none;
    border-radius: 0;
    padding: 0;
    background: #fff;
  }
`;

/*
 * The @page margin is 0 so browsers drop their injected header/footer. To still
 * get a margin on *every* printed page (not just the first/last), the sheet body
 * sits in a table: a browser repeats <thead>/<tfoot> at the top/bottom of each
 * page it spans, so the empty spacer rows below become a per-page margin.
 * On screen the table is invisible and the spacers collapse to nothing.
 */
const PrintFrame = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const PrintEdge = styled.td`
  padding: 0;
  line-height: 0;
  font-size: 0;

  @media print {
    height: 14mm;
  }
`;

const PrintBody = styled.td`
  padding: 0;

  @media print {
    padding: 0 12mm;
  }
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
  padding-bottom: 1.2rem;
  margin-bottom: 1.8rem;
`;

const HeadIcon = styled(DeckIcon)`
  display: flex;
  flex-shrink: 0;

  svg {
    width: 3.4rem;
    height: 3.4rem;
    margin: 0;
  }
`;

const HeadText = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 3vw, 2.6rem);
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Source = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  margin: 0.3rem 0 0;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const HeadActions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-shrink: 0;

  @media print {
    display: none;
  }
`;

const HeadButton = styled(Link)`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.7rem 1.3rem;
  border-radius: 0.6rem;
  text-decoration: none;
  background: ${({ theme }) => theme.buttonColour};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.buttonColour};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
`;

const PrintButton = styled.button.attrs({ type: "button" })`
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.7rem 1.3rem;
  border-radius: 0.6rem;
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.secondary};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }
`;

const Block = styled.section`
  margin-top: 2.4rem;

  &:first-of-type {
    margin-top: 0;
  }

  @media print {
    break-inside: avoid;
  }
`;

const BlockLabel = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.link};
  border-bottom: 1px solid ${({ theme }) => theme.secondary}55;
  padding-bottom: 0.4rem;
  margin: 0 0 1rem;

  @media print {
    color: #000;
  }
`;

const SectionLabel = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.mutedText};
  margin: 0 0 0.6rem;

  @media print {
    color: #000;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr;
  gap: 0.4rem 1.6rem;
  padding: 0.55rem 0;
  border-top: 1px solid ${({ theme }) => theme.secondary}33;
  font-size: 1.4rem;
  line-height: 1.55;

  &:first-of-type {
    border-top: none;
  }

  @media print {
    break-inside: avoid;
    border-top: 1px solid #ddd;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.1rem;
  }
`;

const Term = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.text};

  @media print {
    color: #000;
  }
`;

const Fact = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  @media print {
    color: #111;
  }
`;

const Figure = styled.figure`
  margin: 1rem 0 0.4rem;

  img {
    width: 100%;
    max-width: 520px;
    border-radius: 0.6rem;
    border: 1px solid ${({ theme }) => theme.secondary}55;
    display: block;
  }

  figcaption {
    font-size: 1.15rem;
    color: ${({ theme }) => theme.mutedText};
    margin-top: 0.4rem;
  }
`;

const Missing = styled.div`
  max-width: 820px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
`;

function Rows({ cards }) {
  return cards.map((card) => (
    <Row key={card.id}>
      <Term>{card.label ?? card.front}</Term>
      <Fact>{card.back}</Fact>
    </Row>
  ));
}

export default function SummarySheet() {
  const { examId, deckId } = useParams();
  const exam = getExam(examId);
  const deck = exam?.decks.find((d) => d.id === deckId);

  useEffect(() => {
    Analytics.pageview(`/flashcards/${examId}/${deckId}/summary`);
    if (deck) {
      Analytics.track("flashcards_summary_sheet_viewed", { examId, deckId });
    }
  }, [examId, deckId, deck]);

  const groups = useMemo(
    () => (deck ? partitionCards(deck.cards) : null),
    [deck],
  );

  if (!exam || !deck) {
    return (
      <Page>
        <Missing>
          That summary sheet doesn&apos;t exist.{" "}
          <Link to="/flashcards">Back to flashcards</Link>.
        </Missing>
      </Page>
    );
  }

  const post = posts.find((p) => p.navigate === deck.postSlug);
  const images = summaryImagesFor(deck.id);
  const imagesFor = (section) =>
    images.filter((img) => img.section === section);

  const blocks = (
    <>
      <Head>
        <HeadIcon deckId={deck.id} />
        <HeadText>
          <Title>{deck.title} · Summary sheet</Title>
          <Source>
            {deck.cards.length} facts
            {post && (
              <>
                {" · from "}
                <Link to={`/blog/${deck.postSlug}`}>{post.title}</Link>
              </>
            )}
          </Source>
        </HeadText>
        <HeadActions>
          <PrintButton onClick={() => window.print()}>Print</PrintButton>
        </HeadActions>
      </Head>

      {groups.sections.map(({ ref, cards }) => (
        <Block key={ref}>
          <SectionLabel>{ref}</SectionLabel>
          <Rows cards={cards} />
          {imagesFor(ref).map((img) => (
            <Figure key={img.image}>
              <img src={img.image} alt={img.alt} />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </Figure>
          ))}
        </Block>
      ))}

      {groups.comparisons.length > 0 && (
        <Block>
          <BlockLabel>Comparisons</BlockLabel>
          <Rows cards={groups.comparisons} />
          {imagesFor("comparisons").map((img) => (
            <Figure key={img.image}>
              <img src={img.image} alt={img.alt} />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </Figure>
          ))}
        </Block>
      )}

      {groups.scenarios.length > 0 && (
        <Block>
          <BlockLabel>When to use</BlockLabel>
          <Rows cards={groups.scenarios} />
          {imagesFor("scenarios").map((img) => (
            <Figure key={img.image}>
              <img src={img.image} alt={img.alt} />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </Figure>
          ))}
        </Block>
      )}
    </>
  );

  return (
    <Page>
      <Inner>
        <BackLink to={`/flashcards/${exam.id}`}>Back</BackLink>

        <Sheet>
          <PrintFrame>
            <thead>
              <tr>
                <PrintEdge />
              </tr>
            </thead>
            <tfoot>
              <tr>
                <PrintEdge />
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <PrintBody>{blocks}</PrintBody>
              </tr>
            </tbody>
          </PrintFrame>
        </Sheet>
      </Inner>
    </Page>
  );
}
