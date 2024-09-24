import type { App } from 'obsidian';
import type { InternalPluginInstance } from './InternalPluginInstance.js';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.js';

/** @public */
export interface AudioRecorderPluginInstance extends InternalPluginInstance {
    app: App;
    plugin: AudioRecorderPlugin;
}
