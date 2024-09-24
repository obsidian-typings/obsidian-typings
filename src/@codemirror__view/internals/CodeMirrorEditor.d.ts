import type { SearchQuery } from '@codemirror/search';
import type { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { Bookmark } from './Bookmark.js';
import type { EditorSelection } from './EditorSelection.js';
import type { LineHandle } from './LineHandle.js';
import type { OpenDialogOptions } from './OpenDialogOptions.js';

/** @public */
interface CodeMirrorEditor {
    $lineHandleChanges: { changes: ChangeDesc }[] | undefined;

    addOverlay(options: { query: RegExp }): SearchQuery | undefined;
    blur(): void;
    charCoords(
        pos: EditorPosition,
        mode: 'local' | 'page' | 'window' | 'div'
    ): { left: number; top: number; bottom: number };
    clipPos(pos: EditorPosition): EditorPosition;
    coordsChar(coords: { left: number; top: number }, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;
    defaultTextHeight(): number;
    destroy(): void;
    execCommand(command: string): void;
    findMatchingBracket(pos: EditorPosition): { to?: EditorPosition };
    findPosV(start: EditorPosition, amount: number, unit: 'line' | 'page', goalColumn: number): EditorPosition;
    firstLine(): number;
    focus(): void;
    foldCode(line: number): void;
    forEachSelection(fn: () => void): void;
    getCursor(type?: 'head' | 'anchor' | 'start' | 'end'): EditorPosition;
    getInputField(): HTMLElement;
    getLastEditEnd(): EditorPosition;
    getLine(line: number): string;
    getLineHandle(line: number): LineHandle;
    getLineNumber(handle: LineHandle): number | null;
    getMainSelection(): EditorSelection;
    getMode(): { name: string };
    getOption(option: string): unknown;
    getRange(from: EditorPosition, to: EditorPosition): string;
    getScrollInfo(): {
        left: number;
        top: number;
        height: number;
        width: number;
        clientHeight: number;
        clientWidth: number;
    };
    getSearchCursor(query: RegExp, pos: EditorPosition): {
        findNext(): boolean;
        findPrevious(): boolean;
        find(reverse?: boolean): boolean;
        from(): EditorPosition | void;
        to(): EditorPosition | void;
        replace(text: string): void;
    };
    getSelection(): string;
    getSelections(): string[];
    getTokenTypeAt(pos: EditorPosition): string;
    getValue(): string;
    getWrapperElement(): HTMLElement;
    hardWrap(options: { column?: number; from?: number; to?: number; allowMerge?: boolean }): void;
    indentLess(): void;
    indentLine(line: number, more?: boolean): void;
    indentMore(): void;
    indexFromPos(pos: EditorPosition): number;
    isInMultiSelectMode(): boolean;
    lastLine(): number;
    lineCount(): number;
    listSelections(): Array<{
        anchor: EditorPosition;
        head: EditorPosition;
    }>;
    moveByChar(pos: EditorPosition, dir: 'left' | 'right', unit: number): EditorPosition;
    moveH(dir: number, unit: string): void;
    off(event: string, listener: EventListenerOrEventListenerObject): void;
    on(event: string, listener: EventListenerOrEventListenerObject): void;
    onBeforeEndOperation(): void;
    onChange(lineHandleChange: { changes: ChangeDesc }): void;
    onSelectionChange(): void;
    openDialog(
        template: string,
        keyValidator: (keyValue: string) => boolean,
        options?: Partial<OpenDialogOptions>
    ): void;
    openNotification(message: string, options?: { duration?: number; bottom?: boolean }): () => void;
    operation<T>(fn: () => T): T;
    overWriteSelection(text: string): void;
    posFromIndex(index: number): EditorPosition;
    refresh(): void;
    releaseLineHandles(): void;
    removeOverlay(overlay?: SearchQuery): void;
    replaceRange(text: string, from: EditorPosition, to?: EditorPosition): void;
    replaceSelection(text: string): void;
    replaceSelections(texts: string[]): void;
    scanForBracket(from: EditorPosition, direction: number, style?: string): { pos: EditorPosition; ch: string } | null;
    scrollInfo(): {
        left: number;
        top: number;
        height: number;
        width: number;
        clientHeight: number;
        clientWidth: number;
    };
    scrollIntoView(pos?: EditorPosition, margin?: number): void;
    scrollTo(x?: number, y?: number): void;
    setBookmark(pos: EditorPosition, options?: { insertLeft?: boolean }): Bookmark;
    setCursor(line: number, ch: number): void;
    setOption(option: string, value: unknown): void;
    setSelection(anchor: EditorPosition, head: EditorPosition, options?: { origin?: string }): void;
    setSelections(selections: EditorSelection[], primaryIndex?: number): void;
    setSize(width: number, height: number): void;
    setValue(content: string): void;
    signal(event: string, ...args: unknown[]): void;
    somethingSelected(): boolean;
    toggleOverwrite(overwrite: boolean): void;
    virtualSelectionMode(): boolean;
}
