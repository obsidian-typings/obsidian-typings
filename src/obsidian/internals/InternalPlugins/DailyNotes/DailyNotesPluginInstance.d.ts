import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { DailyNotesPlugin } from './DailyNotesPlugin.js';

/** @public */
export interface DailyNotesPluginInstance extends InternalPluginInstance<DailyNotesPlugin> {
    app: App;
    defaultOn: true;
    plugin: DailyNotesPlugin;
    options: {
        /**
         * Naming syntax for daily note in momentjs syntax.
         * https://momentjs.com/docs/#/displaying/format/ 
         */
        format?: string;
        /** New daily notes will be placed here. */
        folder?: string;
        /** Path to the file to use as a template. */
        template?: string;
        /** Open the daily note automatically whenever the vault is opened. */
        autorun?: boolean;
    }
}
