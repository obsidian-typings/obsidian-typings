/**
 * Represents a captured text selection within a window.
 * @public
 * @unofficial
 */
export interface WindowSelection {
    /** Element that has focus within the selection. */
    focusEl: HTMLElement;

    /** The selected range. */
    range: Range;

    /** Window in which the selection exists. */
    win: Window;
}
