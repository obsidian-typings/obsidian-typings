import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';
import type { BacklinkComponent } from './BacklinkComponent.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface BacklinkView extends InfoFileView {
    /** @todo Documentation incomplete. */
    backlink: BacklinkComponent;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Backlink;

    /**
     * Shows the search.
     */
    showSearch(): void;

    /** @todo Documentation incomplete */
    update(): void;
}
