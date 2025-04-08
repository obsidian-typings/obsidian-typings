import type { EditorView } from '@codemirror/view';
import type { Coords } from '../../@codemirror__view/internals/Coords.d.ts';
import type { BaseEditor } from '../internals/BaseEditor.d.ts';
import type { ClickableToken } from '../internals/ClickableToken.d.ts';
import type { CoordsLeftTop } from '../internals/CoordsLeftTop.d.ts';
import type { Fold } from '../internals/Fold.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { SearchCursor } from '../internals/SearchCursor.d.ts';

export {};

declare module 'obsidian' {
    interface Editor extends BaseEditor {
        /**
         * Linked Editor manager instance
         */
        editorComponent: undefined | MarkdownScrollableEditView;
        /**
         * Currently active CM instance
         *
         * @remark Can be null when Editor is not instantiated
         */
        get activeCm(): EditorView | null;
        /**
         * Whether the editor is embedded in a table cell
         */
        get inTableCell(): boolean;

        /**
         * Make ranges of text highlighted within the editor given specified class (style)
         */
        addHighlights(
            ranges: EditorRange[],
            style: 'is-flashing' | 'obsidian-search-match-highlight',
            remove_previous: boolean,
            range?: EditorSelection
        ): void;
        /**
         * Convert editor position to screen position
         *
         * @param pos Editor position
         * @param relative_to_editor Relative to the editor or the application window
         */
        coordsAtPos(pos: EditorPosition, relative_to_editor: boolean): Coords;
        /**
         * Unfolds all folded lines one level up
         *
         * @remark If level 1 and 2 headings are folded, level 2 headings will be unfolded
         */
        foldLess(): void;
        /**
         * Folds all the blocks that are of the lowest unfolded level
         *
         * @remark If there is a document with level 1 and 2 headings, level 2 headings will be folded
         */
        foldMore(): void;
        /**
         * Get all ranges that can be folded away in the editor
         */
        getAllFoldableLines(): Fold[];
        /**
         * Get a clickable link - if it exists - at specified position
         */
        getClickableTokenAt(pos: EditorPosition): ClickableToken | null;
        /**
         * Get all blocks that were folded by their starting character position
         */
        getFoldOffsets(): Set<number>;
        /**
         * Checks whether the editor has a highlight of specified class
         *
         * @remark If no style is specified, checks whether the editor has unknown highlights
         */
        hasHighlight(style?: string): boolean;
        /**
         * Wraps current line around specified characters
         *
         * @remark Was added in a recent Obsidian update (1.4.0 update cycle)
         */
        insertBlock(start: string, end: string): void;
        /**
         * Get the closest character position to the specified coordinates.
         *
         * @param x - The `x` coordinate.
         * @param y - The `y` coordinate.
         * @returns The closest character position to the specified coordinates.
         */
        posAtCoords(x: number, y: number): EditorPosition;
        /**
         * Removes all highlights of specified class
         */
        removeHighlights(style: string): void;
        /**
         * Adds a search cursor to the editor
         */
        searchCursor(searchString: string): SearchCursor;
        /**
         * Applies specified markdown syntax to selected text or word under cursor
         */
        toggleMarkdownFormatting(
            syntax: 'bold' | 'italic' | 'strikethrough' | 'highlight' | 'code' | 'math' | 'comment'
        ): void;
    }
}
