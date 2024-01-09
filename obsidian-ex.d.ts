import {
    App,
    Command,
    Component,
    Constructor,
    EditorRange,
    Events,
    KeymapInfo,
    Loc,
    Plugin,
    Reference,
    Scope,
    SplitDirection,
    TFile,
    TFolder,
    Vault,
    View,
    ViewState,
    Workspace,
    WorkspaceLeaf,
} from 'obsidian';
import { EditorView } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { IpcRenderer } from 'electron';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Account {
    /**
     * The company associated with the activated commercial license
     */
    company: string;
    /**
     * The email address associated with the account
     */
    email: string;
    /**
     *
     */
    expiry: number;
    /**
     *
     */
    key: string | undefined;
    /**
     *
     */
    keyValidation: string;
    /**
     * The license available to the account
     */
    license: '' | 'insider';
    /**
     * Profile name
     */
    name: string;
    /**
     *
     */
    seats: number;
    /**
     *
     */
    token: string;

    // TODO: Add Sync and Publish API functions here
}

// interface AppMenuBarManager {
// 	/**
// 	 * Reference to App
// 	 */
// 	app: App;
//
// 	/**
// 	 *
// 	 */
// 	requestRender: () => void;
//
// 	/**
// 	 *
// 	 */
// 	requestUpdateViewState: () => void;
// }

interface Commands {
    /**
     * Reference to App
     */
    app: App;

    /**
     * Commands *without* editor callback, will always be available in the command palette
     * @example `app:open-vault` or `app:reload`
     */
    commands: Record<string, Command>;
    /**
     * Commands *with* editor callback, will only be available when editor is active and callback returns true
     * @example `editor:fold-all` or `command-palette:open`
     */
    editorCommands: Record<string, Command>;
    /**
     * Add a command to the command registry
     * @param command Command to add
     */
    addCommand: (command: Command) => void;
    /**
     * Execute a command by reference
     * @param command Command to execute
     */
    executeCommand: (command: Command) => boolean;
    /**
     * Execute a command by ID
     * @param commandId ID of command to execute
     */
    executeCommandById: (commandId: string) => boolean;
    /**
     * Find a command by ID
     * @param commandId
     */
    findCommand: (commandId: string) => Command | undefined;
    /**
     * Lists **all** commands, both with and without editor callback
     */
    listCommands: () => Command[];
    /**
     * Remove a command from the command registry
     * @param commandId Command to remove
     */
    removeCommand: (commandId: string) => void;
}

// interface ThemeRecord {
// 	/**
// 	 * Author of the theme
// 	 */
// 	author: string;
// 	/**
// 	 * @internal
// 	 */
// 	authorEl?: HTMLElement;
// 	/**
// 	 * Amount of downloads the theme
// 	 */
// 	downloads: number;
// 	/**
// 	 * @internal
// 	 */
// 	el?: HTMLElement;
// 	matches: null;
// 	modes: ['light', 'dark'] | ['light'];
// 	name: string;
// 	nameEl?: HTMLElement;
// 	repo: string;
// 	score: number;
// 	screenshot: string;
// 	updateIconEl?: HTMLElement;
// 	/**
// 	 * Whether the theme was updated
// 	 */
// 	updated: number;
// }

interface ThemeManifest {
    /**
     * Name of the author of the theme
     */
    author: string;
    /**
     * URL to the author's website
     */
    authorUrl?: string;
    /**
     * Storage location of the theme relative to the vault root
     */
    dir: string;
    /**
     * URL for funding the author
     */
    fundingUrl?: string;
    /**
     * Minimum Obsidian version compatible with the theme
     */
    minAppVersion: string;
    /**
     * Name of the theme
     */
    name: string;
    /**
     * Version of the theme
     * @remark Defaults to "0.0.0" if no theme manifest was provided in the repository
     */
    version: '0.0.0' | string;
}

interface CustomCSS extends Component {
    /**
     * Reference to App
     */
    app: App;
    /**
     * @internal
     */
    boundRaw: () => void;
    /**
     * @internal Cache of CSS snippet filepath (relative to vault root) to CSS snippet contents
     */
    csscache: Map<string, string>;
    /**
     * Set of enabled snippet, given by filenames
     */
    enabledSnippets: Set<string>;
    /**
     * @internal
     * Contains references to Style elements containing custom CSS snippets
     */
    extraStyleEls: HTMLStyleElement[];
    /**
     * List of theme names not fully updated to post v1.0.0 theme guidelines
     */
    oldThemes: string[];
    /**
     * @internal
     */
    queue: WeakMap<any, any>;
    /**
     * @internal
     */
    requestLoadSnippets: () => void;
    /**
     * @internal
     */
    requestLoadTheme: () => void;
    /**
     * @internal
     */
    requestReadThemes: () => void;
    /**
     * List of snippets detected by Obsidian, given by their filenames
     */
    snippets: string[];
    /**
     * Currently active theme, given by its name
     * @remark "" is the default Obsidian theme
     */
    theme: '' | string;
    /**
     * Mapping of theme names to their manifest
     */
    themes: Record<string, ThemeManifest>;
    /**
     * @internal
     */
    updates: Record<string, any>;

    /**
     * Check whether a specific theme can be updated
     * @param themeName - Name of the theme to check
     */
    checkForUpdate: (themeName: string) => void;
    /**
     * Check all themes for updates
     */
    checkForUpdates: () => void;
    /**
     * Disable translucency of application background
     */
    disableTranslucency: () => void;
    /**
     * Fetch legacy theme CSS using the pre-v1.0.0 theme download pipeline
     * @returns string obsidian.css contents
     */
    downloadLegacyTheme: ({ repo: string }) => Promise<string>;
    /**
     * Enable translucency of application background
     */
    enableTranslucency: () => void;
    /**
     * Fetch a theme's manifest using repository URL
     * @remark Do **not** include github prefix, only `username/repo`
     */
    getManifest: (repoUrl: string) => Promise<ThemeManifest>;
    /**
     * Convert snippet name to its corresponding filepath (relative to vault root)
     * @returns string `.obsidian/snippets/${snippetName}.css`
     */
    getSnippetPath: (snippetName: string) => string;
    /**
     * Returns the folder path where snippets are stored (relative to vault root)
     */
    getSnippetsFolder: () => string;
    /**
     * Returns the folder path where themes are stored (relative to vault root)
     */
    getThemesFolder: () => string;
    /**
     * Convert theme name to its corresponding filepath (relative to vault root)
     * @returns string `.obsidian/themes/${themeName}/theme.css`
     */
    getThemePath: (themeName: string) => string;
    /**
     * Returns whether there are themes that can be updated
     */
    hasUpdates: () => boolean;
    /**
     * Install a legacy theme using the pre-v1.0.0 theme download pipeline<br>
     * Will create a corresponding dummy manifest for the theme
     * @remark Name will be used as the folder name for the theme
     */
    installLegacyTheme: (arg: { name: string, repo: string, author: string }) => Promise<void>;
    /**
     * Install a theme using the regular theme download pipeline
     */
    installTheme: (arg: { name: string, repo: string, author: string }, version: string) => Promise<void>;
    /**
     * Check whether a specific theme is installed by theme name
     */
    isThemeInstalled: (themeName: string) => boolean;
    /**
     * @internal
     */
    onRaw: (e: any) => void;
    /**
     * @internal
     */
    onload: () => void;
    /**
     * @todo
     * @internal
     */
    readSnippets: () => void;
    /**
     * @todo
     * @internal
     */
    readThemes: () => void;
    /**
     * Remove a theme by theme name
     */
    removeTheme: (themeName: string) => Promise<void>;
    /**
     * Set the activation status of a snippet by snippet name
     */
    setCssEnabledStatus: (snippetName: string, enabled: boolean) => void;
    /**
     * Set the active theme by theme name
     */
    setTheme: (themeName: string) => void;
    /**
     * Set the translucency of application background
     */
    setTranslucency: (translucency: boolean) => void;
}

interface ObsidianDOM {
    /**
     * Root element of the application
     */
    appContainerEl: HTMLElement;
    /**
     * Child of `appContainerEl` containing the main content of the application
     */
    horizontalMainContainerEl: HTMLElement;
    /**
     * Status bar element containing word count among other things
     */
    statusBarEl: HTMLElement;
    /**
     * Child of `horizontalMainContainerEl` containing the workspace DOM
     */
    workspaceEl: HTMLElement;
}

// interface EmbedRegistry {
// 	embedByExtension: Map<string, (e) => any>;
// }

interface PositionedReference extends Reference {
    /**
     * Position of the reference in the file
     */
    position: {
        start: Loc;
        end: Loc;
    }
}

interface LinkUpdate {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Link position in the file
     */
    reference: PositionedReference;
    /**
     * File that was resolved
     */
    resolvedFile: TFile;
    /**
     * Paths the file could have been resolved to
     */
    resolvedPaths: string[];
    /**
     * File that contains the link
     */
    sourceFile: TFile;
}

interface HotkeyManager {
    /**
     * Reference to App
     */
    app: App;
    /**
     * @internal Whether hotkeys have been baked (checks completed)
     */
    baked: boolean;
    /**
     * Assigned hotkeys
     */
    bakedHotkeys: KeymapInfo[];
    /**
     * Array of hotkey index to command ID
     */
    bakedIds: string[];
    /**
     * Custom (non-Obsidian default) hotkeys, one to many mapping of command ID to assigned hotkey
     */
    customKeys: Record<string, KeymapInfo[]>;
    /**
     * Default hotkeys, one to many mapping of command ID to assigned hotkey
     */
    defaultKeys: Record<string, KeymapInfo[]>;

    /**
     * Add a hotkey to the default hotkeys
     * @param command - Command ID to add hotkey to
     * @param keys - Hotkeys to add
     */
    addDefaultHotkeys: (command: string, keys: KeymapInfo[]) => void;
    /**
     * Get hotkey associated with command ID
     * @param command - Command ID to get hotkey for
     */
    getDefaultHotkeys: (command: string) => KeymapInfo[];
    /**
     * Remove a hotkey from the default hotkeys
     * @param command - Command ID to remove hotkey from
     */
    removeDefaultHotkeys: (command: string) => void;
    /**
     * Add a hotkey to the custom hotkeys (overrides default hotkeys)
     * @param command - Command ID to add hotkey to
     * @param keys - Hotkeys to add
     */
    setHotkeys: (command: string, keys: KeymapInfo[]) => void;
    /**
     * Get hotkey associated with command ID
     * @param command - Command ID to get hotkey for
     */
    getHotkeys: (command: string) => KeymapInfo[];
    /**
     * Remove a hotkey from the custom hotkeys
     * @param command - Command ID to remove hotkey from
     */
    removeHotkeys: (command: string) => void;
    /**
     * Pretty-print hotkey of a command
     * @param command
     */
    printHotkeyForCommand: (command: string) => string;
    /**
     * Trigger a command by keyboard event
     * @param event - Keyboard event to trigger command with
     * @param keypress - Pressed key information
     */
    onTrigger: (event: KeyboardEvent, keypress: KeymapInfo) => boolean;
    /**
     * @internal Bake hotkeys (create mapping of pressed key to command ID)
     */
    bake: () => void;
    /**
     * @internal Load hotkeys from storage
     */
    load: () => void;
    /**
     * @internal Save custom hotkeys to storage
     */
    save: () => void;
}

