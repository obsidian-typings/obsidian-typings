import type { WorkspaceLeaf } from 'obsidian';
import type { BrowserHistoryView } from '../../InternalPlugins/Browser/BrowserHistoryView.js';
import type { BrowserPluginInstance } from '../../InternalPlugins/Browser/BrowserPluginInstance.js';

/**
 * A constructor for a browser history view.
 *
 * @public
 */
export type BrowserHistoryViewConstructor = new(
    leaf: WorkspaceLeaf,
    browserPluginInstance: BrowserPluginInstance
) => BrowserHistoryView;
