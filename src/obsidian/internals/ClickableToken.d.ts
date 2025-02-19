import type { EditorPosition } from 'obsidian';

/** @public */
export interface ClickableToken {
    start: EditorPosition;
    end: EditorPosition;
    text: string;
    type: string;
}
