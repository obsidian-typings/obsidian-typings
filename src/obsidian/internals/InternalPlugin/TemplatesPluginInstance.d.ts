import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { TemplatesPlugin } from './TemplatesPlugin.js';

/** @public */
export interface TemplatesPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: TemplatesPlugin;
}
