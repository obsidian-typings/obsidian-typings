import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';
import type { InfoFileView } from '../../Views/InfoFileView.d.ts';
import type { BacklinkViewBacklink } from './BacklinkViewBacklink.d.ts';

/** @todo Documentation incomplete */
/** @public */
export interface BacklinkView extends InfoFileView {
    backlink: BacklinkViewBacklink;

    /**
     * Get the current view type
     */
    getViewType(): typeof ViewType.Backlink;
    /**
     * Shows the search
     */
    showSearch(): void;
    /** @todo Documentation incomplete */
    update(): void;
}
