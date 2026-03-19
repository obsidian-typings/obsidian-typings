import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { SlashCommandPluginInstance } from './SlashCommandPluginInstance.d.ts';

/**
 * Internal plugin registration for the slash command suggestions feature.
 *
 * @public
 * @unofficial
 */
export interface SlashCommandPlugin extends InternalPlugin<SlashCommandPluginInstance> {}
