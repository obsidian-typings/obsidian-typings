export default interface FileEntry {
    /**
     * Creation time (if file)
     */
    ctime?: number;
    /**
     * Modification time (if file)
     */
    mtime?: number;
    /**
     * Full path to file or folder
     *
     * @remark Might be used for resolving symlinks
     */
    realpath: string;
    /**
     * Size in bytes (if file)
     */
    size?: number;
    /**
     * Type of entry
     */
    type: "file" | "folder";
}
