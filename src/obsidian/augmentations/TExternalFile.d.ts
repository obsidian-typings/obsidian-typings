export {};

declare module 'obsidian' {
  /**
   * Represents a file that is outside the Vault.
   * Can be used with the vault API just like any other file.
   * Do not create these manually.
   *
   * @since 1.14.4
   */
  interface TExternalFile extends TFile {
    /**
     * Returns the physical path in the filesystem.
     *
     * @returns The physical path in the filesystem.
     * @official
     * @since 1.14.4
     */
    getRealPath(): string;
  }
}
