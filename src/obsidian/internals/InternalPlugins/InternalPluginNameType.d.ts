import type { InternalPluginName } from '../../implementations/Constants/InternalPluginName.d.ts';

/** @public */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
