import type { FileStats } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface FileEntry extends Partial<FileStats> {
    /**
     * Name of file or folder.
     */
    name?: string;

    /**
     * Full path to file or folder.
     *
     * @remark Might be used for resolving symlinks.
     */
    realpath: string;

    /**
     * Type of entry.
     */
    type: 'file' | 'folder';

    /**
     * URI of file or folder.
     */
    uri?: string;
}
