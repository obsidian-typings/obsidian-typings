import type { ItemView } from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * View for displaying Obsidian release notes.
 * @public
 * @unofficial
 */
export interface ReleaseNotesView extends ItemView {
    /**
     * Get the release notes from GitHub.
     *
     * @param version - The version of the release notes.
     */
    fetchReleaseNotes(version: string): Promise<unknown>;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.ReleaseNotes;

    /**
     * Renders the release notes.
     */
    render(): Promise<unknown>;

    /** Display the patch notes for a specific version. */
    showPatchNotes(e: unknown, version: string): Promise<unknown>;
}
