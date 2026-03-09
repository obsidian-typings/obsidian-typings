import type { SQLResultSetRowList } from './SQLResultSetRowList.d.ts';

/**
 * Result set returned from a WebSQL query execution.
 * @public
 * @unofficial
 */
export interface SQLResultSet {
  /** Row ID of the last inserted row, if applicable. */
  insertId: number;

  /** List of rows returned by the query. */
  rows: SQLResultSetRowList;

  /** Number of rows affected by the query. */
  rowsAffected: number;
}
