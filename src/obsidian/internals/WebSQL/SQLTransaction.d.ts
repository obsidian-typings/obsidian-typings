import type { SQLError } from './SQLError.js';
import type { SQLResultSet } from './SQLResultSet.js';

/**
 * @public
 */
export interface SQLTransaction {
    executeSql(
        sqlStatement: string,
        arguments?: unknown[],
        callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
        errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean
    ): void;
}
