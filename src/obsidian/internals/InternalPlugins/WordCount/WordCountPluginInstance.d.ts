import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WordCountPlugin } from './WordCountPlugin.d.ts';

/** @public */
export interface WordCountPluginInstance extends InternalPluginInstance<WordCountPlugin> {
    app: App;
    defaultOn: true;
    plugin: WordCountPlugin;
}
