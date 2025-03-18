import type { SuggestModalChooser } from '../internals/SuggestModalChooser.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface SuggestModal<T> extends Modal, ISuggestOwner<T> {
        chooser: SuggestModalChooser<T, this>;
        /** @internal */
        clearButtonEl: HTMLDivElement;
        ctaEl: HTMLDivElement;
        instructionsEl: HTMLDivElement;
        isOpen: boolean;

        onInput(): void;
        updateSuggestions(): void;
    }
}
