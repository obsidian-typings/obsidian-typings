import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { OutlinePlugin } from './OutlinePlugin.d.ts';

/** @public @unofficial */
export interface OutlinePluginInstance extends InternalPluginInstance<OutlinePlugin> {
    app: App;
    defaultOn: true;
    plugin: OutlinePlugin;
}
