import type { Database } from '../../../obsidian/internals/web-sql/Database.d.ts';

export {};

declare global {
  /**
   * Open or create a WebSQL database.
   *
   * @param name - The name of the database.
   * @param version - The version of the database.
   * @param displayName - The display name of the database.
   * @param estimatedSize - The estimated size of the database in bytes.
   * @param creationCallback - Optional callback invoked when the database is created.
   * @returns The opened or created database.
   * @unofficial
   */
  function openDatabase(
    name: string,
    version: string,
    displayName: string,
    estimatedSize: number,
    creationCallback?: (database: Database) => void
  ): Database;
}
