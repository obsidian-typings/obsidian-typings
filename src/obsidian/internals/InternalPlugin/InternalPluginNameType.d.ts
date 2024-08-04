import type { InternalPluginName } from "../../implementations/InternalPluginName.ts";

export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
