import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.OutgoingLink;

    /** @todo Documentation incomplete */
    update(): void;
}
