import type { EditorPosition } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface Bracket {
    ch: string;
    pos: EditorPosition;
}
