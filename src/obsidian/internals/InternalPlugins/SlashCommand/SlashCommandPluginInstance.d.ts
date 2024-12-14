import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { SlashCommandPlugin } from './SlashCommandPlugin.js';

/** @public */
export interface SlashCommandPluginInstance extends InternalPluginInstance<SlashCommandPlugin> {
    defaultOn: false;
}
