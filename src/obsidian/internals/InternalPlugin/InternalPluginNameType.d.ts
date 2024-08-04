import type { InternalPluginName } from "../../implementations/InternalPluginName.ts";

/** @public */
export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
