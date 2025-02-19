/** @public */
export interface SQLResultSetRowList {
    length: number;

    item(index: number): unknown;
}
