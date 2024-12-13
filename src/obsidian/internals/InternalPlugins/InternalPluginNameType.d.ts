import type { InternalPluginName } from '../../implementations/Constants/InternalPluginName.js';

/** @public */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
