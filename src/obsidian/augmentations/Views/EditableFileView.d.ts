export {};

declare module 'obsidian' {
    interface EditableFileView extends FileView {
        /**
         * The file that is currently being renamed.
         *
         * @unofficial
         */
        fileBeingRenamed: null | TFile;

        /**
         * Is called when the titleEl looses focus.
         *
         * Event type: 'blur'.
         *
         * @unofficial
         */
        onTitleBlur(): Promise<void>;
        /**
         * Is called when the titleEl is changed.
         *
         * Event type: 'input'.
         *
         * @unofficial
         * @param titleEl The titleEl of the view.
         */
        onTitleChange(titleEl: HTMLElement): void;
        /**
         * Is called when the titleEl gains focus.
         *
         * Event type: 'focus'.
         *
         * @unofficial
         */
        onTitleFocus(): void;
        /**
         * Is called when the titleEl is focused and a keydown is triggered.
         *
         * Event type: 'keydown'.
         *
         * @param event The KeyboardEvent which triggered this function.
         *
         * @unofficial
         */
        onTitleKeydown(event: KeyboardEvent): void;
        /**
         * Is called when the titleEl is focused and a paste event is triggered.
         *
         * Event type: 'paste'.
         *
         * @param titleEl The titleEl of the view.
         * @param event The ClipboardEvent which triggered this function.
         *
         * @unofficial
         */
        onTitlePaste(titleEl: HTMLElement, event: ClipboardEvent): void;
        /**
         * Updates the file to match the updated title.
         *
         * @param titleEl The current titleEl.
         *
         * @unofficial
         */
        saveTitle(titleEl: HTMLElement): Promise<void>;
    }
}
