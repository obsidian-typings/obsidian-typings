import type { IpcRenderer } from 'electron';
import * as fs from 'node:fs';
import type { Stats } from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import type { Btime } from '../internals/Btime.d.ts';
import type { DataAdapterWatchersRecord } from '../internals/DataAdapterRecords/DataAdapterWatchersRecord.d.ts';

export {};

declare module 'obsidian' {
    interface FileSystemAdapter extends DataAdapter {
        /**
         * @unofficial
         */
        btime: Btime;
        /**
         * Reference to node fs module.
         *
         * @unofficial
         */
        fs: typeof fs;
        /**
         * Reference to node fs:promises module.
         *
         * @unofficial
         */
        fsPromises: typeof fsPromises;
        /**
         * Reference to electron ipcRenderer module.
         *
         * @unofficial
         */
        ipcRenderer?: IpcRenderer;
        /**
         * Kill last action.
         *
         * @unofficial
         */
        killLastAction: null | ((e: Error) => void);
        /**
         * Reference to node path module.
         *
         * @unofficial
         */
        path: typeof path;
        /**
         * Reference to node URL module.
         *
         * @unofficial
         */
        url: typeof URL;
        /**
         * Seems to always be `null` and unused.
         *
         * @unofficial
         */
        watcher: null;
        /**
         * @unofficial
         */
        watchers: DataAdapterWatchersRecord;

        /**
         * Apply data write options to file.
         *
         * @param normalizedPath Path to file.
         *
         * @param options Data write options.
         *
         * @unofficial
         */
        applyWriteOptions(normalizedPath: string, options: DataWriteOptions): Promise<void>;
        /**
         * Copy a file or directory recursively.
         *
         * @param sourcePath - Source path.
         * @param destinationPath - Destination path.
         * @returns A promise that resolves when the copy is complete.
         *
         * @unofficial
         */
        copyRecursive(sourcePath: string, destinationPath: string): Promise<void>;
        /**
         * Get base path of vault (OS path).
         *
         * @unofficial
         */
        getBasePath(): string;
        /**
         * Get full path of file (OS path).
         *
         * @param normalizedPath Path to file.
         * @returns URL path to file.
         *
         * @unofficial
         */
        getFilePath(normalizedPath: string): string;
        /**
         * Kill file system action due to timeout.
         *
         * @unofficial
         */
        kill(): void;
        /**
         * Generates `this.files` from the file system.
         *
         * @unofficial
         */
        listAll(): Promise<void>;
        /**
         * Helper function for `listRecursive` reads children of directory.
         *
         * @param normalizedPath Path to directory.
         * @param child File entry.
         *
         * @unofficial
         */
        listRecursiveChild(normalizedPath: string, child: string): Promise<void>;
        /**
         * Reconcile file creation.
         *
         * @param normalizedPath - Path to file.
         * @param normalizedNewPath - Path to new file.
         * @param stats - Stats object.
         *
         * @unofficial
         */
        reconcileFileCreation(normalizedPath: string, normalizedNewPath: string, stats: Stats): Promise<void>;
        /**
         * @unofficial
         */
        reconcileFileInternal(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /**
         * @unofficial
         */
        startWatchPath(normalizedPath: string): Promise<void>;
        /**
         * Remove listener on specific path.
         *
         * @unofficial
         */
        stopWatchPath(normalizedPath: string): void;
        /**
         * @unofficial
         */
        thingsHappening(): Debouncer<[], void>;
        /**
         * Watch recursively for changes.
         *
         * @unofficial
         */
        watchHiddenRecursive(normalizedPath: string): Promise<void>;
    }
}
