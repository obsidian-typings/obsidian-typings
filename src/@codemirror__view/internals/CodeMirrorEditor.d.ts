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

/** @public @unofficial */
export interface CodeMirrorEditor {
    $lineHandleChanges: LineHandleChange[] | undefined;

    addOverlay(options: AddOverlayOptions): SearchQuery | undefined;
    blur(): void;
    charCoords(pos: EditorPosition, mode: 'local' | 'page' | 'window' | 'div'): Coords;
    clipPos(pos: EditorPosition): EditorPosition;
    coordsChar(coords: Coords, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;
    defaultTextHeight(): number;
    destroy(): void;
    execCommand(command: string): void;
    findMatchingBracket(pos: EditorPosition): MatchingBracket;
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
    getMode(): CodeMirrorEditorMode;
    getOption(option: string): unknown;
    getRange(from: EditorPosition, to: EditorPosition): string;
    getScrollInfo(): ScrollInfo;
    getSearchCursor(query: RegExp, pos: EditorPosition): CodeMirrorEditorSearchCursor;
    getSelection(): string;
    getSelections(): string[];
    getTokenTypeAt(pos: EditorPosition): string;
    getValue(): string;
    getWrapperElement(): HTMLElement;
    hardWrap(options: HardWrapOptions): void;
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
    onChange(lineHandleChange: LineHandleChange): void;
    onSelectionChange(): void;
    openDialog(
        template: string,
        keyValidator: (keyValue: string) => boolean,
        options?: Partial<OpenDialogOptions>
    ): void;
    openNotification(message: string, options?: OpenNotificationOptions): () => void;
    operation<T>(fn: () => T): T;
    overWriteSelection(text: string): void;
    posFromIndex(index: number): EditorPosition;
    refresh(): void;
    releaseLineHandles(): void;
    removeOverlay(overlay?: SearchQuery): void;
    replaceRange(text: string, from: EditorPosition, to?: EditorPosition): void;
    replaceSelection(text: string): void;
    replaceSelections(texts: string[]): void;
    scanForBracket(from: EditorPosition, direction: number, style?: string): Bracket | null;
    scrollInfo(): ScrollInfo;
    scrollIntoView(pos?: EditorPosition, margin?: number): void;
    scrollTo(x?: number, y?: number): void;
    setBookmark(pos: EditorPosition, options?: SetBookmarkOptions): Bookmark;
    setCursor(line: number, ch: number): void;
    setOption(option: string, value: unknown): void;
    setSelection(anchor: EditorPosition, head: EditorPosition, options?: SetSelectionOptions): void;
    setSelections(selections: EditorSelection[], primaryIndex?: number): void;
    setSize(width: number, height: number): void;
    setValue(content: string): void;
    signal(event: string, ...args: unknown[]): void;
    somethingSelected(): boolean;
    toggleOverwrite(overwrite: boolean): void;
    virtualSelectionMode(): boolean;
}