type InternalPluginName = "audio-recorder" |
    "backlink" |
    "bookmarks" |
    "canvas" |
    "command-palette" |
    "daily-notes" |
    "editor-status" |
    "file-explorer" |
    "file-recovery" |
    "global-search" |
    "graph" |
    "markdown-importer" |
    "note-composer" |
    "outgoing-link" |
    "outline" |
    "page-preview" |
    "properties" |
    "publish" |
    "random-note" |
    "slash-command" |
    "slides" |
    "starred" |
    "switcher" |
    "sync" |
    "tag-pane" |
    "templates" |
    "word-count" |
    "workspaces" |
    "zk-prefixer"

interface InternalPlugin extends Plugin {
    disable: () => void;
    enable: () => void;
}

interface FileExplorerPlugin extends InternalPlugin {
    revealInFolder(folder: TFolder): Promise<void>;
}

interface InternalPlugins extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Mapping of whether an internal plugin is enabled
     */
    config: Record<InternalPluginName, boolean>;
    /**
     * @internal
     */
    migration: boolean;
    /**
     * Plugin configs for internal plugins
     */
    plugins: Record<InternalPluginName, InternalPlugin>;
    /**
     * @internal Request save of plugin configs
     */
    requestSaveConfig: () => void;

    /**
     * Get an enabled internal plugin by ID
     * @param id - ID of the plugin to get
     */
    getEnabledPluginById(id: InternalPluginName): InternalPlugin | null;
    getEnabledPluginById(id: "file-explorer"): FileExplorerPlugin | null;

    /**
     * Get all enabled internal plugins
     */
    getEnabledPlugins: () => InternalPlugin[];
    /**
     * Get an internal plugin by ID
     * @param id - ID of the plugin to get
     */
    getPluginById: (id: InternalPluginName) => InternalPlugin;

    /**
     * @internal - Load plugin configs and enable plugins
     */
    enable: () => Promise<void>;
    /**
     * @internal
     */
    loadPlugin: (arg: { id: string, name: string }) => string;
    /**
     * @internal
     */
    onRaw: (cb1: any, cb2: any) => void;
    /**
     * @internal - Save current plugin configs
     */
    saveConfig: () => Promise<void>;
    /**
     * @internal
     */
    trigger: (arg: string) => void;
}

interface KeyScope {
    /**
     * Callback of function to execute when key is pressed
     */
    func: () => void;
    /**
     * Key to match
     */
    key: string | null;
    /**
     * Modifiers to match
     */
    modifiers: string | null;
    /**
     * Scope where the key interceptor is registered
     */
    scope: Scope;
}

// interface KeymapManager {
// 	/**
// 	 * Modifiers pressed within keyscope
// 	 */
// 	modifiers: string;
// 	/**
// 	 * @internal
// 	 */
// 	prevScopes: EScope[];
// 	/**
// 	 * @internal - Root scope of the application
// 	 */
// 	rootScope: EScope;
//
// 	/**
// 	 * Get the root scope of the application
// 	 */
// 	getRootScope: () => EScope;
// 	/**
// 	 * Check whether a specific modifier was part of the keypress
// 	 */
// 	hasModifier: (modifier: Modifier) => boolean;
// 	/**
// 	 * Check whether event has same modifiers as the current keypress
// 	 */
// 	matchModifiers: (event: KeyboardEvent) => boolean;
// 	/**
// 	 * @internal - On focus keyscope
// 	 */
// 	onFocusIn: (event: FocusEvent) => void;
// 	/**
// 	 * @internal - On keypress find matching keyscope and execute callback
// 	 */
// 	onKeyEvent: (event: KeyboardEvent) => void;
// 	/**
// 	 * @internal - Pop a scope from the prevScopes stack
// 	 */
// 	popScope: (scope: EScope) => void;
// 	/**
// 	 * @internal - Push a scope to the prevScopes stack and set it as the current scope
// 	 */
// 	pushScope: (scope: EScope) => void;
// 	/**
// 	 * @internal - Update last pressed modifiers
// 	 */
// 	updateModifiers: (event: KeyboardEvent) => void;
// }

// interface LoadProgress {
// 	/**
// 	 * Application's document
// 	 */
// 	doc: Document;
// 	/**
// 	 * @internal Loading bar element
// 	 */
// 	el: HTMLElement;
// 	/**
// 	 * @internal First part of the line
// 	 */
// 	line1El: HTMLElement;
// 	/**
// 	 * @internal Second part of the line
// 	 */
// 	line2El: HTMLElement;
// 	/**
// 	 * @internal Main line element
// 	 */
// 	lineEl: HTMLElement;
// 	/**
// 	 * @internal Message element for the loading bar
// 	 */
// 	messageEl: HTMLElement;
// 	/**
// 	 * @internal Timeout for the loading bar
// 	 */
// 	showTimeout: number;
//
// 	/**
// 	 * @internal Delay showing the loading bar
// 	 */
// 	delayedShow: () => LoadProgress;
// 	/**
// 	 * @internal Hide and remove the loading bar
// 	 */
// 	hide: () => LoadProgress;
// 	/**
// 	 * @internal Update the loading bar message
// 	 * @param message - Message to update to
// 	 */
// 	setMessage: (message: string) => LoadProgress;
// 	/**
// 	 * @internal Update the loading bar progress
// 	 * @param current - Current progress
// 	 * @param max - Maximum progress
// 	 */
// 	setProgress: (current: number, max: number) => LoadProgress;
// 	/**
// 	 * @internal Set the loading bar to unknown progress
// 	 */
// 	setUnknownProgress: () => LoadProgress;
// }

interface BlockCache {
    /**
     * Reference to App
     */
    app: App;

    /**
     * @internal
     */
    cache: any;
}

interface FileCacheEntry {
    /**
     * Hash of file contents
     */
    hash: string;
    /**
     * Last modified time of file
     */
    mtime: number;
    /**
     * Size of file in bytes
     */
    size: number;
}

interface CustomArrayDict<T> {
    data: Record<string, T[]>;

    add: (key: string, value: T) => void;
    remove: (key: string, value: T) => void;
    removeKey: (key: string) => void;
    get: (key: string) => T[] | null;
    keys: () => string[];
    clear: (key: string) => void;
    clearAll: () => void;
    contains: (key: string, value: T) => boolean;
    count: () => number;
}

interface PropertyInfo {
    /**
     * Name of property
     */
    name: string;
    /**
     * Type of property
     */
    type: string;
    /**
     * Usage count of property
     */
    count: number;
}

type PropertyWidgetType = "aliases"
    | "checkbox"
    | "date"
    | "datetime"
    | "multitext"
    | "number"
    | "tags"
    | "text"

interface PropertyWidget {
    /**
     * @internal
     */
    default: () => void;
    /**
     * Lucide-dev icon associated with the widget
     */
    icon: string;
    /**
     * @internal Name proxy
     */
    name: any;
    /**
     * @internal Render function for the widget
     */
    render: (element: HTMLElement, metadataField: any, property: PropertyInfo) => void;
    /**
     * @internal Reserved keys for the widget
     */
    reservedKeys: string[];
    /**
     * Widget type
     */
    type: string;
    /**
     * @internal Validate correctness of property input with respects to the widget
     */
    validate: (value: any) => boolean;
}

interface MetadataTypeManager extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Registered properties of the vault
     */
    properties: Record<string, PropertyInfo>;
    /**
     * @internal Registered type widgets
     */
    registeredTypeWidgets: Record<PropertyWidgetType, PropertyWidget>;
    /**
     * Associated widget types for each property
     */
    types: Record<string, PropertyWidgetType>;

    /**
     * Get all registered properties of the vault
     */
    getAllProperties: () => Record<string, PropertyInfo>;
    /**
     * Get assigned widget type for property
     */
    getAssignedType: (property: string) => PropertyWidgetType | null;
    /**
     * Get info for property
     */
    getPropertyInfo: (property: string) => PropertyInfo;
    /**
     * @internal Get expected widget type for property and the one inferred from the property value
     */
    getTypeInfo: (arg: { key: string, type: string, value: any }) => { inferred: PropertyWidget, expected: PropertyWidget }
    /**
     * Get all properties with an assigned widget type
     */
    getTypes: () => string[];
    /**
     * @internal Load property types from config
     */
    loadData: () => Promise<void>;
    /**
     * @internal Save property types to config
     */
    save: () => Promise<void>;
    /**
     * @internal Get all properties from metadata cache
     */
    savePropertyInfo: () => void;
    /**
     * @internal Set widget type for property
     */
    setType: (property: string, type: PropertyWidgetType) => void;
    /**
     * @internal
     */
    trigger: (e: any) => void;
    /**
     * @internal Unset widget type for property
     */
    unsetType: (property: string) => void;
}
//
// interface MobileNavbar {
// 	/**
// 	 * Reference to App
// 	 */
// 	app: App;
// 	/**
// 	 * @internal Back button element
// 	 */
// 	backButtonEl: HTMLElement;
// 	/**
// 	 * @internal Container element
// 	 */
// 	containerEl: HTMLElement;
// 	/**
// 	 * @internal Forward button element
// 	 */
// 	forwardButtonEl: HTMLElement;
// 	/**
// 	 * Whether the mobile navbar is currently visible
// 	 */
// 	isVisible: boolean;
// 	/**
// 	 * @internal On ribbon click
// 	 */
// 	onRibbonClick: () => void;
// 	/**
// 	 * @internal Ribbon menu flair element
// 	 */
// 	ribbonMenuFlairEl: HTMLElement;
// 	/**
// 	 * @internal Ribbon menu item element
// 	 */
// 	ribbonMenuItemEl: HTMLElement;
// 	/**
// 	 * @internal Tab button element
// 	 */
// 	tabButtonEl: HTMLElement;
//
// 	/**
// 	 * @internal Hide mobile navbar
// 	 */
// 	hide: () => void;
// 	/**
// 	 * @internal Show mobile navbar
// 	 */
// 	show: () => void;
// 	/**
// 	 * @internal Show ribbon menu
// 	 */
// 	showRibbonMenu: () => void;
// 	/**
// 	 * @internal Update navigation buttons
// 	 */
// 	updateNavButtons: () => void;
// 	/**
// 	 * @internal Update ribbon menu item
// 	 */
// 	updateRibbonMenuItem: () => void;
// }
//
// interface MobileToolbar {
// 	/**
// 	 * Reference to App
// 	 */
// 	app: App;
// 	/**
// 	 * @internal Container element
// 	 */
// 	containerEl: HTMLElement;
// 	/**
// 	 * @internal Last selected command ID
// 	 */
// 	lastCommandIds: string;
// 	/**
// 	 * @internal Options container element
// 	 */
// 	optionsContainerEl: HTMLElement;
//
// 	/**
// 	 * @internal Compile all actions for the toolbar
// 	 */
// 	compileToolbar: () => void;
// 	/**
// 	 * @internal Hide mobile toolbar
// 	 */
// 	hide: () => void;
// 	/**
// 	 * @internal Show mobile toolbar
// 	 */
// 	show: () => void;
// }

