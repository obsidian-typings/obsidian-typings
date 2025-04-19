import type { SuggestionContainer } from '../internals/SuggestionContainer.d.ts';

export {};

declare module 'obsidian' {
    interface PopoverSuggest<T> extends ISuggestOwner<T>, CloseableComponent {
        /**
         * Whether the suggestion popup is currently open and visible.
         */
        isOpen: boolean;
        /**
         * Suggestion container element.
         */
        suggestEl: HTMLElement;
        /**
         * Handles selection and rendering of the suggestions.
         */
        suggestions: SuggestionContainer<T>;
    }
}
