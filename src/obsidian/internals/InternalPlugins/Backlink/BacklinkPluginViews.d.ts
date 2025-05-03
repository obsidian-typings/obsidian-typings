import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BacklinkView } from './BacklinkView.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BacklinkPluginViews extends Record<string, ViewCreator> {
    /** @todo Documentation incomplete. */
    backlink(left: WorkspaceLeaf): BacklinkView;
}
