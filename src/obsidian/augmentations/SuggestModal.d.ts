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
         * The suggestion chooser that manages selection and rendering.
         * @unofficial
         */
        chooser: SuggestModalChooser<T, this>;

        /**
         * Button element to clear the input field.
         * @unofficial
         */
        clearButtonEl: HTMLDivElement;

        /**
         * Create a suggest modal.
         *
         * @param app - The Obsidian app instance .
         * @returns The suggest modal instance.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App): this;

        /**
         * Call-to-action element displayed in the modal.
         * @unofficial
         */
        ctaEl: HTMLDivElement;

        /**
         * The text to display when there are no suggestions.
         *
         * @official
         * @since 0.9.20
         */
        emptyStateText: string;

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
         * @since 1.5.7
         */
        getSuggestions__(query: string): T[] | Promise<T[]>;

        /**
         * The input element.
         *
         * @official
         */
        inputEl: HTMLInputElement;

        /**
         * Element displaying keyboard shortcut instructions.
         * @unofficial
         */
        instructionsEl: HTMLDivElement;

        /**
         * Whether the suggest modal is currently open.
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
         * @since 1.5.7
         */
        onChooseSuggestion__(item: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Handle input change in the suggest modal.
         * @unofficial
         */
        onInput(): void;

        /**
         * Set the callback to be called when there are no suggestions.
         *
         * @param callback - The callback to be called when there are no suggestions.
         * @official
         * @since 0.9.20
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
         * @since 1.5.7
         */
        renderSuggestion__(value: T, el: HTMLElement): void;

        /**
         * The result container element.
         *
         * @official
         * @since 0.9.20
         */
        resultContainerEl: HTMLElement;

        /**
         * Select the active suggestion.
         *
         * @param evt - The event that triggered the selection.
         * @official
         * @since 1.7.2
         */
        selectActiveSuggestion(evt: MouseEvent | KeyboardEvent): void;

        /**
         * Select a suggestion.
         *
         * @param value - The value of the suggestion.
         * @param evt - The event that triggered the selection.
         * @official
         * @since 0.9.20
         */
        selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;

        /**
         * Set the instructions.
         *
         * @param instructions - The instructions.
         * @official
         * @since 0.9.20
         */
        setInstructions(instructions: Instruction[]): void;

        /**
         * Set the placeholder text.
         *
         * @param placeholder - The placeholder text.
         * @official
         * @since 0.9.20
         */
        setPlaceholder(placeholder: string): void;

        /**
         * Refresh the displayed suggestions based on the current query.
         * @unofficial
         */
        updateSuggestions(): void;
    }
}
