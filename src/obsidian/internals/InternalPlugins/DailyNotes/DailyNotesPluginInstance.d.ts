import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { DailyNotesPlugin } from './DailyNotesPlugin.js';

/** @public */
export interface DailyNotesPluginInstance extends InternalPluginInstance<DailyNotesPlugin> {
    app: App;
    defaultOn: boolean;
    plugin: DailyNotesPlugin;
}
