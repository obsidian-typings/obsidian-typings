import type { TreeCollapsibleItem } from '../../../Tree/TreeCollapsibleItem.d.ts';

/**
 * Base interface for a collapsible graph options section in the settings panel.
 * @public
 * @unofficial
 */
export interface GraphOptions extends TreeCollapsibleItem {
    /** Get the current values of this options section. */
    getOptions(e: unknown): unknown;

    /** Apply new values to this options section. */
    setOptions(e: unknown): unknown;
}
