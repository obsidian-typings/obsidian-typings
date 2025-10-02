export {};

declare module 'obsidian' {
    /**
     * Plugins can create a class which extends this in order to render a Base.
     * Plugins should create a {@link BaseViewHandlerFactory} function, then call
     * `plugin.registerView` to register the view factory.
     *
     * @since 1.10.0
     */
    interface BasesView extends Component {
        /**
         * All available properties from the dataset.
         * @official
         * @since 1.10.0
         */
        allProperties: BasesPropertyId[];

        /**
         * @official
         * @since 1.10.0
         */
        app: App;

        /**
         * The config object for this view.
         * @official
         * @since 1.10.0
         */
        config: BasesViewConfig;

        /**
         * The most recent output from executing the bases query, applying filters, and evaluating formulas.
         * This object will be replaced with a new result set when changes to the vault or Bases config occur,
         * so views should not keep a reference to it. Also note the contained BasesEntry objects will be recreated.
         * @official
         * @since 1.10.0
         */
        data: BasesQueryResult;

        /**
         * The type ID of this view
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link type} instead.
         */
        type__: string;

        /**
         * Constructor.
         *
         * @param controller - The query controller.
         * @returns The new BasesView.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(controller: QueryController): this;

        /**
         * Called when there is new data for the query. This view should rerender with the updated data.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link onDataUpdated} instead.
         */
        onDataUpdated__(): void;
    }
}
