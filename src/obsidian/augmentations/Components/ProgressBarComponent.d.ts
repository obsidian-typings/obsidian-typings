export {};

declare module 'obsidian' {
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
         * Shows/hides the component.
         *
         * @param visible Whether the setting should be visible.
         * @returns The component.
         * @unofficial
         */
        setVisibility(visible: boolean): this;
    }
}
