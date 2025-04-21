import type { DataAdapterFilesRecord } from '../internals/DataAdapterRecords/DataAdapterFilesRecord.d.ts';
import type { FileSystemWatchHandler } from '../internals/FileSystemWatchHandler.d.ts';
import type { PromisedQueue } from '../internals/PromisedQueue.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Work directly with files and folders inside a vault.
     * If possible prefer using the {@link Vault} API over this.
     */
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
         * Add text to the end of a plaintext file.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @param data - the text to append.
         * @param options - write options.
         * @returns A promise that resolves when the file is written.
         * @example
         * ```ts
         * await app.vault.adapter.append('foo/bar.md', 'baz');
         * ```
         * @official
         */
        append(normalizedPath: string, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Create a copy of a file.
         * This will fail if there is already a file at `normalizedNewPath`.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @param normalizedNewPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves when the file is copied.
         * @example
         * ```ts
         * await app.vault.adapter.copy('foo/bar.jpg', 'baz/qux.jpg');
         * ```
         * @official
         */
        copy(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Check if something exists at the given path. For a faster way to synchronously check.
         * if a note or attachment is in the vault, use {@link Vault.getAbstractFileByPath}.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @param sensitive - Some file systems/operating systems are case-insensitive, set to `true` to force a case-sensitivity check.
         * @returns A promise that resolves to `true` if the file/folder exists, `false` otherwise.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.exists('foo/bar.md'));
         * ```
         * @official
         */
        exists(normalizedPath: string, sensitive?: boolean): Promise<boolean>;

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
         * Gets the name of the vault.
         *
         * @official
         */
        getName(): string;

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
         * Returns an URI for the browser engine to use, for example to embed an image.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @returns A URI for the browser engine to use.
         * @example
         * ```ts
         * console.log(app.vault.adapter.getResourcePath('foo/bar.jpg'));
         * ```
         * @official
         */
        getResourcePath(normalizedPath: string): string;

        /**
         * Retrieve a list of all files and folders inside the given folder, non-recursive.
         *
         * @param normalizedPath - path to folder, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves to the list of files and folders inside the given folder.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.list('foo'));
         * ```
         * @official
         */
        list(normalizedPath: string): Promise<ListedFiles>;

        /**
         * Generates `this.files` for specific directory of the vault
         *
         * @unofficial
         */
        listRecursive(normalizedPath: string): Promise<void>;

        /**
         * Create a directory.
         *
         * @param normalizedPath - path to use for new folder, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves when the directory is created.
         * @example
         * ```ts
         * await app.vault.adapter.mkdir('foo');
         * ```
         * @official
         */
        mkdir(normalizedPath: string): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onFileChange(normalizedPath: string | null): void;

        /**
         * Atomically read, modify, and save the contents of a plaintext file.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @param fn - a callback function which returns the new content of the file synchronously.
         * @param options - write options.
         * @returns A promise that resolves to the text value of the file that was written.
         * @example
         * ```ts
         * await app.vault.adapter.process('foo/bar.md', (data) => {
         *   return data.replace('foo', 'bar');
         * });
         * ```
         * @official
         */
        process(normalizedPath: string, fn: (data: string) => string, options?: DataWriteOptions): Promise<string>;

        /**
         * Read the contents of a file.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves to the contents of the file.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.read('foo/bar.md'));
         * ```
         * @official
         */
        read(normalizedPath: string): Promise<string>;

        /**
         * Read the contents of a binary file.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves to the contents of the file.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.readBinary('foo/bar.jpg'));
         * ```
         * @official
         */
        readBinary(normalizedPath: string): Promise<ArrayBuffer>;

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
         * Delete a file.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves when the file is deleted.
         * @example
         * ```ts
         * await app.vault.adapter.remove('foo/bar.jpg');
         * ```
         * @official
         */
        remove(normalizedPath: string): Promise<void>;

        /**
         * Remove file from files listing and trigger deletion event.
         *
         * @unofficial
         */
        removeFile(normalizedPath: string): void;

        /**
         * Rename a file or folder.
         *
         * @param normalizedPath - current path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @param normalizedNewPath - new path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves when the file is renamed.
         * @example
         * ```ts
         * await app.vault.adapter.rename('foo/bar.jpg', 'baz/qux.jpg');
         * ```
         * @official
         */
        rename(normalizedPath: string, normalizedNewPath: string): Promise<void>;

        /**
         * Remove a directory.
         *
         * @param normalizedPath - path to folder, use {@link normalizePath} to normalize beforehand.
         * @param recursive - If `true`, delete folders under this folder recursively, if `false` the folder needs to be empty.
         * @example
         * ```ts
         * await app.vault.adapter.rmdir('foo', true);
         * ```
         * @official
         */
        rmdir(normalizedPath: string, recursive: boolean): Promise<void>;

        /**
         * Retrieve metadata about the given file/folder.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves to the stats of the file/folder, or `null` if it does not exist.
         * @example
         * ```ts
         * console.log(await app.vault.adapter.stat('foo/bar.md'));
         * ```
         * @official
         */
        stat(normalizedPath: string): Promise<Stat | null>;

        /**
         * Remove all listeners.
         *
         * @unofficial
         */
        stopWatch(): void;

        /**
         * Move to local trash.
         * Files will be moved into the `.trash` folder at the root of the vault.
         *
         * @param normalizedPath - path to file/folder, use {@link normalizePath} to normalize beforehand.
         * @returns A promise that resolves when the file is moved to the local trash.
         * @example
         * ```ts
         * await app.vault.adapter.trashLocal('foo/bar.jpg');
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

        /**
         * Write to a plaintext file.
         * If the file exists its content will be overwritten, otherwise the file will be created.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @param data - new file content.
         * @param options - write options.
         * @returns A promise that resolves when the file is written.
         * @example
         * ```ts
         * await app.vault.adapter.write('foo/bar.md', 'baz');
         * ```
         * @official
         */
        write(normalizedPath: string, data: string, options?: DataWriteOptions): Promise<void>;

        /**
         * Write to a binary file.
         * If the file exists its content will be overwritten, otherwise the file will be created.
         *
         * @param normalizedPath - path to file, use {@link normalizePath} to normalize beforehand.
         * @param data - the new file content.
         * @param options - write options.
         * @returns A promise that resolves when the file is written.
         * @example
         * ```ts
         * await app.vault.adapter.writeBinary('foo/bar.jpg', new Uint8Array([1, 2, 3]).buffer);
         * ```
         * @official
         */
        writeBinary(normalizedPath: string, data: ArrayBuffer, options?: DataWriteOptions): Promise<void>;
    }
}
