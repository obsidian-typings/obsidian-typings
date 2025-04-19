import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SwitcherPlugin } from './SwitcherPlugin.d.ts';

/** @public @unofficial */
export interface SwitcherPluginInstance extends InternalPluginInstance<SwitcherPlugin> {
    app: App;
    defaultOn: true;
    plugin: SwitcherPlugin;
}
