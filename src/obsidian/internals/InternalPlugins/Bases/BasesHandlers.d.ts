import type { TableView } from './TableView.d.ts';
import type { ViewFactory } from './ViewFactory.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface BasesHandlers extends Record<string, ViewFactory> {
    /** @todo Documentation incomplete. */
    table: ViewFactory<TableView>;
}
