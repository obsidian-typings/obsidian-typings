import type { BasesControl } from './BasesControl.d.ts';

/**
 * Bases list.
 *
 * @public
 * @unofficial
 */
export interface BasesList extends BasesControl {
    /**
     * The controls.
     */
    data: BasesControl[];

    /**
     * Gets a value by key.
     *
     * @param key - The key.
     * @returns The value.
     */
    get(key: string): BasesControl;
}
