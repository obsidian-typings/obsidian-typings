import type { TableView } from './TableView.d.ts';
import type { ViewFactory } from './ViewFactory.d.ts';

/**
 * Bases handlers.
 *
 * @public
 * @unofficial
 */
export interface BasesHandlers extends Record<string, ViewFactory> {
    /**
     * The table view factory.
     */
    table: ViewFactory<TableView>;
}
