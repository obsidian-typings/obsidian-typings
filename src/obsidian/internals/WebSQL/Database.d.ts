import type { SQLError } from './SQLError.js';
import type { SQLTransaction } from './SQLTransaction.js';

/** @public */
export interface Database {
    version: string;

    changeVersion(
        oldVersion: string,
        newVersion: string,
        callback?: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;
    readTransaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;
    transaction(
        callback: (transaction: SQLTransaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
    ): void;
}
