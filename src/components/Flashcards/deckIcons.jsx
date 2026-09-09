import {
  AWSIAMSVG,
  AWSEC2SVG,
  AWSVPCSVG,
  AWSS3SVG,
  AWSRDSSVG,
  AWSRoute53SVG,
  AWSCloudfrontSVG,
  AWSSQSSVG,
  AWSSNSSVG,
  AWSKinesisSVG,
  AWSECSSVG,
  AWSLambdaSVG,
  AWSAthenaSVG,
  AWSSageMakerSVG,
  AWSCloudWatchSVG,
  AWSKMSSVG,
} from "../../resources/styles/icons";

/** deck id → the AWS service icon that best represents the deck's topic. */
const DECK_ICONS = {
  iam: AWSIAMSVG,
  ec2: AWSEC2SVG,
  vpc: AWSVPCSVG,
  s3: AWSS3SVG,
  databases: AWSRDSSVG,
  route53: AWSRoute53SVG,
  cloudfront: AWSCloudfrontSVG,
  sqs: AWSSQSSVG,
  sns: AWSSNSSVG,
  kinesis: AWSKinesisSVG,
  containers: AWSECSSVG,
  serverless: AWSLambdaSVG,
  "data-analytics": AWSAthenaSVG,
  "machine-learning": AWSSageMakerSVG,
  "monitoring-audit": AWSCloudWatchSVG,
  "security-encryption": AWSKMSSVG,
};

/**
 * Renders the service icon for a deck. `className` is forwarded so callers can
 * size it with styled-components (the underlying SVG is 40x40 with a margin by
 * default). Decorative - hidden from assistive tech.
 */
export function DeckIcon({ deckId, className }) {
  const Icon = DECK_ICONS[deckId];
  if (!Icon) return null;
  return (
    <span className={className} aria-hidden="true">
      <Icon />
    </span>
  );
}
