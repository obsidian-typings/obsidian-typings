import type { EditorPosition } from 'obsidian';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface EditorSelection {
    /** @todo Documentation incomplete. */
    anchor: EditorPosition;

    /** @todo Documentation incomplete. */
    head: EditorPosition;
}
