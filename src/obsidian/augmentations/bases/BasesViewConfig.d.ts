export {};

declare module 'obsidian' {
    /**
     * The in-memory representation of a single entry in the "views" section of a Bases file.
     * Contains settings and configuration options set by the user from the toolbar menus and view options.
     *
     * @since 1.10.0
     */
    interface BasesViewConfig {
        /**
         * User-friendly name for this view.
         *
         * @official
         * @since 1.10.0
         */
        name: string;

        /**
         * Constructor.
         *
         * @param query - The query.
         * @param type - The type.
         * @param name - The name.
         * @returns The new instance.
         * To get the constructor, use `getBasesViewConfigConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(query: string, type: string, name: string): this;

        /**
         * Retrieve the user-configured value of options exposed in `BasesViewRegistration.options`.
         *
         * @param key - The option key to retrieve.
         * @returns The configured value for the key.
         * @official
         * @since 1.10.0
         */
        get(key: string): unknown;

        /**
         * Retrieve a user-configured value from the config, converting it to a BasesPropertyId.
         * Returns `null` if the requested key is not present in the config, or if the value is invalid.
         *
         * @param key - The key to retrieve.
         * @returns The value of the key.
         * @official
         * @since 1.10.0
         */
        getAsPropertyId(key: string): BasesPropertyId | null;

        /**
         * Retrieve a friendly name for the provided property.
         * If the property has been renamed by the user in the Base config, that value is returned.
         * File properties may have a default name that is returned, otherwise the name with the property
         * type prefix removed is returned.
         *
         * @param propertyId - The property identifier to get the display name for.
         * @returns The display name of the property.
         * @official
         * @since 1.10.0
         */
        getDisplayName(propertyId: BasesPropertyId): string;

        /**
         * Retrieve a user-configured value from the config, evaluating it as a
         * formula in the context of the current Base. For embedded bases, or bases
         * in the sidebar, this means evaluating the formula against the currently
         * active file.
         *
         * @param view - The view to evaluate the formula in the context of.
         * @param key - The key to evaluate the formula for.
         * @returns the {@link Value} result from evaluating the formula, or {@link NullValue} if the formula is invalid, or the key is not present.
         * @official
         * @since 1.10.2
         */
        getEvaluatedFormula(view: BasesView, key: string): Value;

        /**
         * Ordered list of properties to display in this view.
         * In a table, these can be interpreted as the list of visible columns.
         * Order is configured by the user through the properties toolbar menu.
         *
         * @returns The ordered list of properties.
         * @official
         * @since 1.10.0
         */
        getOrder(): BasesPropertyId[];

        /**
         * Retrieve the sorting config for this view. Sort is configured by the user through the sort toolbar menu.
         * Removes invalid sort configs. If no (valid) sort config, returns an empty array.
         * Does not validate that the properties exists.
         *
         * Note that data from {@link BasesQueryResult} will be presorted.
         *
         * @returns The array of sort configurations.
         * @official
         * @since 1.10.0
         */
        getSort(): BasesSortConfig[];
    
        /**
         * Store configuration data for the view. Views should prefer `BasesViewRegistration.options`
         * to allow users to configure options where appropriate.
         *
         * @param key - The key to set.
         * @param value - The value to set.
         * @official
         * @since 1.10.0
         */
        set(key: string, value: unknown | null): void;
}
}
