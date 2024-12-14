import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { BrowserHistoryView } from '../../../internals/InternalPlugins/Browser/BrowserHistoryView.js';
import type { BrowserPluginInstance } from '../../../internals/InternalPlugins/Browser/BrowserPluginInstance.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BrowserHistoryView constructor.
 *
 * @returns The BrowserHistoryView constructor.
 * @public
 */
export function getBrowserHistoryViewConstructor(app: App): BrowserHistoryViewConstructor {
    return getViewConstructorByViewType(app, ViewType.BrowserHistory) as BrowserHistoryViewConstructor;
}

/**
 * A constructor for a browser history view.
 *
 * @public
 */
type BrowserHistoryViewConstructor = new(
    leaf: WorkspaceLeaf,
    browserPluginInstance: BrowserPluginInstance
) => BrowserHistoryView;
