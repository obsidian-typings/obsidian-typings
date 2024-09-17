import type { FileStats } from 'obsidian';

/** @public */
export interface FileEntry extends Partial<FileStats> {
    /**
     * Full path to file or folder
     *
     * @remark Might be used for resolving symlinks
     */
    realpath: string;
    /**
     * Type of entry
     */
    type: 'file' | 'folder';

    /**
     * Name of file or folder
     */
    name?: string;

    /**
     * URI of file or folder
     */
    uri?: string;
}
