import type { BasesFile } from './BasesFile.d.ts';
import type { BasesNote } from './BasesNote.d.ts';

/**
 * Bases local.
 *
 * @public
 * @unofficial
 */
export interface BasesLocal {
    /**
     * Implicit.
     */
    implicit: BasesFile;

    /**
     * Note.
     */
    note: BasesNote;
}
