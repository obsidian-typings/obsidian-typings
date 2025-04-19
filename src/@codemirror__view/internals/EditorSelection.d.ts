import type { EditorPosition } from 'obsidian';

/** @public @unofficial */
export interface EditorSelection {
    anchor: EditorPosition;
    head: EditorPosition;
}
