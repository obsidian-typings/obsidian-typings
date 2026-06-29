export {};

declare module 'obsidian' {
  /**
   * Access metadata for a stored secret.
   */
  export interface SecretMetadata {
    /**
     * Timestamp in milliseconds of the last recorded access.
     *
     * @unofficial
     */
    lastAccess?: number;
  }
}
