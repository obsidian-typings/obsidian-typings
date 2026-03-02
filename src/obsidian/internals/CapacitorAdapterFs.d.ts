import type { CapacitorFileEntry } from './CapacitorFileEntry.d.ts';
import type { WatchAndStatAllResult } from './WatchAndStatAllResult.d.ts';

/**
 * File system adapter for Capacitor (mobile) platform.
 * @public
 * @unofficial
 */
export interface CapacitorAdapterFs {
    /** Base directory path for the file system, or null if not initialized. */
    dir: string | null;

    /** Base URI for the file system. */
    uri: string;

    /**
     * Append text data to a file.
     *
     * @param realPath - Real file system path.
     * @param data - Text data to append.
     */
    append(realPath: string, data: string): Promise<void>;

    /**
     * Copy a file to a new path.
     *
     * @param realPath - Source file path.
     * @param newRealPath - Destination file path.
     */
    copy(realPath: string, newRealPath: string): Promise<void>;

    /**
     * Delete a file at the given path.
     *
     * @param realPath - File path to delete.
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

    /** Initialize the file system adapter. */
    init(): Promise<void>;

    /**
     * Create a directory at the given path.
     *
     * @param realPath - Directory path to create.
     */
    mkdir(realPath: string): Promise<void>;

    /**
     * Open a file using the native platform handler.
     *
     * @param realPath - File path to open.
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
     */
    rename(realPath: string, newRealPath: string): Promise<void>;

    /**
     * Remove a directory.
     *
     * @param realPath - Directory path to remove.
     */
    rmdir(realPath: string): Promise<void>;

    /**
     * Set the creation and modification times for a file.
     *
     * @param realPath - File path.
     * @param ctime - Creation time in milliseconds.
     * @param mtime - Modification time in milliseconds.
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
     */
    trash(realPath: string): Promise<void>;

    /**
     * Verify and download an iCloud file if it is not yet available locally.
     *
     * @param realPath - File path to verify.
     */
    verifyIcloud(realPath: string): Promise<void>;

    /**
     * Start watching a path for file system changes.
     *
     * @param realPath - Path to watch.
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
     */
    write(realPath: string, data: string): Promise<void>;

    /**
     * Write binary data to a file.
     *
     * @param realPath - File path to write to.
     * @param data - Binary data to write.
     */
    writeBinary(realPath: string, data: ArrayBuffer): Promise<void>;

    /**
     * Write binary data to a file using the internal storage path.
     *
     * @param realPath - File path to write to.
     * @param data - Binary data to write.
     */
    writeBinaryInternal(realPath: string, data: ArrayBuffer): Promise<void>;
}
