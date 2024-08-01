import type { InternalPluginName } from "../../implementations/index.ts";

export type InternalPluginNameType = (typeof InternalPluginName)[keyof typeof InternalPluginName];
