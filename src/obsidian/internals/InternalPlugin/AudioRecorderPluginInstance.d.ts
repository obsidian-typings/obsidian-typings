import type { App } from 'obsidian';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface AudioRecorderPluginInstance extends InternalPluginInstance {
    app: App;
    plugin: AudioRecorderPlugin;
}
