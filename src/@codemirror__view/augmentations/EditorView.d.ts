import type {
  EditorState,
  Extension,
  Facet,
  Line,
  SelectionRange,
  StateEffect,
  StateEffectType,
  Transaction,
  TransactionSpec
} from '@codemirror/state';
import type {
  DecorationSet,
  Direction,
  DOMEventHandlers,
  Rect
} from '@codemirror/view';

import type { CodeMirrorEditor } from '../internals/CodeMirrorEditor.d.ts';
import type { EditorViewCoords } from '../internals/EditorViewCoords.d.ts';
import type { EditorViewDocumentPadding } from '../internals/EditorViewDocumentPadding.d.ts';
import type { EditorViewDomPosition } from '../internals/EditorViewDomPosition.d.ts';
import type { EditorViewRange } from '../internals/EditorViewRange.d.ts';
import type { EditorViewScrollHandlerOptions } from '../internals/EditorViewScrollHandlerOptions.d.ts';
import type { EditorViewScrollIntoViewOptions } from '../internals/EditorViewScrollIntoViewOptions.d.ts';
import type { EditorViewState } from '../internals/EditorViewState.d.ts';
import type { EditorViewThemeOptions } from '../internals/EditorViewThemeOptions.d.ts';
import type { EditorViewThemeSpec } from '../internals/EditorViewThemeSpec.d.ts';
import type { MeasureRequest } from '../internals/MeasureRequest.d.ts';

export {};

declare module '@codemirror/view' {
  interface EditorView {
    /**
     * The CodeMirror 5 compatible adapter wrapping this view, through which the Vim layer drives it.
     * Only present once Vim mode has been enabled.
     *
     * @unofficial
     */
    cm?: CodeMirrorEditor;

    /**
     * Indicates whether the user is currently composing text via IME, and at least one change
     * has been made in the current composition.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link composing} instead.
     */
    readonly composing__?: boolean;

    /**
     * Indicates whether the user is currently in composing state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link compositionStarted} instead.
     */
    readonly compositionStarted__?: boolean;

    /**
     * The editable DOM element holding the editor content.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link contentDOM} instead.
     */
    readonly contentDOM__?: HTMLElement;

    /**
     * The editor's total content height.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link contentHeight} instead.
     */
    readonly contentHeight__?: number;

    /**
     * The default width of a character in the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link defaultCharacterWidth} instead.
     */
    readonly defaultCharacterWidth__?: number;

    /**
     * The default height of a line in the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link defaultLineHeight} instead.
     */
    readonly defaultLineHeight__?: number;

    /**
     * Reports the padding above and below the document.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link documentPadding} instead.
     */
    readonly documentPadding__?: EditorViewDocumentPadding;

    /**
     * The top position of the document, in screen coordinates.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link documentTop} instead.
     */
    readonly documentTop__?: number;

    /**
     * The DOM element that wraps the entire editor view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link dom} instead.
     */
    readonly dom__?: HTMLElement;

    /**
     * Check whether the editor has focus.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link hasFocus} instead.
     */
    readonly hasFocus__?: boolean;

    /**
     * Returns `false` when the editor is entirely scrolled out of view or otherwise hidden.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link inView} instead.
     */
    readonly inView__?: boolean;

    /**
     * Whether this editor wraps lines.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link lineWrapping} instead.
     */
    readonly lineWrapping__?: boolean;

    /**
     * The document or shadow root that the view lives in.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link root} instead.
     */
    readonly root__?: DocumentOrShadowRoot;

    /**
     * If the editor is transformed with CSS, this provides the scale along the X axis.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scaleX} instead.
     */
    readonly scaleX__?: number;

    /**
     * Provide the CSS transformed scale along the Y axis.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scaleY} instead.
     */
    readonly scaleY__?: number;

    /**
     * The DOM element that can be styled to scroll.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scrollDOM} instead.
     */
    readonly scrollDOM__?: HTMLElement;

    /**
     * The current editor state.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link state} instead.
     */
    readonly state__?: EditorState;

    /**
     * The text direction of the editor's content element.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link textDirection} instead.
     */
    readonly textDirection__?: Direction;

    /**
     * Get the CSS classes for the currently active editor themes.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link themeClasses} instead.
     */
    readonly themeClasses__?: string;

    /**
     * To be able to display large documents without consuming too much memory or overloading
     * the browser, CodeMirror only draws the code that is visible (plus a margin around it)
     * to the DOM.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link viewport} instead.
     */
    readonly viewport__?: EditorViewRange;

    /**
     * Get the extent and vertical position of all line blocks in the viewport.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link viewportLineBlocks} instead.
     */
    readonly viewportLineBlocks__?: BlockInfo[];

