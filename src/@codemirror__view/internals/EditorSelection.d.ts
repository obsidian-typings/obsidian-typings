import type { EditorPosition } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface EditorSelection {
    /** @todo Documentation incomplete. */
    anchor: EditorPosition;

    /** @todo Documentation incomplete. */
    head: EditorPosition;
}
