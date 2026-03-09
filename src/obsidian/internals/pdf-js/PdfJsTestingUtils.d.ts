import type { HighlightOutliner } from './HighlightOutliner.d.ts';

/**
 * Utility interface exposing PDF.js testing helpers.
 * @public
 * @unofficial
 */
export interface PdfJsTestingUtils {
  /** Constructor for creating highlight outliners for PDF annotations. */
  HighlightOutliner: HighlightOutliner;
}