    /**
     * Internal view state tracking properties like printing mode.
     *
     * @unofficial
     */
    viewState: EditorViewState;

    /**
     * The subset of the viewport that is actually drawn.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link visibleRanges} instead.
     */
    readonly visibleRanges__?: readonly EditorViewRange[];

    /**
     * Returns the bidirectional text structure of the given line.
     *
     * @param line - The line.
     * @returns The bidi spans.
     * @official
     */
    bidiSpans(line: Line): readonly BidiSpan[];

    /**
     * Get the screen coordinates at the given document position.
     *
     * @param pos - The document position.
     * @param side - Which side to get coordinates for.
     * @returns The rectangle or `null`.
     * @official
     */
    coordsAtPos(pos: number, side?: -1 | 1): null | Rect;

    /**
     * Return the rectangle around a given character.
     *
     * @param pos - The document position.
     * @returns The rectangle or `null`.
     * @official
     */
    coordsForChar(pos: number): null | Rect;

    /**
     * Clean up this editor view.
     *
     * @official
     */
    destroy(): void;

    /**
     * All regular editor state updates should go through this.
     *
     * @param tr - The transaction to dispatch.
     * @official
     */
    dispatch(tr: Transaction): void;

    /**
     * Dispatch an array of transactions.
     *
     * @param trs - The transactions to dispatch.
     * @official
     */
    dispatch(trs: readonly Transaction[]): void;

    /**
     * Dispatch one or more transaction specs.
     *
     * @param specs - The transaction specs.
     * @official
     */
    dispatch(...specs: TransactionSpec[]): void;

    /**
     * Find the DOM parent node and offset at the given document position.
     *
     * @param pos - The document position.
     * @returns The DOM node and offset.
     * @official
     */
    domAtPos(pos: number): EditorViewDomPosition;

    /**
     * Find the text line or block widget at the given vertical position.
     *
     * @param height - The height relative to document top.
     * @returns The block info.
     * @official
     */
    elementAtHeight(height: number): BlockInfo;

    /**
     * Put focus on the editor.
     *
     * @official
     */
    focus(): void;

    /**
     * Find the line block around the given document position.
     *
     * @param pos - The document position.
     * @returns The block info.
     * @official
     */
    lineBlockAt(pos: number): BlockInfo;

    /**
     * Find the line block at the given height.
     *
     * @param height - The height relative to document top.
     * @returns The block info.
     * @official
     */
    lineBlockAtHeight(height: number): BlockInfo;

    /**
     * Request a layout measurement pass on the editor.
     *
     * @unofficial
     */
    measure(): void;

    /**
     * Move a cursor position by grapheme cluster.
     *
     * @param start - The start selection range.
     * @param forward - Whether to move forward.
     * @param by - Optional grouping function.
     * @returns The new selection range.
     * @official
     */
    moveByChar(start: SelectionRange, forward: boolean, by?: (initial: string) => (next: string) => boolean): SelectionRange;

    /**
     * Move a cursor position across the next group of letters or non-letter non-whitespace
     * characters.
     *
     * @param start - The start selection range.
     * @param forward - Whether to move forward.
     * @returns The new selection range.
     * @official
     */
    moveByGroup(start: SelectionRange, forward: boolean): SelectionRange;

    /**
     * Move to the next line boundary in the given direction.
     *
     * @param start - The start selection range.
     * @param forward - Whether to move forward.
     * @param includeWrap - Whether to include wrap points.
     * @returns The new selection range.
     * @official
     */
    moveToLineBoundary(start: SelectionRange, forward: boolean, includeWrap?: boolean): SelectionRange;

    /**
     * Move a cursor position vertically.
     *
     * @param start - The start selection range.
     * @param forward - Whether to move forward.
     * @param distance - The distance in pixels.
     * @returns The new selection range.
     * @official
     */
    moveVertically(start: SelectionRange, forward: boolean, distance?: number): SelectionRange;

    /**
     * Get the value of a specific plugin, if present.
     *
     * @param plugin - The view plugin.
     * @returns The plugin value, or `null`.
     * @official
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    plugin<T extends PluginValue>(plugin: ViewPlugin<T, any>): null | T;

    /**
     * Get the document position at the given screen coordinates. Returns `null` if not found.
     *
     * @param coords - The screen coordinates.
     * @param coords.x - The x coordinate.
     * @param coords.y - The y coordinate.
     * @returns The document position or `null`.
     * @official
     */
    posAtCoords(coords: EditorViewCoords): null | number;

    /**
     * Get the document position at the given screen coordinates with imprecise mode.
     *
     * @param coords - The screen coordinates.
     * @param coords.x - The x coordinate.
     * @param coords.y - The y coordinate.
     * @param precise - Whether to require precise results.
     * @returns The document position.
     * @official
     */
    posAtCoords(coords: EditorViewCoords, precise: false): number;