interface PluginManifest {
    /**
     * Name of the author of the plugin
     */
    author: string;
    /**
     * URL to the author's website
     */
    authorUrl?: string;
    /**
     * Description of the plugin's functionality
     */
    description: string;
    /**
     * Storage location of the plugin relative to the vault root
     */
    dir: string;
    /**
     * URL for funding the author
     */
    fundingUrl?: string;
    /**
     * Unique identifier of the plugin
     */
    id: string;
    /**
     * Whether the plugin is designed for desktop use only
     */
    isDesktopOnly: boolean;
    /**
     * Minimum Obsidian version compatible with the plugin
     */
    minAppVersion: string;
    /**
     * Name of the plugin
     */
    name: string;
    /**
     * Version of the plugin
     */
    version: string;
}

interface PluginUpdateManifest {
    /**
     * Manifest of the plugin
     */
    manifest: PluginManifest;
    /**
     * Repository of the plugin
     */
    repo: string;
    /**
     * New version of the plugin
     */
    version: string;
}

interface Plugins {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Set of enabled plugin IDs
     */
    enabledPlugins: Set<string>;
    /**
     * @internal Plugin ID that is currently being enabled
     */
    loadingPluginId: string | null;
    /**
     * Manifests of all the plugins
     */
    manifests: Record<string, PluginManifest>;
    /**
     * Mapping of plugin ID to plugin instance
     */
    plugins: Record<string, Plugin>;
    /**
     * Mapping of plugin ID to available updates
     */
    updates: Map<string, PluginUpdateManifest>;

    /**
     * @internal Check online list for deprecated plugins to automatically disable
     */
    checkForDeprecations: () => Promise<void>;
    /**
     * Check for plugin updates
     */
    checkForUpdates: () => Promise<void>;
    /**
     * Unload a plugin by ID
     */
    disablePlugin: (id: string) => Promise<void>;
    /**
     * Unload a plugin by ID and save config for persistence
     */
    disablePluginAndSave: (id: string) => Promise<void>;
    /**
     * Enable a plugin by ID
     */
    enablePlugin: (id: string) => Promise<void>;
    /**
     * Enable a plugin by ID and save config for persistence
     */
    enablePluginAndSave: (id: string) => Promise<void>;
    /**
     * Get a plugin by ID
     */
    getPlugin: (id: string) => Plugin | null;
    /**
     * Get the folder where plugins are stored
     */
    getPluginFolder: () => string;
    /**
     * @internal Load plugin manifests and enable plugins from config
     */
    initialize: () => Promise<void>;
    /**
     * Install a plugin from a given URL
     */
    installPlugin: (repo: string, version: string, manifest: PluginManifest) => Promise<void>;
    /**
     * Check whether a plugin is deprecated
     */
    isDeprecated: (id: string) => boolean;
    /**
     * Check whether community plugins are enabled
     */
    isEnabled: () => boolean;
    /**
     * Load a specific plugin's manifest by its folder path
     */
    loadManifest: (path: string) => Promise<void>;
    /**
     * @internal Load all plugin manifests from plugin folder
     */
    loadManifests: () => Promise<void>;
    /**
     *Load a plugin by its ID
     */
    loadPlugin: (id: string) => Promise<Plugin>;
    /**
     * @internal
     */
    onRaw: (e: any) => void;
    /**
     * @internal - Save current plugin configs
     */
    saveConfig: () => Promise<void>;
    /**
     * @internal Toggle whether community plugins are enabled
     */
    setEnable: (enabled: boolean) => Promise<void>;
    /**
     * Uninstall a plugin by ID
     */
    uninstallPlugin: (id: string) => Promise<void>;
    /**
     * Unload a plugin by ID
     */
    unloadPlugin: (id: string) => Promise<void>;
}

interface WindowSelection {
    focusEl: HTMLElement;
    range: Range;
    win: Window;
}

type ConfigItem = "accentColor"
    | "alwaysUpdateLinks"
    | "attachmentFolderPath"
    | "autoConvertHtml"
    | "autoPairBrackets"
    | "autoPairMarkdown"
    | "baseFontSize"
    | "baseFontSizeAction"
    | "cssTheme"
    | "defaultViewMode"
    | "emacsyKeys"
    | "enabledCssSnippets"
    | "fileSortOrder"
    | "focusNewTab"
    | "foldHeading"
    | "foldIndent"
    | "hotkeys"
    | "interfaceFontFamily"
    | "legacyEditor"
    | "livePreview"
    | "mobilePullAction"
    | "mobileQuickRibbonItem"
    | "mobileToolbarCommands"
    | "monospaceFontFamily"
    | "nativeMenus"
    | "newFileFolderPath"
    | "newFileLocation"
    | "newLinkFormat"
    | "pdfExportSettings"
    | "promptDelete"
    | "propertiesInDocument"
    | "readableLineLength"
    | "rightToLeft"
    | "showIndentGuide"
    | "showInlineTitle"
    | "showLineNumber"
    | "showUnsupportedFiles"
    | "showViewHeader"
    | "smartIndentList"
    | "spellcheck"
    | "spellcheckLanguages"
    | "strictLineBreaks"
    | "tabSize"
    | "textFontFamily"
    | "theme"
    | "translucency"
    | "trashOption"
    | "types"
    | "useMarkdownLinks"
    | "useTab"
    | "userIgnoreFilters"
    | "vimMode"

interface AppVaultConfig {
    /**
     * Appearance > Accent color
     */
    accentColor: '' | string;
    /**
     * Files & Links > Automatically update internal links
     */
    alwaysUpdateLinks?: false | boolean;
    /**
     * Files & Links > Attachment folder path
     */
    attachmentFolderPath?: '/' | string;
    /**
     * Editor > Auto convert HTML
     */
    autoConvertHtml?: true | boolean;
    /**
     * Editor > Auto pair brackets
     */
    autoPairBrackets?: true | boolean;
    /**
     * Editor > Auto pair Markdown syntax
     */
    autoPairMarkdown?: true | boolean;
    /**
     * Appearance > Font size
     */
    baseFontSize?: 16 | number;
    /**
     * Appearance > Quick font size adjustment
     */
    baseFontSizeAction?: true | boolean;
    /**
     * Community Plugins > Browse > Sort order
     */
    communityPluginSortOrder: 'download' | 'update' | 'release' | 'alphabetical';
    /**
     * Themes > Browse > Sort order
     */
    communityThemeSortOrder: 'download' | 'update' | 'release' | 'alphabetical';
    /**
     * Appearance > Theme
     * @remark "" is the default Obsidian theme
     */
    cssTheme?: '' | string;
    /**
     * Editor > Default view for new tabs
     */
    defaultViewMode?: 'source' | 'preview';
    /**
     *
     */
    emacsyKeys?: true | boolean;
    /**
     * Appearance > CSS snippets
     */
    enabledCssSnippets?: string[];
    /**
     *
     */
    fileSortOrder?: 'alphabetical';
    /**
     * Editor > Always focus new tabs
     */
    focusNewTab?: true | boolean;
    /**
     * Editor > Fold heading
     */
    foldHeading?: true | boolean;
    /**
     * Editor > Fold indent
     */
    foldIndent?: true | boolean;
    /**
     * Hotkeys
     * @deprecated Likely not used anymore
     */
    hotkeys?: Record<string, string>;
    /**
     * Appearance > Interface font
     */
    interfaceFontFamily?: '' | string;
    /**
     * Editor > Use legacy editor
     */
    legacyEditor?: false | boolean;
    /**
     *
     */
    livePreview?: true | boolean;
    /**
     * Mobile > Configure mobile Quick Action
     */
    mobilePullAction?: 'command-palette:open' | string;
    /**
     *
     */
    mobileQuickRibbonItem?: "" | string;
    /**
     * Mobile > Manage toolbar options
     */
    mobileToolbarCommands?: string[];
    /**
     *
     */
    monospaceFontFamily?: '' | string;
    /**
     * Appearance > Native menus
     */
    nativeMenus?: null | boolean;
    /**
     * Files & Links > Default location for new notes | 'folder' > Folder to create new notes in
     */
    newFileFolderPath?: '/' | string;
    /**
     * Files & Links > Default location for new notes
     */
    newFileLocation?: 'root' | 'current' | 'folder';
    /**
     * Files & Links > New link format
     */
    newLinkFormat?: 'shortest' | 'relative' | 'absolute';
    /**
     * Saved on executing 'Export to PDF' command
     */
    pdfExportSettings?: {
        pageSize: 'letter' | string;
        landscape: false | boolean;
        margin: '0' | string;
        downscalePercent: 100 | number;
    };
    /**
     * Files & Links > Confirm line deletion
     */
    promptDelete?: true | boolean;
    /**
     * Editor > Properties in document
     */
    propertiesInDocument?: 'visible' | 'hidden' | 'source'
    /**
     * Editor > Readable line length
     */
    readableLineLength?: true | boolean;
    /**
     * Editor > Right-to-left (RTL)
     */
    rightToLeft?: false | boolean;
    /**
     * @deprecated Removed as of version 1.4.3
     */
    showFrontmatter?: false | boolean;
    /**
     * Editor > Show indentation guides
     */
    showIndentGuide?: true | boolean;
    /**
     * Editor > Show inline title
     */
    showInlineTitle?: true | boolean;
    /**
     * Editor > Show line numbers
     */
    showLineNumber?: false | boolean;
    /**
     * Files & Links > Detect all file extensions
     */
    showUnsupportedFiles?: false | boolean;
    /**
     * Appearance > Show tab title bar
     */
    showViewHeader?: false | boolean;
    /**
     * Editor > Smart indent lists
     */
    smartIndentList?: true | boolean;
    /**
     * Editor > Spellcheck
     */
    spellcheck?: false | boolean;
    /**
     * @deprecated
     */
    spellcheckDictionary?: [] | string[];
    /**
     * Editor > Spellcheck languages
     */
    spellcheckLanguages?: null | string[];
    /**
     * Editor > Strict line breaks
     */
    strictLineBreaks?: false | boolean;
    /**
     * Editor > Tab indent size
     */
    tabSize?: 4 | number;
    /**
     * Appearance > Text font
     */
    textFontFamily?: '' | string;
    /**
     * Appearance > Base color scheme
     * @remark Not be confused with cssTheme, this setting is for the light/dark mode
     * @remark "moonstone" is light theme, "obsidian" is dark theme
     */
    theme?: 'moonstone' | 'obsidian';
    /**
     * Appearance > Translucent window
     */
    translucency?: false | boolean;
    /**
     * Files & Links > Deleted files
     */
    trashOption?: 'system' | 'local' | 'none';
    /**
     * @deprecated Probably left-over code from old properties type storage
     */
    types: object;
    /**
     * Files & Links > Use [[Wikilinks]]
     */
    useMarkdownLinks?: false | boolean;
    /**
     * Editor > Indent using tabs
     */
    useTab?: true | boolean;
    /**
     * Files & Links > Excluded files
     */
    userIgnoreFilters?: null | string[];
    /**
     * Editor > Vim key bindings
     */
    vimMode?: false | boolean;
}

