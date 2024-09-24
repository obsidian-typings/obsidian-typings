import type { InternalPlugin } from './InternalPlugin.js';
import type { PublishPluginInstance } from './PublishPluginInstance.js';

/** @public */
export interface PublishPlugin extends InternalPlugin<PublishPluginInstance> {}
