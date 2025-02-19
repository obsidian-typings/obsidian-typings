import type { EditorPosition } from 'obsidian';

/** @public */
export interface ClickableToken {
    end: EditorPosition;
    start: EditorPosition;
    text: string;
    type: string;
}
