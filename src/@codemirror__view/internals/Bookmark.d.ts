import type { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/** @public @unofficial */
export interface Bookmark {
    assoc: number;
    cm: CodeMirrorEditor;
    id: number;
    offset: number;

    clear(): void;
    find(): EditorPosition | null;
    update(changeDesc: ChangeDesc): void;
}
