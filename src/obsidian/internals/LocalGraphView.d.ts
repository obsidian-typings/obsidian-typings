import type { InfoFileView } from "../types.js";
/** @todo Documentation incomplete */
export interface LocalGraphView extends InfoFileView {
    /**
     * Get the current view type
     */
    getViewType(): "localgraph";
    /** @internal */
    onFileChanged(e: unknown): void;
    /** @internal */
    update(): void;
    /** @internal */
    onOptionsChange(): void;
}
