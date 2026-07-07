import type { getSecretStorageConstructor } from '../implementations/constructors/augmentations/getSecretStorageConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A secret storage.
   *
   * @since 1.11.4
   */
  interface SecretStorage extends Events {
    /**
     * The platform-specific storage backend (OS-keychain-encrypted on desktop, plain on mobile), or `null` when none is available.
     *
     * @unofficial
     */
    adapter: unknown;

    /**
     * Reference to the app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * Debounced callback that persists {@link SecretStorage.secretsMeta} to local storage.
     *
     * @unofficial
     */
    saveMeta: Debouncer<[], void>;

    /**
     * Map of secret ID to its stored secret value.
     *
     * @unofficial
     */
    secrets: Record<string, string>;

    /**
     * Map of secret ID to its access metadata.
     *
     * @unofficial
     */
    secretsMeta: Record<string, SecretMetadata>;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getSecretStorageConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__?(app: App): this;

    /**
     * Deletes a secret from storage.
     *
     * @param id - the secret ID
     * @returns whether a secret with the given ID existed and was deleted
     * @unofficial
     */
    deleteSecret(id: string): boolean;

    /**
     * Gets the timestamp of the last recorded access for a secret.
     *
     * @param id - the secret ID
     * @returns the last-access timestamp in milliseconds, or `null` if never accessed
     * @unofficial
     */
    getLastAccess(id: string): null | number;

    /**
     * Gets a secret from storage
     *
     * @param id - the secret ID
     * @returns the secret value or `null` if not found
     * @official
     * @since 1.11.4
     */
    getSecret(id: string): null | string;

    /**
     * Checks whether OS-level encryption is available for the storage backend.
     *
     * @returns whether encryption is available
     * @unofficial
     */
    isEncryptionAvailable(): boolean;

    /**
     * Lists all secrets in storage
     *
     * @returns array of secret IDs
     * @official
     * @since 1.11.4
     */
    listSecrets(): string[];

    /**
     * Loads secrets and their metadata from the backend into memory.
     *
     * @returns a promise that resolves when loading completes
     * @unofficial
     */
    load(): Promise<void>;

    /**
     * Reads a secret without recording an access in its metadata.
     *
     * @param id - the secret ID
     * @returns the secret value, or `null` if not found
     * @unofficial
     */
    peekSecret(id: string): null | string;

    /**
     * Records an access to a secret, updating its last-access metadata.
     *
     * @param id - the secret ID
     * @unofficial
     */
    recordAccess(id: string): void;

    /**
     * Sets a secret in the storage.
     *
     * @param id - lowercase alphanumeric ID with optional dashes
     * @param secret - the secret value to store
     * @throws Error if ID is invalid
     * @official
     * @since 1.11.4
     */
    setSecret(id: string, secret: string): void;

    /**
     * Creates the platform-specific storage backend.
     *
     * @returns the backend instance, or `null` when none is available
     * @unofficial
     */
    setupStorage(): unknown;

    /**
     * Validates a secret ID (lowercase alphanumeric with optional dashes, at most 64 characters).
     *
     * @param id - the secret ID to validate
     * @returns whether the ID is valid
     * @unofficial
     */
    validateId(id: string): boolean;
  }
}
