import type { TableCellEditor } from "../index.d.ts";
/** @todo Documentation incomplete */
export default interface TableCell {
    col: number;
    contentEl: HTMLElement;
    dirty: boolean;
    el: HTMLElement;
    end: number;
    padEnd: number;
    padStart: number;
    row: number;
    start: number;
    table: TableCellEditor;
    text: string;
}
