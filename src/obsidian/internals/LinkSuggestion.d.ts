import type { TFile } from 'obsidian';

/** @public
 * Suggestion for a link to a file
 */
export interface LinkSuggestion {
    /**
     * File that is suggested. `null` if the link cannot be resolved.
     */
    file: TFile | null;

    /**
     * Path to the file if the link can be resolved.
     * Link text if the link cannot be resolved.
     */
    path: string;

    /**
     * Resolved link note alias.
     */
    alias?: string;
}
