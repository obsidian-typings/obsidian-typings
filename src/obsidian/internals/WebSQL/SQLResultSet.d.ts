import type { SQLResultSetRowList } from './SQLResultSetRowList.d.ts';

/** @public */
export interface SQLResultSet {
    insertId: number;
    rows: SQLResultSetRowList;
    rowsAffected: number;
}
