import type { InfoFileView } from "../types.js";
/** @todo Documentation incomplete */
export interface BacklinkView extends InfoFileView {
    /**
     * Get the current view type
     */
    getViewType(): "backlink";
    /** @internal */
    showSearch(): void;
    /** @internal */
    update(): void;
}
