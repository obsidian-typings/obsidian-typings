import type { EditorRangeEx } from './EditorRangeEx.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface EnclosingTag {
    /** @todo Documentation incomplete. */
    close: EditorRangeEx;

    /** @todo Documentation incomplete. */
    open: EditorRangeEx;
}
