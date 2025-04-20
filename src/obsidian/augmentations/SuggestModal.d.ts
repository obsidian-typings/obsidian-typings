import type { SuggestModalChooser } from '../internals/SuggestModalChooser.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface SuggestModal<T> extends Modal, ISuggestOwner<T> {
        /** @unofficial */
        chooser: SuggestModalChooser<T, this>;

        /** @unofficial */
        clearButtonEl: HTMLDivElement;

        /** @unofficial */
        ctaEl: HTMLDivElement;

        /** @unofficial */
        instructionsEl: HTMLDivElement;

        /** @unofficial */
        isOpen: boolean;

        /** @unofficial */
        onInput(): void;

        /** @unofficial */
        updateSuggestions(): void;
    }
}
