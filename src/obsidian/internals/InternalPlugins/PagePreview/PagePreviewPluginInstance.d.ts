import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { PagePreviewPlugin } from './PagePreviewPlugin.js';

/** @public */
export interface PagePreviewPluginInstance extends InternalPluginInstance<PagePreviewPlugin> {
    app: App;
    defaultOn: boolean;
}
