import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { DailyNotesPluginInstance } from './DailyNotesPluginInstance.d.ts';

/**
 * Internal plugin registration for the daily notes feature.
 * @public
 * @unofficial
 */
export interface DailyNotesPlugin extends InternalPlugin<DailyNotesPluginInstance> {}
