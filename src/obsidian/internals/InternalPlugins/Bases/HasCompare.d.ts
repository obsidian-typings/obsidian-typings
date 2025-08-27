/**
 * Has compare.
 *
 * @public
 * @unofficial
 */
export interface HasCompare {
    /**
     * Compares two values.
     */
    compare(a: unknown, b: unknown): boolean;
}
