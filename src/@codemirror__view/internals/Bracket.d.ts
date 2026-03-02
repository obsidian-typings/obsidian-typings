import type { EditorPosition } from 'obsidian';

/**
 * Represents a bracket character found at a specific position in the editor.
 * @public
 * @unofficial
 */
export interface Bracket {
    /** The bracket character. */
    ch: string;

    /** Position of the bracket in the document. */
    pos: EditorPosition;
}
