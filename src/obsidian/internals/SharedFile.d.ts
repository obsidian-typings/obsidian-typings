/**
 * Represents a file shared to Obsidian from another app on mobile.
 * @public
 * @unofficial
 */
export interface SharedFile {
    /** Name of the shared file. */
    name: string;

    /** URI of the shared file. */
    uri: string;
}
