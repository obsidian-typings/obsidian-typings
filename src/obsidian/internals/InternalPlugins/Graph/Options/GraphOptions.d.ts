import type { TreeCollapsibleItem } from '../../../Tree/TreeCollapsibleItem.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface GraphOptions extends TreeCollapsibleItem {
    /** @todo Documentation incomplete. */
    getOptions(e: unknown): unknown;

    /** @todo Documentation incomplete. */
    setOptions(e: unknown): unknown;
}
