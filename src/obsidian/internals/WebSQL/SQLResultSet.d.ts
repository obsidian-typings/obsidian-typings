import type { SQLResultSetRowList } from './SQLResultSetRowList.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SQLResultSet {
    insertId: number;
    rows: SQLResultSetRowList;
    rowsAffected: number;
}
