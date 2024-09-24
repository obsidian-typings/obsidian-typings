import type { App } from 'obsidian';
import type { DailyNotesPlugin } from './DailyNotesPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface DailyNotesPluginInstance extends InternalPluginInstance {
    app: App;
    defaultOn: boolean;
    plugin: DailyNotesPlugin;
}
