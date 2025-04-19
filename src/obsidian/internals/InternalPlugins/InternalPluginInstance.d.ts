import type { App } from 'obsidian';

/** @public @unofficial */
export interface InternalPluginInstance<InternalPlugin> {
    description: string;
    id: string;
    name: string;

    init(app: App, plugin: InternalPlugin): void;
    onDisable?(app: App, plugin: InternalPlugin): void;
    onEnable?(app: App, plugin: InternalPlugin): Promise<void>;
    onUserDisable?(app: App): void;
    onUserEnable?(app: App): void;
}
