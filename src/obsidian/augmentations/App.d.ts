import type { AppMenuBarManager } from '../internals/AppMenuBarManager.js';
import type { AppSetting } from '../internals/AppSetting.js';
import type { Commands } from '../internals/Commands/Commands.js';
import type { CustomCSS } from '../internals/CustomCSS/CustomCSS.js';
import type { DragManager } from '../internals/DragManager/DragManager.js';
import type { EmbedRegistry } from '../internals/EmbedRegistry/EmbedRegistry.js';
import type { FoldManager } from '../internals/FoldManager.js';
import type { HotkeyManager } from '../internals/HotkeyManager/HotkeyManager.js';
import type { ImportedAttachments } from '../internals/ImportedAttachments.js';
import type { InternalPlugins } from '../internals/InternalPlugin/InternalPlugins.js';
import type { LoadProgress } from '../internals/LoadProgress.js';
import type { MetadataTypeManager } from '../internals/MetadataTypeManager/MetadataTypeManager.js';
import type { MobileNavbar } from '../internals/MobileNavbar.js';
import type { MobileTabSwitcher } from '../internals/MobileTabSwitcher.js';
import type { MobileToolbar } from '../internals/MobileToolbar.js';
import type { ObsidianDOM } from '../internals/ObsidianDOM.js';
import type { Plugins } from '../internals/Plugins/Plugins.js';
import type { ShareReceiver } from '../internals/ShareReceiver.js';

export {};

declare module 'obsidian' {
    interface App {
        /**
         * ID that uniquely identifies the vault
         *
         * @tutorial Used for implementing device *and* vault-specific data storage using LocalStorage or IndexedDB
         */
        appId: string;
        /** @internal */
        appMenuBarManager: AppMenuBarManager;
        /**
         * Contains all registered commands
         *
         * @tutorial Can be used to manually invoke the functionality of a specific command
         */
        commands: Commands;
        /**
         * Custom CSS (snippets/themes) applied to the application
         *
         * @tutorial Can be used to view which snippets are enabled or available, or inspect loaded-in theme manifests
         */
        customCss: CustomCSS;
        /**
         * References to important DOM elements of the application
         */
        dom: ObsidianDOM;
        /** @internal */
        dragManager: DragManager;
        /**
         * Registry that manages the creation of generic media type embeds
         */
        embedRegistry: EmbedRegistry;
        /**
         * Manage the creation, deletion and renaming of files from the UI.
         *
         * @remark Prefer using the `vault` API for programmatic file management
         */
        fileManager: FileManager;
        /** @internal */
        foldManager: FoldManager;
        /**
         * Manages global hotkeys
         *
         * @tutorial Can be used for manually invoking a command, or finding which hotkey is assigned to a specific key input
         * @remark This should not be used for adding hotkeys to your custom commands, this can easily be done via the official API
         */
        hotkeyManager: HotkeyManager;
        /**
         * Manager of internal 'core' plugins
         *
         * @tutorial Can be used to check whether a specific internal plugin is enabled, or grab specific parts from its config for simplifying your own plugin's settings
         */
        internalPlugins: InternalPlugins;
        /**
         * Whether the application is currently running on mobile
         *
         * @deprecated Will be inaccessible in a future version, prefer using `Platform.isMobile`
         * @remark Prefer usage of `Platform.isMobile`
         * @remark Will be true if `app.emulateMobile()` was enabled
         */
        isMobile: boolean;
        /** @deprecated Made inaccessible in 1.6.0, this object can be recreated using Notices */
        loadProgress: LoadProgress;
        /**
         * Manages the gathering and updating of metadata for all files in the vault
         *
         * @tutorial Use for finding tags and backlinks for specific files, grabbing frontmatter properties, ...
         */
        metadataCache: MetadataCache;
        /**
         * Manages the frontmatter properties of the vault and the rendering of the properties
         *
         * @tutorial Fetching properties used in all frontmatter fields, may potentially be used for adding custom frontmatter widgets
         */
        metadataTypeManager: MetadataTypeManager;
        /** @internal */
        mobileNavbar: MobileNavbar | null;
        mobileTabSwitcher: MobileTabSwitcher | null;
        /** @internal */
        mobileToolbar: MobileToolbar | null;
        /** @internal Events to execute on the next frame */
        nextFrameEvents: (() => void)[];
        /** @internal Timer for the next frame */
        nextFrameTimer: number | null;
        /**
         * Manages loading and enabling of community (non-core) plugins
         *
         * @tutorial Can be used to communicate with other plugins, custom plugin management, ...
         * @remark Be careful when overriding loading logic, as this may result in other plugins not loading
         */
        plugins: Plugins;
        /** @internal Root keyscope of the application */
        scope: Scope;
        /**
         * Manages the settings modal and its tabs
         *
         * @tutorial Can be used to open the settings modal to a specific tab, extend the settings modal functionality, ...
         * @remark Do not use this to get settings values from other plugins, it is better to do this via `app.plugins.getPlugin(ID)?.settings` (check how the plugin stores its settings)
         */
        setting: AppSetting;
        /** @internal */
        shareReceiver: ShareReceiver;
        /** @internal Status bar of the application */
        statusBar: { app: App; containerEl: HTMLElement };
        /**
         * Name of the vault with version suffix
         *
         * @remark Formatted as 'NAME - Obsidian vX.Y.Z'
         */
        title: string;
        /**
         * Manages all file operations for the vault, contains hooks for file changes, and an adapter for
         * low-level file system operations
         *
         * @tutorial Used for creating your own files and folders, renaming, ...
         * @tutorial Use `app.vault.adapter` for accessing files outside the vault (desktop-only)
         * @remark Prefer using the regular `vault` whenever possible
         */
        vault: Vault;
        /**
         * Manages the construction of appropriate views when opening a file of a certain type
         *
         * @remark Prefer usage of view registration via the Plugin class
         */
        viewRegistry: ViewRegistry;
        /**
         * Manages the workspace layout, construction, rendering and manipulation of leaves
         *
         * @tutorial Used for accessing the active editor leaf, grabbing references to your views, ...
         */
        workspace: Workspace;

