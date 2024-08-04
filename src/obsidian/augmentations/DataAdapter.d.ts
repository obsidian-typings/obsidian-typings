import type { IpcRenderer } from "electron";
import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import * as path from "node:path";
import type { DataAdapterFilesRecord } from "../internals/DataAdapterRecords/DataAdapterFilesRecord.js";
import type { DataAdapterWatchersRecord } from "../internals/DataAdapterRecords/DataAdapterWatchersRecord.js";

export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface DataAdapter {
        /**
         * Base OS path for the vault (e.g. /home/user/vault, or C:\Users\user\documents\vault)
         */
        basePath: string;
        /** @internal */
        btime: { btime(path: string, btime: number): void };
        /**
         * Mapping of file/folder path to vault entry, includes non-MD files
         */
        files: DataAdapterFilesRecord;
        /**
         * Reference to node fs module
         */
        fs?: typeof fs;
        /**
         * Reference to node fs:promises module
         */
        fsPromises?: typeof fsPromises;
        /** @internal */
        insensitive: boolean;
        /**
         * Reference to electron ipcRenderer module
         */
        ipcRenderer?: IpcRenderer;
        /**
         * Reference to node path module
         */
        path: typeof path;
        /** @internal */
        promise: Promise<unknown>;
        /**
         * Reference to node URL module
         */
        url: URL;
        /** @internal */
        watcher: unknown;
        /** @internal */
        watchers: DataAdapterWatchersRecord;

        /**
         * @param normalizedPath Path to file
         * @param options Data write options
         * @internal Apply data write options to file
         */
        applyWriteOptions(normalizedPath: string, options: DataWriteOptions): Promise<void>;
        /**
         * Get base path of vault (OS path)
         */
        getBasePath(): string;
        /**
         * Get full path of file (OS path)
         *
         * @param normalizedPath Path to file
         * @returns URL path to file
         */
        getFilePath(normalizedPath: string): string;
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
        /** @internal Handles vault events */
        handler(): void;
        /** @internal Kill file system action due to timeout */
        kill(): void;
        /** @internal */
        killLastAction(): void;
        /** @internal Generates `this.files` from the file system */
        listAll(): Promise<void>;
        /** @internal Generates `this.files` for specific directory of the vault */
        listRecursive(normalizedPath: string): Promise<void>;
        /**
         * @param normalizedPath Path to directory
         * @internal Helper function for `listRecursive` reads children of directory
         */
        listRecursiveChild(normalizedPath: string): Promise<void>;
        /** @internal */
        onFileChange(normalizedPath: string): void;
        /** @internal */
        queue(cb: unknown): Promise<void>;
        /** @internal */
        reconcileDeletion(normalizedPath: string, normalizedNewPath: string, option: boolean): Promise<void>;
        /** @internal */
        reconcileFile(normalizedPath: string, normalizedNewPath: string, option: boolean): Promise<void>;
        /** @internal */
        reconcileFileCreation(normalizedPath: string, normalizedNewPath: string, option: boolean): Promise<void>;
        /** @internal */
        reconcileFileInternal(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /** @internal */
        reconcileFolderCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /** @internal */
        reconcileInternalFile(normalizedPath: string): Promise<void>;
        /** @internal */
        reconcileSymbolicLinkCreation(normalizedPath: string, normalizedNewPath: string): Promise<void>;
        /** @internal Remove file from files listing and trigger deletion event */
        removeFile(normalizedPath: string): void;
        /** @internal */
        startWatchpath(normalizedPath: string): Promise<void>;
        /** @internal Remove all listeners */
        stopWatch(): void;
        /** @internal Remove listener on specific path */
        stopWatchPath(normalizedPath: string): void;
        /** @internal Set whether OS is insensitive to case */
        testInsensitive(): void;
        /** @internal */
        thingsHappening(): void;
        /** @internal */
        update(normalizedPath: string): unknown;
        /** @internal Add change watcher to path */
        watch(normalizedPath: string): Promise<void>;
        /** @internal Watch recursively for changes */
        watchHiddenRecursive(normalizedPath: string): Promise<void>;
    }
}
