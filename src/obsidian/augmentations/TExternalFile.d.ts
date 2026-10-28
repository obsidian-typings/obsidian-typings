import type { ExternalFileMonitor } from '../internals/external-files/ExternalFileMonitor.d.ts';

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
     * Cached metadata, cleared when the file changes or loses its last user.
     *
     * @unofficial
     */
    metadata: CachedMetadata | null;

    /**
     * Monitor watching this file for external changes.
     *
     * @unofficial
     */
    monitor: ExternalFileMonitor;

    /**
     * Identities retaining the file for external change monitoring.
     *
     * @unofficial
     */
    users: Set<unknown>;

    /**
     * Retains a user and starts external change monitoring if necessary.
     *
     * @param user - The identity retaining the file.
     * @unofficial
     */
    addUser(user: unknown): void;

    /**
     * Returns the physical path in the filesystem.
     *
     * @returns The physical path in the filesystem.
     * @official
     * @since 1.14.4
     */
    getRealPath(): string;

    /**
     * Checks whether any users retain this file.
     *
     * @returns Whether the file has users.
     * @unofficial
     */
    hasUsers(): boolean;

    /**
     * Releases a user; the last release stops monitoring and clears cached data and metadata.
     *
     * @param user - The identity to release.
     * @unofficial
     */
    removeUser(user: unknown): void;
  }
}
