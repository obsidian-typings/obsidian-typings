export {};

declare module 'obsidian' {
  /**
   * A captured pre-modification snapshot of a file, used to undo a bulk modification.
   */
  export interface BulkUndoRecord {
    /**
     * The file content to restore.
     *
     * @unofficial
     */
    content: string;

    /**
     * The file to restore.
     *
     * @unofficial
     */
    file: TFile;

    /**
     * The modification time to restore, in milliseconds.
     *
     * @unofficial
     */
    mtime: number;
  }
}
