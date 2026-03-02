import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { ZkPrefixerPluginInstance } from './ZkPrefixerPluginInstance.d.ts';

/**
 * Internal plugin registration for the Zettelkasten ID prefixer feature.
 * @public
 * @unofficial
 */
export interface ZkPrefixerPlugin extends InternalPlugin<ZkPrefixerPluginInstance> {}
