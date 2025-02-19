import type { CapacitorFileEntry } from './CapacitorFileEntry.d.ts';

/** @public */
export interface CapacitorAdapterFs {
    dir: string | null;
    uri: string;

    append(realPath: string, data: string): Promise<void>;
    copy(realPath: string, newRealPath: string): Promise<void>;
    delete(realPath: string): Promise<void>;
    exists(realPath: string): Promise<boolean>;
    getNativeUri(realPath: string): string;
    getUri(realPath: string): string;
    init(): Promise<void>;
    mkdir(realPath: string): Promise<void>;
    open(realPath: string): Promise<void>;
    read(realPath: string): Promise<string>;
    readBinary(realPath: string): Promise<ArrayBuffer>;
    readdir(realPath: string): Promise<CapacitorFileEntry[]>;
    rename(realPath: string, newRealPath: string): Promise<void>;
    rmdir(realPath: string): Promise<void>;
    setTimes(realPath: string, ctime: number, mtime: number): Promise<void>;
    stat(realPath: string): Promise<CapacitorFileEntry>;
    trash(realPath: string): Promise<void>;
    verifyIcloud(realPath: string): Promise<void>;
    watch(realPath: string): Promise<void>;
    watchAndStatAll(realPath: string): Promise<{ children: CapacitorFileEntry[] }>;
    write(realPath: string, data: string): Promise<void>;
    writeBinary(realPath: string, data: ArrayBuffer): Promise<void>;
    writeBinaryInternal(realPath: string, data: ArrayBuffer): Promise<void>;
}
