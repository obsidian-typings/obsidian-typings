export {};

declare module 'obsidian' {
    /**
     * The BasesQueryResult contains all of the available information from executing the
     * bases query, applying filters, and evaluating formulas. The `data` or `groupedData`
     * should be displayed by your view.
     *
     * @since 1.10.0
     */
    interface BasesQueryResult {
        /**
         * An ungrouped version of the data, with user-configured sort and limit applied.
         * Where appropriate, views should support groupBy by using `groupedData` instead of this value.
         *
         * @official
         * @since 1.10.0
         */
        data: BasesEntry[];

        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getBasesQueryResultConstructor} from `obsidian-typings/implementations`.
         *
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(): this;

        /**
         * Applies a summary function to a single property over a set of entries.
         *
         * @param queryController - The query controller to use.
         * @param entries - The entries to summarize.
         * @param prop - The property to summarize.
         * @param summaryKey - The key identifying the summary function.
         * @returns The computed summary value.
         * @official
         * @since 1.10.0
         */
        getSummaryValue(
            queryController: QueryController,
            entries: BasesEntry[],
            prop: BasesPropertyId,
            summaryKey: string
        ): Value;

        /**
         * The data to be rendered, grouped according to the groupBy config.
         * If there is no groupBy configured, returns a single group with an empty key.
         *
         * @returns The grouped entry data.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link groupedData} instead.
         */
        groupedData__(): BasesEntryGroup[];
    
        /**
         * Visible properties defined by the user.
         *
         * @returns The visible property identifiers.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link properties} instead.
         */
        properties__(): BasesPropertyId[];
}
}
