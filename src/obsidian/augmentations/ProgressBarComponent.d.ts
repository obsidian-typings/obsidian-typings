export {};

declare module 'obsidian' {
    interface ProgressBarComponent extends ValueComponent<number> {
        /**
         * Access the "bar" element
         */
        progressBar: HTMLDivElement;

        /**
         * Access the "line" element which is a child of the progressBar element
         */
        lineEl: HTMLDivElement;
    }
}
