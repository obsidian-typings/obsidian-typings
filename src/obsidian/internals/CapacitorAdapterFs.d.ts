import type { CapacitorFileEntry } from './CapacitorFileEntry.d.ts';
import type { WatchAndStatAllResult } from './WatchAndStatAllResult.d.ts';

/**
 * File system adapter for Capacitor (mobile) platform.
 * @public
 * @unofficial
 */
export interface CapacitorAdapterFs {
    /** Base directory path for the file system, or `null` if not initialized. */
    dir: string | null;

    /** Base URI for the file system. */
    uri: string;

    /**
     * Append text data to a file.
     *
     * @param realPath - Real file system path.
     * @param data - Text data to append.
     * @returns A promise that resolves when the data is appended.
     * To extract the constructor type, use `ExtractConstructor<CapacitorAdapterFs>`.
     */
    append(realPath: string, data: string): Promise<void>;

    /**
     * Constructor.
     *
     * @param dir - The dir.
     * @returns The new instance.
     * @deprecated - Added only for typing purposes.
     */
    constructor__(dir: string): this;

    /**
     * Copy a file to a new path.
     *
     * @param realPath - Source file path.
     * @param newRealPath - Destination file path.
     * @returns A promise that resolves when the file is copied.
     */
    copy(realPath: string, newRealPath: string): Promise<void>;

    /**
     * Delete a file at the given path.
     *
     * @param realPath - File path to delete.
     * @returns A promise that resolves when the file is deleted.
     */
    delete(realPath: string): Promise<void>;

    /**
     * Check whether a file exists at the given path.
     *
     * @param realPath - File path to check.
     * @returns Whether the file exists.
     */
    exists(realPath: string): Promise<boolean>;

    /**
     * Get the native platform URI for a file path.
     *
     * @param realPath - File path.
     * @returns Native URI string.
     */
    getNativeUri(realPath: string): string;

    /**
     * Get the URI for a file path.
     *
     * @param realPath - File path.
     * @returns URI string.
     */
    getUri(realPath: string): string;

    /**
     * Initialize the file system adapter.
     *
     * @returns A promise that resolves when the adapter is initialized.
     */
    init(): Promise<void>;

    /**
     * Create a directory at the given path.
     *
     * @param realPath - Directory path to create.
     * @returns A promise that resolves when the directory is created.
     */
    mkdir(realPath: string): Promise<void>;

    /**
     * Open a file using the native platform handler.
     *
     * @param realPath - File path to open.
     * @returns A promise that resolves when the file is opened.
     */
    open(realPath: string): Promise<void>;

    /**
     * Read a file as text.
     *
     * @param realPath - File path to read.
     * @returns Text content of the file.
     */
    read(realPath: string): Promise<string>;

    /**
     * Read a file as binary data.
     *
     * @param realPath - File path to read.
     * @returns Binary content of the file.
     */
    readBinary(realPath: string): Promise<ArrayBuffer>;

    /**
     * List entries in a directory.
     *
     * @param realPath - Directory path to list.
     * @returns Array of file entries in the directory.
     */
    readdir(realPath: string): Promise<CapacitorFileEntry[]>;

    /**
     * Rename or move a file to a new path.
     *
     * @param realPath - Current file path.
     * @param newRealPath - New file path.
     * @returns A promise that resolves when the file is renamed.
     */
    rename(realPath: string, newRealPath: string): Promise<void>;

    /**
     * Remove a directory.
     *
     * @param realPath - Directory path to remove.
     * @returns A promise that resolves when the directory is removed.
     */
    rmdir(realPath: string): Promise<void>;

    /**
     * Set the creation and modification times for a file.
     *
     * @param realPath - File path.
     * @param ctime - Creation time in milliseconds.
     * @param mtime - Modification time in milliseconds.
     * @returns A promise that resolves when the times are set.
     */
    setTimes(realPath: string, ctime: number, mtime: number): Promise<void>;

    /**
     * Get file statistics for the given path.
     *
     * @param realPath - File path to stat.
     * @returns File entry with statistics.
     */
    stat(realPath: string): Promise<CapacitorFileEntry>;

    /**
     * Move a file to the system trash.
     *
     * @param realPath - File path to trash.
     * @returns A promise that resolves when the file is trashed.
     */
    trash(realPath: string): Promise<void>;

    /**
     * Verify and download an iCloud file if it is not yet available locally.
     *
     * @param realPath - File path to verify.
     * @returns A promise that resolves when the iCloud file is verified.
     */
    verifyIcloud(realPath: string): Promise<void>;

    /**
     * Start watching a path for file system changes.
     *
     * @param realPath - Path to watch.
     * @returns A promise that resolves when the watcher is started.
     */
    watch(realPath: string): Promise<void>;

    /**
     * Watch a path and return stat information for all contained files.
     *
     * @param realPath - Path to watch and stat.
     * @returns Stat results for all files in the watched path.
     */
    watchAndStatAll(realPath: string): Promise<WatchAndStatAllResult>;

    /**
     * Write text data to a file.
     *
     * @param realPath - File path to write to.
     * @param data - Text data to write.
     * @returns A promise that resolves when the file is written.
     */
    write(realPath: string, data: string): Promise<void>;

    /**
     * Write binary data to a file.
     *
     * @param realPath - File path to write to.
     * @param data - Binary data to write.
     * @returns A promise that resolves when the file is written.
     */
    writeBinary(realPath: string, data: ArrayBuffer): Promise<void>;

    /**
     * Write binary data to a file using the internal storage path.
     *
     * @param realPath - File path to write to.
     * @param data - Binary data to write.
     * @returns A promise that resolves when the file is written.
     */
    writeBinaryInternal(realPath: string, data: ArrayBuffer): Promise<void>;
}
