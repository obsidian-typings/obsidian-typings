import type { SQLResultSetRowList } from './SQLResultSetRowList.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SQLResultSet {
    /** @todo Documentation incomplete. */
    insertId: number;

    /** @todo Documentation incomplete. */
    rows: SQLResultSetRowList;

    /** @todo Documentation incomplete. */
    rowsAffected: number;
}
