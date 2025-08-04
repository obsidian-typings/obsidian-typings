import type { SuggestionContainer } from '../internals/SuggestionContainer.d.ts';
import type { TextDirection } from '../internals/TextDirection.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Base class for adding a type-ahead popover.
     *
     * @typeParam T - The type of the suggestion items.
     */
    interface PopoverSuggest<T> extends ISuggestOwner<T>, CloseableComponent {
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
         * Handles selection and rendering of the suggestions.
         *
         * @unofficial
         */
        suggestions: SuggestionContainer<T>;

        /**
         * @todo Documentation incomplete.
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
         * Creates a new PopoverSuggest.
         *
         * @param app - The Obsidian app instance.
         * @param scope - The scope for the keymaps.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App, scope?: Scope): this;

        /**
         * @todo Documentation incomplete.
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
         * @inheritDoc
         * @official
         * @deprecated - Added only for typing purposes. Use {@link renderSuggestion} instead.
         */
        renderSuggestion__(value: T, el: HTMLElement): void;

        /**
         * @todo Documentation incomplete.
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
         * @inheritDoc
         * @official
         * @deprecated - Added only for typing purposes. Use {@link selectSuggestion} instead.
         */
        selectSuggestion__(value: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setAutoDestroy(el: HTMLElement): void;
    }
}
