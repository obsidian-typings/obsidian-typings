import type { BasesList } from './BasesList.d.ts';

/**
 * Bases file.
 *
 * @public
 * @unofficial
 */
export interface BasesFile {
    /**
     * Gets the links.
     *
     * @returns The links.
     */
    getLinks(): BasesList;
}
