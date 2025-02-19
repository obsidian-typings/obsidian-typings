import type { EditorPosition } from 'obsidian';

/** @public */
export interface CodeMirrorEditorSearchCursor {
    findNext(): boolean;
    findPrevious(): boolean;
    find(reverse?: boolean): boolean;
    from(): EditorPosition | void;
    to(): EditorPosition | void;
    replace(text: string): void;
}
