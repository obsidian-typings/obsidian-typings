import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';

/**
 * View that displays outgoing links from the current file.
 * @public
 * @unofficial
 */
export interface OutgoingLinkView extends InfoFileView {
    /**
     * Get the current view type.
     *
     * @returns The outgoing link view type.
     */
    getViewType(): typeof ViewType.OutgoingLink;

    /** Refresh the outgoing links list. */
    update(): void;
}
