import type { HighlightCallback } from '../HighlightCallback.d.ts';

/**
 * Highlights a single code element.
 *
 * @param element - The element to highlight.
 * @param async - Whether to use web workers for highlighting.
 * @param callback - Callback invoked after the element is highlighted.
 * @public
 * @unofficial
 */
export declare function highlightElement(element: Element, async?: boolean, callback?: HighlightCallback): void;
