import type { ExtractConstructor } from '../internals/constructors/ExtractConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A setting tab.
   *
   * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
   * @since 0.9.7
   */
  interface SettingTab {
    /**
     * Reference to the app instance.
     *
     * @official
     */
    app: App;

    /**
     * HTML element for the setting tab content.
     *
     * @official
     */
    containerEl: HTMLElement;

    /**
     * The icon to display in the settings sidebar.
     *
     * @official
     * @since 1.11.0
     */
    icon: IconName;

    /**
     * Unique ID of the tab.
     *
     * @unofficial
     */
    id: string;

    /**
     * Reference to installed plugins element.
     *
     * Tab is the community plugins tab.
     *
     * @unofficial
     */
    installedPluginsEl?: HTMLElement;

    /**
     * Sidebar name of the tab.
     *
     * @unofficial
     */
    name: string;

    /**
     * Sidebar navigation element of the tab.
     *
     * @unofficial
     */
    navEl: HTMLElement;

    /**
     * Reference to the plugin that initialized the tab.
     *
     * Tab is a plugin tab.
     *
     * @unofficial
     */
    plugin?: Plugin;

    /**
     * The rendered setting items (and groups) currently shown in the tab.
     *
     * @unofficial
     */
    renderedItems: unknown[];

    /**
     * Reference to the settings modal.
     *
     * @unofficial
     */
    setting: Setting;

    /**
     * Nested setting definitions as returned by {@link getSettingDefinitions}.
     * Populated by {@link update}.
     *
     * @official
     * @since 1.13.0
     */
    settingItems: SettingDefinitionItem[];

    /**
     * Constructor.
     *
     * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<SettingTab\>}.
     *
     * @param app - The app instance.
     * @param setting - The setting.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__?(app: App, setting: Setting): this;

    /**
     * Builds a two-way binding (current value plus an onChange persister) for a control key.
     *
     * @param configKey - The setting key to bind.
     * @returns The control binding.
     * @unofficial
     */
    getControlBinding(configKey: string): unknown;

    /**
     * Read the current value for a control key. Called on every render of a
     * `control`-type setting definition.
     *
     * The default implementation reads from `this.app.vault.getConfig` —
     * appropriate for the app's own setting tabs. {@link obsidian#PluginSettingTab} and
     * `InternalPluginSettingTab` override this to read from their conventional
     * settings storage; plugins with custom storage override on their
     * subclass.
     *
     * @param key - The setting key to read.
     * @returns The current value for the key.
     * @official
     * @since 1.13.0
     */
    getControlValue(key: string): unknown;

    /**
     * Finds the setting definition rendered to the given element.
     *
     * @param el - The setting item element.
     * @returns The matching definition, or `undefined` if none.
     * @unofficial
     */
    getDefinitionForElement(el: HTMLElement): unknown;

    /**
     * Finds the rendered element for a setting definition.
     *
     * @param definition - The setting definition.
     * @returns The matching element, or `undefined` if none.
     * @unofficial
     */
    getElementForDefinition(definition: unknown): HTMLElement | undefined;

    /**
     * Override to provide setting definitions. Return an array of definitions
     * and inline groups. Called on every {@link display} and once when the tab
     * is added to the setting modal for search indexing.
     *
     * @returns The setting definition items.
     * @official
     * @since 1.13.0
     */
    getSettingDefinitions(): SettingDefinitionItem[];

    /**
     * Hides the contents of the setting tab.
     * Any registered components should be unloaded when the view is hidden.
     * Override this if you need to perform additional cleanup.
     *
     * @official
     */
    hide(): void;

    /**
     * Re-evaluate every `visible` and `disabled` predicate against the
     * current state and apply the result to the rendered DOM. Call this
     * from a `render` callback's `onChange` (or any other imperative path)
     * after mutating state that other settings' predicates depend on.
     *
     * Cheap: toggles CSS state in place, no re-render. For changes that
     * affect the structure of the definitions themselves (added or removed
     * items), call {@link update} instead.
     *
     * @official
     * @since 1.13.0
     */
    refreshDomState(): void;

    /**
     * Re-renders the tab's already-built setting items, or displays the tab if none exist yet.
     *
     * @unofficial
     */
    renderTab(): void;

    /**
     * Persist a new value for a control key. Called on user change of a
     * `control`-type setting definition.
     *
     * The default implementation writes to `this.app.vault.setConfig`.
     * Override to persist elsewhere; pair with {@link getControlValue}.
     *
     * @param key - The setting key to write.
     * @param value - The new value to persist.
     * @returns Void or a promise that resolves once the value is persisted.
     * @official
     * @since 1.13.0
     */
    setControlValue(key: string, value: unknown): Promise<void> | void;

    /**
     * Stores the result of {@link getSettingDefinitions} for rendering and
     * search indexing. Called by `addSettingTab()` and by dynamic tabs when
     * their data changes.
     *
     * @official
     * @since 1.13.0
     */
    update(): void;
  }
}
