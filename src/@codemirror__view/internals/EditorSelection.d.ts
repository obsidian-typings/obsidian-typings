import type { EditorPosition } from 'obsidian';

/** @public */
export interface EditorSelection {
    anchor: EditorPosition;
    head: EditorPosition;
}
