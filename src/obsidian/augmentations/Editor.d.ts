import type { EditorView } from '@codemirror/view';
import type { Coords } from '../../@codemirror__view/internals/Coords.d.ts';
import type { ClickableToken } from '../internals/ClickableToken.d.ts';
import type { CoordsLeftTop } from '../internals/CoordsLeftTop.d.ts';
import type { Fold } from '../internals/Fold.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { SearchCursor } from '../internals/SearchCursor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A common interface that bridges the gap between CodeMirror 5 and CodeMirror 6.
     */
    interface Editor {
        /**
         * CodeMirror editor instance.
         *
         * @unofficial
         */
        cm: EditorView;

        /**
         * HTML instance the CM editor is attached to.
         *
         * @unofficial
         */
        containerEl: HTMLElement;

        /**
         * Linked Editor manager instance.
         *
         * @unofficial
         */
        editorComponent: undefined | MarkdownScrollableEditView;

        /**
         * Currently active CM instance.
         *
         * @remark Can be null when Editor is not instantiated.
         * @unofficial
         */
        get activeCM(): EditorView | null;

        /**
         * Whether the editor is embedded in a table cell.
         * @unofficial
         */
        get inTableCell(): boolean;

        /**
         * Make ranges of text highlighted within the editor given specified class (style).
         *
         * @unofficial
         */
        addHighlights(
            ranges: EditorRange[],
            style: 'is-flashing' | 'obsidian-search-match-highlight',
            remove_previous: boolean,
            range?: EditorSelection
        ): void;

        /**
         * Clean-up function executed after indenting lists.
         *
         * @unofficial
         */
        afterIndent(): void;

        /**
         * Blur the editor.
         *
         * @example
         * ```ts
         * editor.blur();
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link blur} instead.
         * @since 0.11.11
         */
        blur__?(): void;

        /**
         * Convert editor position to screen position.
         *
         * @param pos Editor position.
         * @param relative_to_editor Relative to the editor or the application window.
         * @unofficial
         */
        coordsAtPos(pos: EditorPosition, relative_to_editor: boolean): Coords;

        /**
         * Execute a command.
         *
         * @param command - The command to execute.
         * @example
         * ```ts
         * editor.exec('goUp');
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link exec} instead.
         * @since 0.12.2
         */
        exec__(command: EditorCommandName): void;

        /**
         * Expand text.
         *
         * @unofficial
         */
        expandText(): void;

        /**
         * Focus the editor.
         *
         * @example
         * ```ts
         * editor.focus();
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link focus} instead.
         * @since 0.11.11
         */
        focus__?(): void;

        /**
         * Unfolds all folded lines one level up.
         *
         * @remark If level 1 and 2 headings are folded, level 2 headings will be unfolded.
         * @unofficial
         */
        foldLess(): void;

        /**
         * Folds all the blocks that are of the lowest unfolded level.
         *
         * @remark If there is a document with level 1 and 2 headings, level 2 headings will be folded.
         * @unofficial
         */
        foldMore(): void;

        /**
         * Get all ranges that can be folded away in the editor.
         *
         * @unofficial
         */
        getAllFoldableLines(): Fold[];

        /**
         * Get a clickable link - if it exists - at specified position.
         *
         * @unofficial
         */
        getClickableTokenAt(pos: EditorPosition): ClickableToken | null;

        /**
         * Get the cursor position.
         *
         * @param string - The type of cursor to get.
         * @returns The cursor position.
         * @example
         * ```ts
         * console.log(editor.getCursor('from'));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getCursor} instead.
         * @since 0.11.11
         */
        getCursor__(string?: 'from' | 'to' | 'head' | 'anchor'): EditorPosition;

        /**
         * Get the editor instance.
         *
         * @returns The editor instance.
         * @official
         * @since 0.11.11
         */
        getDoc(): this;

        /**
         * Get all blocks that were folded by their starting character position.
         *
         * @unofficial
         */
        getFoldOffsets(): Set<number>;

        /**
         * Get the text at line index (0-based).
         *
         * @param line - The line index.
         * @returns The text at the line.
         * @example
         * ```ts
         * console.log(editor.getLine(42));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getLine} instead.
         * @since 0.11.11
         */
        getLine__(line: number): string;

        /**
         * Get the range between two positions.
         *
         * @param from - The start position.
         * @param to - The end position.
         * @returns The range between the two positions.
         * @example
         * ```ts
         * console.log(editor.getRange(from, to));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getRange} instead.
         * @since 0.11.11
         */
        getRange__(from: EditorPosition, to: EditorPosition): string;

        /**
         * Get the scroll info (horizontal and vertical scroll positions).
         *
         * @returns The scroll info.
         * @official
         * @since 0.11.11
         */
        getScrollInfo__?(): CoordsLeftTop;

        /**
         * Get the selection.
         *
         * @returns The selection.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getSelection} instead.
         * @since 0.11.11
         */
        getSelection__?(): string;

        /**
         * Get the content of the editor.
         *
         * @returns The content of the editor.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getValue} instead.
         * @since 0.11.11
         */
        getValue__?(): string;

        /**
         * Check if the editor is focused.
         *
         * @returns Whether the editor is focused.
         * @official
         * @since 0.11.11
         */
        hasFocus__?(): boolean;

        /**
         * Checks whether the editor has a highlight of specified class.
         *
         * @remark If no style is specified, checks whether the editor has unknown highlights.
         * @unofficial
         */
        hasHighlight(style?: string): boolean;

        /**
         * Indents a list by one level.
         *
         * @unofficial
         */
        indentList(): void;

        /**
         * Wraps current line around specified characters.
         *
         * @remark Was added in a recent Obsidian update (1.4.0 update cycle).
         * @unofficial
         */
        insertBlock(start: string, end: string): void;

        /**
         * Insert a template callout at the current cursor position.
         *
         * @unofficial
         */
        insertCallout(): void;

        /**
         * Insert a template code block at the current cursor position.
         *
         * @unofficial
         */
        insertCodeblock(): void;

        /**
         * Insert a markdown link at the current cursor position.
         *
         * @unofficial
         */
        insertLink(): void;

        /**
         * Insert a mathjax equation block at the current cursor position.
         *
         * @unofficial
         */
        insertMathJax(): void;

        /**
         * Insert specified text at the current cursor position.
         *
         * @param text - The text to insert.
         * @remark Might be broken, inserts at the end of the document.
         * @unofficial
         */
        insertText(text: string): void;

        /**
         * Get the index of the last line (0-indexed).
         *
         * @returns The index of the last line.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link lastLine} instead.
         * @since 0.11.11
         */
        lastLine__?(): number;

        /**
         * Gets the amount of lines in the document.
         *
         * @returns The amount of lines in the document.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link lineCount} instead.
         * @since 0.11.11
         */
        lineCount__?(): number;

        /**
         * Get the list of selections if multiple cursors are active.
         *
         * @returns The list of selections.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link listSelections} instead.
         * @since 0.11.11
         */
        listSelections__?(): EditorSelection[];

        /**
         * Inserts a new line and continues a markdown bullet point list at the same level.
         *
         * @unofficial
         */
        newlineAndIndentContinueMarkdownList(): void;

        /**
         * Inserts a new line at the same indent level.
         *
         * @unofficial
         */
        newlineAndIndentOnly(): void;

        /**
         * Convert an offset to a position.
         *
         * @param offset - The offset to convert.
         * @returns The position.
         * @example
         * ```ts
         * console.log(editor.offsetToPos(123));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link offsetToPos} instead.
         * @since 0.11.11
         */
        offsetToPos__(offset: number): EditorPosition;

        /**
         * Get the closest character position to the specified coordinates.
         *
         * @param x - The `x` coordinate.
         * @param y - The `y` coordinate.
         * @returns The closest character position to the specified coordinates.
         * @unofficial
         */
        posAtCoords(x: number, y: number): EditorPosition;

        /**
         * Get the character position at a mouse event.
         *
         * @param evt - The mouse event.
         * @returns The character position at the mouse event.
         * @unofficial
         */
        posAtMouse(evt: MouseEvent): EditorPosition;

        /**
         * Convert a position to an offset.
         *
         * @param pos - The position to convert.
         * @returns The offset.
         * @example
         * ```ts
         * console.log(editor.posToOffset({ line: 12, ch: 3 }));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link posToOffset} instead.
         * @since 0.11.11
         */
        posToOffset__(pos: EditorPosition): number;

        /**
         * Process lines.
         *
         * @typeParam T - The type of the value to process.
         * @param read - The function to convert the line to a value.
         * @param write - The function to convert the line with a value to the editor change.
         * @param ignoreEmpty - Whether to ignore empty lines.
         * @example
         * ```ts
         * editor.processLines((line, lineText) => {
         *     return lineText.length;
         * }, (line, lineText, value) => {
         *     return { text: line + value, from: { line, ch: 0 }, to: { line, ch: lineText.length } };
         * }, true);
         * ```
         * @official
         * @since 0.13.26
         */
        processLines<T>(
            read: (line: number, lineText: string) => T | null,
            write: (line: number, lineText: string, value: T | null) => EditorChange | void,
            ignoreEmpty?: boolean
        ): void;

        /**
         * Redo the last action.
         *
         * @example
         * ```ts
         * editor.redo();
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link redo} instead.
         * @since 0.11.11
         */
        redo__?(): void;

        /**
         * Refresh the editor.
         *
         * @example
         * ```ts
         * editor.refresh();
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link refresh} instead.
         * @since 0.11.11
         */
        refresh__?(): void;

        /**
         * Removes all highlights of specified class.
         *
         * @unofficial
         */
        removeHighlights(style: string): void;

        /**
         * Replace the range between two positions.
         *
         * @param replacement - The replacement text.
         * @param from - The start position.
         * @param to - The end position.
         * @param origin - The user event that triggered the replacement.
         * @example
         * ```ts
         * editor.replaceRange('foo', from, to);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link replaceRange} instead.
         * @since 0.11.11
         */
        replaceRange__(replacement: string, from: EditorPosition, to?: EditorPosition, origin?: string): void;

        /**
         * @official
         * @since 0.11.11
         * @deprecated - Added only for typing purposes. Use {@link replaceSelection} instead.
         */
        replaceSelection__(replacement: string, origin?: string): void;

        /**
         * Scroll into view.
         *
         * @param range - The range to scroll into view.
         * @param center - Whether to center the range.
         * @example
         * ```ts
         * editor.scrollIntoView({ from: { line: 12, ch: 3 }, to: { line: 23, ch: 4 } }, true);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link scrollIntoView} instead.
         * @since 0.13.0
         */
        scrollIntoView__(range: EditorRange, center?: boolean): void;

        /**
         * Scroll to a specific position.
         *
         * @param x - The horizontal scroll position.
         * @param y - The vertical scroll position.
         * @example
         * ```ts
         * editor.scrollTo(12, 34);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link scrollTo} instead.
         * @since 0.11.11
         */
        scrollTo__(x?: number | null, y?: number | null): void;

        /**
         * Adds a search cursor to the editor.
         *
         * @unofficial
         */
        searchCursor(searchString: string): SearchCursor;

        /**
         * Set the cursor position.
         *
         * @param pos - The position to set the cursor to.
         * @param ch - The character index to set the cursor to (0-based).
         * @example
         * ```ts
         * editor.setCursor({ line: 12, ch: 3 });
         * editor.setCursor(12, 3);
         * ```
         * @official
         * @since 0.11.11
         */
        setCursor(pos: EditorPosition | number, ch?: number): void;

        /**
         * Set the text at line index (0-based).
         *
         * @param n - The line index.
         * @param text - The text to set.
         * @example
         * ```ts
         * editor.setLine(42, 'foo');
         * ```
         * @official
         * @since 0.11.11
         */
        setLine(n: number, text: string): void;

        /**
         * Set the selection.
         *
         * @param anchor - The start selection position.
         * @param head - The end selection position.
         * @example
         * ```ts
         * editor.setSelection({ line: 12, ch: 3 }, { line: 23, ch: 4 });
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link setSelection} instead.
         * @since 0.11.11
         */
        setSelection__(anchor: EditorPosition, head?: EditorPosition): void;

        /**
         * Set the selections.
         *
         * @param ranges - The ranges to set the selections to.
         * @param main - The main selection index.
         * @example
         * ```ts
         * editor.setSelections([
         *     { anchor: { line: 12, ch: 3 }, head: { line: 23, ch: 4 } },
         *     { anchor: { line: 34, ch: 5 }, head: { line: 45, ch: 6 } }
         * ], 1);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link setSelections} instead.
         * @since 0.12.11
         */
        setSelections__(ranges: EditorSelectionOrCaret[], main?: number): void;

        /**
         * Set the content of the editor.
         *
         * @param content - The content to set.
         * @example
         * ```ts
         * editor.setValue('foo');
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link setValue} instead.
         * @since 0.11.11
         */
        setValue__(content: string): void;

        /**
         * Check if there is a selection.
         *
         * @returns Whether there is a selection.
         * @official
         * @since 0.11.11
         */
        somethingSelected(): boolean;

        /**
         * Toggles blockquote syntax on paragraph under cursor.
         *
         * @unofficial
         */
        toggleBlockquote(): void;

        /**
         * Toggle bullet point list syntax on paragraph under cursor.
         *
         * @unofficial
         */
        toggleBulletList(): void;

        /**
         * Toggle checkbox syntax on paragraph under cursor.
         *
         * @unofficial
         */
        toggleCheckList(): void;

        /**
         * Applies specified markdown syntax to selected text or word under cursor.
         *
         * @unofficial
         */
        toggleMarkdownFormatting(
            syntax: 'bold' | 'italic' | 'strikethrough' | 'highlight' | 'code' | 'math' | 'comment'
        ): void;

        /**
         * Toggle numbered list syntax on paragraph under cursor.
         *
         * @unofficial
         */
        toggleNumberList(): void;

        /**
         * @official
         * @since 0.13.0
         * @deprecated - Added only for typing purposes. Use {@link transaction} instead.
         */
        transaction__(tx: EditorTransaction, origin?: string): void;

        /**
         * Convert word under cursor into a wikilink.
         *
         * @param embed - Whether to embed the link or not.
         * @unofficial
         */
        triggerWikiLink(embed: boolean): void;

        /**
         * Undo the last action.
         *
         * @example
         * ```ts
         * editor.undo();
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link undo} instead.
         * @since 0.11.11
         */
        undo__?(): void;

        /**
         * Unindents a list by one level.
         *
         * @unofficial
         */
        unindentList(): void;

        /**
         * Get the word at a specific position.
         *
         * @param pos - The position to get the word at.
         * @returns A range object containing the word or `null` if there is no word at the position.
         * @example
         * ```ts
         * console.log(editor.wordAt({ line: 12, ch: 3 }));
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link wordAt} instead.
         * @since 0.11.11
         */
        wordAt__(pos: EditorPosition): EditorRange | null;
    }
}
