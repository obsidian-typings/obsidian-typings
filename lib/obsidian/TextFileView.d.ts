export default interface TextFileView {
    /**
     * Whether current file is dirty (different from saved contents)
     */
    dirty: boolean;
    /**
     * Whether editor should be rendered as plaintext
     */
    isPlaintext: boolean;
    /**
     * The data that was last saved
     */
    lastSavedData: null | string;
    /**
     * Whether on saving, the file should be saved again (for dirtiness checks)
     */
    saveAgain: boolean;
    /**
     * Whether the file is currently saving
     */
    saving: boolean;
}
