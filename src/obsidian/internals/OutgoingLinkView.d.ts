import type { InfoFileView } from "../types.js";
/** @todo Documentation incomplete */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type
     * @returns "outgoing-link"
     */
    getViewType(): string;
    /** @internal */
    update(): void;
}
