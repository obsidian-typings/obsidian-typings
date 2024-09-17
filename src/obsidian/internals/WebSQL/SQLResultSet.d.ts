import type { SQLResultSetRowList } from './SQLResultSetRowList.js';

/**
 * @public
 */
export interface SQLResultSet {
    insertId: number;
    rowsAffected: number;
    rows: SQLResultSetRowList;
}
