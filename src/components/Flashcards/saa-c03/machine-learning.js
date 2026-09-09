/**
 * Machine Learning deck - drawn from the "Amazon Machine Learning" post
 * (/blog/aws-machine-learning). Mostly "which managed AI service for this use
 * case" cards. Each card's `ref` is the section it came from.
 */
export const machineLearning = {
  id: "machine-learning",
  title: "Machine Learning",
  postSlug: "aws-machine-learning",
  cards: [
    {
      id: "ml-rekognition",
      label: "Image / video analysis + moderation",
      type: "scenario",
      front:
        "Detect objects/faces/text in images and video, and flag inappropriate content with edge cases sent for human review. Services?",
      back: "Amazon Rekognition for the image/video analysis and content moderation; Amazon Augmented AI (A2I) for the manual review workflow.",
      ref: "Rekognition",
    },
    {
      id: "ml-transcribe",
      label: "Audio / video to text",
      type: "scenario",
      front:
        "Convert audio and video into text (with timestamps and speaker labels). Service?",
      back: "Amazon Transcribe - automatic speech recognition (ASR).",
      ref: "Transcribe",
    },
    {
      id: "ml-polly",
      label: "Text to speech",
      type: "scenario",
      front:
        "Turn text into natural-sounding speech, with control over pronunciation and prosody. Service?",
      back: "Amazon Polly - text-to-speech. Lexicons customise pronunciation; SSML controls pitch, rate, volume, pauses and emphasis.",
      ref: "Polly",
    },
    {
      id: "ml-translate",
      label: "Translate text",
      type: "scenario",
      front:
        "Translate text between many languages in real time or batch. Service?",
      back: "Amazon Translate - neural machine translation, with optional source-language auto-detection.",
      ref: "Translate",
    },
    {
      id: "ml-lex-connect",
      label: "Chatbot + contact centre",
      type: "scenario",
      front:
        "Build a voice/text chatbot, and use it in a cloud contact centre. Services?",
      back: "Amazon Lex for the conversational interface (ASR + NLU); Amazon Connect for the cloud-based contact centre it integrates with.",
      ref: "Lex & Connect",
    },
    {
      id: "ml-comprehend",
      label: "NLP insights from text",
      type: "scenario",
      front:
        "Extract sentiment, entities, key phrases, language and PII from unstructured text. Service?",
      back: "Amazon Comprehend - NLP insights from text, including custom classification and PII detection.",
      ref: "Comprehend",
    },
    {
      id: "ml-sagemaker",
      label: "Build / train / deploy custom models",
      type: "scenario",
      front:
        "You need to build, train and deploy your own custom ML model at scale. Service?",
      back: "Amazon SageMaker - the core ML platform covering data preparation through model hosting.",
      ref: "SageMaker",
    },
    {
      id: "ml-forecast",
      label: "Time-series forecasting",
      type: "scenario",
      front:
        "Generate accurate time-series forecasts for demand planning, inventory or workforce capacity. Service?",
      // Amazon Forecast has been closed to new customers since mid-2024 (AWS
      // points new users to SageMaker Canvas), but it's still the SAA-C03 answer
      // for this scenario.
      back: "Amazon Forecast - a managed ML time-series forecasting service. (Closed to new customers since mid-2024; AWS now steers new users to Amazon SageMaker Canvas.)",
      ref: "Forecast",
    },
    {
      id: "ml-kendra",
      label: "Natural-language enterprise search",
      type: "scenario",
      front:
        "Let users ask natural-language questions and get relevant answers from structured and unstructured data across multiple internal repositories. Service?",
      back: "Amazon Kendra - an ML-powered intelligent enterprise search service.",
      ref: "Kendra",
    },
    {
      id: "ml-personalize",
      label: "Personalised recommendations",
      type: "scenario",
      front:
        "Add real-time personalised product/content recommendations without building a recommendation engine. Service?",
      back: "Amazon Personalize.",
      ref: "Personalize",
    },
    {
      id: "ml-textract",
      label: "Extract text / forms from documents",
      type: "scenario",
      front:
        "Extract text, handwriting and structured form/table data from PDFs and scanned images (beyond basic OCR). Service?",
      back: "Amazon Textract - understands document layout and relationships.",
      ref: "Textract",
    },
  ],
};
