import type { App } from 'electron';
import type { HoverParent } from 'obsidian';

/**
 * Information about the register dom events handlers.
 *
 * @public
 * @unofficial
 */
export interface RegisterDomEventsHandlersInfo extends HoverParent {
    /**
     * Obsidian app instance.
     */
    app: App;

    /**
     * The path to calculate relative links from.
     */
    path: string;
}
