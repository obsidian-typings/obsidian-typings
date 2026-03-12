import type { SQLError } from './SQLError.d.ts';
import type { SQLTransaction } from './SQLTransaction.d.ts';

/**
 * Represents a WebSQL database instance.
 *
 * @public
 * @unofficial
 */
export interface Database {
  /** Current version string of the database schema. */
  version: string;

  /** Change the database version, optionally running a migration transaction. */
  changeVersion(
    oldVersion: string,
    newVersion: string,
    callback?: (transaction: SQLTransaction) => void,
    errorCallback?: (error: SQLError) => void,
    successCallback?: () => void
  ): void;

  /** Execute a read-only transaction against the database. */
  readTransaction(
    callback: (transaction: SQLTransaction) => void,
    errorCallback?: (error: SQLError) => void,
    successCallback?: () => void
  ): void;

  /** Execute a read-write transaction against the database. */
  transaction(
    callback: (transaction: SQLTransaction) => void,
    errorCallback?: (error: SQLError) => void,
    successCallback?: () => void
  ): void;
}
