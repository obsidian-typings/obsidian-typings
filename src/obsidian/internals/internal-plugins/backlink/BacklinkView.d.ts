import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { InfoFileView } from '../../views/InfoFileView.d.ts';
import type { BacklinkComponent } from './BacklinkComponent.d.ts';

/**
 * View that displays backlinks to the current file.
 * @public
 * @unofficial
 */
export interface BacklinkView extends InfoFileView {
    /** The backlink component rendering linked and unlinked mentions. */
    backlink: BacklinkComponent;

    /**
     * Get the current view type.
     *
     * @returns The backlink view type.
     */
    getViewType(): typeof ViewType.Backlink;

    /**
     * Shows the search.
     */
    showSearch(): void;

    /** Refresh the backlink results. */
    update(): void;
}
