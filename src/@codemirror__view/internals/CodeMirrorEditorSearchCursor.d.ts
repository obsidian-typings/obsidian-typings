import type { EditorPosition } from 'obsidian';

/** @public @unofficial */
export interface CodeMirrorEditorSearchCursor {
    find(reverse?: boolean): boolean;
    findNext(): boolean;
    findPrevious(): boolean;
    from(): EditorPosition | void;
    replace(text: string): void;
    to(): EditorPosition | void;
}
