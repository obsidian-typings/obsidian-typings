import type { DataAdapterFilesRecord } from '../internals/DataAdapterRecords/DataAdapterFilesRecord.d.ts';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface DataAdapter extends PromisedQueue {
        /**
         * Base OS path for the vault (e.g. /home/user/vault, or C:\Users\user\documents\vault)
         */
        basePath: string;
        /**
         * Mapping of file/folder path to vault entry, includes non-MD files
         */
        files: DataAdapterFilesRecord;
        /** @internal Handles vault events */
        handler: FileSystemWatchHandler | null;
        /** @internal */
        insensitive: boolean;
        /** @internal Triggers handler for vault events */
        trigger: FileSystemWatchHandler;

        /**
         * Check if a file exists.
         *
         * @param fullPath Full path to the file.
         * @param sensitive Whether to check case-sensitive.
         * @returns A promise that resolves to `true` if the file exists, `false` otherwise.
         */
        _exists(fullPath: string, sensitive?: boolean): Promise<boolean>;
        /**
         * Get canonical full path of file.
         *
         * @param path Path to file.
         * @returns Full path to file.
         */
        getFullPath(path: string): string;
        /**
         * Get canonical full path of file.
         *
         * @param normalizedPath Normalized path to file.
         * @returns String full path to file.
         */
        getFullRealPath(normalizedPath: string): string;
        /**
         * Get normalized path.
         * For vault-relative path, it's normalized vault-relative path.
         * For absolute path, it's path as is.
         *
         * @param path Path to file.
         * @returns Normalized path.
         */
        getRealPath(path: string): string;
        /**
         * @param normalizedPath Path to file
         * @returns String URL of form: app://FILEHASH/path/to/file
         * @internal Get resource path of file (URL path)
         */
        getResourcePath(normalizedPath: string): string;
        /** @internal Generates `this.files` for specific directory of the vault */
        listRecursive(normalizedPath: string): Promise<void>;
        /** @internal */
        onFileChange(normalizedPath: string | null): void;
        /**
         * Reconcile a deletion.
         *
         * @param normalizedPath Path to file
         * @param normalizedNewPath New path to file
         * @param shouldSkipDeletionTimeout Whether the deletion timeout should be skipped (default: `true`)
         * @returns A promise that resolves when the file is reconciled
         * @internal
         */
        reconcileDeletion(
            normalizedPath: string,
            normalizedNewPath: string,
            shouldSkipDeletionTimeout?: boolean
        ): Promise<void>;
        /**
         * Reconcile a file.
         *
         * @param normalizedPath Path to file
         * @param normalizedNewPath New path to file
         * @param shouldSkipDeletionTimeout Whether the deletion timeout should be skipped - applies only to {@link reconcileDeletion}
         * @returns A promise that resolves when the file is reconciled
         * @internal
         */
        reconcileFile(
            normalizedPath: string,
            normalizedNewPath: string,
            shouldSkipDeletionTimeout?: boolean
        ): Promise<void>;
        /** @internal */
        reconcileFolderCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /** @internal */
        reconcileInternalFile(normalizedPath: string): Promise<void>;
        /** @internal */
        reconcileSymbolicLinkCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /** @internal Remove file from files listing and trigger deletion event */
        removeFile(normalizedPath: string): void;
        /** @internal Remove all listeners */
        stopWatch(): void;
        /** @internal Set whether OS is insensitive to case */
        testInsensitive(): void;
        /** @internal */
        update(normalizedPath: string): Promise<void>;
        /** @internal Add change watcher to path */
        watch(handler: FileSystemWatchHandler): Promise<void>;
    }
}
