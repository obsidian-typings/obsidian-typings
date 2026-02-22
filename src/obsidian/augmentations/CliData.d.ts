export {};

declare module 'obsidian' {
    /**
     * The data passed to the CLI.
     */
    export interface CliData {
        /** @official */
        [key: string]: string | 'true';
    }
}
