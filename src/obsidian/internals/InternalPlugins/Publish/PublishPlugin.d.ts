import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { PublishPluginInstance } from './PublishPluginInstance.d.ts';

/** @public */
export interface PublishPlugin extends InternalPlugin<PublishPluginInstance> {}
