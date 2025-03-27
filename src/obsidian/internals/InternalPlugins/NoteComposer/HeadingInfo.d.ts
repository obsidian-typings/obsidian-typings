import type { EditorPosition } from 'obsidian';

/** @public */
export interface HeadingInfo {
    end: EditorPosition;
    heading: string;
    start: EditorPosition;
}
