import type { SuggestModalChooser } from '../internals/SuggestModalChooser.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        onInput(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        updateSuggestions(): void;
    }
}
