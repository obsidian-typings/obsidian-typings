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

    /** Append text data to a file. */
    append(realPath: string, data: string): Promise<void>;

    /** Copy a file to a new path. */
    copy(realPath: string, newRealPath: string): Promise<void>;

    /** Delete a file at the given path. */
    delete(realPath: string): Promise<void>;

    /** Check whether a file exists at the given path. */
    exists(realPath: string): Promise<boolean>;

    /** Get the native platform URI for a file path. */
    getNativeUri(realPath: string): string;

    /** Get the URI for a file path. */
    getUri(realPath: string): string;

    /** Initialize the file system adapter. */
    init(): Promise<void>;

    /** Create a directory at the given path. */
    mkdir(realPath: string): Promise<void>;

    /** Open a file using the native platform handler. */
    open(realPath: string): Promise<void>;

    /** Read a file as text. */
    read(realPath: string): Promise<string>;

    /** Read a file as binary data. */
    readBinary(realPath: string): Promise<ArrayBuffer>;

    /** List entries in a directory. */
    readdir(realPath: string): Promise<CapacitorFileEntry[]>;

    /** Rename or move a file to a new path. */
    rename(realPath: string, newRealPath: string): Promise<void>;

    /** Remove a directory. */
    rmdir(realPath: string): Promise<void>;

    /** Set the creation and modification times for a file. */
    setTimes(realPath: string, ctime: number, mtime: number): Promise<void>;

    /** Get file statistics for the given path. */
    stat(realPath: string): Promise<CapacitorFileEntry>;

    /** Move a file to the system trash. */
    trash(realPath: string): Promise<void>;

    /** Verify and download an iCloud file if it is not yet available locally. */
    verifyIcloud(realPath: string): Promise<void>;

    /** Start watching a path for file system changes. */
    watch(realPath: string): Promise<void>;

    /** Watch a path and return stat information for all contained files. */
    watchAndStatAll(realPath: string): Promise<WatchAndStatAllResult>;

    /** Write text data to a file. */
    write(realPath: string, data: string): Promise<void>;

    /** Write binary data to a file. */
    writeBinary(realPath: string, data: ArrayBuffer): Promise<void>;

    /** Write binary data to a file using the internal storage path. */
    writeBinaryInternal(realPath: string, data: ArrayBuffer): Promise<void>;
}
