export {};

declare module 'obsidian' {
    /**
     * The data passed to the CLI.
     */
    export interface CliData {
        /**
         * @official
         * @deprecated - Added only for typing purposes. Use `this[key]` instead.
         */
        index__(key: string): string | 'true';
    }
}
