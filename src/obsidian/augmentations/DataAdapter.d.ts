import type { DataAdapterFilesRecord } from '../internals/DataAdapterRecords/DataAdapterFilesRecord.d.ts';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface DataAdapter extends PromisedQueue {
        /**
         * Base OS path for the vault (e.g. /home/user/vault, or C:\Users\user\documents\vault).
         *
         * @unofficial
         */
        basePath: string;

        /**
         * Mapping of file/folder path to vault entry, includes non-MD files.
         *
         * @unofficial
         */
        files: DataAdapterFilesRecord;

        /**
         * Handles vault events.
         *
         * @unofficial
         */
        handler: FileSystemWatchHandler | null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        insensitive: boolean;

        /**
         * Triggers handler for vault events.
         *
         * @unofficial
         */
        trigger: FileSystemWatchHandler;

        /**
         * Check if a file exists.
         *
         * @param fullPath Full path to the file.
         * @param sensitive Whether to check case-sensitive.
         * @returns A promise that resolves to `true` if the file exists, `false` otherwise.
         * @unofficial
         */
        _exists(fullPath: string, sensitive?: boolean): Promise<boolean>;

        /**
         * Get canonical full path of file.
         *
         * @param path Path to file.
         * @returns Full path to file.
         * @unofficial
         */
        getFullPath(path: string): string;

        /**
         * Get canonical full path of file.
         *
         * @param normalizedPath Normalized path to file.
         * @returns String full path to file.
         * @unofficial
         */
        getFullRealPath(normalizedPath: string): string;

        /**
         * Get normalized path.
         *
         * For vault-relative path, it's normalized vault-relative path.
         * For absolute path, it's path as is.
         *
         * @param path Path to file.
         * @returns Normalized path.
         * @unofficial
         */
        getRealPath(path: string): string;

        /**
         * Get resource path of file (URL path).
         *
         * @param normalizedPath Path to file.
         * @returns String URL of form: app://FILEHASH/path/to/file.
         * @unofficial
         */
        getResourcePath(normalizedPath: string): string;

        /**
         * Generates `this.files` for specific directory of the vault
         *
         * @unofficial
         */
        listRecursive(normalizedPath: string): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onFileChange(normalizedPath: string | null): void;

        /**
         * Reconcile a deletion.
         *
         * @param normalizedPath Path to file.
         * @param normalizedNewPath New path to file.
         * @param shouldSkipDeletionTimeout Whether the deletion timeout should be skipped (default: `true`).
         * @returns A promise that resolves when the file is reconciled.
         * @unofficial
         */
        reconcileDeletion(
            normalizedPath: string,
            normalizedNewPath: string,
            shouldSkipDeletionTimeout?: boolean
        ): Promise<void>;

        /**
         * Reconcile a file.
         *
         * @param normalizedPath Path to file.
         * @param normalizedNewPath New path to file.
         * @param shouldSkipDeletionTimeout Whether the deletion timeout should be skipped - applies only to {@link reconcileDeletion}.
         * @returns A promise that resolves when the file is reconciled.
         * @unofficial
         */
        reconcileFile(
            normalizedPath: string,
            normalizedNewPath: string,
            shouldSkipDeletionTimeout?: boolean
        ): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        reconcileFolderCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        reconcileInternalFile(normalizedPath: string): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        reconcileSymbolicLinkCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Remove file from files listing and trigger deletion event.
         *
         * @unofficial
         */
        removeFile(normalizedPath: string): void;

        /**
         * Remove all listeners.
         *
         * @unofficial
         */
        stopWatch(): void;

        /**
         * Set whether OS is insensitive to case.
         *
         * @unofficial
         */
        update(normalizedPath: string): Promise<void>;

        /**
         * Add change watcher to path.
         *
         * @unofficial
         */
        watch(handler: FileSystemWatchHandler): Promise<void>;
    }
}
