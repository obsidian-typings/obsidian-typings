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
     * The formulas.
     */
    formulas: Record<string, BasesFormula>;

    /**
     * The properties.
     */
    properties: Record<string, BasesProperty>;

    /**
     * The unrecognized data.
     */
    unrecognizedData: object;

    /**
     * The views.
     */
    views: BasesSubView[];

    /**
     * Clones the query.
     */
    clone(): this;

    /**
     * Gets the property config.
     */
    getPropertyConfig(key: string): unknown;

    /**
     * Gets the serializable data.
     */
    getSerializable(): object;

    /**
     * Gets the view config.
     */
    getViewConfig(key: string): unknown;

    /**
     * Removes a formula.
     */
    removeFormula(key: string): void;

    /**
     * Saves the query.
     */
    save(): void;

    /**
     * Saves the query.
     */
    saveFn(query: this): void;

    /**
     * Sets the formulas.
     */
    setFormulas(formulas: Record<string, BasesFormula>): void;

    /**
     * Sets the global filters.
     */
    setGlobalFilters(filter: BasesFilter): void;

    /**
     * Sets the view filters.
     */
    setViewFilters(key: string, filters: BasesFilter): void;
}
