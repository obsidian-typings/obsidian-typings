import type { ViewType } from '../../../implementations/ViewType.ts';
import type { InfoFileView } from '../../Views/InfoFileView.js';

/** @todo Documentation incomplete */
/** @public */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.OutgoingLink;
    /** @todo Documentation incomplete */
    update(): void;
}
