import type { InternalPlugin } from '../InternalPlugin.js';
import type { SlashCommandPluginInstance } from './SlashCommandPluginInstance.js';

/** @public */
export interface SlashCommandPlugin extends InternalPlugin<SlashCommandPluginInstance> {}
