import type { CapacitorAdapterFs } from '../internals/CapacitorAdapterFs.d.ts';
import type { CapacitorFileEntry } from '../internals/CapacitorFileEntry.d.ts';
import type { FileEntry } from '../internals/FileEntry.d.ts';

export {};

declare module 'obsidian' {
    interface CapacitorAdapter extends DataAdapter {
        fs: CapacitorAdapterFs;

        getNativePath(normalizedPath: string): string;
        /**
         * @param normalizedPath Path to directory.
         *
         * @internal Helper function for `listRecursive` reads children of directory.
         */
        listRecursiveChild(normalizedPath: string, child: FileEntry): Promise<void>;
        onFileChange(normalizedPath: string): void;
        open(normalizedPath: string): Promise<void>;
        quickList(normalizedFolderPath: string, fileEntry: FileEntry): void;
        reconcileFileChanged(realFilePath: string, normalizedPath: string, fileEntry: FileEntry): void;
        reconcileFileCreation(
            normalizedPath: string,
            normalizedNewPath: string,
            fileEntry: CapacitorFileEntry
        ): Promise<void>;
        removeFile(normalizedPath: string): Promise<void>;
        stopWatch(): Promise<void>;
        testInsensitive(): Promise<void>;
        update(normalizedPath: string): Promise<void>;
        watchAndList(): Promise<void>;
    }
}
