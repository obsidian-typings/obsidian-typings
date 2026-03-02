import type { SQLError } from './SQLError.d.ts';
import type { SQLResultSet } from './SQLResultSet.d.ts';

/**
 * Represents a SQL transaction for executing queries against a WebSQL database.
 * @public
 * @unofficial
 */
export interface SQLTransaction {
    /** Execute a SQL statement within this transaction. */
    executeSql(
        sqlStatement: string,
        arguments?: unknown[],
        callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
        errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean
    ): void;
}
