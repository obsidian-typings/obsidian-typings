import type { EditorPosition } from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface EditorRangeEx {
    /** @todo Documentation incomplete. */
    from: EditorPosition | null;

    /** @todo Documentation incomplete. */
    to: EditorPosition | null;
}
