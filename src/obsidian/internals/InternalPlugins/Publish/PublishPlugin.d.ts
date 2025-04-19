import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { PublishPluginInstance } from './PublishPluginInstance.d.ts';

/** @public @unofficial */
export interface PublishPlugin extends InternalPlugin<PublishPluginInstance> {}
