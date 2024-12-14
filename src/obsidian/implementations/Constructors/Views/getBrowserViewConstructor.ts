import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { BrowserPluginInstance } from '../../../internals/InternalPlugins/Browser/BrowserPluginInstance.js';
import type { BrowserView } from '../../../internals/InternalPlugins/Browser/BrowserView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BrowserView constructor.
 *
 * @returns The BrowserView constructor.
 * @public
 */
export function getBrowserViewConstructor(app: App): BrowserViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Browser) as BrowserViewConstructor;
}

/**
 * A constructor for a browser view.
 *
 * @public
 */
type BrowserViewConstructor = new(
    leaf: WorkspaceLeaf,
    browserPluginInstance: BrowserPluginInstance
) => BrowserView;
