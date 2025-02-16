import type { WorkspaceLeaf } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.d.ts';
import type { BacklinkView } from './BacklinkView.d.ts';

/** @public */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    views: {
        backlink(left: WorkspaceLeaf): BacklinkView;
    };
}
