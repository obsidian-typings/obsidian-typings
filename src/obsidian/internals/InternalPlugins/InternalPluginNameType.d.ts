import type { InternalPluginName } from '../../implementations/Constants/InternalPluginName.d.ts';

/** @public @unofficial */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
