import type { TableCellEditor } from './TableCellEditor.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface TableCell {
    /** @todo Documentation incomplete. */
    col: number;

    /** @todo Documentation incomplete. */
    contentEl: HTMLElement;

    /** @todo Documentation incomplete. */
    dirty: boolean;

    /** @todo Documentation incomplete. */
    el: HTMLElement;

    /** @todo Documentation incomplete. */
    end: number;

    /** @todo Documentation incomplete. */
    padEnd: number;

    /** @todo Documentation incomplete. */
    padStart: number;

    /** @todo Documentation incomplete. */
    row: number;

    /** @todo Documentation incomplete. */
    start: number;

    /** @todo Documentation incomplete. */
    table: TableCellEditor;

    /** @todo Documentation incomplete. */
    text: string;
}
