import type { Grammar } from './Grammar.d.ts';
import type { HighlightCallback } from './HighlightCallback.d.ts';
import type { Languages } from './Languages.d.ts';
import type { PrismHooks } from './PrismHooks.d.ts';
import type { PrismToken } from './PrismToken.d.ts';
import type { PrismUtil } from './PrismUtil.d.ts';

/**
 * The Prism.js library module type, representing the `window.Prism` object.
 *
 * @public
 * @unofficial
 */
export interface PrismModule {
  /** Whether to disable the default Prism worker message handler. */
  disableWorkerMessageHandler: boolean | undefined;
  /** The hooks registry. */
  hooks: PrismHooks;
  /** The languages registry. */
  languages: Languages;
  /** Whether Prism should skip automatic highlighting on page load. */
  manual: boolean | undefined;
  /** Loaded plugins. */
  plugins: Record<string, unknown>;
  /** Utility functions. */
  util: PrismUtil;

  /**
   * Highlights text using a grammar.
   *
   * @param text - The text to highlight.
   * @param grammar - The grammar to use.
   * @param language - The language name.
   * @returns The highlighted HTML string.
   */
  highlight(text: string, grammar: Grammar, language: string): string;

  /**
   * Highlights all code elements on the page.
   *
   * @param async - Whether to use web workers.
   * @param callback - Callback invoked after each element is highlighted.
   */
  highlightAll(async?: boolean, callback?: HighlightCallback): void;

  /**
   * Highlights all code elements under a container.
   *
   * @param container - The container element.
   * @param async - Whether to use web workers.
   * @param callback - Callback invoked after each element is highlighted.
   */
  highlightAllUnder(container: ParentNode, async?: boolean, callback?: HighlightCallback): void;

  /**
   * Highlights a single element.
   *
   * @param element - The element to highlight.
   * @param async - Whether to use web workers.
   * @param callback - Callback invoked after the element is highlighted.
   */
  highlightElement(element: Element, async?: boolean, callback?: HighlightCallback): void;

  /**
   * Tokenizes text using a grammar.
   *
   * @param text - The text to tokenize.
   * @param grammar - The grammar to use.
   * @returns The token stream.
   */
  tokenize(text: string, grammar: Grammar): Array<PrismToken | string>;
}
