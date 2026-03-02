import type { SearchQuery } from '@codemirror/search';
import type { EditorPosition } from 'obsidian';
import type { AddOverlayOptions } from './AddOverlayOptions.d.ts';
import type { Bookmark } from './Bookmark.d.ts';
import type { Bracket } from './Bracket.d.ts';
import type { CodeMirrorEditorMode } from './CodeMirrorEditorMode.d.ts';
import type { CodeMirrorEditorSearchCursor } from './CodeMirrorEditorSearchCursor.d.ts';
import type { Coords } from './Coords.d.ts';
import type { EditorSelection } from './EditorSelection.d.ts';
import type { HardWrapOptions } from './HardWrapOptions.d.ts';
import type { LineHandle } from './LineHandle.d.ts';
import type { LineHandleChange } from './LineHandleChange.d.ts';
import type { MatchingBracket } from './MatchingBracket.d.ts';
import type { OpenDialogOptions } from './OpenDialogOptions.d.ts';
import type { OpenNotificationOptions } from './OpenNotificationOptions.d.ts';
import type { ScrollInfo } from './ScrollInfo.d.ts';
import type { SetBookmarkOptions } from './SetBookmarkOptions.d.ts';
import type { SetSelectionOptions } from './SetSelectionOptions.d.ts';

/**
 * CM5-compatible editor interface wrapping a CodeMirror 6 editor view.
 * @public
 * @unofficial
 */
export interface CodeMirrorEditor {
    /** Pending line handle changes to be processed. */
    $lineHandleChanges: LineHandleChange[] | undefined;

    /** Add a search overlay to highlight matches in the editor. */
    addOverlay(options: AddOverlayOptions): SearchQuery | undefined;

    /** Remove focus from the editor. */
    blur(): void;

    /** Get the pixel coordinates of a character position. */
    charCoords(pos: EditorPosition, mode: 'local' | 'page' | 'window' | 'div'): Coords;

    /** Clip a position to be within the document bounds. */
    clipPos(pos: EditorPosition): EditorPosition;

