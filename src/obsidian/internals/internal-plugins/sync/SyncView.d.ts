import type { View } from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';

/**
 * View that displays the Obsidian Sync status and settings.
 * @public
 * @unofficial
 */
export interface SyncView extends View {
    /**
     * Get the current view type.
     *
     * @returns The sync view type.
     */
    getViewType(): typeof ViewType.Sync;
}
