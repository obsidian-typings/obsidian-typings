import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlashCommandPlugin } from './SlashCommandPlugin.d.ts';

/**
 * Plugin instance for slash commands, providing inline command suggestions when typing "/".
 * @public
 * @unofficial
 */
export interface SlashCommandPluginInstance extends InternalPluginInstance<SlashCommandPlugin> {
  /** Whether this plugin is enabled by default. */
  defaultOn: false;
}
