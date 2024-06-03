import type { SuggestionContainer } from "../types.d.ts";

export {};

declare module "obsidian" {
    interface PopoverSuggest<T> {
        /**
         * Whether the suggestion popup is currently open and visible
         */
        isOpen: boolean;
        /**
         * Suggestion container element
         */
        suggestEl: HTMLElement;
        /**
         * Handles selection and rendering of the suggestions
         */
        suggestions: SuggestionContainer<T>;
    }
}
