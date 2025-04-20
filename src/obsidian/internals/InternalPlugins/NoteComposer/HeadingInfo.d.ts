import type { EditorPosition } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface HeadingInfo {
    end: EditorPosition;
    heading: string;
    start: EditorPosition;
}
