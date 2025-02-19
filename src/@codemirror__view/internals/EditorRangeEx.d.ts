import type { EditorPosition } from 'obsidian';

/** @public */
export interface EditorRangeEx {
    from: EditorPosition | null;
    to: EditorPosition | null;
}
