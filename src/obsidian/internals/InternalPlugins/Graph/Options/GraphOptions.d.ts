import type { TreeItem } from '../../../Tree/TreeItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphOptions extends TreeItem<unknown> {
    /** @todo Documentation incomplete. */
    getOptions(e: unknown): unknown;

    /** @todo Documentation incomplete. */
    setOptions(e: unknown): unknown;
}
