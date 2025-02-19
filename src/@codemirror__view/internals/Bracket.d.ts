import type { EditorPosition } from 'obsidian';

/** @public */
export interface Bracket {
    pos: EditorPosition;
    ch: string;
}
