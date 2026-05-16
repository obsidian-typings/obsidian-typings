import type { HighlightCallback } from '../HighlightCallback.d.ts';

/**
 * Highlights all code elements under a given container.
 *
 * @param container - The parent node to search within.
 * @param async - Whether to use web workers for highlighting.
 * @param callback - Callback invoked after each element is highlighted.
 * @public
 * @unofficial
 */
export declare function highlightAllUnder(container: ParentNode, async?: boolean, callback?: HighlightCallback): void;
