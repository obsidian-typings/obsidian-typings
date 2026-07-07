import type { getBasesViewConfigConstructor } from '../../implementations/constructors/augmentations/bases/getBasesViewConfigConstructor.d.ts';

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
     * The Bases query this view belongs to.
     *
     * @unofficial
     */
    query: unknown;

    /**
     * The view type identifier (e.g. `'table'`).
     *
     * @unofficial
     */
    type: string;

    /**
     * Creates a copy of this config under a new view name.
     *
     * @param name - The name for the cloned view.
     * @returns The cloned config.
     * @unofficial
     */
    clone(name: string): BasesViewConfig;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getBasesViewConfigConstructor} from `obsidian-typings/implementations`.
     *
     * @param query - The query.
     * @param type - The type.
     * @param name - The name.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(query: string, type: string, name: string): this;

    /**
     * Retrieve the user-configured value of options exposed in {@link obsidian#BasesViewRegistration.options}.
     *
     * @param key - The option key to retrieve.
     * @returns The configured value for the key.
     * @official
     * @since 1.10.0
     */
    get(key: string): unknown;

    /**
     * Gets all stored configuration data for the view.
     *
     * @returns The configuration data.
     * @unofficial
     */
    getAll(): Record<string, unknown>;

    /**
     * Retrieve a user-configured value from the config, converting it to a {@link obsidian#BasesPropertyId}.
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
     * @returns the {@link obsidian#Value} result from evaluating the formula, or {@link obsidian#NullValue} if the formula is invalid, or the key is not present.
     * @official
     * @since 1.10.2
     */
    getEvaluatedFormula(view: BasesView, key: string): Value;

    /**
     * Gets the configured row limit for the view.
     *
     * @returns The limit, or 0 when unset.
     * @unofficial
     */
    getLimit(): number;

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
     * Gets the per-property config for a property.
     *
     * @param property - The property identifier.
     * @returns The property config.
     * @unofficial
     */
    getPropertyConfig(property: BasesPropertyId): unknown;

    /**
     * Retrieve the sorting config for this view. Sort is configured by the user through the sort toolbar menu.
     * Removes invalid sort configs. If no (valid) sort config, returns an empty array.
     * Does not validate that the properties exists.
     *
     * Note that data from {@link obsidian#BasesQueryResult} will be presorted.
     *
     * @returns The array of sort configurations.
     * @official
     * @since 1.10.0
     */
    getSort(): BasesSortConfig[];

    /**
     * Gets the summary function key configured for a property.
     *
     * @param property - The property identifier.
     * @returns The summary key, or `null` if none.
     * @unofficial
     */
    getSummaryKey(property: BasesPropertyId): null | string;

    /**
     * Gets the user-friendly name of the view.
     *
     * @returns The view name.
     * @unofficial
     */
    getViewName(): string;

    /**
     * Serializes the view config to a plain object.
     *
     * @returns The serialized config.
     * @unofficial
     */
    serialize(): Record<string, unknown>;

    /**
     * Store configuration data for the view. Views should prefer {@link obsidian#BasesViewRegistration.options}
     * to allow users to configure options where appropriate.
     *
     * @param key - The key to set.
     * @param value - The value to set.
     * @official
     * @since 1.10.0
     */
    set(key: string, value: null | unknown): void;

    /**
     * Sets the group-by config for the view.
     *
     * @param groupBy - The group-by config, or `null` to clear it.
     * @unofficial
     */
    setGroupBy(groupBy: BasesSortConfig | null): void;

    /**
     * Sets the row limit for the view.
     *
     * @param limit - The limit.
     * @unofficial
     */
    setLimit(limit: number): void;

    /**
     * Sets the ordered list of properties to display.
     *
     * @param order - The property order.
     * @unofficial
     */
    setOrder(order: BasesPropertyId[]): void;

    /**
     * Updates the sort config for a property.
     *
     * @param property - The property identifier.
     * @param direction - The sort direction to apply, or a toggle/none action.
     * @unofficial
     */
    setSortProperty(property: BasesPropertyId, direction: 'ASC' | 'DESC' | 'NONE' | 'TOGGLE'): void;

    /**
     * Sets the summary function key for a property.
     *
     * @param property - The property identifier.
     * @param summaryKey - The summary key, or `null` to clear it.
     * @unofficial
     */
    setSummaryKey(property: BasesPropertyId, summaryKey: null | string): void;
  }
}
