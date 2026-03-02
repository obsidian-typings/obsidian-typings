/**
 * Interface for setting the birth time (creation time) of a file.
 * @public
 * @unofficial
 */
export interface Btime {
    /**
     * Set the birth time (creation time) of a file at the given path.
     *
     * @param path - File path.
     * @param btime - Birth time in milliseconds.
     */
    btime(path: string, btime: number): void;
}
