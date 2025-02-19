import type { EditorPosition } from 'obsidian';

/** @public */
export interface Bracket {
    ch: string;
    pos: EditorPosition;
}
