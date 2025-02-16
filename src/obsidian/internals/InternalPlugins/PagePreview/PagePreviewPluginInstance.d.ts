import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { PagePreviewPlugin } from './PagePreviewPlugin.d.ts';

/** @public */
export interface PagePreviewPluginInstance extends InternalPluginInstance<PagePreviewPlugin> {
    app: App;
    defaultOn: true;
}
