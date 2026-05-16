import type { HighlightCallback } from '../HighlightCallback.d.ts';

/**
 * Highlights all code elements on the page.
 *
 * @param async - Whether to use web workers for highlighting.
 * @param callback - Callback invoked after each element is highlighted.
 * @public
 * @unofficial
 */
export declare function highlightAll(async?: boolean, callback?: HighlightCallback): void;
