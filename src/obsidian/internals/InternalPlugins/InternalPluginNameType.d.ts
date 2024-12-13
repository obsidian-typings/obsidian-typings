import type { InternalPluginName } from '../../implementations/InternalPluginName.js';

/** @public */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
