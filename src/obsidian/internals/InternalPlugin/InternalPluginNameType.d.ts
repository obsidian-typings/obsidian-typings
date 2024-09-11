import type { InternalPluginName } from './InternalPluginName.js';

/** @public */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
