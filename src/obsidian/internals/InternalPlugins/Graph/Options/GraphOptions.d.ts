import type { TreeCollapsibleItem } from '../../../Tree/TreeCollapsibleItem.d.ts';

/**
 * Base interface for a collapsible graph options section in the settings panel.
 * @public
 * @unofficial
 */
export interface GraphOptions extends TreeCollapsibleItem {
    /**
     * Get the current values of this options section.
     *
     * @param e - The options context.
     * @returns The current option values.
     */
    getOptions(e: unknown): unknown;

    /**
     * Apply new values to this options section.
     *
     * @param e - The options to apply.
     * @returns The applied option values.
     */
    setOptions(e: unknown): unknown;
}
