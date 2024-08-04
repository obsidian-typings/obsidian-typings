import type { TableCellEditor } from "./TableCellEditor.js";

/** @todo Documentation incomplete */
/** @public */
export interface TableCell {
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