interface FileEntry {
    /**
     * Creation time (if file)
     */
    ctime?: number;
    /**
     * Modification time (if file)
     */
    mtime?: number;
    /**
     * Full path to file or folder
     * @remark Might be used for resolving symlinks
     */
    realpath: string;
    /**
     * Size in bytes (if file)
     */
    size?: number;
    /**
     * Type of entry
     */
    type: 'file' | 'folder';
}

interface ViewRegistry extends Events {
    /**
     * Mapping of file extensions to view type
     */
    typeByExtension: Record<string, string>;
    /**
     * Mapping of view type to view constructor
     */
    viewByType: Record<string, (leaf: WorkspaceLeaf) => View>;

    /**
     * Get the view type associated with a file extension
     * @param extension File extension
     */
    getTypeByExtension: (extension: string) => string;
    /**
     * Get the view constructor associated with a view type
     */
    getViewCreatorByType: (type: string) => (leaf: WorkspaceLeaf) => View;
    /**
     * Check whether a view type is registered
     */
    isExtensionRegistered: (extension: string) => boolean;
    /**
     * Register a view type for a file extension
     * @param extension File extension
     * @param type View type
     * @remark Prefer registering the extension via the Plugin class
     */
    registerExtensions: (extension: string[], type: string) => void;
    /**
     * Register a view constructor for a view type
     */
    registerView: (type: string, viewCreator: (leaf: WorkspaceLeaf) => View) => void;
    /**
     * Register a view and its associated file extensions
     */
    registerViewWithExtensions: (extensions: string[], type: string, viewCreator: (leaf: WorkspaceLeaf) => View) => void;
    /**
     * @internal
     */
    trigger: (type: string) => void;
    /**
     * Unregister extensions for a view type
     */
    unregisterExtensions: (extension: string[]) => void;
    /**
     * Unregister a view type
     */
    unregisterView: (type: string) => void;
}

interface HoverLinkSource {
    display: string;
    defaultMod: boolean;
}

interface RecentFileTracker {
    /**
     * List of last opened file paths, limited to 50
     */
    lastOpenFiles: string[];
    /**
     * Reference to Vault
     */
    vault: Vault;
    /**
     * Reference to Workspace
       */
    workspace: Workspace;

    /**
     * @internal
     */
    collect: (file: TFile) => void;
    /**
     * Returns the last 10 opened files
     */
    getLastOpenFiles: () => string[];
    /**
     * Get last n files of type (defaults to 10)
     */
    getRecentFiles: (arg?: { showMarkdown: boolean, showCanvas: boolean, showNonImageAttachments: boolean, showImages: boolean, maxCount: number }) => string[];
    /**
     * Set the last opened files
     */
    load: (savedFiles: string[]) => void;
    /**
     * @internal On file create, save file to last opened files
     */
    onFileCreated: (file: TFile) => void;
    /**
     * @internal On file open, save file to last opened files
     */
    onFileOpen: (prevFile: TFile, file: TFile) => void;
    /**
     * @internal On file rename, update file path in last opened files
     */
    onRename: (file: TFile, oldPath: string) => void;
    /**
     * @internal Get last opened files
     */
    serialize: () => string[];
}

interface StateHistory {
    /**
     * Ephemeral cursor state within Editor of leaf
     */
    eState: {
        cursor: EditorRange;
        scroll: number;
    };
    /**
     * Icon of the leaf
     */
    icon?: string;
    /**
     * History of previous and future states of leaf
     */
    leafHistory?: {
        backHistory: StateHistory[];
        forwardHistory: StateHistory[];
    };
    /**
     * Id of parent to which the leaf belonged
     */
    parentId?: string;
    /**
     * Id of root to which the leaf belonged
     */
    rootId?: string;
    /**
     * Last state of the leaf
     */
    state: ViewState;
    /**
     * Title of the leaf
     */
    title?: string;
}

interface LeafEntry {
    children?: LeafEntry[];
    direction?: SplitDirection;
    id: string;
    state?: ViewState;
    type: string;
    width?: number;
}

interface SerializedWorkspace {
    /**
     * Last active leaf
     */
    active: string;
    /**
     * Last opened files
     */
    lastOpenFiles: string[];
    /**
     * Left opened leaf
     */
    left: LeafEntry;
    /**
     * Left ribbon
     */
    leftRibbon: { hiddenItems: Record<string, boolean> };
    /**
     * Main (center) workspace leaf
     */
    main: LeafEntry;
    /**
     * Right opened leaf
     */
    right: LeafEntry;
}

interface ImportedAttachments {
    data: Promise<ArrayBuffer>;
    extension: string;
    filename: string;
    name: string;
}

declare module 'obsidian' {
    interface App {
        /**
         * The account signed in to Obsidian
         */
        account: Account;
        /**
         * ID that uniquely identifies the vault
         * @tutorial Used for implementing device *and* vault-specific
         *  	   data storage using LocalStorage or IndexedDB
         */
        appId: string;
        // /**
        //  * @internal
        //  */
        // appMenuBarManager: AppMenuBarManager;
        /**
         * Contains all registered commands
         * @tutorial Can be used to manually invoke the functionality of a specific command
         */
        commands: Commands;
        /**
         * Custom CSS (snippets/themes) applied to the application
         * @tutorial Can be used to view which snippets are enabled or available,
         * 	   		or inspect loaded-in theme manifests
         */
        customCss: CustomCSS;
        /** References to important DOM elements of the application */
        dom: ObsidianDOM;
        // /**
        //  * @internal
        //  */
        // dragManager: any;
        // /**
        //  * @internal
        //  */
        // embedRegistry: EmbedRegistry;
        /**
         * Manage the creation, deletion and renaming of files from the UI.
         * @remark Prefer using the `vault` API for programmatic file management
         */
        fileManager: FileManager;
        // /**
        //  * @internal
        //  */
        // foldManager: any;
        /**
         * Manages global hotkeys
         * @tutorial Can be used for manually invoking a command, or finding which hotkey is assigned to a specific key input
         * @remark This should not be used for adding hotkeys to your custom commands, this can easily be done via the official API
         */
        hotkeyManager: HotkeyManager;
        /**
         * Manager of internal 'core' plugins
         * @tutorial Can be used to check whether a specific internal plugin is enabled, or grab specific parts
         * 			 from its config for simplifying your own plugin's settings
         */
        internalPlugins: InternalPlugins;
        /**
         * Whether the application is currently running on mobile
         * @remark Prefer usage of `Platform.isMobile`
         * @remark Will be true if `app.emulateMobile()` was enabled
         */
        isMobile: boolean;
        // /**
        //  * @internal
        //  */
        // keymap: KeymapManager;
        // /**
        //  * @internal
        //  */
        // loadProgress: LoadProgress;
        /**
         * Manages the gathering and updating of metadata for all files in the vault
         * @tutorial Use for finding tags and backlinks for specific files, grabbing frontmatter properties, ...
         */
        metadataCache: MetadataCache;
        /**
         * Manages the frontmatter properties of the vault and the rendering of the properties
         * @tutorial Fetching properties used in all frontmatter fields, may potentially be used for adding custom frontmatter widgets
         */
        metadataTypeManager: MetadataTypeManager;

        // /**
        //  * @internal
        //  */
        // mobileNavbar?: MobileNavbar;
        // /**
        //  * @internal
        //  */
        // mobileToolbar?: MobileToolbar;

        // /**
        //  * @internal Events to execute on the next frame
        //  */
        // nextFrameEvents: any[];
        // /**
        //  * @internal Timer for the next frame
        //  */
        // nextFrameTimer: number;

        /**
         * Manages loading and enabling of community (non-core) plugins
         * @tutorial Can be used to communicate with other plugins, custom plugin management, ...
         * @remark Be careful when overriding loading logic, as this may result in other plugins not loading
         */
        plugins: Plugins;
        /**
         * @internal Root keyscope of the application
         */
        scope: Scope;
        /**
         * Manages the settings modal and its tabs
         * @tutorial Can be used to open the settings modal to a specific tab, extend the settings modal functionality, ...
         * @remark Do not use this to get settings values from other plugins, it is better to do this via `app.plugins.getPlugin(ID)?.settings` (check how the plugin stores its settings)
         */
        setting: Setting;
        // /**
        //  * @internal
        //  */
        // shareReceiver: { app: App }
        // /**
        //  * @internal Status bar of the application
        //  */
        // statusBar: { app: App , containerEl: HTMLElement }
        /**
         * Name of the vault with version suffix
         * @remark Formatted as 'NAME - Obsidian vX.Y.Z'
         */
        title: string;
        /**
         * Manages all file operations for the vault, contains hooks for file changes, and an adapter
         * for low-level file system operations
         * @tutorial Used for creating your own files and folders, renaming, ...
         * @tutorial Use `app.vault.adapter` for accessing files outside the vault (desktop-only)
         * @remark Prefer using the regular `vault` whenever possible
         */
        vault: Vault;
        /**
         * Manages the construction of appropriate views when opening a file of a certain type
         * @remark Prefer usage of view registration via the Plugin class
         */
        viewRegistry: ViewRegistry;
        /**
         * Manages the workspace layout, construction, rendering and manipulation of leaves
         * @tutorial Used for accessing the active editor leaf, grabbing references to your views, ...
         */
        workspace: Workspace;

