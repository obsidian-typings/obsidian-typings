import { Extension } from '@codemirror/state';

export {};

declare module 'obsidian' {
    /**
     * Base class for all plugins.
     * @since 0.9.7
     */
    interface Plugin extends Component {
        /**
         * The Obsidian app instance.
         *
         * @official
         * @since 0.9.7
         */
        app: App;

        /**
         * The plugin manifest.
         *
         * @official
         * @since 0.9.7
         */
        manifest: PluginManifest;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onConfigFileChange: Debouncer<[], Promise<void>>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        _onConfigFileChange(): Promise<void>;

        /**
         * Register a command globally.
         * Registered commands will be available from the {@link https://help.obsidian.md/Plugins/Command+palette Command palette}.
         * The command id and name will be automatically prefixed with this plugin's id and name.
         *
         * @param command - The command to register.
         * @returns The command object.
         * @example
         * ```ts
         * plugin.addCommand({
         *     id: 'foo',
         *     name: 'Foo',
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        addCommand(command: Command): Command;

        /**
         * Adds a ribbon icon to the left bar.
         *
         * @param icon - The icon name to be used. See {@link addIcon}.
         * @param title - The title to be displayed in the tooltip.
         * @param callback - The `click` callback.
         * @returns The HTMLElement for the ribbon icon.
         * @example
         * ```ts
         * plugin.addRibbonIcon('dice', 'foo', (evt) => {
         *     console.log('clicked');
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        addRibbonIcon(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement;

        /**
         * Register a settings tab, which allows users to change settings.
         * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings#Register+a+settings+tab}.
         * @param settingTab - The setting tab to register.
         * @example
         * ```ts
         * plugin.addSettingTab(mySettingTab);
         * ```
         * @official
         * @since 0.9.7
         */
        addSettingTab(settingTab: PluginSettingTab): void;

        /**
         * Adds a status bar item to the bottom of the app.
         * Not available on mobile.
         * @see {@link https://docs.obsidian.md/Plugins/User+interface/Status+bar}.
         * @return HTMLElement - element to modify.
         * @official
         * @since 0.9.7
         */
        addStatusBarItem(): HTMLElement;

        /**
         * The constructor for the plugin.
         *
         * @param app - The Obsidian app instance.
         * @param manifest - The plugin manifest.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App, manifest: PluginManifest): this;

        /**
         * Load settings data from disk.
         * Data is stored in `data.json` in the plugin folder.
         * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings}.
         * @returns The promise that resolves to the settings data.
         * @official
         * @since 0.9.7
         */
        loadData(): Promise<any>;

        /**
         * Called when the `data.json` file is modified on disk externally from Obsidian.
         * This usually means that a Sync service or external program has modified
         * the plugin settings.
         *
         * Implement this method to reload plugin settings when they have changed externally.
         *
         * @returns The result is discarded. The result is discarded. Usually it's `void` or `Promise<void>`.
         * @official
         * @since 1.5.7
         */
        onExternalSettingsChange?(): any;

        /**
         * Called when the plugin is loaded.
         *
         * @official
         * @since 0.9.7
         */
        onload(): Promise<void> | void;

        /**
         * Perform any initial setup code. The user has explicitly interacted with the plugin.
         * so its safe to engage with the user. If your plugin registers a custom view,
         * you can open it here.
         *
         * @official
         * @since 1.7.2
         */
        onUserEnable(): void;

        /**
         * Registers a CodeMirror 6 extension.
         * To reconfigure cm6 extensions for a plugin on the fly, an array should be passed in, and modified dynamically.
         * Once this array is modified, calling {@link Workspace.updateOptions} will apply the changes.
         * @param extension - must be a CodeMirror 6 `Extension`, or an array of Extensions.
         * @example
         * ```ts
         * const myViewPlugin = ViewPlugin.fromClass(MyViewPlugin);
         * const myStateField = StateField.define<DecorationSet>(myStateField);
         * plugin.registerEditorExtension([myViewPlugin, myStateField]);
         * ```
         * @official
         * @since 0.12.8
         */
        registerEditorExtension(extension: Extension): void;

