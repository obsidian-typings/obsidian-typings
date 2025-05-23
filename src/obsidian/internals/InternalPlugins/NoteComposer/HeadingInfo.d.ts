import type { EditorPosition } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface HeadingInfo {
    /** @todo Documentation incomplete. */
    end: EditorPosition;

    /** @todo Documentation incomplete. */
    heading: string;

    /** @todo Documentation incomplete. */
    start: EditorPosition;
}