        /**
         * Sets the accent color of the application to the OS preference
         */
        adaptToSystemTheme: () => void;
        /**
         * Sets the accent color of the application (light/dark mode)
         */
        changeTheme: (theme: "moonstone" | "obsidian") => void;
        /**
         * Copies Obsidian URI of given file to clipboard
         * @param file File to generate URI for
         */
        copyObsidianUrl: (file: TFile) => void;
        /**
         * Disables all CSS transitions in the vault (until manually re-enabled)
         */
        disableCssTransition: () => void;
        /**
         * Restarts Obsidian and renders workspace in mobile mode
         * @tutorial Very useful for testing the rendering of your plugin on mobile devices
         */
        emulateMobile: (emulate: boolean) => void;
        /**
         * Enables all CSS transitions in the vault
         */
        enableCssTransition: () => void;
        /**
         * Manually fix all file links pointing towards image/audio/video resources in element
         * @param element Element to fix links in
         */
        fixFileLinks: (element: HTMLElement) => void;
        /**
         * Applies an obfuscation font to all text characters in the vault
         * @tutorial Useful for hiding sensitive information or sharing pretty screenshots of your vault
         * @remark Uses the `Flow Circular` font
         * @remark You will have to restart the app to get normal text back
         */
        garbleText: () => void;
        /**
         * Get the accent color of the application
         * @remark Often a better alternative than `app.vault.getConfig('accentColor')` as it returns an empty string if no accent color was set
         */
        getAccentColor: () => string;
        /**
         * Get the current title of the application
         * @remark The title is based on the currently active leaf
         */
        getAppTitle: () => string;
        /**
         * Get the URI for opening specified file in Obsidian
         */
        getObsidianUrl: (file: TFile) => string;
        /**
         * Get currently active spellcheck languages
         * @deprecated Originally spellcheck languages were stored in app settings,
         * languages are now stored in `localStorage.getItem(spellcheck-languages)`
         */
        getSpellcheckLanguages: () => string[];
        /**
         * Get the current color scheme of the application
         * @remark Identical to `app.vault.getConfig('theme')`
         */
        getTheme: () => "moonstone" | "obsidian";
        /**
         * Import attachments into specified folder
         */
        importAttachments: (imports: ImportedAttachments[], folder: TFolder) => Promise<void>;
        /**
         * @internal Initialize the entire application using the provided FS adapter
         */
        initializeWithAdapter: (adapter: DataAdapter) => Promise<void>;
        /**
         * Load a value from the localstorage given key
         * @param key Key of value to load
         * @remark This method is device *and* vault specific
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault
         */
        loadLocalStorage: (key: string) => string;
        /**
         * @internal Add callback to execute on next frame
         */
        nextFrame: (callback: () => void) => void;
        /**
         * @internal Add callback to execute on next frame, and remove after execution
         */
        nextFrameOnceCallback: (callback: () => void) => void;
        /**
         * @internal Add callback to execute on next frame with promise
         */
        nextFramePromise: (callback: () => Promise<void>) => Promise<void>;
        /**
         * @internal
         */
        onMouseEvent: (evt: MouseEvent) => void;
        /**
         * @internal Execute all logged callback (called when next frame is loaded)
         */
        onNextFrame: (callback: () => void) => void;
        /**
         * Open the help vault (or site if mobile)
         */
        openHelp: () => void;
        /**
         * Open the vault picker
         */
        openVaultChooser: () => void;
        /**
         * Open the file with OS defined default file browser application
         */
        openWithDefaultApp: (path: string) => void;
        /**
         * @internal Register all basic application commands
         */
        registerCommands: () => void;
        /**
         * @internal Register a hook for saving workspace data before unload
         */
        registerQuitHook: () => void;
        /**
         * @internal Save attachment at default attachments location
         */
        saveAttachment: (path: string, extension: string, data: ArrayBuffer) => Promise<void>;
        /**
         * Save a value to the localstorage given key
         * @param key Key of value to save
         * @param value Value to save
         * @remark This method is device *and* vault specific
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault
         */
        saveLocalStorage: (key: string, value: any) => void;
        /**
         * Set the accent color of the application
         * @remark Also updates the CSS `--accent` variables
         */
        setAccentColor: (color: string) => void;
        /**
         * Set the path where attachments should be stored
         */
        setAttachmentFolder: (path: string) => void;
        /**
         * Set the spellcheck languages
         */
        setSpellcheckLanguages: (languages: string[]) => void;
        /**
         * Set the current color scheme of the application and reload the CSS
         */
        setTheme: (theme: "moonstone" | "obsidian") => void;
        /**
         * Open the OS file picker at path location
         */
        showInFolder: (path: string) => void;
        /**
         * Show the release notes for provided version as a new leaf
         * @param version Version to show release notes for (defaults to current version)
         */
        showReleaseNotes: (version?: string) => void;
        /**
         * Updates the accent color and reloads the CSS
         */
        updateAccentColor: () => void;
        /**
         * Update the font family of the application and reloads the CSS
         */
        updateFontFamily: () => void;
        /**
         * Update the font size of the application and reloads the CSS
         */
        updateFontSize: () => void;
        /**
         * Update the inline title rendering in notes
         */
        updateInlineTitleDisplay: () => void;
        /**
         * Update the color scheme of the application and reloads the CSS
         */
        updateTheme: () => void;
        /**
         * Update the view header display in notes
         */
        updateViewHeaderDisplay: () => void;
    }

    interface Scope {
        /**
         * Overridden keys that exist in this scope
         */
        keys: KeyScope[];

        /**
         * @internal Scope that this scope is a child of
         */
        parent: Scope | undefined;
        /**
         * @internal - Callback to execute when scope is matched
         */
        cb: (() => boolean) | undefined;
        /**
         * @internal
         */
        tabFocusContainer: HTMLElement | null;
        /**
         * @internal Execute keypress within this scope
         * @param event - Keyboard event
         * @param keypress - Pressed key information
         */
        handleKey: (event: KeyboardEvent, keypress: KeymapInfo) => any;
        /**
         * @internal
         * @deprecated - Executes same functionality as `Scope.register`
         */
        registerKey: (modifiers: Modifier[], key: string | null, func: KeymapEventListener) => KeymapEventHandler;
        /**
         * @internal
         */
        setTabFocusContainer: (container: HTMLElement) => void;
    }

    interface MetadataCache {
        /**
         * Reference to App
         */
        app: App;
        /**
         * @internal
         */
        blockCache: BlockCache;
        /**
         * @internal IndexedDB database
         */
        db: IDBDatabase
        /**
         * @internal File contents cache
         */
        fileCache: Record<string, FileCacheEntry>;
        /**
         * @internal Amount of tasks currently in progress
         */
        inProgressTaskCount: number;
        /**
         * @internal Whether the cache is fully loaded
         */
        initialized: boolean;
        /**
         * @internal
         */
        linkResolverQueue: any;
        /**
         * @internal File hash to metadata cache entry mapping
         */
        metadataCache: Record<string, CachedMetadata>;
        /**
         * @internal Callbacks to execute on cache clean
         */
        onCleanCacheCallbacks: any[];
        /**
         * @internal Mapping of filename to collection of files that share the same name
         */
        uniqueFileLookup: CustomArrayDict<TFile>;
        /**
         * @internal
         */
        userIgnoreFilterCache: any;
        /**
         * @internal
         */
        userIgnoreFilters: any;
        /**
         * @internal
         */
        userIgnoreFiltersString: string;
        /**
         * Reference to Vault
         */
        vault: Vault;
        /**
         * @internal
         */
        workQueue: any;
        /**
         * @internal
         */
        worker: Worker;
        /**
         * @internal
         */
        workerResolve: any;

        /**
         * Get all property infos of the vault
         */
        getAllPropertyInfos: () => Record<string, PropertyInfo>
        /**
         * Get all backlink information for a file
         */
        getBacklinksForFile: (file?: TFile) => CustomArrayDict<LinkCache>
        /**
         * Get paths of all files cached in the vault
         */
        getCachedFiles: () => string[];
        /**
         * Get an entry from the file cache
         */
        getFileInfo: (path: string) => FileCacheEntry;
        /**
         * Get property values for frontmatter property key
         */
        getFrontmatterPropertyValuesForKey: (key: string) => string[];
        /**
         * Get all links (resolved or unresolved) in the vault
         */
        getLinkSuggestions: () => { file: TFile | null, path: string }[];
        /**
         * Get destination of link path
         */
        getLinkpathDest: (origin: string, path: string) => TFile[];
        /**
         * Get all links within the vault per file
         */
        getLinks: () => Record<string, Reference[]>;
        /**
         * Get all tags within the vault and their usage count
         */
        getTags: () => Record<string, number>;

        /**
         * @internal Clear all caches to null values
         */
        cleanupDeletedCache: () => void;
        /**
         * @internal
         */
        clear: () => any;
        /**
         * @internal
         */
        computeMetadataAsync: (e: any) => Promise<any>;
        /**
         * @internal Remove all entries that contain deleted path
         */
        deletePath: (path: string) => void;
        /**
         * @internal Initialize Database connection and load up caches
         */
        initialize: () => Promise<void>;
        /**
         * @internal Check whether there are no cache tasks in progress
         */
        isCacheClean: () => boolean;
        /**
         * @internal Check whether file can support metadata (by checking extension support)
         */
        isSupportedFile: (file: TFile) => boolean;
        /**
         * @internal Check whether string is part of the user ignore filters
         */
        isUserIgnored: (filter: any) => boolean;
        /**
         * Iterate over all link references in the vault with callback
         */
        iterateReferences: (callback: (path: string) => void) => void;
        /**
         * @internal
         */
        linkResolver: () => void;
        /**
         * @internal Execute onCleanCache callbacks if cache is clean
         */
        onCleanCache: () => void;
        /**
         * @internal On creation of the cache: update metadata cache
         */
        onCreate: (file: TFile) => void;
        /**
         * @internal On creation or modification of the cache: update metadata cache
         */
        onCreateOrModify: (file: TFile) => void;
        /**
         * @internal On deletion of the cache: update metadata cache
         */
        onDelete: (file: TFile) => void;
        /**
         * @internal
         */
        onReceiveMessageFromWorker: (e: any) => void;
        /**
         * @internal On rename of the cache: update metadata cache
         */
        onRename: (file: TFile, oldPath: string) => void;
        /**
         * @internal Check editor for unresolved links and mark these as unresolved
         */
        resolveLinks: (editor: Element) => void;
        /**
         * @internal Update file cache entry and sync to indexedDB
         */
        saveFileCache: (path: string, entry: FileCacheEntry) => void;
        /**
         * @internal Update metadata cache entry and sync to indexedDB
         */
        saveMetaCache: (path: string, entry: CachedMetadata) => void;
        /**
         * @internal Show a notice that the cache is being rebuilt
         */
        showIndexingNotice: () => void;
        /**
         * @internal
         */
        trigger: (e: any) => void;
        /**
         * @internal Re-resolve all links for changed path
         */
        updateRelatedLinks: (path: string) => void;
        /**
         * @internal Update user ignore filters from settings
         */
        updateUserIgnoreFilters: () => void;
        /**
         * @internal Bind actions to listeners on vault
         */
        watchVaultChanges: () => void;
        /**
         * @internal Send message to worker to update metadata cache
         */
        work: (cacheEntry: any) => void;

        _getLinkpathDest(origin: string, path: string): TFile[];
    }

    interface SettingTab {
        /**
         * Unique ID of the tab
         */
        id: string;
        /**
         * Sidebar name of the tab
         */
        name: string;
        /**
         * Sidebar navigation element of the tab
         */
        navEl: HTMLElement;
        /**
         * Reference to the settings modal
         */
        setting: Setting;
        /**
         * Reference to the plugin that initialised the tab
         * @if Tab is a plugin tab
         */
        plugin?: Plugin;
        /**
         * Reference to installed plugins element
         * @if Tab is the community plugins tab
         */
        installedPluginsEl?: HTMLElement;

        // TODO: Editor, Files & Links, Appearance and About all have private properties too
    }

