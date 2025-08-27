import type { BasesControl } from './BasesControl.d.ts';

/**
 * Bases note.
 *
 * @public
 * @unofficial
 */
export interface BasesNote {
    /**
     * Data.
     */
    data: unknown[];

    /**
     * Get control.
     *
     * @param key - The key.
     * @returns The control.
     */
    get(key: string): BasesControl;
}