        /**
         * Register an EditorSuggest which can provide live suggestions while the user is typing.
         *
         * @param editorSuggest - The editor suggest to register.
         * @example
         * ```ts
         * plugin.registerEditorSuggest(myEditorSuggest);
         * ```
         * @official
         * @since 0.12.7
         */
        registerEditorSuggest(editorSuggest: EditorSuggest<any>): void;

        /**
         * Register a set of extensions for a view type.
         *
         * @param extensions - The extensions to register.
         * @param viewType - The type of the view to register.
         * @example
         * ```ts
         * plugin.registerExtensions(['foo', 'bar'], 'baz');
         * ```
         * @official
         * @since 0.9.7
         */
        registerExtensions(extensions: string[], viewType: string): void;

        /**
         * Registers a view with the 'Page preview' core plugin as an emitter of the 'hover-link' event.
         *
         * @param id - The id of the view to register.
         * @param info - The info of the view to register.
         * @example
         * ```ts
         * plugin.registerHoverLinkSource('foo', {
         *     display: 'bar',
         *     defaultMod: true,
         * });
         * ```
         * @official
         * @since 1.1.0
         */
        registerHoverLinkSource(id: string, info: HoverLinkSource): void;

        /**
         * Register a special post processor that handles fenced code given a language and a handler.
         * This special post processor takes care of removing the `<pre><code>` and create a `<div>` that
         * will be passed to the handler, and is expected to be filled with custom elements.
         * @see {@link https://docs.obsidian.md/Plugins/Editor/Markdown+post+processing#Post-process+Markdown+code+blocks}.
         * @param language - The language of the code block to register.
         * @param handler - The handler to register.
         * @param sortOrder - The sort order of the post processor.
         * @returns The code block processor.
         * @example
         * ```ts
         * plugin.registerMarkdownCodeBlockProcessor('foo', (source, el, ctx) => {
         *     el.createEl('strong');
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        registerMarkdownCodeBlockProcessor(
            language: string,
            handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<any> | void,
            sortOrder?: number
        ): MarkdownPostProcessor;

        /**
         * Registers a post processor, to change how the document looks in reading mode.
         * @see {@link https://docs.obsidian.md/Plugins/Editor/Markdown+post+processing}.
         * @param postProcessor - The post processor to register.
         * @param sortOrder - The sort order of the post processor.
         * @returns The post processor.
         * @example
         * ```ts
         * plugin.registerMarkdownPostProcessor((el, ctx) => {
         *     el.createEl('strong');
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        registerMarkdownPostProcessor(postProcessor: MarkdownPostProcessor, sortOrder?: number): MarkdownPostProcessor;

        /**
         * Register a handler for obsidian:// URLs.
         *
         * @param action - the action string. For example, 'open' corresponds to `obsidian://open`.
         * @param handler - the callback to trigger. A key-value pair that is decoded from the query will be passed in.
         *                  For example, `obsidian://open?key=value` would generate `{'action': 'open', 'key': 'value'}`.
         * @example
         * ```ts
         * plugin.registerObsidianProtocolHandler('foo', (params) => {
         *     console.log(params);
         * });
         * ```
         * @official
         * @since 0.11.0
         */
        registerObsidianProtocolHandler(action: string, handler: ObsidianProtocolHandler): void;

        /**
         * Register a custom view.
         *
         * @param type - The type of the view to register.
         * @param viewCreator - The view creator to register.
         * @example
         * ```ts
         * plugin.registerView('my-view', (leaf) => {
         *     return new MyView(leaf);
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        registerView(type: string, viewCreator: ViewCreator): void;

        /**
         * Manually remove a command from the list of global commands.
         * This should not be needed unless your plugin registers commands dynamically.
         *
         * @param commandId - The id of the command to remove.
         * @example
         * ```ts
         * plugin.removeCommand('foo');
         * ```
         * @official
         * @since 1.7.2
         */
        removeCommand(commandId: string): void;

        /**
         * Write settings data to disk.
         * Data is stored in `data.json` in the plugin folder.
         * @see {@link https://docs.obsidian.md/Plugins/User+interface/Settings}.
         * @param data - The settings data to save.
         * @returns The promise that resolves when the data is saved.
         * @example
         * ```ts
         * await plugin.saveData({ foo: 'bar' });
         * ```
         * @official
         * @since 0.9.7
         */
        saveData(data: any): Promise<void>;
    }
}
