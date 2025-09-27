import type { BasesControl } from './BasesControl.d.ts';
import type { BasesList } from './BasesList.d.ts';

/**
 * Bases file.
 *
 * @public
 * @unofficial
 */
export interface BasesFile extends BasesControl {
    /**
     * Gets the links.
     *
     * @returns The links.
     */
    getLinks(): BasesList;
}
