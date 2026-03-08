import type { BasesFilter } from './BasesFilter.d.ts';
import type { BasesFormula } from './BasesFormula.d.ts';
import type { BasesProperty } from './BasesProperty.d.ts';
import type { BasesSubView } from './BasesSubView.d.ts';

/**
 * Bases query.
 *
 * @public
 * @unofficial
 */
export interface BasesQuery {
    /**
     * Clones the query.
     *
     * @returns The cloned query.
     */
    clone(): this;

    /**
     * The formulas.
     */
    formulas: Record<string, BasesFormula>;

    /**
     * Gets the property config.
     *
     * @param key - The property key.
     * @returns The property configuration.
     */
    getPropertyConfig(key: string): unknown;

    /**
     * Gets the serializable data.
     *
     * @returns The serializable data object.
     */
    getSerializable(): object;

    /**
     * Gets the view config.
     *
     * @param key - The view config key.
     * @returns The view configuration.
     */
    getViewConfig(key: string): unknown;

    /**
     * The properties.
     */
    properties: Record<string, BasesProperty>;

    /**
     * Removes a formula.
     *
     * @param key - The formula key to remove.
     */
    removeFormula(key: string): void;

    /**
     * Saves the query.
     */
    save(): void;

    /**
     * Saves the query.
     *
     * @param query - The query instance to save.
     */
    saveFn(query: this): void;

    /**
     * Sets the formulas.
     *
     * @param formulas - The formulas to set.
     */
    setFormulas(formulas: Record<string, BasesFormula>): void;

    /**
     * Sets the global filters.
     *
     * @param filter - The global filter to set.
     */
    setGlobalFilters(filter: BasesFilter): void;

    /**
     * Sets the view filters.
     *
     * @param key - The view key.
     * @param filters - The filters to set.
     */
    setViewFilters(key: string, filters: BasesFilter): void;

    /**
     * The unrecognized data.
     */
    unrecognizedData: object;

    /**
     * The views.
     */
    views: BasesSubView[];
}