    /**
     * Find the document position at the given DOM node.
     *
     * @param node - The DOM node.
     * @param offset - The offset within the node.
     * @returns The document position.
     * @official
     */
    posAtDOM(node: Node, offset?: number): number;

    /**
     * Schedule a layout measurement, optionally providing callbacks to do custom DOM measuring
     * followed by a DOM write phase.
     *
     * @param request - The measure request.
     * @official
     */
    requestMeasure<T>(request?: MeasureRequest<T>): void;

    /**
     * Return an effect that resets the editor to its current scroll position.
     *
     * @returns The scroll snapshot effect.
     * @official
     */
    scrollSnapshot(): StateEffect<unknown>;

    /**
     * Update the root in which the editor lives.
     *
     * @param root - The new root.
     * @official
     */
    setRoot(root: Document | ShadowRoot): void;

    /**
     * Reset the view to the given state.
     *
     * @param newState - The new state.
     * @official
     */
    setState(newState: EditorState): void;

    /**
     * Enable or disable tab-focus mode.
     *
     * @param to - The mode to set.
     * @official
     */
    setTabFocusMode(to?: boolean | number): void;

    /**
     * Find the text direction of the block at the given position.
     *
     * @param pos - The document position.
     * @returns The direction.
     * @official
     */
    textDirectionAt(pos: number): Direction;

    /**
     * Update the view for the given array of transactions.
     *
     * @param transactions - The transactions.
     * @official
     */
    update(transactions: readonly Transaction[]): void;

    /**
     * Get the cursor position visually at the start or end of a line.
     *
     * @param line - The line.
     * @param end - Whether to get the end position.
     * @returns The selection range.
     * @official
     */
    visualLineSide(line: Line, end: boolean): SelectionRange;
  }

  namespace EditorView {
    /**
     * Returns an effect that can be added to a transaction to cause it to scroll the given
     * position or range into view.
     *
     * @param pos - The position or range.
     * @param options - The scroll options.
     * @param options.y - Vertical alignment.
     * @param options.x - Horizontal alignment.
     * @param options.yMargin - Vertical margin.
     * @param options.xMargin - Horizontal margin.
     * @returns The state effect.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.scrollIntoView} instead.
     */
    function scrollIntoView__(pos: number | SelectionRange, options?: EditorViewScrollIntoViewOptions): StateEffect<unknown>;

    /**
     * Facet to add a style module to an editor view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.styleModule} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    const styleModule__: Facet<any, readonly any[]>;

    /**
     * Returns an extension that can be used to add DOM event handlers.
     *
     * @param handlers - The event handlers.
     * @returns The extension.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.domEventHandlers} instead.
     */
    function domEventHandlers__(handlers: DOMEventHandlers<unknown>): Extension;

    /**
     * Create an extension that registers DOM event observers.
     *
     * @param observers - The event observers.
     * @returns The extension.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.domEventObservers} instead.
     */
    function domEventObservers__(observers: DOMEventHandlers<unknown>): Extension;

    /**
     * An input handler can override the way changes to the editable DOM content are handled.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.inputHandler} instead.
     */
    const inputHandler__: Facet<
      (view: EditorView, from: number, to: number, text: string, insert: () => Transaction) => boolean,
      readonly ((view: EditorView, from: number, to: number, text: string, insert: () => Transaction) => boolean)[]
    >;

    /**
     * Functions provided in this facet will be used to transform text pasted or dropped into
     * the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.clipboardInputFilter} instead.
     */
    const clipboardInputFilter__: Facet<(text: string, state: EditorState) => string, readonly ((text: string, state: EditorState) => string)[]>;

    /**
     * Transform text copied or dragged from the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.clipboardOutputFilter} instead.
     */
    const clipboardOutputFilter__: Facet<(text: string, state: EditorState) => string, readonly ((text: string, state: EditorState) => string)[]>;

    /**
     * Scroll handlers can override how things are scrolled into view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.scrollHandler} instead.
     */
    const scrollHandler__: Facet<
      (
        view: EditorView,
        range: SelectionRange,
        options: EditorViewScrollHandlerOptions
      ) => boolean,
      readonly ((
        view: EditorView,
        range: SelectionRange,
        options: EditorViewScrollHandlerOptions
      ) => boolean)[]
    >;

    /**
     * This facet can be used to provide functions that create effects to be dispatched when
     * the editor's focus state changes.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.focusChangeEffect} instead.
     */
    const focusChangeEffect__: Facet<
      (state: EditorState, focusing: boolean) => null | StateEffect<unknown>,
      readonly ((state: EditorState, focusing: boolean) => null | StateEffect<unknown>)[]
    >;

