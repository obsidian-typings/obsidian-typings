import type {
    getSearchComponentConstructor
} from '../../implementations/constructors/augmentations/getSearchComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A search component.
     * @since 0.9.21
     */
    interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {
        /**
         * The HTML element for the clear button.
         *
         * @official
         * @since 0.9.21
         */
        clearButtonEl: HTMLElement;

        /**
         * The containing element for the component's `clearButtonEl` and `inputEl`.
         *
         * @unofficial
         */
        containerEl: HTMLElement;

        /**
         * Adds a decorator to the right side of the search component.
         *
         * @param decoratorFn - The function that creates the decorator element.
         * @returns The search component.
         * To get the constructor instance, use {@link getSearchComponentConstructor} from `obsidian-typings/implementations`.
         * @unofficial
         */
        addRightDecorator(decoratorFn: (containerEl: HTMLElement) => void): this;

        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getSearchComponentConstructor} from `obsidian-typings/implementations`.
         *
         * @param containerEl - The container element.
         * @returns The search component instance.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor4__(containerEl: HTMLElement): this;

        /**
         * Called when the search component's value changes.
         *
         * @official
         */
        onChanged(): void;

        /**
         * Adds a class to the search component.
         *
         * @param cls - The CSS class to add.
         * @returns The search component.
         * @unofficial
         */
        setClass(cls: string): this;
    }
}
