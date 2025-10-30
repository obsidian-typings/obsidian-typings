export {};

declare module 'obsidian' {
    /**
     * A text input supporting formula evaluation.
     *
     * @since 1.10.2
     */
    export interface FormulaOption extends BaseOption {
        /**
         * The default value of the option.
         *
         * @official
         * @since 1.10.2
         */
        default?: string;

        /**
         * The placeholder of the option.
         *
         * @official
         * @since 1.10.2
         */
        placeholder?: string;

        /**
         * The type of the option.
         *
         * @official
         * @since 1.10.2
         */
        type: 'formula';
    }
}
