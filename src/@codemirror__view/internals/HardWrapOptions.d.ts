/**
 * Options for hard-wrapping text in the editor.
 * @public
 * @unofficial
 */
export interface HardWrapOptions {
    /** Whether to allow merging short lines together. */
    allowMerge?: boolean;

    /** The column number at which to wrap lines. */
    column?: number;

    /** Starting line number to begin wrapping from. */
    from?: number;

    /** Ending line number to stop wrapping at. */
    to?: number;
}
