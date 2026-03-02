import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BacklinkView } from './BacklinkView.d.ts';

/**
 * View creators registered by the backlink plugin.
 * @public
 * @unofficial
 */
export interface BacklinkPluginViews extends Record<string, ViewCreator> {
    /** Create a backlink view in the given workspace leaf. */
    backlink(left: WorkspaceLeaf): BacklinkView;
}
