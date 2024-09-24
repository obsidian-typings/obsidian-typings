import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { CanvasPlugin } from './CanvasPlugin.js';

/** @public */
export interface CanvasPluginInstance extends InternalPluginInstance {
    defaultOn: boolean;
    app: App;
    plugin: CanvasPlugin;
}
