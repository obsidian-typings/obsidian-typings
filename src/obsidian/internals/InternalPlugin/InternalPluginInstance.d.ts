import type { App } from 'obsidian';

/** @public */
export interface InternalPluginInstance<InternalPlugin> {
    description: string;
    id: string;
    name: string;

    init(app: App, plugin: InternalPlugin): void;
}
