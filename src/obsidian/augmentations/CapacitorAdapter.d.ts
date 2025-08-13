import type { CapacitorAdapterFs } from '../internals/CapacitorAdapterFs.d.ts';
import type { CapacitorFileEntry } from '../internals/CapacitorFileEntry.d.ts';
import type { FileEntry } from '../internals/FileEntry.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Implementation of the vault adapter for mobile devices.
     *
     * `app.vault.adapter` returns an instance of `CapacitorAdapter` on mobile devices.
     */
    interface CapacitorAdapter extends DataAdapter {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        fs: CapacitorAdapterFs;

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
         * Gets the full path for a file.
         *
         * @param normalizedPath - The path to get the full path for.
         * @returns The full path for the file.
         * @example
         * ```ts
         * console.log(app.vault.adapter.getFullPath('foo/bar.md')) // /storage/emulated/0/path/to/vault/foo/bar.md
         * ```
         * @official
         */
        getFullPath(normalizedPath: string): string;

        /**
         * Get the name of the vault.
         *
         * @returns The name of the vault.
         * @official
         */
        getName(): string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getNativePath(normalizedPath: string): string;

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
         * Helper function for `listRecursive` reads children of directory.
         *
         * @param normalizedPath Path to directory.
         * @unofficial
         */
        listRecursiveChild(normalizedPath: string, child: FileEntry): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        onFileChange(normalizedPath: string): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        open(normalizedPath: string): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        quickList(normalizedFolderPath: string, fileEntry: FileEntry): void;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        reconcileFileCreation(
            normalizedPath: string,
            normalizedNewPath: string,
            fileEntry: CapacitorFileEntry
        ): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        removeFile(normalizedPath: string): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        stopWatch(): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        testInsensitive(): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        update(normalizedPath: string): Promise<void>;

        /**
         * Add change watcher to path.
         *
         * @unofficial
         */
        watch(normalizedPath: string): Promise<void>;

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
}
