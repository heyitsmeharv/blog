/**
 * Optional diagrams for the summary sheets, reusing images that already ship
 * with the blog posts (src/resources/images/blog/**). The deck data files stay
 * image-free - curate diagrams here instead.
 *
 * Shape: { [deckId]: [{ section, image, alt, caption }] }
 *   - `section` matches a card's `ref` so the diagram renders under that section
 *     of the sheet. Use "comparisons" or "scenarios" to attach to those blocks.
 *
 * The S3 sheet is intentionally text-only, so it has no entry.
 */
const SUMMARY_IMAGES = {};

export function summaryImagesFor(deckId) {
  return SUMMARY_IMAGES[deckId] ?? [];
}
