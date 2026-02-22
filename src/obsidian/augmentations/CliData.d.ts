export {};

declare module 'obsidian' {
    /**
     * The data passed to the CLI.
     */
    export interface CliData extends Record<string, string | 'true'> {
    }
}
