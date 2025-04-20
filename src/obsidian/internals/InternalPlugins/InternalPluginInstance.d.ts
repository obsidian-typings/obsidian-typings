import type { App } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface InternalPluginInstance<InternalPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    description: string;

    /**
     * @todo Documentation incomplete.
     */
    id: string;

    /**
     * @todo Documentation incomplete.
     */
    name: string;

    /**
     * @todo Documentation incomplete.
     */
    init(app: App, plugin: InternalPlugin): void;

    /**
     * @todo Documentation incomplete.
     */
    onDisable?(app: App, plugin: InternalPlugin): void;

    /**
     * @todo Documentation incomplete.
     */
    onEnable?(app: App, plugin: InternalPlugin): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    onUserDisable?(app: App): void;

    /**
     * @todo Documentation incomplete.
     */
    onUserEnable?(app: App): void;
}
