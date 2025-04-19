import type { TreeItem } from '../../../Tree/TreeItem.d.ts';

/** @public @unofficial */
export interface GraphOptions extends TreeItem<unknown> {
    /** @internal */
    getOptions(e: unknown): unknown;
    /** @internal */
    setOptions(e: unknown): unknown;
}
