import type { EditorPosition } from 'obsidian';

/** @public @unofficial */
export interface ClickableToken {
    end: EditorPosition;
    start: EditorPosition;
    text: string;
    type: string;
}
