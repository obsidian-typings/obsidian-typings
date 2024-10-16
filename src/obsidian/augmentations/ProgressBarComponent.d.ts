export {};

declare module 'obsidian' {
    interface ProgressBarComponent extends ValueComponent<number> {
        /**
         * Access the "bar" element
         */
        progresBar: HTMLDivElement;

        /**
         * Access the "line" element which is a child of the progressBar element
         */
        lineEl: HTMLDivElement;
    }
}
