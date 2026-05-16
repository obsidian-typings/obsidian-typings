import type { Grammar } from './Grammar.d.ts';
import type { PrismToken } from './PrismToken.d.ts';

/**
 * Environment object passed to Prism hooks and used during highlighting.
 *
 * @public
 * @unofficial
 */
export interface Environment {
  /** Additional attributes for the wrapping element. */
  attributes?: Record<string, string>;

  /** CSS classes applied to the token. */
  classes?: string[];

  /** The source code to highlight. */
  code?: string;

  /** The content of a token. */
  content?: string;

  /** The target element being highlighted. */
  element?: Element;

  /** The grammar used for tokenization. */
  grammar?: Grammar;

  /** The highlighted HTML code. */
  highlightedCode?: string;

  /** The language identifier. */
  language?: string;

  /** The parent token array. */
  parent?: Array<PrismToken | string>;

  /** CSS selector used to find code elements. */
  selector?: string;

  /** The HTML tag name for the token. */
  tag?: string;

  /** The token sequence. */
  tokenSequence?: Array<PrismToken | string>;

  /** The type of the token. */
  type?: string;
}
