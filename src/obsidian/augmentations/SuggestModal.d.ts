import type { SuggestModalChooser } from '../internals/SuggestModalChooser.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A suggest modal.
     *
     * @typeParam T - The type of the suggestion items.
     */
    interface SuggestModal<T> extends Modal, ISuggestOwner<T> {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        chooser: SuggestModalChooser<T, this>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        clearButtonEl: HTMLDivElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        ctaEl: HTMLDivElement;

        /**
         * The text to display when there are no suggestions.
         *
         * @official
         */
        emptyStateText: string;

        /**
         * The input element.
         *
         * @official
         */
        inputEl: HTMLInputElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        instructionsEl: HTMLDivElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        isOpen: boolean;

        /**
         * The limit of the number of suggestions.
         *
         * @official
         */
        limit: number;

        /**
         * The result container element.
         *
         * @official
         */
        resultContainerEl: HTMLElement;

        /**
         * Create a suggest modal.
         *
         * @param app - The Obsidian app instance .
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App): this;

        /**
         * Get the suggestions.
         *
         * @param query - The query to get the suggestions for.
         * @returns The suggestions.
         * @example
         * ```ts
         * class MySuggestModal extends SuggestModal<string> {
         *     public override getSuggestions(query: string): string[] {
         *         return ['foo', 'bar'];
         *     }
         * }
         * ```
         * @example
         * ```ts
         * class MySuggestModal extends SuggestModal<string> {
         *     public override async getSuggestions(query: string): Promise<string[]> {
         *         return Promise.resolve(['foo', 'bar']);
         *     }
         * }
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getSuggestions} instead.
         */
        getSuggestions__(query: string): T[] | Promise<T[]>;

        /**
         * Choose a suggestion.
         *
         * @param item - The item to choose.
         * @param evt - The event that triggered the choice.
         * @example
         * ```ts
         * class MySuggestModal extends SuggestModal<string> {
         *     public override onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent): void {
         *         console.log(item);
         *     }
         * }
         * @official
         * @deprecated - Added only for typing purposes. Use {@link onChooseSuggestion} instead.
         */
        onChooseSuggestion__(item: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onInput(): void;

        /**
         * Set the callback to be called when there are no suggestions.
         *
         * @param callback - The callback to be called when there are no suggestions.
         * @official
         */
        onNoSuggestion(): void;

        /**
         * Render a suggestion.
         *
         * @param value - The value of the suggestion.
         * @param el - The element to render the suggestion to.
         * @example
         * ```ts
         * class MySuggestModal extends SuggestModal<string> {
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
         * Select the active suggestion.
         *
         * @param evt - The event that triggered the selection.
         * @official
         */
        selectActiveSuggestion(evt: MouseEvent | KeyboardEvent): void;

        /**
         * Select a suggestion.
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that triggered the selection.
         * @official
         */
        selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Set the instructions.
         *
         * @param instructions - The instructions.
         * @official
         */
        setInstructions(instructions: Instruction[]): void;

        /**
         * Set the placeholder text.
         *
         * @param placeholder - The placeholder text.
         * @official
         */
        setPlaceholder(placeholder: string): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        updateSuggestions(): void;
    }
}
