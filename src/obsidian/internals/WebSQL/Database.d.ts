import type { SQLError } from './SQLError.js';
import type { SQLTransaction } from './SQLTransaction.js';

/**
 * @public
 */
export interface Database {
    version: string;

    transaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;

    readTransaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;

    changeVersion(
        oldVersion: string,
        newVersion: string,
        callback?: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;
}
