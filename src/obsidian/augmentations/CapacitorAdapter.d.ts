import type { CapacitorAdapterFs } from '../internals/CapacitorAdapterFs.d.ts';
import type { CapacitorFileEntry } from '../internals/CapacitorFileEntry.d.ts';
import type { FileEntry } from '../internals/FileEntry.d.ts';

export {};

declare module 'obsidian' {
    interface CapacitorAdapter extends DataAdapter {
        /** @unofficial */
        fs: CapacitorAdapterFs;

        /** @unofficial */
        getNativePath(normalizedPath: string): string;

        /**
         * Helper function for `listRecursive` reads children of directory.
         *
         * @param normalizedPath Path to directory.
         * @unofficial
         */
        listRecursiveChild(normalizedPath: string, child: FileEntry): Promise<void>;

        /** @unofficial */
        onFileChange(normalizedPath: string): void;

        /** @unofficial */
        open(normalizedPath: string): Promise<void>;

        /** @unofficial */
        quickList(normalizedFolderPath: string, fileEntry: FileEntry): void;

        /** @unofficial */
        reconcileFileCreation(
            normalizedPath: string,
            normalizedNewPath: string,
            fileEntry: CapacitorFileEntry
        ): Promise<void>;

        /** @unofficial */
        removeFile(normalizedPath: string): Promise<void>;

        /** @unofficial */
        stopWatch(): Promise<void>;

        /** @unofficial */
        testInsensitive(): Promise<void>;

        /** @unofficial */
        update(normalizedPath: string): Promise<void>;
    }
}
