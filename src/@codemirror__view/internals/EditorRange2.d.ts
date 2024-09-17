import type { EditorPosition } from 'obsidian';

/**
 * @public
 */
export interface EditorRange2 {
    from: EditorPosition | null;
    to: EditorPosition | null;
}
