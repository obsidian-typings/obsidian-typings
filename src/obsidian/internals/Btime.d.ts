/**
 * Interface for setting the birth time (creation time) of a file.
 * @public
 * @unofficial
 */
export interface Btime {
    /** Set the birth time (creation time) of a file at the given path. */
    btime(path: string, btime: number): void;
}
