import type { BasesQuery } from './BasesQuery.d.ts';
import type { SerializedBasesSubView } from './SerializedBasesSubView.d.ts';

/**
 * Bases sub view.
 *
 * @public
 * @unofficial
 */
export interface BasesSubView {
    /**
     * The name.
     */
    name: string;

    /**
     * The query.
     */
    query: BasesQuery;

    /**
     * The type.
     */
    type: string;

    /**
     * Clones the sub view.
     *
     * @param name - The name for the cloned sub view.
     * @returns The cloned sub view.
     */
    clone(name: string): this;

    /**
     * Gets the sub view.
     *
     * @returns The sub view value.
     */
    get(arg1: unknown): unknown;

    /**
     * Gets all the sub views.
     *
     * @returns All sub view entries.
     */
    getAll(): unknown;

    /**
     * Gets the display name.
     *
     * @returns The display name.
     */
    getDisplayName(arg1: unknown): unknown;

    /**
     * Gets the limit.
     *
     * @returns The current limit.
     */
    getLimit(): unknown;

    /**
     * Gets the order.
     *
     * @returns The current sort order.
     */
    getOrder(): unknown;

    /**
     * Gets the property config.
     *
     * @returns The property configuration.
     */
    getPropertyConfig(arg1: unknown): unknown;

    /**
     * Gets the sort.
     *
     * @returns The current sort configuration.
     */
    getSort(): unknown;

    /**
     * Gets the view name.
     *
     * @returns The view name.
     */
    getViewName(): string;

    /**
     * Serializes the sub view.
     *
     * @returns The serialized sub view.
     */
    serialize(): SerializedBasesSubView;

    /**
     * Sets the sub view.
     *
     * @returns The set result.
     */
    set(arg1: unknown, arg2: unknown): unknown;

    /**
     * Sets the limit.
     *
     * @returns The set result.
     */
    setLimit(arg1: unknown): unknown;

    /**
     * Sets the order.
     *
     * @returns The set result.
     */
    setOrder(arg1: unknown): unknown;

    /**
     * Sets the sort property.
     *
     * @returns The set result.
     */
    setSortProperty(arg1: unknown, arg2: unknown): unknown;
}
