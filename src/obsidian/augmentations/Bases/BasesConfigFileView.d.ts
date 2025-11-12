export {};

declare module 'obsidian' {
    /**
     * @todo Documentation incomplete.
     * @since 1.10.0
     */
    export interface BasesConfigFileView {
        /**
         * Additional filters, applied only to this view.
         *
         * @official
         * @since 1.10.0
         */
        filters?: BasesConfigFileFilter;

        /**
         * Configuration for grouping the results of this view.
         *
         * @official
         * @since 1.10.0
         */
        groupBy?: {};

        /**
         * Friendly name for this view, displayed in the UI to select between views.
         *
         * @official
         * @since 1.10.0
         */
        name: string;

        /**
         * An ordered list of the properties to display in this view.
         *
         * @official
         * @since 1.10.0
         */
        order?: string[];

        /**
         * Configuration of summaries to display for each property in this view.
         *
         * Key: Property name.
         * Value: Summary formula name.
         *
         * @official
         * @since 1.10.0
         */
        summaries?: Record<string, string>;

        /**
         * Unique identifier for the view type. Used to select the correct view renderer.
         *
         * @official
         * @since 1.10.0
         */
        type: string;
    }
}
