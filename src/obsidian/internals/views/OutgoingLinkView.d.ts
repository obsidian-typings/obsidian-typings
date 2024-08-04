import type { InfoFileView } from "../../types.js";
/** @todo Documentation incomplete */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type
     */
    getViewType(): "outgoing-link";
    /** @todo Documentation incomplete */
    update(): void;
}
