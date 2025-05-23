import type { EditorRange } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface Token extends EditorRange {
    /** @todo Documentation incomplete. */
    text: string;

    /** @todo Documentation incomplete. */
    type: 'tag' | 'external-link' | 'internal-link';
}
