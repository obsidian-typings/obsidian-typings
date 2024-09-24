import type { SQLResultSetRowList } from './SQLResultSetRowList.js';

/** @public */
export interface SQLResultSet {
    insertId: number;
    rows: SQLResultSetRowList;
    rowsAffected: number;
}