    interface FileManager {
        /**
         * Reference to App
         */
        app: App;
        /**
         * Creates a new Markdown file in specified location and opens it in a new view
         * @param path - Path to the file to create (missing folders will be created)
         * @param manner - Where to open the view containing the new file
         */
        createAndOpenMarkdownFile: (path: string, location: PaneType) => Promise<void>;
        /**
         * Create a new file in the vault at specified location
         * @param location - Location to create the file in, defaults to root
         * @param filename - Name of the file to create, defaults to "Untitled" (incremented if file already exists)
         * @param extension - Extension of the file to create, defaults to "md"
         * @param contents - Contents of the file to create, defaults to empty string
         */
        createNewFile: (location: TFolder, filename: string, extension: string, contents: string) => Promise<TFile>;
        /**
         * Creates a new untitled folder in the vault at specified location
         * @param location - Location to create the folder in, defaults to root
         */
        createNewFolder: (location: TFolder) => Promise<TFolder>;
        /**
         * Creates a new Markdown file in the vault at specified location
         */
        createNewMarkdownFile: (location: TFolder, filename: string, contents: string) => Promise<TFile>;
        /**
         * Creates a new Markdown file based on linktext and path
         * @param filename - Name of the file to create
         * @param path - Path to where the file should be created
         */
        createNewMarkdownFileFromLinktext: (filename: string, path: string) => Promise<TFile>;
        /**
         * @internal
         */
        getAllLinkResolutions: () => [];
        /**
         * Gets the folder that new markdown files should be saved to, based on the current settings
         * @param path - The path of the current opened/focused file, used when the user
         * 				wants new files to be created in the same folder as the current file
         */
        getMarkdownNewFileParent: (path: string) => TFolder;
        /**
         * Insert text into a file
         * @param file - File to insert text into
         * @param primary_text - Text to insert (will not be inserted if secondary_text exists)
         * @param basename - ???
         * @param secondary_text - Text to insert (always inserted)
         * @param atStart - Whether to insert text at the start or end of the file
         */
        insertTextIntoFile: (file: TFile, primary_text: string, basename: string, secondary_text: string, atStart: boolean) => Promise<void>;
        /**
         * Iterate over all links in the vault with callback
         * @param callback - Callback to execute for each link
         */
        iterateAllRefs: (callback: (path: string, link: PositionedReference) => void) => void;
        /**
         * Merge two files
         * @param file - File to merge to
         * @param otherFile - File to merge from
         * @param override - If not empty, will override the contents of the file with this string
         * @param atStart - Whether to insert text at the start or end of the file
         */
        mergeFile: (file: TFile, otherFile: TFile, override: string, atStart: boolean) => Promise<void>;
        /**
         * Prompt the user to delete a file
         */
        promptForDeletion: (file: TFile) => Promise<void>;
        /**
         * Prompt the user to rename a file
         */
        promptForFileRename: (file: TFile) => Promise<void>;
        /**
         * @internal
         * Register an extension to be the parent for a specific file type
         */
        registerFileParentCreator: (extension: string, location: TFolder) => void;
        /**
         * @internal
         * @param callback - Callback to execute for each link
         */
        runAsyncLinkUpdate: (callback: (link: LinkUpdate) => any) => void;
        /**
         * @internal
         * @param path
         * @param data
         */
        storeTextFileBackup: (path: string, data: string) => void;
        /**
         * Remove a file and put it in the trash (no confirmation modal)
         */
        trashFile: (file: TFile) => Promise<void>;
        /**
         * @internal: Unregister extension as root input directory for file type
         */
        unregisterFileCreator: (extension: string) => void;
        /**
         * @internal
         */
        updateAllLinks: (links: any[]) => Promise<void>;
        /**
         * @internal
         */
        updateInternalLinks: (data: any) => any;

        /**
         * @internal
         */
        fileParentCreatorByType: Map<string, (path: string) => TFolder>;
        /**
         * @internal
         */
        inProgressUpdates: null | any[];
        /**
         * @internal
         */
        linkUpdaters: {
            canvas: {
                app: App,
                canvas: unknown
            }
        };
        /**
         * @internal
         */
        updateQueue: {
            promise: Promise<void>
        }
        /**
         * Reference to Vault
         */
        vault: Vault;
    }

    interface Modal {
        /**
         * @internal Background applied to application to dim it
         */
        bgEl: HTMLElement;
        /**
         * @internal Opacity percentage of the background
         */
        bgOpacity: number;
        /**
         * @internal Whether the background is being dimmed
         */
        dimBackground: boolean;
        /**
         * @internal Modal container element
         */
        modalEl: HTMLElement;
        /**
         * @internal Selection logic handler
         */
        selection: WindowSelection;
        /**
         * Reference to the global Window object
         */
        win: Window;

        /**
         * @internal On escape key press close modal
         */
        onEscapeKey: () => void;
        /**
         * @internal On closing of the modal
         */
        onWindowClose: () => void;
        /**
         * @internal Set the background opacity of the dimmed background
         * @param opacity Opacity percentage
         */
        setBackgroundOpacity: (opacity: string) => this;
        /**
         * @internal Set the content of the modal
         * @param content Content to set
         */
        setContent: (content: HTMLElement | string) => this;
        /**
         * @internal Set whether the background should be dimmed
         * @param dim Whether the background should be dimmed
         */
        setDimBackground: (dim: boolean) => this;
        /**
         * @internal Set the title of the modal
         * @param title Title to set
         */
        setTitle: (title: string) => this;
    }

    interface Setting extends Modal {
        /**
         * Current active tab of the settings modal
         */
        activateTab: SettingTab;
        /**
         * @internal Container element containing the community plugins
         */
        communityPluginTabContainer: HTMLElement;
        /**
         * @internal Container element containing the community plugins header
         */
        communityPluginTabHeaderGroup: HTMLElement;
        /**
         * Previously opened tab ID
         */
        lastTabId: string;
        /**
         * List of all plugin tabs (core and community, ordered by precedence)
         */
        pluginTabs: SettingTab[];
        /**
         * List of all core settings tabs (editor, files & links, ...)
         */
        settingTabs: SettingTab[];
        /**
         * @internal Container element containing the core settings
         */
        tabContainer: HTMLElement;
        /**
         * @internal Container for currently active settings tab
         */
        tabContentContainer: HTMLElement;
        /**
         * @internal Container for all settings tabs
         */
        tabHeadersEl: HTMLElement;

        /**
         * Open a specific tab by ID
         * @param id ID of the tab to open
         */
        openTabById: (id: string) => void;
        /**
         * @internal Add a new plugin tab to the settings modal
         * @param tab Tab to add
         */
        addSettingTab: (tab: SettingTab) => void;
        /**
         * @internal Closes the currently active tab
         */
        closeActiveTab: () => void;
        /**
         * @internal Check whether tab is a plugin tab
         * @param tab Tab to check
         */
        isPluginSettingTab: (tab: SettingTab) => boolean;
        /**
         * @internal Open a specific tab by tab reference
         * @param tab Tab to open
         */
        openTab: (tab: SettingTab) => void;
        /**
         * @internal Remove a plugin tab from the settings modal
         * @param tab Tab to remove
         */
        removeSettingTab: (tab: SettingTab) => void;
        /**
         * @internal Update the title of the modal
         * @param tab Tab to update the title to
         */
        updateModalTitle: (tab: SettingTab) => void;
        /**
         * @internal Update a tab section
         */
        updatePluginSection: () => void;
    }

    interface DataAdapter {
        /**
         * Base OS path for the vault (e.g. /home/user/vault, or C:\Users\user\documents\vault)
         */
        basePath: string;
        /**
         * @internal
         */
        btime: { btime: (path: string, btime: number) => void };
        /**
         * Mapping of file/folder path to vault entry, includes non-MD files
         */
        files: Record<string, FileEntry>;
        /**
         * Reference to node fs module
         */
        fs?: typeof fs;
        /**
         * Reference to node fs:promises module
         */
        fsPromises?: typeof fsPromises;
        /**
         * @internal
         */
        insensitive: boolean;
        /**
         * Reference to electron ipcRenderer module
         */
        ipcRenderer?: IpcRenderer;
        /**
         * Reference to node path module
         */
        path: typeof path;
        /**
         * @internal
         */
        promise: Promise<any>;
        /**
         * Reference to node URL module
         */
        url: URL;
        /**
         * @internal
         */
        watcher: any;
        /**
         * @internal
         */
        watchers: Record<string, { resolvedPath: string, watcher: any }>;

        /**
         * @internal Apply data write options to file
         * @param normalizedPath Path to file
         * @param options Data write options
         */
        applyWriteOptions: (normalizedPath: string, options: DataWriteOptions) => Promise<void>;
        /**
         * Get base path of vault (OS path)
         */
        getBasePath: () => string;
        /**
         * Get full path of file (OS path)
         * @param normalizedPath Path to file
         * @return URL path to file
         */
        getFilePath: (normalizedPath: string) => string;
        /**
         * Get full path of file (OS path)
         * @param normalizedPath Path to file
         * @return string full path to file
         */
        getFullPath: (normalizedPath: string) => string;
        /**
         * Get full path of file (OS path)
         * @param normalizedPath Path to file
         * @return string full path to file
         */
        getFullRealPath: (normalizedPath: string) => string;
        /**
         * @internal Get resource path of file (URL path)
         * @param normalizedPath Path to file
         * @return string URL of form: app://FILEHASH/path/to/file
         */
        getResourcePath: (normalizedPath: string) => string;
        /**
         * @internal Handles vault events
         */
        handler: () => void;
        /**
         * @internal Kill file system action due to timeout
         */
        kill: () => void;
        /**
         * @internal
         */
        killLastAction: () => void;
        /**
         * @internal Generates `this.files` from the file system
         */
        listAll: () => Promise<void>;
        /**
         * @internal Generates `this.files` for specific directory of the vault
         */
        listRecursive: (normalizedPath: string) => Promise<void>;
        /**
         * @internal Helper function for `listRecursive` reads children of directory
         * @param normalizedPath Path to directory
         */
        listRecursiveChild: (normalizedPath: string) => Promise<void>;
        /**
         * @internal
         */
        onFileChange: (normalizedPath: string) => void;
        /**
         * @internal
         */
        queue: (cb: any) => Promise<void>;

        /**
         * @internal
         */
        reconcileDeletion: (normalizedPath: string, normalizedNewPath: string, option: boolean) => Promise<void>;
        /**
         * @internal
         */
        reconcileFile: (normalizedPath: string, normalizedNewPath: string, option: boolean) => Promise<void>;
        /**
         * @internal
         */
        reconcileFileCreation: (normalizedPath: string, normalizedNewPath: string, option: boolean) => Promise<void>;
        /**
         * @internal
         */
        reconcileFileInternal: (normalizedPath: string, normalizedNewPath: string) => Promise<void>;
        /**
         * @internal
         */
        reconcileFolderCreation: (normalizedPath: string, normalizedNewPath: string) => Promise<void>;
        /**
         * @internal
         */
        reconcileInternalFile: (normalizedPath: string) => Promise<void>;
        /**
         * @internal
         */
        reconcileSymbolicLinkCreation: (normalizedPath: string, normalizedNewPath: string) => Promise<void>;
        /**
         * @internal Remove file from files listing and trigger deletion event
         */
        removeFile: (normalizedPath: string) => void;
        /**
         * @internal
         */
        startWatchpath: (normalizedPath: string) => Promise<void>;
        /**
         * @internal Remove all listeners
         */
        stopWatch: () => void;
        /**
         * @internal Remove listener on specific path
         */
        stopWatchPath: (normalizedPath: string) => void;
        /**
         * @internal Set whether OS is insensitive to case
         */
        testInsensitive: () => void;
        /**
         * @internal
         */
        thingsHappening: () => void;
        /**
         * @internal Trigger an event on handler
         */
        trigger(e: unknown, t: unknown, n: unknown, i: unknown): void;
        /**
         * @internal
         */
        update: (normalizedPath: string) => any;
        /**
         * @internal Add change watcher to path
         */
        watch: (normalizedPath: string) => Promise<void>;
        /**
         * @internal Watch recursively for changes
         */
        watchHiddenRecursive: (normalizedPath: string) => Promise<void>;
    }

