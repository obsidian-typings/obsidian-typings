import type { WorkspaceLeaf } from 'obsidian';
import type { InternalPlugin } from '../InternalPlugin.js';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.js';
import type { BacklinkView } from './BacklinkView.js';

/** @public */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    views: {
        backlink(left: WorkspaceLeaf): BacklinkView;
    };
}
