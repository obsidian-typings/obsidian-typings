import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { OutgoingLinkPluginInstance } from './OutgoingLinkPluginInstance.d.ts';

/**
 * Internal plugin registration for the outgoing links feature.
 * @public
 * @unofficial
 */
export interface OutgoingLinkPlugin extends InternalPlugin<OutgoingLinkPluginInstance> {}
