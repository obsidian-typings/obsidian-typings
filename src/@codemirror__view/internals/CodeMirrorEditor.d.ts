import type { SearchQuery } from '@codemirror/search';
import type { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { Bookmark } from './Bookmark.js';
import type { EditorSelection } from './EditorSelection.js';
import type { LineHandle } from './LineHandle.js';
import type { OpenDialogOptions } from './OpenDialogOptions.js';

/**
 * @public
 */
interface CodeMirrorEditor {
    $lineHandleChanges: { changes: ChangeDesc }[] | undefined;

    openDialog(
        template: string,
        keyValidator: (keyValue: string) => boolean,
        options?: Partial<OpenDialogOptions>
    ): void;

    openNotification(
        message: string,
        options?: { duration?: number; bottom?: boolean }
    ): () => void;

    on(event: string, listener: EventListenerOrEventListenerObject): void;

    off(event: string, listener: EventListenerOrEventListenerObject): void;

    signal(event: string, ...args: unknown[]): void;

    indexFromPos(pos: EditorPosition): number;

    posFromIndex(index: number): EditorPosition;

    foldCode(line: number): void;

    firstLine(): number;

    lastLine(): number;

    lineCount(): number;

    setCursor(line: number, ch: number): void;

    getCursor(
        type?: 'head' | 'anchor' | 'start' | 'end'
    ): EditorPosition;

    listSelections(): Array<{
        anchor: EditorPosition;
        head: EditorPosition;
    }>;

    getMainSelection(): EditorSelection;

    setSelections(
        selections: EditorSelection[],
        primaryIndex?: number
    ): void;

    setSelection(
        anchor: EditorPosition,
        head: EditorPosition,
        options?: { origin?: string }
    ): void;

    getLine(line: number): string;

    getLineHandle(line: number): LineHandle;

    getLineNumber(handle: LineHandle): number | null;

    releaseLineHandles(): void;

    getRange(from: EditorPosition, to: EditorPosition): string;

    replaceRange(
        text: string,
        from: EditorPosition,
        to?: EditorPosition
    ): void;

    replaceSelection(text: string): void;

    replaceSelections(texts: string[]): void;

    getSelection(): string;

    getSelections(): string[];

    somethingSelected(): boolean;

    getInputField(): HTMLElement;

    clipPos(pos: EditorPosition): EditorPosition;

    getValue(): string;

    setValue(content: string): void;

    focus(): void;

    blur(): void;

    defaultTextHeight(): number;

    findMatchingBracket(pos: EditorPosition): { to?: EditorPosition };

    scanForBracket(
        from: EditorPosition,
        direction: number,
        style?: string
    ): { pos: EditorPosition; ch: string } | null;

    indentLine(line: number, more?: boolean): void;

    indentMore(): void;

    indentLess(): void;

    execCommand(command: string): void;

    setBookmark(pos: EditorPosition, options?: { insertLeft?: boolean }): Bookmark;

    addOverlay(options: { query: RegExp }): SearchQuery | undefined;

    removeOverlay(overlay?: SearchQuery): void;

    getSearchCursor(query: RegExp, pos: EditorPosition): {
        findNext(): boolean;
        findPrevious(): boolean;
        find(reverse?: boolean): boolean;
        from(): EditorPosition | void;
        to(): EditorPosition | void;
        replace(text: string): void;
    };

    moveByChar(pos: EditorPosition, dir: 'left' | 'right', unit: number): EditorPosition;

    findPosV(
        start: EditorPosition,
        amount: number,
        unit: 'line' | 'page',
        goalColumn: number
    ): EditorPosition;

    charCoords(
        pos: EditorPosition,
        mode: 'local' | 'page' | 'window' | 'div'
    ): { left: number; top: number; bottom: number };

    coordsChar(coords: { left: number; top: number }, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;

    getScrollInfo(): {
        left: number;
        top: number;
        height: number;
        width: number;
        clientHeight: number;
        clientWidth: number;
    };

    scrollTo(x?: number, y?: number): void;

    scrollInfo(): {
        left: number;
        top: number;
        height: number;
        width: number;
        clientHeight: number;
        clientWidth: number;
    };

    scrollIntoView(pos?: EditorPosition, margin?: number): void;

    getWrapperElement(): HTMLElement;

    getMode(): { name: string };

    setSize(width: number, height: number): void;

    refresh(): void;

    destroy(): void;

    getLastEditEnd(): EditorPosition;

    onChange(lineHandleChange: { changes: ChangeDesc }): void;

    onSelectionChange(): void;

    operation<T>(fn: () => T): T;

    onBeforeEndOperation(): void;

    moveH(dir: number, unit: string): void;

    setOption(option: string, value: unknown): void;

    getOption(option: string): unknown;

    toggleOverwrite(overwrite: boolean): void;

    getTokenTypeAt(pos: EditorPosition): string;

    overWriteSelection(text: string): void;

    isInMultiSelectMode(): boolean;

    virtualSelectionMode(): boolean;

    forEachSelection(fn: () => void): void;

    hardWrap(options: { column?: number; from?: number; to?: number; allowMerge?: boolean }): void;
}
