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
     */
    clone(name: string): this;

    /**
     * Gets the sub view.
     */
    get(arg1: unknown): unknown;

    /**
     * Gets all the sub views.
     */
    getAll(): unknown;

    /**
     * Gets the display name.
     */
    getDisplayName(arg1: unknown): unknown;

    /**
     * Gets the limit.
     */
    getLimit(): unknown;

    /**
     * Gets the order.
     */
    getOrder(): unknown;

    /**
     * Gets the property config.
     */
    getPropertyConfig(arg1: unknown): unknown;

    /**
     * Gets the sort.
     */
    getSort(): unknown;

    /**
     * Gets the view name.
     */
    getViewName(): string;

    /**
     * Serializes the sub view.
     */
    serialize(): SerializedBasesSubView;

    /**
     * Sets the sub view.
     */
    set(arg1: unknown, arg2: unknown): unknown;

    /**
     * Sets the limit.
     */
    setLimit(arg1: unknown): unknown;

    /**
     * Sets the order.
     */
    setOrder(arg1: unknown): unknown;

    /**
     * Sets the sort property.
     */
    setSortProperty(arg1: unknown, arg2: unknown): unknown;
}
