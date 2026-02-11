export {};

declare module 'obsidian' {
    /**
     * A secret storage.
     * @since 1.11.4
     */
    interface SecretStorage {
        /**
         * Gets the last access timestamp for a secret key
         * @param id The secret ID
         * @returns Timestamp in milliseconds, or null if never accessed
         * @official
         */
        getLastAccess(id: string): number | null;

        /**
         * Gets a secret from storage
         *
         * @param id - the secret ID
         * @returns the secret value or null if not found
         * @official
         * @since 1.11.4
         */
        getSecret(id: string): string | null;

        /**
         * Lists all secrets in storage
         *
         * @returns array of secret IDs
         * @official
         * @since 1.11.4
         */
        listSecrets(): string[];

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
    }
}
