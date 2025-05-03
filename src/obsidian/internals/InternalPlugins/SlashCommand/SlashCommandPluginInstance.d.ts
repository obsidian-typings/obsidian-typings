import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { SlashCommandPlugin } from './SlashCommandPlugin.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface SlashCommandPluginInstance extends InternalPluginInstance<SlashCommandPlugin> {
    /** @todo Documentation incomplete. */
    defaultOn: false;
}
