import type { CapacitorAdapterFs } from '../internals/CapacitorAdapterFs.d.ts';
import type { CapacitorFileEntry } from '../internals/CapacitorFileEntry.d.ts';
import type { FileEntry } from '../internals/FileEntry.d.ts';

export {};

declare module 'obsidian' {
    interface CapacitorAdapter extends DataAdapter {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        fs: CapacitorAdapterFs;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        getNativePath(normalizedPath: string): string;

        /**
         * Helper function for `listRecursive` reads children of directory.
         *
         * @param normalizedPath Path to directory.
         * @unofficial
         */
        listRecursiveChild(normalizedPath: string, child: FileEntry): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        quickList(normalizedFolderPath: string, fileEntry: FileEntry): void;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        removeFile(normalizedPath: string): Promise<void>;

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        update(normalizedPath: string): Promise<void>;
    }
}
