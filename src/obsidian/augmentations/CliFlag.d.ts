export {};

declare module 'obsidian' {
    /**
     * The data passed to the CLI.
     */
    export interface CliFlag {
        /**
         * Description shown in help and autocomplete
         * @official
         */
        description: string;

        /**
         * Whether this flag is required (default: false)
         * @official
         */
        required?: boolean;

        /**
         * Value placeholder (e.g., '<filename>', '<path>'). Omit for boolean flags.
         * @official
         */
        value?: string;
    }
}
