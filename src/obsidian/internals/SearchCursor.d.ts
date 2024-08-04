import type { EditorPosition } from "obsidian";

export interface SearchCursor {
    /**
     * Current editor search position
     */
    current(): { from: EditorPosition; to: EditorPosition };
    /**
     * All search results
     */
    findAll(): { from: EditorPosition; to: EditorPosition }[];
    /**
     * Next editor search position
     */
    findNext(): { from: EditorPosition; to: EditorPosition };
    /**
     * Previous editor search position
     */
    findPrevious(): { from: EditorPosition; to: EditorPosition };
    /**
     * Replace current search result with specified text
     *
     * @remark origin is used by CodeMirror to determine which component was responsible for the change
     */
    replace(replacement: string, origin: string): void;
    /**
     * Replace all search results with specified text
     */
    replaceAll(replacement: string, origin: string): void;
}
