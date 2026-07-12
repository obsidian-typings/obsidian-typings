/**
 * Options for moving the application into the Applications folder.
 *
 * @public
 * @unofficial
 */
export interface ElectronMoveToApplicationsFolderOptions {
  /**
   * A handler for potential conflict in move failure.
   *
   * @param conflictType - The type of conflict encountered.
   * @returns Whether the move should proceed with the default behavior.
   */
  conflictHandler?(conflictType: 'exists' | 'existsAndRunning'): boolean;
}
