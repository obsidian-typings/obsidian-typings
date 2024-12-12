import type { WorkspaceLeaf } from 'obsidian';
import type { BacklinkView } from './BacklinkView.js';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.js';
import type { InternalPlugin } from '../InternalPlugin.js';

/** @public */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    views: {
        backlink(left: WorkspaceLeaf): BacklinkView;
    };
}
