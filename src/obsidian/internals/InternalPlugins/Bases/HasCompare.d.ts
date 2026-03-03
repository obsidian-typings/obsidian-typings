/**
 * Has compare.
 *
 * @public
 * @unofficial
 */
export interface HasCompare {
    /**
     * Compares two values.
     *
     * @param a - The first value to compare.
     * @param b - The second value to compare.
     * @returns Whether the comparison is satisfied.
     */
    compare(a: unknown, b: unknown): boolean;
}
