import type { EditorRange } from 'obsidian';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface Token extends EditorRange {
    text: string;
    type: 'tag' | 'external-link' | 'internal-link';
}
