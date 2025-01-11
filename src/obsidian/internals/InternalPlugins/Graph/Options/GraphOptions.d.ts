import type { TreeItem } from "../../../TreeItem.js";

/** @public */
export interface GraphOptions extends TreeItem<unknown> {
    /** @internal */
    getOptions(e: unknown): unknown;
    /** @internal */
    setOptions(e: unknown): unknown;
}