    /** Get the editor position corresponding to pixel coordinates. */
    coordsChar(coords: Coords, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;

    /** Get the default height of a line of text in pixels. */
    defaultTextHeight(): number;

    /** Destroy and clean up resources. */
    destroy(): void;

    /** Execute a named editor command. */
    execCommand(command: string): void;

    /** Find the matching bracket for the bracket at the given position. */
    findMatchingBracket(pos: EditorPosition): MatchingBracket;

    /** Find a position vertically relative to the given start position. */
    findPosV(start: EditorPosition, amount: number, unit: 'line' | 'page', goalColumn: number): EditorPosition;

    /** Get the line number of the first line in the document. */
    firstLine(): number;

    /** Focus the editor. */
    focus(): void;

    /** Fold the code block at the given line. */
    foldCode(line: number): void;

    /** Execute a function for each selection in a multi-selection. */
    forEachSelection(fn: () => void): void;

    /** Get the cursor position, optionally specifying which end of the selection. */
    getCursor(type?: 'head' | 'anchor' | 'start' | 'end'): EditorPosition;

    /** Get the editor's input field element. */
    getInputField(): HTMLElement;

    /** Get the position of the last edit. */
    getLastEditEnd(): EditorPosition;

    /** Get the text content of the given line number. */
    getLine(line: number): string;

    /** Get a handle for the given line number. */
    getLineHandle(line: number): LineHandle;

    /** Get the line number from a line handle, or null if the handle is invalid. */
    getLineNumber(handle: LineHandle): number | null;

    /** Get the primary selection as anchor and head positions. */
    getMainSelection(): EditorSelection;

    /** Get the current editor language mode. */
    getMode(): CodeMirrorEditorMode;

    /** Get the value of an editor option. */
    getOption(option: string): unknown;

    /** Get the text between two positions. */
    getRange(from: EditorPosition, to: EditorPosition): string;

    /** Get information about the editor's scroll position and dimensions. */
    getScrollInfo(): ScrollInfo;

    /** Get a search cursor for the given regular expression starting at the given position. */
    getSearchCursor(query: RegExp, pos: EditorPosition): CodeMirrorEditorSearchCursor;

    /** Get the currently selected text. */
    getSelection(): string;

    /** Get all selections as an array of strings. */
    getSelections(): string[];

    /** Get the token type at the given position. */
    getTokenTypeAt(pos: EditorPosition): string;

    /** Get the full text content of the document. */
    getValue(): string;

    /** Get the outermost wrapper element of the editor. */
    getWrapperElement(): HTMLElement;

    /** Hard-wrap text according to the given options. */
    hardWrap(options: HardWrapOptions): void;

    /** Decrease the indentation of the selection. */
    indentLess(): void;

    /** Indent the given line, optionally adding more indentation. */
    indentLine(line: number, more?: boolean): void;

    /** Increase the indentation of the selection. */
    indentMore(): void;

    /** Convert an editor position to a character index within the document. */
    indexFromPos(pos: EditorPosition): number;

    /** Check whether the editor is in multi-selection mode. */
    isInMultiSelectMode(): boolean;

    /** Get the line number of the last line in the document. */
    lastLine(): number;

    /** Get the total number of lines in the document. */
    lineCount(): number;

    /** Get all current selections as an array of anchor/head pairs. */
    listSelections(): Array<{
        anchor: EditorPosition;
        head: EditorPosition;
    }>;

    /** Move a position by character in the given direction. */
    moveByChar(pos: EditorPosition, dir: 'left' | 'right', unit: number): EditorPosition;

    /** Move the cursor horizontally by the given number of units. */
    moveH(dir: number, unit: string): void;

    /** Remove an event listener from the editor. */
    off(event: string, listener: EventListenerOrEventListenerObject): void;

    /** Add an event listener to the editor. */
    on(event: string, listener: EventListenerOrEventListenerObject): void;

    /** Handle pre-operation-end cleanup. */
    onBeforeEndOperation(): void;

    /** Handle a line handle change event. */
    onChange(lineHandleChange: LineHandleChange): void;

    /** Handle a selection change event. */
    onSelectionChange(): void;

    /** Open an interactive dialog in the editor. */
    openDialog(
        template: string,
        keyValidator: (keyValue: string) => boolean,
        options?: Partial<OpenDialogOptions>
    ): void;

    /** Open a notification message in the editor. Returns a function to dismiss it. */
    openNotification(message: string, options?: OpenNotificationOptions): () => void;

    /** Execute a function as a single operation, batching view updates. */
    operation<T>(fn: () => T): T;

    /** Overwrite the current selection with the given text. */
    overWriteSelection(text: string): void;

    /** Convert a character index to an editor position. */
    posFromIndex(index: number): EditorPosition;

    /** Refresh the editor display. */
    refresh(): void;

    /** Release all tracked line handles. */
    releaseLineHandles(): void;

    /** Remove a search overlay from the editor. */
    removeOverlay(overlay?: SearchQuery): void;

    /** Replace the text in the given range. */
    replaceRange(text: string, from: EditorPosition, to?: EditorPosition): void;

    /** Replace the current selection with the given text. */
    replaceSelection(text: string): void;

    /** Replace all selections with the corresponding texts. */
    replaceSelections(texts: string[]): void;

    /** Scan for a bracket from the given position in the specified direction. */
    scanForBracket(from: EditorPosition, direction: number, style?: string): Bracket | null;

    /** Get information about the editor's scroll position and dimensions. */
    scrollInfo(): ScrollInfo;

    /** Scroll the given position into view with an optional margin. */
    scrollIntoView(pos?: EditorPosition, margin?: number): void;

    /** Scroll the editor to the given coordinates. */
    scrollTo(x?: number, y?: number): void;

    /** Set a bookmark at the given position. */
    setBookmark(pos: EditorPosition, options?: SetBookmarkOptions): Bookmark;

    /** Set the cursor position to the given line and character. */
    setCursor(line: number, ch: number): void;

    /** Set the value of an editor option. */
    setOption(option: string, value: unknown): void;

    /** Set the selection to the given anchor and head positions. */
    setSelection(anchor: EditorPosition, head: EditorPosition, options?: SetSelectionOptions): void;

    /** Set multiple selections, optionally specifying the primary selection index. */
    setSelections(selections: EditorSelection[], primaryIndex?: number): void;

    /** Set the size of the editor in pixels. */
    setSize(width: number, height: number): void;

    /** Set the full text content of the document. */
    setValue(content: string): void;

    /** Emit a signal/event on the editor. */
    signal(event: string, ...args: unknown[]): void;

    /** Check whether there is an active selection. */
    somethingSelected(): boolean;

    /** Toggle overwrite mode on or off. */
    toggleOverwrite(overwrite: boolean): void;

    /** Check whether the editor is in virtual selection mode. */
    virtualSelectionMode(): boolean;
}
