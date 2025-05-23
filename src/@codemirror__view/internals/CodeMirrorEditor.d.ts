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
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CodeMirrorEditor {
    /** @todo Documentation incomplete. */
    $lineHandleChanges: LineHandleChange[] | undefined;

    /** @todo Documentation incomplete. */
    addOverlay(options: AddOverlayOptions): SearchQuery | undefined;

    /** @todo Documentation incomplete. */
    blur(): void;

    /** @todo Documentation incomplete. */
    charCoords(pos: EditorPosition, mode: 'local' | 'page' | 'window' | 'div'): Coords;

    /** @todo Documentation incomplete. */
    clipPos(pos: EditorPosition): EditorPosition;

    /** @todo Documentation incomplete. */
    coordsChar(coords: Coords, mode: 'local' | 'page' | 'window' | 'div'): EditorPosition;

    /** @todo Documentation incomplete. */
    defaultTextHeight(): number;

    /** @todo Documentation incomplete. */
    destroy(): void;

    /** @todo Documentation incomplete. */
    execCommand(command: string): void;

    /** @todo Documentation incomplete. */
    findMatchingBracket(pos: EditorPosition): MatchingBracket;

    /** @todo Documentation incomplete. */
    findPosV(start: EditorPosition, amount: number, unit: 'line' | 'page', goalColumn: number): EditorPosition;

    /** @todo Documentation incomplete. */
    firstLine(): number;

    /** @todo Documentation incomplete. */
    focus(): void;

    /** @todo Documentation incomplete. */
    foldCode(line: number): void;

    /** @todo Documentation incomplete. */
    forEachSelection(fn: () => void): void;

    /** @todo Documentation incomplete. */
    getCursor(type?: 'head' | 'anchor' | 'start' | 'end'): EditorPosition;

    /** @todo Documentation incomplete. */
    getInputField(): HTMLElement;

    /** @todo Documentation incomplete. */
    getLastEditEnd(): EditorPosition;

    /** @todo Documentation incomplete. */
    getLine(line: number): string;

    /** @todo Documentation incomplete. */
    getLineHandle(line: number): LineHandle;

    /** @todo Documentation incomplete. */
    getLineNumber(handle: LineHandle): number | null;

    /** @todo Documentation incomplete. */
    getMainSelection(): EditorSelection;

    /** @todo Documentation incomplete. */
    getMode(): CodeMirrorEditorMode;

    /** @todo Documentation incomplete. */
    getOption(option: string): unknown;

    /** @todo Documentation incomplete. */
    getRange(from: EditorPosition, to: EditorPosition): string;

    /** @todo Documentation incomplete. */
    getScrollInfo(): ScrollInfo;

    /** @todo Documentation incomplete. */
    getSearchCursor(query: RegExp, pos: EditorPosition): CodeMirrorEditorSearchCursor;

    /** @todo Documentation incomplete. */
    getSelection(): string;

    /** @todo Documentation incomplete. */
    getSelections(): string[];

    /** @todo Documentation incomplete. */
    getTokenTypeAt(pos: EditorPosition): string;

    /** @todo Documentation incomplete. */
    getValue(): string;

    /** @todo Documentation incomplete. */
    getWrapperElement(): HTMLElement;

    /** @todo Documentation incomplete. */
    hardWrap(options: HardWrapOptions): void;

    /** @todo Documentation incomplete. */
    indentLess(): void;

    /** @todo Documentation incomplete. */
    indentLine(line: number, more?: boolean): void;

    /** @todo Documentation incomplete. */
    indentMore(): void;

    /** @todo Documentation incomplete. */
    indexFromPos(pos: EditorPosition): number;

    /** @todo Documentation incomplete. */
    isInMultiSelectMode(): boolean;

    /** @todo Documentation incomplete. */
    lastLine(): number;

    /** @todo Documentation incomplete. */
    lineCount(): number;

    /** @todo Documentation incomplete. */
    listSelections(): Array<{
        anchor: EditorPosition;
        head: EditorPosition;
    }>;

    /** @todo Documentation incomplete. */
    moveByChar(pos: EditorPosition, dir: 'left' | 'right', unit: number): EditorPosition;

    /** @todo Documentation incomplete. */
    moveH(dir: number, unit: string): void;

    /** @todo Documentation incomplete. */
    off(event: string, listener: EventListenerOrEventListenerObject): void;

    /** @todo Documentation incomplete. */
    on(event: string, listener: EventListenerOrEventListenerObject): void;

    /** @todo Documentation incomplete. */
    onBeforeEndOperation(): void;

    /** @todo Documentation incomplete. */
    onChange(lineHandleChange: LineHandleChange): void;

    /** @todo Documentation incomplete. */
    onSelectionChange(): void;

    /** @todo Documentation incomplete. */
    openDialog(
        template: string,
        keyValidator: (keyValue: string) => boolean,
        options?: Partial<OpenDialogOptions>
    ): void;

    /** @todo Documentation incomplete. */
    openNotification(message: string, options?: OpenNotificationOptions): () => void;

    /** @todo Documentation incomplete. */
    operation<T>(fn: () => T): T;

    /** @todo Documentation incomplete. */
    overWriteSelection(text: string): void;

    /** @todo Documentation incomplete. */
    posFromIndex(index: number): EditorPosition;

    /** @todo Documentation incomplete. */
    refresh(): void;

    /** @todo Documentation incomplete. */
    releaseLineHandles(): void;

    /** @todo Documentation incomplete. */
    removeOverlay(overlay?: SearchQuery): void;

    /** @todo Documentation incomplete. */
    replaceRange(text: string, from: EditorPosition, to?: EditorPosition): void;

    /** @todo Documentation incomplete. */
    replaceSelection(text: string): void;

    /** @todo Documentation incomplete. */
    replaceSelections(texts: string[]): void;

    /** @todo Documentation incomplete. */
    scanForBracket(from: EditorPosition, direction: number, style?: string): Bracket | null;

    /** @todo Documentation incomplete. */
    scrollInfo(): ScrollInfo;

    /** @todo Documentation incomplete. */
    scrollIntoView(pos?: EditorPosition, margin?: number): void;

    /** @todo Documentation incomplete. */
    scrollTo(x?: number, y?: number): void;

    /** @todo Documentation incomplete. */
    setBookmark(pos: EditorPosition, options?: SetBookmarkOptions): Bookmark;

    /** @todo Documentation incomplete. */
    setCursor(line: number, ch: number): void;

    /** @todo Documentation incomplete. */
    setOption(option: string, value: unknown): void;

    /** @todo Documentation incomplete. */
    setSelection(anchor: EditorPosition, head: EditorPosition, options?: SetSelectionOptions): void;

    /** @todo Documentation incomplete. */
    setSelections(selections: EditorSelection[], primaryIndex?: number): void;

    /** @todo Documentation incomplete. */
    setSize(width: number, height: number): void;

    /** @todo Documentation incomplete. */
    setValue(content: string): void;

    /** @todo Documentation incomplete. */
    signal(event: string, ...args: unknown[]): void;

    /** @todo Documentation incomplete. */
    somethingSelected(): boolean;

    /** @todo Documentation incomplete. */
    toggleOverwrite(overwrite: boolean): void;

    /** @todo Documentation incomplete. */
    virtualSelectionMode(): boolean;
}
