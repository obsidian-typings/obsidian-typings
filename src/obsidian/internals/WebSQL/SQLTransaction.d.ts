import type { SQLError } from './SQLError.d.ts';
import type { SQLResultSet } from './SQLResultSet.d.ts';

/** @public */
export interface SQLTransaction {
    executeSql(
        sqlStatement: string,
        arguments?: unknown[],
        callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
        errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean
    ): void;
}