    interface FileSystemAdapter extends DataAdapter {
    }

    interface Workspace {
        /**
         * Currently active tab group
         */
        activeTabGroup: WorkspaceTabs;
        /**
         * Reference to App
         */
        app: App;
        /**
         * @internal
         */
        backlinkInDocument?: any;
        /**
         * Registered CodeMirror editor extensions, to be applied to all CM instances
         */
        editorExtensions: Extension[];
        /**
         * @internal
         */
        editorSuggest: { currentSuggest?: EditorSuggest<any>, suggests: EditorSuggest<any>[] };
        /**
         * @internal
         */
        floatingSplit: WorkspaceSplit;
        /**
         * @internal
         */
        hoverLinkSources: Record<string, HoverLinkSource>;
        /**
         * Last opened file in the vault
         */
        lastActiveFile: TFile;
        /**
         * @internal
         */
        lastTabGroupStacked: boolean;
        /**
         * @internal
         */
        layoutItemQueue: any[];
        /**
         * Workspace has finished loading
         */
        layoutReady: boolean;
        /**
         * @internal
         */
        leftSidebarToggleButtonEl: HTMLElement;
        /**
         * @internal Array of renderCallbacks
         */
        mobileFileInfos: any[];
        /**
         * @internal
         */
        onLayoutReadyCallbacks?: any;
        /**
         * Protocol handlers registered on the workspace
         */
        protocolHandlers: Map<string, ObsidianProtocolHandler>;
        /**
         * Tracks last opened files in the vault
         */
        recentFileTracker: RecentFileTracker;
        /**
         * @internal
         */
        rightSidebarToggleButtonEl: HTMLElement;
        /**
         * @internal Keyscope registered to the vault
         */
        scope: Scope;
        /**
         * List of states that were closed and may be reopened
         */
        undoHistory: StateHistory[];

        /**
         * @internal Change active leaf and trigger leaf change event
         */
        activeLeafEvents: () => void;
        /**
         * @internal Add file to mobile file info
         */
        addMobileFileInfo: (file: any) => void;
        /**
         * @internal Clear layout of workspace and destruct all leaves
         */
        clearLayout: () => Promise<void>;
        /**
         * @internal Create a leaf in the selected tab group or last used tab group
         * @param tabs Tab group to create leaf in
         */
        createLeafInTabGroup: (tabs?: WorkspaceTabs) => WorkspaceLeaf;
        /**
         * @internal Deserialize workspace entries into actual Leaf objects
         * @param leaf Leaf entry to deserialize
         * @param ribbon Whether the leaf belongs to the left or right ribbon
         */
        deserializeLayout: (leaf: LeafEntry, ribbon?: "left" | "right") => Promise<WorkspaceLeaf>;
        /**
         * @internal Reveal leaf in side ribbon with specified view type and state
         * @param type View type of leaf
         * @param ribbon Side ribbon to reveal leaf in
         * @param viewstate Open state of leaf
         */
        ensureSideLeaf: (type: string, ribbon: "left" | "right", viewstate: OpenViewState) => void;
        /**
         * Get active file view if exists
         */
        getActiveFileView: () => FileView | null;
        /**
         * @deprecated Use `getActiveViewOfType` instead
         */
        getActiveLeafOfViewType<T extends View>(type: Constructor<T>): T | null;
        /**
         * Get adjacent leaf in specified direction
         * @remark Potentially does not work
         */
        getAdjacentLeafInDirection: (leaf: WorkspaceLeaf, direction: "top" | "bottom" | "left" | "right") => WorkspaceLeaf | null;
        /**
         * @internal Get the direction where the leaf should be dropped on dragevent
         */
        getDropDirection: (e: DragEvent, rect: DOMRect, directions: ["left", "right"], leaf: WorkspaceLeaf) => "left" | "right" | "top" | "bottom" | "center";
        /**
         * @internal Get the leaf where the leaf should be dropped on dragevent
         * @param e Drag event
         */
        getDropLocation: (e: DragEvent) => WorkspaceLeaf | null;
        /**
         * Get the workspace split for the currently focused container
         */
        getFocusedContainer: () => WorkspaceSplit;
        /**
         * Get n last opened files of type (defaults to 10)
         */
        getRecentFiles: (arg?: { showMarkdown: boolean, showCanvas: boolean, showNonImageAttachments: boolean, showImages: boolean, maxCount: number }) => string[];
        /**
         * Get leaf in the side ribbon/dock and split if necessary
         * @param sideRibbon Side ribbon to get leaf from
         * @param split Whether to split the leaf if it does not exist
         */
        getSideLeaf: (sideRibbon: WorkspaceSidedock | WorkspaceMobileDrawer, split: boolean) => WorkspaceLeaf;
        /**
         * @internal
         */
        handleExternalLinkContextMenu: (menu: Menu, linkText: string) => void;
        /**
         * @internal
         */
        handleLinkContextMenu: (menu: Menu, linkText: string, sourcePath: string) => void;
        /**
         * @internal Check if leaf has been attached to the workspace
         */
        isAttached: (leaf?: WorkspaceLeaf) => boolean;
        /**
         * Iterate the leaves of a split
         */
        iterateLeaves: (split: WorkspaceSplit, callback: (leaf: WorkspaceLeaf) => any) => void;
        /**
         * Iterate the tabs of a split till meeting a condition
         */
        iterateTabs: (tabs: WorkspaceSplit | WorkspaceSplit[], cb: (leaf: WorkspaceLeaf) => boolean) => boolean;
        /**
         * @internal Load workspace from disk and initialize
         */
        loadLayout: () => Promise<void>;
        /**
         * @internal Handles drag event on leaf
         */
        onDragLeaf: (e: DragEvent, leaf: WorkspaceLeaf) => void;
        /**
         * @internal Handles layout change and saves layout to disk
         */
        onLayoutChange: (leaf?: WorkspaceLeaf) => void;
        /**
         * @internal
         */
        onLinkContextMenu: (args: any[]) => void;
        /**
         * @internal
         */
        onQuickPreview: (args: any[]) => void;
        /**
         * @internal
         */
        onResize: () => void;
        /**
         * @internal
         */
        onStartLink: (leaf: WorkspaceLeaf) => void;
        /**
         * Open a leaf in a popup window
         * @remark Prefer usage of `app.workspace.openPopoutLeaf`
         */
        openPopout: (data?: WorkspaceWindowInitData) => WorkspaceWindow;
        /**
         * @internal Push leaf change to history
         */
        pushUndoHistory: (leaf: WorkspaceLeaf, parentID: string, rootID: string) => void;
        /**
         * @internal Get drag event target location
         */
        recursiveGetTarget: (e: DragEvent, leaf: WorkspaceLeaf) => WorkspaceTabs | null;
        /**
         * @internal Register a CodeMirror editor extension
         * @remark Prefer registering the extension via the Plugin class
         */
        registerEditorExtension: (extension: Extension) => void;
        /**
         * @internal Registers hover link source
         */
        registerHoverLinkSource: (key: string, source: HoverLinkSource) => void;
        /**
         * @internal Registers Obsidian protocol handler
         */
        registerObsidianProtocolHandler: (protocol: string, handler: ObsidianProtocolHandler) => void;
        /**
         * @internal Constructs hook for receiving URI actions
         */
        registerUriHook: () => void;
        /**
         * @internal Request execution of activeLeaf change events
         */
        requestActiveLeafEvents: () => void;
        /**
         * @internal Request execution of resize event
         */
        requestResize: () => void;
        /**
         * @internal Request execution of layout update event
         */
        requestUpdateLayout: () => void;
        /**
         * Save workspace layout to disk
         */
        saveLayout: () => Promise<void>;
        /**
         * @internal Use deserialized layout data to reconstruct the workspace
         */
        setLayout: (data: SerializedWorkspace) => Promise<void>;
        /**
         * @internal Split leaves in specified direction
         */
        splitLeaf: (leaf: WorkspaceLeaf, newleaf: WorkspaceLeaf, direction?: SplitDirection, before?: boolean) => void;
        /**
         * Split provided leaf, or active leaf if none provided
         */
        splitLeafOrActive: (leaf?: WorkspaceLeaf, direction?: SplitDirection) => void;
        /**
         * @internal
         */
        trigger: (e: any) => void;
        /**
         * @internal Unregister a CodeMirror editor extension
         */
        unregisterEditorExtension: (extension: Extension) => void;
        /**
         * @internal Unregister hover link source
         */
        unregisterHoverLinkSource: (key: string) => void;
        /**
         * @internal Unregister Obsidian protocol handler
         */
        unregisterObsidianProtocolHandler: (protocol: string) => void;
        /**
         * @internal
         */
        updateFrameless: () => void;
        /**
         * @internal Invoke workspace layout update, redraw and save
         */
        updateLayout: () => void;
        /**
         * @internal Update visibility of tab group
         */
        updateMobileVisibleTabGroup: () => void;
        /**
         * Update the internal title of the application
         * @remark This title is shown as the application title in the OS taskbar
         */
        updateTitle: () => void;
    }

    interface Vault {
        /**
         * Low-level file system adapter for read and write operations
         * @tutorial Can be used to read binaries, or files not located directly within the vault
         */
        adapter: DataAdapter;
        /**
         * @internal Max size of the cache in bytes
         */
        cacheLimit: number;
        /**
         * Object containing all config settings for the vault (editor, appearance, ... settings)
         * @remark Prefer usage of `app.vault.getConfig(key)` to get settings, config does not contain
         * 		   settings that were not changed from their default value
         */
        config: AppVaultConfig;
        /**
         * @internal Timestamp of the last config change
         */
        configTs: number;
        /**
         * @internal Mapping of path to Obsidian folder or file structure
         */
        fileMap: Record<string, TAbstractFile>;

        on(name: 'config-changed', callback: () => void, ctx?: any): EventRef;

