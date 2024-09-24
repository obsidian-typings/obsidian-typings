import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface PagePreviewPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
}
