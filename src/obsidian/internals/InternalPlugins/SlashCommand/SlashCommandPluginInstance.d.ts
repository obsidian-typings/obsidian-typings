import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlashCommandPlugin } from './SlashCommandPlugin.d.ts';

/** @public */
export interface SlashCommandPluginInstance extends InternalPluginInstance<SlashCommandPlugin> {
    defaultOn: false;
}
