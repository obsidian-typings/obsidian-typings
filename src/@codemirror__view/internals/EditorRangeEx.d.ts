import type { EditorPosition } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface EditorRangeEx {
    from: EditorPosition | null;
    to: EditorPosition | null;
}
