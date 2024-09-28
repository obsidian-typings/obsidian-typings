import type { WorkspaceLeaf } from 'obsidian';
import type { BacklinkPluginInstance } from './BacklinkPluginInstance.js';
import type { InternalPlugin } from './InternalPlugin.js';
import type { BacklinkView } from '../Views/BacklinkView.js';

/** @public */
export interface BacklinkPlugin extends InternalPlugin<BacklinkPluginInstance> {
    views: {
        backlink: (left: WorkspaceLeaf) => BacklinkView;
    }
}
