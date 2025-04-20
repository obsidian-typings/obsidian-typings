import type { SQLError } from './SQLError.d.ts';
import type { SQLResultSet } from './SQLResultSet.d.ts';

/**
 * @public
 * @unofficial
 */
export interface SQLTransaction {
    /**
     * @todo Documentation incomplete.
     */
    executeSql(
        sqlStatement: string,
        arguments?: unknown[],
        callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
        errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean
    ): void;
}
