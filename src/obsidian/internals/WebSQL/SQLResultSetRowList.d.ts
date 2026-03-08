/**
 * List of rows returned from a WebSQL query result.
 * @public
 * @unofficial
 */
export interface SQLResultSetRowList {
    /** Number of rows in the result set. */
    length: number;

    /**
     * Get a row by its index in the result set.
     *
     * @param index - The index of the row to retrieve.
     * @returns The row at the specified index.
     */
    item(index: number): unknown;
}
