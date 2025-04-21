import type { IpcRenderer } from 'electron';
import * as fs from 'node:fs';
import type { Stats } from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';
import type { Btime } from '../internals/Btime.d.ts';
import type { DataAdapterWatchersRecord } from '../internals/DataAdapterRecords/DataAdapterWatchersRecord.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Implementation of the vault adapter for desktop.
     *
     * `app.vault.adapter` returns an instance of `FileSystemAdapter` on desktop devices.
     */
    interface FileSystemAdapter extends DataAdapter {
        /**
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        watchers: DataAdapterWatchersRecord;

        /**
         * Appends data to a file.
         *
         * @param normalizedPath - The path to append.
         * @param data - The data to append.
         * @param options - The options to append.
         * @returns A promise that resolves when the file is appended.
         * @example
         * ```ts
         * await app.vault.adapter.append('foo/bar.md', 'baz');
         * ```
         * @official
         */
        append(normalizedPath: string, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Apply data write options to file.
         *
         * @param normalizedPath Path to file.
         * @param options Data write options.
         * @unofficial
         */
        applyWriteOptions(normalizedPath: string, options: DataWriteOptions): Promise<void>;

        /**
         * Copies a file.
         *
         * @param normalizedPath - The path to copy.
         * @param normalizedNewPath - The new path.
         * @returns A promise that resolves when the file is copied.
         * @example
         * ```ts
         * await app.vault.adapter.copy('foo/bar.md', 'baz/qux.md');
         * ```
         * @official
         */
        copy(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Copy a file or directory recursively.
         *
         * @param sourcePath - Source path.
         * @param destinationPath - Destination path.
         * @returns A promise that resolves when the copy is complete.
         * @unofficial
         */
        copyRecursive(sourcePath: string, destinationPath: string): Promise<void>;

        /**
         * Checks if a file exists.
         *
         * @param normalizedPath - The path to check.
         * @param sensitive - Whether to check case-sensitivity.
         * @returns A promise that resolves with whether the file exists.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.exists('foo/bar.md'));
         * ```
         * @official
         */
        exists(normalizedPath: string, sensitive?: boolean): Promise<boolean>;

        /**
         * Get base path of vault (OS path).
         *
         * @unofficial
         */
        getBasePath(): string;

        /**
         * Get the absolute path to the vault.
         *
         * @official
         */
        getBasePath(): string;

        /**
         * Get full path of file (OS path).
         *
         * @param normalizedPath Path to file.
         * @returns URL path to file.
         * @unofficial
         */
        getFilePath(normalizedPath: string): string;

        /**
         * Returns the file:// path of this file.
         *
         * @param normalizedPath - The path to get the file path for.
         * @returns The file path.
         * @example
         * ```ts
         * console.log('foo/bar.md'); // file:///C:/Users/John/Documents/ObsidianVault/foo/bar.md
         * ```
         * @official
         */
        getFilePath(normalizedPath: string): string;

        /**
         * Gets the full path for a file.
         *
         * @param normalizedPath - The path to get the full path for.
         * @returns The full path for the file.
         * @example
         * ```ts
         * console.log(app.vault.adapter.getFullPath('foo/bar.md')) // C:\Users\John\Documents\ObsidianVault\foo\bar.md
         * ```
         * @official
         */
        getFullPath(normalizedPath: string): string;

        /**
         * Get the name of the vault.
         *
         * @official
         */
        getName(): string;

        /**
         * Returns an URI for the browser engine to use, for example to embed an image.
         *
         * @param normalizedPath - The path to get the resource path for.
         * @returns A URI for the browser engine to use.
         * @example
         * ```ts
         * console.log(app.vault.adapter.getResourcePath('foo/bar.jpg'));
         * ```
         * @official
         */
        getResourcePath(normalizedPath: string): string;

        /**
         * Kill file system action due to timeout.
         *
         * @unofficial
         */
        kill(): void;

        /**
         * Lists all files and folders inside a folder.
         *
         * @param normalizedPath - The path to list.
         * @returns A promise that resolves with the listed files.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.list('foo'));
         * ```
         * @official
         */
        list(normalizedPath: string): Promise<ListedFiles>;

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
         * @unofficial
         */
        listRecursiveChild(normalizedPath: string, child: string): Promise<void>;

        /**
         * Creates a new directory.
         *
         * @param normalizedPath - The path to create the directory.
         * @returns A promise that resolves when the directory is created.
         * @example
         * ```ts
         * await app.vault.adapter.mkdir('foo');
         * ```
         * @official
         */
        mkdir(normalizedPath: string): Promise<void>;

        /**
         * Atomically read, modify, and save the contents of a plaintext file.
         *
         * @param normalizedPath - The path to process.
         * @param fn - The function to process the file.
         * @param options - The options to process the file.
         * @returns A promise that resolves with the processed file.
         * @example
         * ```ts
         * await app.vault.adapter.process('foo/bar.md', (data) => {
         *     return data.replace('foo', 'bar');
         * });
         * ```
         * @official
         */
        process(normalizedPath: string, fn: (data: string) => string, options?: DataWriteOptions): Promise<string>;

        /**
         * Reads a file.
         *
         * @param normalizedPath - The path to read.
         * @returns A promise that resolves with the file content.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.read('foo/bar.md'));
         * ```
         * @official
         */
        read(normalizedPath: string): Promise<string>;

        /**
         * Reads a file as a binary buffer.
         *
         * @param normalizedPath - The path to read.
         * @returns A promise that resolves with the file content.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.readBinary('foo/bar.jpg'));
         * ```
         * @official
         */
        readBinary(normalizedPath: string): Promise<ArrayBuffer>;

        /**
         * Reconcile file creation.
         *
         * @param normalizedPath - Path to file.
         * @param normalizedNewPath - Path to new file.
         * @param stats - Stats object.
         * @unofficial
         */
        reconcileFileCreation(normalizedPath: string, normalizedNewPath: string, stats: Stats): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        reconcileFileInternal(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Removes a file.
         *
         * @param normalizedPath - The path to remove.
         * @returns A promise that resolves when the file is removed.
         * @example
         * ```ts
         * await app.vault.adapter.remove('foo/bar.md');
         * ```
         * @official
         */
        remove(normalizedPath: string): Promise<void>;

        /**
         * Renames a file.
         *
         * @param normalizedPath - The path to rename.
         * @param normalizedNewPath - The new path.
         * @returns A promise that resolves when the file is renamed.
         * @example
         * ```ts
         * await app.vault.adapter.rename('foo/bar.md', 'baz/qux.md');
         * ```
         * @official
         */
        rename(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Deletes a directory.
         *
         * @param normalizedPath - The path to delete.
         * @param recursive - Whether to delete the directory recursively.
         * @returns A promise that resolves when the directory is deleted.
         * @example
         * ```ts
         * await app.vault.adapter.rmdir('foo', true);
         * ```
         * @official
         */
        rmdir(normalizedPath: string, recursive: boolean): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        startWatchPath(normalizedPath: string): Promise<void>;

        /**
         * Retrieves file stats about a file.
         *
         * @param normalizedPath - The path to retrieve stats for.
         * @returns A promise that resolves with the stats.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.stat('foo/bar.md'));
         * ```
         * @official
         */
        stat(normalizedPath: string): Promise<Stat | null>;

        /**
         * Remove listener on specific path.
         *
         * @unofficial
         */
        stopWatchPath(normalizedPath: string): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        thingsHappening(): Debouncer<[], void>;

        /**
         * Move to local trash.
         * Files will be moved into the `.trash` folder at the root of the vault.
         *
         * @param normalizedPath - The path to delete.
         * @returns A promise that resolves when the file or directory is deleted.
         * @example
         * ```ts
         * await app.vault.adapter.trashLocal('foo/bar.md');
         * ```
         * @official
         */
        trashLocal(normalizedPath: string): Promise<void>;

        /**
         * Try moving to system trash.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @returns Returns a promise that resolves to `true` if succeeded. This can fail due to system trash being disabled.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.trashSystem('foo/bar.jpg'));
         * ```
         * @official
         */
        trashSystem(normalizedPath: string): Promise<boolean>;

        /**
         * Watch recursively for changes.
         *
         * @unofficial
         */
        watchHiddenRecursive(normalizedPath: string): Promise<void>;

        /**
         * Writes a file.
         *
         * @param normalizedPath - The path to write.
         * @param data - The data to write.
         * @param options - The options to write.
         * @returns A promise that resolves when the file is written.
         * @example
         * ```ts
         * await app.vault.adapter.write('foo/bar.md', 'baz');
         * ```
         * @official
         */
        write(normalizedPath: string, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Writes a file as a binary buffer.
         *
         * @param normalizedPath - The path to write.
         * @param data - The data to write.
         * @param options - The options to write.
         * @returns A promise that resolves when the file is written.
         * @example
         * ```ts
         * await app.vault.adapter.writeBinary('foo/bar.jpg', new Uint8Array([1, 2, 3]).buffer);
         * ```
         * @official
         */
        writeBinary(normalizedPath: string, data: ArrayBuffer, options?: DataWriteOptions): Promise<void>;
    }

    namespace FileSystemAdapter {
        /**
         * Create a new directory.
         *
         * @param path - The absolute path to create the directory at.
         * @returns A promise that resolves when the directory is created.
         *
         * @example
         * ```ts
         * await FileSystemAdapter.mkdir('C:\\Users\\John\\Documents\\ObsidianVault\\foo\\bar');
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link mkdir} instead.
         */
        function mkdir__(path: string): Promise<void>;

        /**
         * Read a local file.
         *
         * @param path - The absolute path to read the file from.
         * @returns A promise that resolves with the file content.
         *
         * @example
         * ```ts
         * console.log(await FileSystemAdapter.readLocalFile('C:\\Users\\John\\Documents\\ObsidianVault\\foo\\bar.md'));
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link readLocalFile} instead.
         */
        function readLocalFile__(path: string): Promise<ArrayBuffer>;
    }
}
