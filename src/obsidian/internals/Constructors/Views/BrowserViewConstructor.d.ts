import type { WorkspaceLeaf } from 'obsidian';
import type { BrowserPluginInstance } from '../../InternalPlugins/Browser/BrowserPluginInstance.js';
import type { BrowserView } from '../../InternalPlugins/Browser/BrowserView.js';

/**
 * A constructor for a browser view.
 *
 * @public
 */
export type BrowserViewConstructor = new(
    leaf: WorkspaceLeaf,
    browserPluginInstance: BrowserPluginInstance
) => BrowserView;
