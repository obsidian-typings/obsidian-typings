export {};

declare module 'obsidian' {
    /**
     * A component that displays a progress bar.
     * @since 1.4.4
     */
    interface ProgressBarComponent extends ValueComponent<number> {
        /**
         * Access the "line" element which is a child of the progressBar element.
         *
         * @unofficial
         */
        lineEl: HTMLDivElement;

        /**
         * Access the "bar" element.
         *
         * @unofficial
         */
        progressBar: HTMLDivElement;

        /**
         * Creates a new ProgressBarComponent.
         *
         * @param containerEl - The container element.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(containerEl: HTMLElement): this;

        /**
         * Get the current value of the progress bar (0-100).
         *
         * @returns The current value of the progress bar.
         * @official
         */
        getValue(): number;

        /**
         * Set the current value of the progress bar.
         *
         * @param value - The progress amount, a value between 0-100.
         * @returns The progress bar component.
         * @official
         */
        setValue(value: number): this;

        /**
         * Shows/hides the component.
         *
         * @param visible Whether the setting should be visible.
         * @returns The component.
         * @unofficial
         */
        setVisibility(visible: boolean): this;
    }
}
