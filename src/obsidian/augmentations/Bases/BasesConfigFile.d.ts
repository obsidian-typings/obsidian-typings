export {};

declare module 'obsidian' {
    /**
     * Represents the serialized format of a Bases query as stored in a `.base` file.
     *
     * @since 1.10.0
     */
    export interface BasesConfigFile {
        /**
         * @official
         * @since 1.10.0
         */
        filters?: BasesConfigFileFilter;

        /**
         * Configuration for formulas used in this Base.
         *
         * Key: Formula property name.
         * Value: Formula string.
         *
         * @official
         * @since 1.10.0
         */
        formulas?: Record<string, string>;

        /**
         * Configuration for properties in this Base.
         *
         * Valid keys for this object currently include:
         *
         *   - displayName: string
         *
         * @official
         * @since 1.10.0
         */
        properties?: Record<string, Record<string, any>>;

        /**
         * Configuration for summary formulas used in this Base.
         *
         * Key: Summary formula name.
         * Value: Formula string.
         *
         * @official
         * @since 1.10.0
         */
        summaries?: Record<string, string>;

        /**
         * Configuration for views used in this Base.
         *
         * @official
         * @since 1.10.0
         */
        views?: BasesConfigFileView[];
    }
}
