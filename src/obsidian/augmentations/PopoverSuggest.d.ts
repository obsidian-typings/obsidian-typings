import type { ExtractConstructor } from '../internals/constructors/ExtractConstructor.d.ts';
import type { SuggestionContainer } from '../internals/SuggestionContainer.d.ts';
import type { TextDirection } from '../internals/TextDirection.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Base class for adding a type-ahead popover.
   *
   * @typeParam T - The type of the suggestion items.
   */
  interface PopoverSuggest<T> extends ISuggestOwner<T>, HistoryHandler {
    /**
     * The Obsidian app instance.
     *
     * @official
     */
    app: App;

    /**
     * Whether the suggestion popup is currently open and visible.
     *
     * @unofficial
     */
    isOpen: boolean;

    /**
     * The scope for the keymaps.
     *
     * @official
     */
    scope: Scope;

    /**
     * Suggestion container element.
     *
     * @unofficial
     */
    suggestEl: HTMLDivElement;

    /**
     * The inner element holding the rendered suggestions.
     *
     * @unofficial
     */
    suggestInnerEl: HTMLElement;

    /**
     * Handles selection and rendering of the suggestions.
     *
     * @unofficial
     */
    suggestions: SuggestionContainer<T>;

    /**
     * The window the suggestion popover is shown in, or `null` while closed.
     *
     * @unofficial
     */
    win: null | Window;

    /**
     * Attaches the suggestion popover to the document with an open animation.
     *
     * @unofficial
     */
    attachDom(): void;

    /**
     * Automatically destroy the popover when its associated element is removed.
     *
     * @unofficial
     */
    autoDestroy?(): void;

    /**
     * Closes the popover.
     *
     * @official
     */
    close(): void;

    /**
     * Constructor.
     *
     * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<PopoverSuggest\>}.
     *
     * @param app - The Obsidian app instance.
     * @param scope - The scope for the keymaps.
     * @returns The popover suggest instance.
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor__(app: App, scope?: Scope): this;

    /**
     * Detaches the suggestion popover from the document.
     *
     * @unofficial
     */
    detachDom(): void;

    /**
     * Handle the escape key to close the popover.
     *
     * @unofficial
     */
    onEscapeKey(): void;

    /**
     * Opens the popover.
     *
     * @official
     */
    open(): void;

    /**
     * Render the suggestion.
     *
     * @param value - The value to render.
     * @param el - The element to render the suggestion to.
     * @example
     * ```ts
     * class MyPopoverSuggest extends PopoverSuggest<string> {
     *     public override renderSuggestion(value: string, el: HTMLElement): void {
     *         el.createEl('strong', { text: value });
     *     }
     * }
     * ```
     * @official
     * @deprecated - Added only for typing purposes. Use {@link renderSuggestion} instead.
     */
    renderSuggestion__(value: T, el: HTMLElement): void;

    /**
     * Reposition the popover relative to the given bounding rectangle.
     *
     * @param rect - The bounding rectangle to position relative to.
     * @param textDirection - The text direction for positioning.
     * @unofficial
     */
    reposition(rect: DOMRect, textDirection?: TextDirection): void;

    /**
     * Select the suggestion.
     *
     * @param value - The value to select.
     * @param evt - The event that triggered the selection.
     * @example
     * ```ts
     * class MyPopoverSuggest extends PopoverSuggest<string> {
     *     public override selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
     *         console.log(value);
     *     }
     * }
     * ```
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selectSuggestion} instead.
     */
    selectSuggestion__(value: T, evt: KeyboardEvent | MouseEvent): void;

    /**
     * Set the element that triggers automatic destruction of the popover when removed.
     *
     * @param el - The element to watch for removal.
     * @unofficial
     */
    setAutoDestroy(el: HTMLElement): void;
  }
}
