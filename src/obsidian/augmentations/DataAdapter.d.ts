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
        /** @internal */
        promise: Promise<void>;
        /** @internal Triggers handler for vault events */
        trigger: FileSystemWatchHandler;

        /**
         * Get full path of file (OS path)
         *
         * @param normalizedPath Path to file
         * @returns String full path to file
         */
        getFullPath(normalizedPath: string): string;
        /**
         * Get full path of file (OS path)
         *
         * @param normalizedPath Path to file
         * @returns String full path to file
         */
        getFullRealPath(normalizedPath: string): string;
        /**
         * @param normalizedPath Path to file
         * @returns String URL of form: app://FILEHASH/path/to/file
         * @internal Get resource path of file (URL path)
         */
        getResourcePath(normalizedPath: string): string;
        /** @internal Generates `this.files` for specific directory of the vault */
        listRecursive(normalizedPath: string): Promise<void>;
        /** @internal */
        onFileChange(normalizedPath: string): void;
        /** @internal */
        reconcileDeletion(normalizedPath: string, normalizedNewPath: string, option: boolean): Promise<void>;
        /** @internal */
        reconcileFile(normalizedPath: string, normalizedNewPath: string, option: boolean): Promise<void>;
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
        update(normalizedPath: string): unknown;
        /** @internal Add change watcher to path */
        watch(handler: FileSystemWatchHandler): Promise<void>;
    }
}
