import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/Constants/ViewType.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface SyncView extends View {
    /** @todo Documentation incomplete. */
    getViewType(): typeof ViewType.Sync;
}
