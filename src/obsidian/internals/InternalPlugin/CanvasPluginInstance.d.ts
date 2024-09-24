import type { App } from 'obsidian';
import type { CanvasPlugin } from './CanvasPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface CanvasPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: CanvasPlugin;
}
