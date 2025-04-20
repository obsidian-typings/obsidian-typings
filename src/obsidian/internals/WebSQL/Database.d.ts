import type { SQLError } from './SQLError.d.ts';
import type { SQLTransaction } from './SQLTransaction.d.ts';

/**
 * @public
 * @unofficial
 */
export interface Database {
    /**
     * @todo Documentation incomplete.
     */
    version: string;

    /**
     * @todo Documentation incomplete.
     */
    changeVersion(
        oldVersion: string,
        newVersion: string,
        callback?: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;

    /**
     * @todo Documentation incomplete.
     */
    readTransaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;

    /**
     * @todo Documentation incomplete.
     */
    transaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;
}
