import type { CapacitorFileEntry } from './CapacitorFileEntry.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CapacitorAdapterFs {
    /** @todo Documentation incomplete. */
    dir: string | null;

    /** @todo Documentation incomplete. */
    uri: string;

    /** @todo Documentation incomplete. */
    append(realPath: string, data: string): Promise<void>;

    /** @todo Documentation incomplete. */
    copy(realPath: string, newRealPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    delete(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    exists(realPath: string): Promise<boolean>;

    /** @todo Documentation incomplete. */
    getNativeUri(realPath: string): string;

    /** @todo Documentation incomplete. */
    getUri(realPath: string): string;

    /** @todo Documentation incomplete. */
    init(): Promise<void>;

    /** @todo Documentation incomplete. */
    mkdir(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    open(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    read(realPath: string): Promise<string>;

    /** @todo Documentation incomplete. */
    readBinary(realPath: string): Promise<ArrayBuffer>;

    /** @todo Documentation incomplete. */
    readdir(realPath: string): Promise<CapacitorFileEntry[]>;

    /** @todo Documentation incomplete. */
    rename(realPath: string, newRealPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    rmdir(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    setTimes(realPath: string, ctime: number, mtime: number): Promise<void>;

    /** @todo Documentation incomplete. */
    stat(realPath: string): Promise<CapacitorFileEntry>;

    /** @todo Documentation incomplete. */
    trash(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    verifyIcloud(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    watch(realPath: string): Promise<void>;

    /** @todo Documentation incomplete. */
    watchAndStatAll(realPath: string): Promise<{ children: CapacitorFileEntry[] }>;

    /** @todo Documentation incomplete. */
    write(realPath: string, data: string): Promise<void>;

    /** @todo Documentation incomplete. */
    writeBinary(realPath: string, data: ArrayBuffer): Promise<void>;

    /** @todo Documentation incomplete. */
    writeBinaryInternal(realPath: string, data: ArrayBuffer): Promise<void>;
}