        /**
         * @internal Add file as child/parent to respective folders
         */
        addChild: (file: TAbstractFile) => void;
        /**
         * @internal Check whether new file path is available
         */
        checkForDuplicate: (file: TAbstractFile, newPath: string) => boolean;
        /**
         * @internal Check whether path has valid formatting (no dots/spaces at end, ...)
         */
        checkPath: (path: string) => boolean;
        /**
         * @internal Remove a vault config file
         */
        deleteConfigJson: (configFile: string) => Promise<void>;
        /**
         * Check whether a file exists in the vault
         */
        exists: (file: TAbstractFile, senstive?: boolean) => Promise<boolean>;
        /**
         * @internal
         */
        generateFiles(e: AsyncGenerator<TFile>, t: boolean): Promise<void>;
        /**
         * Get an abstract file by path, insensitive to case
         */
        getAbstractFileByPathInsensitive: (path: string) => TAbstractFile | null;
        /**
         * @internal Get path for file that does not conflict with other existing files
         */
        getAvailablePath: (path: string, extension: string) => string;
        /**
         * @internal Get path for attachment that does not conflict with other existing files
         */
        getAvailablePathForAttachments: (filename: string, file: TAbstractFile, extension: string) => string;
        /**
         * Get value from config by key
         * @remark Default value will be selected if config value was not manually changed
         * @param key Key of config value
         */
        getConfig: (string: ConfigItem) => any;
        /**
         * Get path to config file (relative to vault root)
         */
        getConfigFile: (configFile: string) => string;
        /**
         * Get direct parent of file
         * @param file File to get parent of
         */
        getDirectParent: (file: TAbstractFile) => TFolder | null;
        /**
         * @internal Check whether files map cache is empty
         */
        isEmpty: () => boolean;
        /**
         * @internal Iterate over the files and read them
         */
        iterateFiles: (files: TFile[], cachedRead: boolean) => void;
        /**
         * @internal Load vault adapter
         */
        load: () => Promise<void>;
        /**
         * @internal Listener for all events on the vault
         */
        onChange: (eventType: string, path: string, x: any, y: any) => void;
        /**
         * Read a config file from the vault and parse it as JSON
         * @param config Name of config file
         */
        readConfigJson: (config: string) => Promise<null | object>;
        /**
         * Read a config file (full path) from the vault and parse it as JSON
         * @param path Full path to config file
         */
        readJson: (path: string) => Promise<null | object>;
        /**
         * Read a plugin config file (full path relative to vault root) from the vault and parse it as JSON
         * @param path Full path to plugin config file
         */
        readPluginData: (path: string) => Promise<null | object>;
        /**
         * Read a file from the vault as a string
         * @param path Path to file
         */
        readRaw: (path: string) => Promise<string>;
        /**
         * @internal Reload all config files
         */
        reloadConfig: () => void;
        /**
         * @internal Remove file as child/parent from respective folders
         * @param file File to remove
         */
        removeChild: (file: TAbstractFile) => void;
        /**
         * @internal Get the file by absolute path
         * @param path Path to file
         */
        resolveFilePath: (path: string) => TAbstractFile | null;
        /**
         * @internal Get the file by Obsidian URL
         */
        resolveFileUrl: (url: string) => TAbstractFile | null;
        /**
         * @internal Debounced function for saving config
         */
        requestSaveConfig: () => void;
        /**
         * @internal Save app and appearance configs to disk
         */
        saveConfig: () => Promise<void>;
        /**
         * Set value of config by key
         * @param key Key of config value
         * @param value Value to set
         */
        setConfig: (key: ConfigItem, value: any) => void;
        /**
         * Set where the config files are stored (relative to vault root)
         * @param configDir Path to config files
         */
        setConfigDir: (configDir: string) => void;
        /**
         * @internal Set file cache limit
         */
        setFileCacheLimit: (limit: number) => void;
        /**
         * @internal Load all config files into memory
         */
        setupConfig: () => Promise<void>;
        /**
         * @internal Trigger an event on handler
         */
        trigger: (type: string) => void;
        /**
         * Write a config file to disk
         * @param config Name of config file
         * @param data Data to write
         */
        writeConfigJson: (config: string, data: object) => Promise<void>;
        /**
         * Write a config file (full path) to disk
         * @param path Full path to config file
         * @param data Data to write
         * @param pretty Whether to insert tabs or spaces
         */
        writeJson: (path: string, data: object, pretty?: boolean) => Promise<void>;
        /**
         * Write a plugin config file (path relative to vault root) to disk
         */
        writePluginData: (path: string, data: object) => Promise<void>;
    }

    // TODO: Add missing elements to other Obsidian interfaces and classes

    interface Editor {
        /**
         * CodeMirror editor instance
         */
        cm: EditorViewI;
        /**
         * HTML instance the CM editor is attached to
         */
        containerEl: HTMLElement;

        /**
         * Make ranges of text highlighted within the editor given specified class (style)
         */
        addHighlights: (ranges: { from: EditorPosition, to: EditorPosition }[], style: "is-flashing" | "obsidian-search-match-highlight", remove_previous: boolean, x: boolean) => void;
        /**
         * Convert editor position to screen position
         * @param pos Editor position
         * @param mode Relative to the editor or the application window
         */
        coordsAtPos: (pos: EditorPosition, relative_to_editor: boolean) => { left: number, top: number, bottom: number, right: number };
        /**
         * Unfolds all folded lines one level up
         * @remark If level 1 and 2 headings are folded, level 2 headings will be unfolded
         */
        foldLess: () => void;
        /**
         * Folds all the blocks that are of the lowest unfolded level
         * @remark If there is a document with level 1 and 2 headings, level 2 headings will be folded
         */
        foldMore: () => void;
        /**
         * Get all ranges that can be folded away in the editor
         */
        getAllFoldableLines: () => { from: number, to: number }[];
        /**
         * Get a clickable link - if it exists - at specified position
         */
        getClickableTokenAt: (pos: EditorPosition) => { start: EditorPosition, end: EditorPosition, text: string, type: string } | null;
        /**
         * Get all blocks that were folded by their starting character position
         */
        getFoldOffsets: () => Set<number>;
        /**
         * Checks whether the editor has a highlight of specified class
         * @remark If no style is specified, checks whether the editor has any highlights
         */
        hasHighlight: (style?: string) => boolean;
        /**
         * Wraps current line around specified characters
         * @remark Was added in a recent Obsidian update (1.4.0 update cycle)
         **/
        insertBlock: (start: string, end: string) => void;
        /**
         * Get the closest character position to the specified coordinates
         */
        posAtCoords: (coords: { left: number, top: number }) => EditorPosition;
        /**
         * Removes all highlights of specified class
         */
        removeHighlights: (style: string) => void;
        /**
         * Adds a search cursor to the editor
         */
        searchCursor: (searchString: string) => {
            current: () => { from: EditorPosition, to: EditorPosition };
            findAll: () => { from: EditorPosition, to: EditorPosition }[];
            findNext: () => { from: EditorPosition, to: EditorPosition };
            findPrevious: () => { from: EditorPosition, to: EditorPosition };
            replace: (replacement: string, origin: string) => void;
            replaceAll: (replacement: string, origin: string) => void;
        }
        /**
         * Applies specified markdown syntax to selected text or word under cursor
         */
        toggleMarkdownFormatting: (syntax: "bold" | "italic" | "strikethrough" | "highlight" | "code" | "math" | "comment") => void;

        /**
         * Clean-up function executed after indenting lists
             */
        afterIndent: () => void;
        /**
         * Expand text
         * @internal
         */
        expandText: () => void;
        /**
         * Indents a list by one level
         */
        indentList: () => void;
        /**
         * Insert a template callout at the current cursor position
         */
        insertCallout: () => void;
        /**
         * Insert a template code block at the current cursor position
         */
        insertCodeblock: () => void;
        /**
         * Insert a markdown link at the current cursor position
         */
        insertLink: () => void;
        /**
         * Insert a mathjax equation block at the current cursor position
         */
        insertMathJax: () => void;
        /**
         * Insert specified text at the current cursor position
         * @remark Might be broken, inserts at the end of the document
         */
        insertText: (text: string) => void;
        /**
         * Inserts a new line and continues a markdown bullet point list at the same level
         */
        newlineAndIndentContinueMarkdownList: () => void;
        /**
         * Inserts a new line at the same indent level
         */
        newlineAndIndentOnly: () => void;
        /**
         * Get the character position at a mouse event
         */
        posAtMouse: (e: MouseEvent) => EditorPosition;
        /**
         * Toggles blockquote syntax on paragraph under cursor
         */
        toggleBlockquote: () => void;
        /**
         * Toggle bullet point list syntax on paragraph under cursor
         */
        toggleBulletList: () => void;
        /**
         * Toggle checkbox syntax on paragraph under cursor
         */
        toggleCheckList: () => void;
        /**
         * Toggle numbered list syntax on paragraph under cursor
         */
        toggleNumberList: () => void;
        /**
         * Convert word under cursor into a wikilink
         * @param embed Whether to embed the link or not
         */
        triggerWikiLink: (embed: boolean) => void;
        /**
         * Unindents a list by one level
         */
        unindentList: () => void;
    }

    interface View {
        headerEl: HTMLElement;
        titleEl: HTMLElement;
    }

    interface WorkspaceLeaf {
        id?: string;

        activeTime?: number;

        parent?: WorkspaceSplit;

        tabHeaderEl: HTMLElement;
        tabHeaderInnerIconEl: HTMLElement;
        tabHeaderInnerTitleEl: HTMLElement;
    }

    interface WorkspaceSplit {
        parent?: WorkspaceSplit;
    }

    interface Menu {
        dom: HTMLElement;
        items: MenuItem[];
        onMouseOver: (evt: MouseEvent) => void;
    }

    interface MenuItem {
        callback: () => void;
        dom: HTMLElement;
        setSubmenu: () => Menu;
        disabled: boolean;
    }

    interface MarkdownPreviewView {
        renderer: ReadViewRenderer;
    }

    interface EventRef {
        /**
         * Context applied to the event callback
         */
        ctx?: any;

        /**
         * Events object the event was registered on
         */
        e: Events;

        /**
         * Function to be called on event trigger on the events object
         */
        fn: (...arg: any[]) => void;

        /**
         * Event name the event was registered on
         */
        name: string;
    }

    interface TFile {
        deleted: boolean;
    }
}

interface RendererSection {
    el: HTMLElement;
    html: string;
    rendered: boolean;
}

interface ReadViewRenderer {
    addBottomPadding: boolean;
    lastRender: number;
    lastScroll: number;
    lastText: string;
    previewEl: HTMLElement;
    pusherEl: HTMLElement;
    clear: () => void;
    queueRender: () => void;
    parseSync: () => void;
    parseAsync: () => void;
    set: (text: string) => void;
    text: string;
    sections: RendererSection[];
    asyncSections: any[];
    recycledSections: any[];
    rendered: any[];

}

interface CMState extends EditorState {
    vim: {
        inputState: {
            changeQueue: null,
            keyBuffer: [],
            motion: null,
            motionArgs: null,
            motionRepeat: [],
            operator: null,
            operatorArgs: null,
            prefixRepeat: [],
            registerName: null,
        },
        insertMode: false,
        insertModeRepeat: undefined,
        lastEditActionCommand: undefined,
        lastEditInputState: undefined,
        lastHPos: number,
        lastHSPos: number,
        lastMotion: {
            name?: string,
        },
        lastPastedText: null,
        lastSelection: null,
    },
    vimPlugin: {
        lastKeydown: string,
    }
}

interface CMView extends EditorView {
    state: CMState;
}

interface EditorViewI extends EditorView {
    cm?: CMView;
}