    /**
     * By default, the editor assumes all its content has the same text direction. Configure
     * this with a `true` value to make it read the text direction of every (rendered) line
     * separately.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.perLineTextDirection} instead.
     */
    const perLineTextDirection__: Facet<boolean, boolean>;

    /**
     * Allows you to provide a function that should be called when the library catches an
     * exception from an extension.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.exceptionSink} instead.
     */
    const exceptionSink__: Facet<(exception: unknown) => void, readonly ((exception: unknown) => void)[]>;

    /**
     * A facet that can be used to register a function to be called every time the view updates.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.updateListener} instead.
     */
    const updateListener__: Facet<(update: ViewUpdate) => void, readonly ((update: ViewUpdate) => void)[]>;

    /**
     * Facet that controls whether the editor content DOM is editable.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.editable} instead.
     */
    const editable__: Facet<boolean, boolean>;

    /**
     * Allows you to influence the way mouse selection happens.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.mouseSelectionStyle} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    const mouseSelectionStyle__: Facet<any, readonly any[]>;

    /**
     * Facet used to configure whether a given selection drag event should move or copy the
     * selection.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.dragMovesSelection} instead.
     */
    const dragMovesSelection__: Facet<(event: MouseEvent) => boolean, readonly ((event: MouseEvent) => boolean)[]>;

    /**
     * Facet used to configure whether a given selecting click adds a new range to the existing
     * selection or replaces it entirely.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.clickAddsSelectionRange} instead.
     */
    const clickAddsSelectionRange__: Facet<(event: MouseEvent) => boolean, readonly ((event: MouseEvent) => boolean)[]>;

    /**
     * A facet that determines which decorations are shown in the view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.decorations} instead.
     */
    const decorations__: Facet<((view: EditorView) => DecorationSet) | DecorationSet, readonly (((view: EditorView) => DecorationSet) | DecorationSet)[]>;

    /**
     * Facet that works much like decorations, but puts its inputs at the very bottom of the
     * precedence stack.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.outerDecorations} instead.
     */
    const outerDecorations__: Facet<((view: EditorView) => DecorationSet) | DecorationSet, readonly (((view: EditorView) => DecorationSet) | DecorationSet)[]>;

    /**
     * Used to provide ranges that should be treated as atoms as far as cursor motion is
     * concerned.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.atomicRanges} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    const atomicRanges__: Facet<(view: EditorView) => any, readonly ((view: EditorView) => any)[]>;

    /**
     * When range decorations add a `unicode-bidi: isolate` style, they should also be exposed
     * through this facet.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.bidiIsolatedRanges} instead.
     */
    const bidiIsolatedRanges__: Facet<
      ((view: EditorView) => DecorationSet) | DecorationSet,
      readonly (((view: EditorView) => DecorationSet) | DecorationSet)[]
    >;

    /**
     * Facet that allows extensions to provide additional scroll margins.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.scrollMargins} instead.
     */
    const scrollMargins__: Facet<(view: EditorView) => null | Partial<Rect>, readonly ((view: EditorView) => null | Partial<Rect>)[]>;

    /**
     * Create a theme extension.
     *
     * @param spec - The theme spec.
     * @param options - Options including dark mode.
     * @param options.dark - Whether the theme is dark.
     * @returns The extension.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.theme} instead.
     */
    function theme__(spec: EditorViewThemeSpec, options?: EditorViewThemeOptions): Extension;

    /**
     * This facet records whether a dark theme is active.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.darkTheme} instead.
     */
    const darkTheme__: Facet<boolean, boolean>;

    /**
     * Create an extension that adds styles to the base theme.
     *
     * @param spec - The theme spec.
     * @returns The extension.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.baseTheme} instead.
     */
    function baseTheme__(spec: EditorViewThemeSpec): Extension;

    /**
     * Provides a Content Security Policy nonce to use when creating the style sheets for the
     * editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.cspNonce} instead.
     */
    const cspNonce__: Facet<string, string>;

    /**
     * Facet that provides additional DOM attributes for the editor's editable DOM element.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.contentAttributes} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    const contentAttributes__: Facet<any, readonly any[]>;

    /**
     * Facet that provides DOM attributes for the editor's outer element.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.editorAttributes} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    const editorAttributes__: Facet<any, readonly any[]>;

    /**
     * An extension that enables line wrapping in the editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.lineWrapping} instead.
     */
    const lineWrapping__: Extension;

    /**
     * State effect used to include screen reader announcements in a transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.announce} instead.
     */
    const announce__: StateEffectType<string>;

    /**
     * Retrieve an editor view instance from the view's DOM representation.
     *
     * @param dom - The DOM element.
     * @returns The editor view, or `null`.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link EditorView.findFromDOM} instead.
     */
    function findFromDOM__(dom: HTMLElement): EditorView | null;
  }
}
