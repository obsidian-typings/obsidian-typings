import type {
    App,
    Command,
    Component,
    Debouncer,
    IconName,
    Plugin,
    PluginSettingTab,
    ViewCreator
} from 'obsidian';
import type { MobileFileInfo } from '../MobileFileInfo.d.ts';
import type { InternalPlugins } from './InternalPlugins.d.ts';
import type { RibbonItem } from './RibbonItem.d.ts';

/**
 * Base interface for an internal plugin registration, managing lifecycle, commands, and views.
 *
 * @typeParam InternalPluginInstance - The type of the plugin instance.
 * @public
 * @unofficial
 */
export interface InternalPlugin<InternalPluginInstance> extends Component {
    /** Button elements added by this plugin. */
    addedButtonEls: HTMLDivElement[];

    /** Reference to the app. */
    app: App;

    /** Commands registered by this plugin. */
    commands: Command[];

    /** Whether this plugin is currently enabled. */
    enabled: boolean;

    /** Whether this plugin has a status bar item. */
    hasStatusBarItem: boolean;

    /** The plugin instance containing the actual logic. */
    instance: InternalPluginInstance;

    /** Timestamp of the last settings save. */
    lastSave: number;

    /** Reference to the internal plugins manager. */
    manager: InternalPlugins;

    /** Mobile file info renderers registered by this plugin. */
    mobileFileInfo: MobileFileInfo[];

    /** Debounced handler for config file changes. */
    onConfigFileChange: Debouncer<[], Promise<void>>;

    /** Ribbon items registered by this plugin. */
    ribbonItems: RibbonItem[];

    /** Status bar element for this plugin, or `null` if none. */
    statusBarEl: HTMLDivElement | null;

    /** View creators registered by this plugin, keyed by view type. */
    views: Record<string, ViewCreator>;

    /**
     * Add a settings tab for this plugin.
     *
     * @param settingTab - The settings tab to add.
     */
    addSettingTab(settingTab: PluginSettingTab): void;

    /**
     * Constructor.
     *
     * @param app - The app.
     * @param instance - The instance.
     * @param internalPlugins - The internalPlugins.
     * @returns The new instance.
     * To get the constructor, use `getInternalPluginConstructor()` from `obsidian-typings/implementations`.
     */
    constructor__(app: App, instance: InternalPluginInstance, internalPlugins: InternalPlugins): this;

    /**
     * Delete persisted data for this plugin.
     *
     * @returns A promise that resolves when the data is deleted.
     */
    deleteData(): Promise<void>;

    /**
     * Disable this plugin.
     *
     * @param isDisabledByUser - Whether the user manually disabled the plugin.
     */
    disable(isDisabledByUser?: boolean): void;

    /**
     * Enable this plugin.
     *
     * @param isEnabledByUser - Whether the user manually enabled the plugin.
     * @returns A promise that resolves when the plugin is enabled.
     */
    enable(isEnabledByUser?: boolean): Promise<void>;

    /**
     * Get the last modified time of the plugin config file.
     *
     * @returns The modification timestamp, or `undefined`.
     */
    getModifiedTime(): Promise<number | undefined>;

    /**
     * Handle changes to the plugin config file.
     *
     * @returns A promise that resolves when the config change is processed.
     */
    handleConfigFileChange(): Promise<void>;

    /** Initialize this plugin. */
    init(): void;

    /**
     * Load persisted data for this plugin.
     *
     * @returns The loaded data, or `null` if none exists.
     */
    loadData(): Promise<object | null>;

    /**
     * Register a global command for this plugin.
     *
     * @param command - The command to register.
     */
    registerGlobalCommand(command: Command): void;

    /**
     * Register a mobile file info renderer callback.
     *
     * @param renderCallback - The callback to render file info into an element.
     */
    registerMobileFileInfo(renderCallback: (el: HTMLElement) => void): void;

    /**
     * Register a ribbon item button for this plugin.
     *
     * @param title - The tooltip title for the ribbon item.
     * @param icon - The icon name to display.
     * @param callback - The callback invoked when clicked.
     */
    registerRibbonItem(title: string, icon: IconName, callback: () => Promise<void>): void;

    /** Register a status bar item for this plugin. */
    registerStatusBarItem(): void;

    /**
     * Register a view type with its creator function.
     *
     * @param type - The view type identifier.
     * @param creator - The factory function to create the view.
     */
    registerViewType(type: string, creator: ViewCreator): void;

    /**
     * Save data for this plugin.
     *
     * @param data - The data object to persist.
     * @returns A promise that resolves when the data is saved.
     */
    saveData(data: object): Promise<void>;
}
