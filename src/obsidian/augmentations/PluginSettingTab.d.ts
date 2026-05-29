import type { ExtractConstructor } from '../internals/constructors/ExtractConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Provides a unified interface for users to configure the plugin.
   *
   * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
   * @since 0.9.7
   */
  interface PluginSettingTab extends SettingTab {
    /**
     * Constructor.
     *
     * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<PluginSettingTab\>}.
     *
     * @param app - The Obsidian app instance.
     * @param plugin - The plugin instance.
     * @returns The plugin setting tab instance.
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(app: App, plugin: Plugin): this;

    /**
     * Reads from `this.plugin.settings`. Override to read from a different
     * data source.
     *
     * @param key - The setting key to read.
     * @returns The current value for the key.
     * @official
     * @since 1.13.0
     */
    getControlValue(key: string): unknown;

    /**
     * Return setting definitions for this tab.
     *
     * @returns The setting definition items.
     * @official
     * @since 1.13.0
     */
    getSettingDefinitions(): SettingDefinitionItem[];

    /**
     * Mutates and persists `this.plugin.settings`. Override to write to a
     * different data source.
     *
     * @param key - The setting key to write.
     * @param value - The new value to persist.
     * @returns Void or a promise that resolves once the value is persisted.
     * @official
     * @since 1.13.0
     */
    setControlValue(key: string, value: unknown): Promise<void> | void;
  }
}
