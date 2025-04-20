/**
 * @public
 * @unofficial
 */
export interface FileCacheEntry {
    /**
     * Hash of file contents.
     */
    hash: string;
    /**
     * Last modified time of file.
     */
    mtime: number;
    /**
     * Size of file in bytes.
     */
    size: number;
}
