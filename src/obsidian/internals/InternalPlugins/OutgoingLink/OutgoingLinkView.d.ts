import type { InfoFileView } from '../../Views/InfoFileView.js';

/** @todo Documentation incomplete */
/** @public */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type
     */
    getViewType(): 'outgoing-link';
    /** @todo Documentation incomplete */
    update(): void;
}
