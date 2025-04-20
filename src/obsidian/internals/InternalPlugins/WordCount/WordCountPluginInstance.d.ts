import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { WordCountPlugin } from './WordCountPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface WordCountPluginInstance extends InternalPluginInstance<WordCountPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    defaultOn: true;

    /**
     * @todo Documentation incomplete.
     */
    plugin: WordCountPlugin;
}
