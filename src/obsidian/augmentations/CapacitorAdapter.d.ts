import type { CapacitorAdapterFs } from "../internals/CapacitorAdapterFs.js";
import type { FileEntry } from "../internals/FileEntry.js";

export { };

declare module 'obsidian' {
    interface CapacitorAdapter extends DataAdapter {
        fs: CapacitorAdapterFs;

        getNativePath(normalizedPath: string): string;
        getRealPath(normalizedPath: string): string;
        onFileChange(normalizedPath: string): void;
        open(normalizedPath: string): Promise<void>;
        quickList(normalizedFolderPath: string, fileEntry: FileEntry): void;
        reconcileFileChanged(realFilePath: string, normalizedPath: string, fileEntry: FileEntry): void;
        removeFile(normalizedPath: string): Promise<void>;
        stopWatch(): Promise<void>;
        testInsensitive(): Promise<void>;
        update(normalizedPath: string): Promise<void>;
        watchAndList(): Promise<void>;
        _exists(normalizedPath: string, sensitive?: boolean): Promise<boolean>;
    }
}
