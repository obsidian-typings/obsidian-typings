import type { WorkspaceLeaf } from 'obsidian';
import type { BrowserHistoryView } from '../../InternalPlugins/Browser/BrowserHistoryView.d.ts';
import type { BrowserPluginInstance } from '../../InternalPlugins/Browser/BrowserPluginInstance.d.ts';

/**
 * A constructor for a browser history view.
 *
 * @public
 */
export type BrowserHistoryViewConstructor = new(
    leaf: WorkspaceLeaf,
    browserPluginInstance: BrowserPluginInstance
) => BrowserHistoryView;
