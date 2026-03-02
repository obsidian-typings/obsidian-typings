import type { EditorRangeEx } from './EditorRangeEx.d.ts';

/**
 * Represents an enclosing HTML/XML tag pair with open and close ranges.
 * @public
 * @unofficial
 */
export interface EnclosingTag {
    /** Range of the closing tag. */
    close: EditorRangeEx;

    /** Range of the opening tag. */
    open: EditorRangeEx;
}
