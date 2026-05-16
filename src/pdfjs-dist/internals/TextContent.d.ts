import type { PdfTextStyle } from './PdfTextStyle.d.ts';
import type { TextItem } from './TextItem.d.ts';

/**
 * Text content extracted from a PDF page.
 *
 * @public
 * @unofficial
 */
export interface TextContent {
  /** Text items in the content. */
  items: TextItem[];
  /** Style definitions referenced by text items. */
  styles: Record<string, PdfTextStyle>;
}