        /**
         * Sets the accent color of the application (light/dark mode)
         */
        changeTheme(theme: 'moonstone' | 'obsidian'): void;
        /**
         * Copies Obsidian URI of given file to clipboard
         *
         * @param file File to generate URI for
         */
        copyObsidianUrl(file: TFile): void;
        /**
         * Toggles debug mode
         *
         * @param isEnabled Whether to enable or disable debug mode
         */
        debugMode(isEnabled: boolean): void;
        /**
         * Disables all CSS transitions in the vault (until manually re-enabled)
         */
        disableCssTransition(): void;
        /**
         * Restarts Obsidian and renders workspace in mobile mode
         *
         * @tutorial Very useful for testing the rendering of your plugin on mobile devices
         */
        emulateMobile(emulate: boolean): void;
        /**
         * Enables all CSS transitions in the vault
         */
        enableCssTransition(): void;
        /**
         * Manually fix all file links pointing towards image/audio/video resources in element
         *
         * @param element Element to fix links in
         */
        fixFileLinks(element: HTMLElement): void;
        /**
         * Applies an obfuscation font to all text characters in the vault
         *
         * @tutorial Useful for hiding sensitive information or sharing pretty screenshots of your vault
         * @remark Uses the `Flow Circular` font
         * @remark You will have to restart the app to get normal text back
         */
        garbleText(): void;
        /**
         * Get the accent color of the application
         *
         * @remark Often a better alternative than `app.vault.getConfig('accentColor')` as it returns an empty string if no accent color was set
         */
        getAccentColor(): string;
        /**
         * Get the current title of the application
         *
         * @remark The title is based on the currently active leaf
         */
        getAppTitle(): string;
        /**
         * Get the URI for opening specified file in Obsidian
         */
        getObsidianUrl(file: TFile): string;
        /**
         * Get currently active spellcheck languages
         *
         * @deprecated Originally spellcheck languages were stored in app settings, languages are now stored
         *   in `localStorage.getItem(spellcheck-languages)`
         */
        getSpellcheckLanguages(): string[];
        /**
         * Get the current color scheme of the application
         *
         * @remark Identical to `app.vault.getConfig('theme')`
         */
        getTheme(): 'moonstone' | 'obsidian';
        /**
         * Import attachments into specified folder
         */
        importAttachments(imports: ImportedAttachments[], folder: TFolder | null): Promise<void>;
        /** @internal Initialize the entire application using the provided FS adapter */
        initializeWithAdapter(adapter: DataAdapter): Promise<void>;
        isVimEnabled(): boolean;
        /**
         * Load a value from the localstorage given key
         *
         * @param key Key of value to load
         * @remark This method is device *and* vault specific
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault
         */
        loadLocalStorage(key: string): unknown | null;
        /** @internal Add callback to execute on next frame */
        nextFrame(callback: () => void): void;
        /** @internal Add callback to execute on next frame, and remove after execution */
        nextFrameOnceCallback(callback: () => void): void;
        /** @internal Add callback to execute on next frame with promise */
        nextFramePromise(callback: () => Promise<void>): Promise<void>;
        on(): void;
        /** @internal Execute all logged callback (called when next frame is loaded) */
        onNextFrame(callback: () => void): void;
        /**
         * Open the help vault (or site if mobile)
         */
        openHelp(): void;
        /**
         * Open the vault picker
         */
        openVaultChooser(): void;
        /**
         * Open the file with OS defined default file browser application
         */
        openWithDefaultApp(path: string): void;
        /** @internal Register all basic application commands */
        registerCommands(): void;
        /** @internal Register a hook for saving workspace data before unload */
        registerQuitHook(): void;
        /** @internal Save attachment at default attachments location */
        saveAttachment(path: string, extension: string, data: ArrayBuffer): Promise<TFile>;
        /**
         * Save a value to the localstorage given key
         *
         * @param key Key of value to save
         * @param value Value to save
         * @remark This method is device *and* vault specific
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault
         */
        saveLocalStorage(key: string, value: unknown): void;
        /**
         * Set the accent color of the application
         *
         * @remark Also updates the CSS `--accent` variables
         */
        setAccentColor(color: string): void;
        /**
         * Set the path where attachments should be stored
         */
        setAttachmentFolder(path: string): void;
        /**
         * Set the spellcheck languages
         */
        setSpellcheckLanguages(languages: string[]): void;
        /**
         * Set the current color scheme of the application and reload the CSS
         */
        setTheme(theme: 'moonstone' | 'obsidian'): void;
        /**
         * Open the OS file picker at path location
         */
        showInFolder(path: string): void;
        /**
         * Show the release notes for provided version as a new leaf
         *
         * @param version Version to show release notes for (defaults to current version)
         */
        showReleaseNotes(version?: string): void;
        /**
         * Updates the accent color and reloads the CSS
         */
        updateAccentColor(): void;
        /**
         * Update the font family of the application and reloads the CSS
         */
        updateFontFamily(): void;
        /**
         * Update the font size of the application and reloads the CSS
         */
        updateFontSize(): void;
        /**
         * Update the inline title rendering in notes
         */
        updateInlineTitleDisplay(): void;
        updateRibbonDisplay(): void;
        /**
         * Update the color scheme of the application and reloads the CSS
         */
        updateTheme(): void;
        /**
         * Update the view header display in notes
         */
        updateViewHeaderDisplay(): void;
    }

    namespace App {
        function getOverrideConfigDir(appId: string): string | null;
    }
}
