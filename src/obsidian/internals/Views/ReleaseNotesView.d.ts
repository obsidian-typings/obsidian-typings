import type { ItemView } from 'obsidian';

/** @todo Documentation incomplete */
/** @public */
export interface ReleaseNotesView extends ItemView {
    /**
     * Get the release notes from GitHub
     * @param version - The version of the release notes
     */
    fetchReleaseNotes(version: string): Promise<unknown>;
    /**
     * Get the current view type
     */
    getViewType(): 'release-notes';
    /**
     * Renders the release notes
     */
    render(): Promise<unknown>;
    /** @todo Documentation incomplete */
    showPatchNotes(e: unknown, version: string): Promise<unknown>;
}
