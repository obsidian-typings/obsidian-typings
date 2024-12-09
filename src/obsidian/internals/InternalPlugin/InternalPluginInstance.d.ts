import type { App } from 'obsidian';

/** @public */
export interface InternalPluginInstance<InternalPlugin> {
    description: string;
    id: string;
    name: string;
    onDisable?: (app: App, plugin: InternalPlugin) => void;
    onEnable?: (app: App, plugin: InternalPlugin) => Promise<void>;
    onUserDisable?: (app: App) => void;
    onUserEnable?: (app: App) => void;

    init(app: App, plugin: InternalPlugin): void;
}
