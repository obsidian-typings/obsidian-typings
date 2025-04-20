import type {
    ViewCreator,
    WorkspaceLeaf
} from 'obsidian';
import type { BacklinkView } from './BacklinkView.d.ts';

/**
 * @public
 * @unofficial
 */
export interface BacklinkPluginViews extends Record<string, ViewCreator> {
    backlink(left: WorkspaceLeaf): BacklinkView;
}
