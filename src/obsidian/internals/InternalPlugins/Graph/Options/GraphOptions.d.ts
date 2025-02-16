import type { TreeItem } from '../../../TreeItem.d.ts';

/** @public */
export interface GraphOptions extends TreeItem<unknown> {
    /** @internal */
    getOptions(e: unknown): unknown;
    /** @internal */
    setOptions(e: unknown): unknown;
}
