import type { EditorPosition } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface ClickableToken {
    /**
     * @todo Documentation incomplete.
     */
    end: EditorPosition;

    /**
     * @todo Documentation incomplete.
     */
    start: EditorPosition;

    /**
     * @todo Documentation incomplete.
     */
    text: string;

    /**
     * @todo Documentation incomplete.
     */
    type: string;
}
