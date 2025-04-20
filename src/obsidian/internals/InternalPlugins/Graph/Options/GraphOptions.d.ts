import type { TreeItem } from '../../../Tree/TreeItem.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphOptions extends TreeItem<unknown> {
    getOptions(e: unknown): unknown;
    setOptions(e: unknown): unknown;
}
