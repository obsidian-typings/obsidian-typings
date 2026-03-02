export {};

declare module 'obsidian' {
    /**
     * Editable file view
     * @since 0.9.7
     */
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
         * @param titleEl - The title element of the view.
         * @unofficial
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
         * @param event - The keyboard event which triggered this function.
         * @unofficial
         */
        onTitleKeydown(event: KeyboardEvent): void;

        /**
         * Is called when the titleEl is focused and a paste event is triggered.
         *
         * Event type: 'paste'.
         *
         * @param titleEl - The title element of the view.
         * @param event - The clipboard event which triggered this function.
         * @unofficial
         */
        onTitlePaste(titleEl: HTMLElement, event: ClipboardEvent): void;

        /**
         * Updates the file to match the updated title.
         *
         * @param titleEl - The current title element.
         * @unofficial
         */
        saveTitle(titleEl: HTMLElement): Promise<void>;
    }
}
