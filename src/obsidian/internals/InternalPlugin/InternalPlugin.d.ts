import type { InternalPluginInstance } from "./InternalPluginInstance.js";

/** @todo Documentation incomplete */
export interface InternalPlugin<TInstance extends InternalPluginInstance = InternalPluginInstance> extends Plugin {
    instance: TInstance;

    disable(): void;
    enable(): Promise<void>;
}
