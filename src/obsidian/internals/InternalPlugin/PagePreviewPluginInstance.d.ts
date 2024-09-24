import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface PagePreviewPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
}
