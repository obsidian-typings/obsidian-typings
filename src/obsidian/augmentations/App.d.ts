import type { AppMenuBarManager } from '../internals/AppMenuBarManager.d.ts';
import type { Cli } from '../internals/cli/Cli.d.ts';
import type { AppSetting } from '../internals/AppSetting.d.ts';
import type { Commands } from '../internals/commands/Commands.d.ts';
import type { CustomCSS } from '../internals/custom-css/CustomCSS.d.ts';
import type { DragManager } from '../internals/drag-manager/DragManager.d.ts';
import type { EmbedRegistry } from '../internals/embed-registry/EmbedRegistry.d.ts';
import type { FoldManager } from '../internals/FoldManager.d.ts';
import type { HotkeyManager } from '../internals/hotkey-manager/HotkeyManager.d.ts';
import type { ImportedAttachment } from '../internals/ImportedAttachment.d.ts';
import type { InternalPlugins } from '../internals/internal-plugins/InternalPlugins.d.ts';
import type { MetadataTypeManager } from '../internals/metadata-type-manager/MetadataTypeManager.d.ts';
import type { MobileNavbar } from '../internals/MobileNavbar.d.ts';
import type { MobileTabSwitcher } from '../internals/MobileTabSwitcher.d.ts';
import type { MobileToolbar } from '../internals/MobileToolbar.d.ts';
import type { ObsidianDOM } from '../internals/ObsidianDOM.d.ts';
import type { Plugins } from '../internals/plugins/Plugins.d.ts';
import type { ShareReceiver } from '../internals/ShareReceiver.d.ts';
import type { StatusBar } from '../internals/StatusBar.d.ts';
import type { ViewRegistry } from '../internals/view-registry/ViewRegistry.d.ts';

export {};

declare module 'obsidian' {
    /**
     * The main app object.
     * @since 0.9.7
     */
    interface App {
        /**
         * ID that uniquely identifies the vault.
         *
         * @tutorial Used for implementing device *and* vault-specific data storage using LocalStorage or IndexedDB.
         * @unofficial
         */
        appId: string;

        /**
         * Manager for the application menu bar (desktop only).
         * @unofficial
         */
        appMenuBarManager: AppMenuBarManager;

        /**
         * CLI handler for the app.
         * @unofficial
         */
        cli: Cli;

        /**
         * Contains all registered commands.
         *
         * @tutorial Can be used to manually invoke the functionality of a specific command.
         * @unofficial
         */
        commands: Commands;

        /**
         * Custom CSS (snippets/themes) applied to the application.
         *
         * @tutorial Can be used to view which snippets are enabled or available, or inspect loaded-in theme manifests.
         * @unofficial
         */
        customCss: CustomCSS;

        /**
         * References to important DOM elements of the application.
         *
         * @unofficial
         */
        dom: ObsidianDOM;

        /**
         * Manager for drag-and-drop operations within the app.
         * @unofficial
         */
        dragManager: DragManager;

        /**
         * Registry that manages the creation of generic media type embeds.
         *
         * @unofficial
         */
        embedRegistry: EmbedRegistry;

        /**
         * The file manager object.
         *
         * @official
         * @since 0.11.0
         */
        fileManager: FileManager;

        /**
         * Manager for editor fold (collapse) state persistence.
         * @unofficial
         */
        foldManager: FoldManager;

        /**
         * Manages global hotkeys.
         *
         * @tutorial Can be used for manually invoking a command, or finding which hotkey is assigned to a specific key input.
         * @remark This should not be used for adding hotkeys to your custom commands, this can easily be done via the official API.
         * @unofficial
         */
        hotkeyManager: HotkeyManager;

        /**
         * Manager of internal 'core' plugins.
         *
         * @tutorial Can be used to check whether a specific internal plugin is enabled, or grab specific parts from its config for simplifying your own plugin's settings.
         * @unofficial
         */
        internalPlugins: InternalPlugins;

        /**
         * Whether the application is currently running on mobile.
         *
         * @remark Prefer usage of `{@link Platform.isMobile}`.
         * @remark Will be `true` if `app.emulateMobile()` was enabled.
         * @unofficial
         */
        isMobile: boolean;

        /**
         * The keymap object.
         *
         * @official
         * @since 0.9.7
         */
        keymap: Keymap;

        /**
         * The last known user interaction event, to help commands find out what modifier keys are pressed.
         *
         * @official
         * @since 0.12.17
         */
        lastEvent: UserEvent | null;

        /**
         * Manages the gathering and updating of metadata for all files in the vault.
         *
         * @tutorial Use for finding tags and backlinks for specific files, grabbing frontmatter properties, ...
         * @unofficial
         * @since 0.9.7
         */
        metadataCache: MetadataCache;

        /**
         * Manages the frontmatter properties of the vault and the rendering of the properties.
         *
         * @tutorial Fetching properties used in all frontmatter fields, may potentially be used for adding custom frontmatter widgets.
         * @unofficial
         */
        metadataTypeManager: MetadataTypeManager;

        /**
         * Navigation bar for mobile devices, or `null` on desktop.
         * @unofficial
         */
        mobileNavbar: MobileNavbar | null;

        /**
         * Quick actions for mobile, `null` on desktop.
         * @unofficial
         */
        mobileQuickActions: unknown;

        /**
         * Tab switcher for mobile devices, or `null` on desktop.
         * @unofficial
         */
        mobileTabSwitcher: MobileTabSwitcher | null;

        /**
         * Toolbar for mobile devices, or `null` on desktop.
         * @unofficial
         */
        mobileToolbar: MobileToolbar | null;

        /**
         * Events to execute on the next frame
         *
         * @unofficial
         */
        nextFrameEvents: (() => void)[];

        /**
         * Timer for the next frame
         *
         * @unofficial
         */
        nextFrameTimer: number | null;

        /**
         * Manages loading and enabling of community (non-core) plugins.
         *
         * @tutorial Can be used to communicate with other plugins, custom plugin management, ...
         * @remark Be careful when overriding loading logic, as this may result in other plugins not loading.
         * @unofficial
         */
        plugins: Plugins;

        /**
         * The render context.
         *
         * @official
         * @since 1.10.0
         */
        renderContext: RenderContext;

        /**
         * The scope object.
         *
         * @official
         * @since 0.9.7
         */
        scope: Scope;

        /**
         * The secret storage.
         *
         * @public
         * @since 1.11.4
         * @unofficial ERROR: Missing `@unofficial` or `@official` tag
         */
        secretStorage: SecretStorage;

        /**
         * Manages the settings modal and its tabs.
         *
         * @tutorial Can be used to open the settings modal to a specific tab, extend the settings modal functionality, ...
         * @remark Do not use this to get settings values from other plugins, it is better to do this via `app.plugins.getPlugin(ID)?.settings` (check how the plugin stores its settings).
         * @unofficial
         */
        setting: AppSetting;

        /**
         * Handler for receiving shared content from external apps (mobile).
         * @unofficial
         */
        shareReceiver: ShareReceiver;

        /**
         * Status bar of the application
         *
         * @unofficial
         */
        statusBar: StatusBar;

        /**
         * Name of the vault with version suffix.
         *
         * @remark Formatted as 'NAME - Obsidian vX.Y.Z'.
         * @unofficial
         */
        title: string;

        /**
         * The vault object.
         *
         * Manages all file operations for the vault, contains hooks for file changes, and an adapter for low-level file system operations.
         *
         * @tutorial Used for creating your own files and folders, renaming, ...
         * @tutorial Use `app.vault.adapter` for accessing files outside the vault.
         * @remark Prefer using the regular `vault` whenever possible.
         * @official
         * @since 0.9.7
         */
        vault: Vault;

        /**
         * Manages the construction of appropriate views when opening a file of a certain type.
         *
         * @remark Prefer usage of view registration via the Plugin class.
         * @unofficial
         */
        viewRegistry: ViewRegistry;

        /**
         * The workspace object.
         *
         * Manages the workspace layout, construction, rendering and manipulation of leaves.
         *
         * @tutorial Used for accessing the active editor leaf, grabbing references to your views, ...
         * @official
         * @since 0.9.7
         */
        workspace: Workspace;

        /**
         * Sets the accent color of the application (light/dark mode).
         *
         * @param theme - The theme to set.
         * @unofficial
         */
        changeTheme(theme: 'moonstone' | 'obsidian'): void;

        /**
         * Copies Obsidian URI of given file to clipboard.
         *
         * @param file File to generate URI for.
         * @unofficial
         */
        copyObsidianUrl(file: TFile): void;

        /**
         * Toggles debug mode.
         *
         * @param isEnabled Whether to enable or disable debug mode.
         * @unofficial
         */
        debugMode(isEnabled: boolean): void;

        /**
         * Disables all CSS transitions in the vault (until manually re-enabled).
         *
         * @unofficial
         */
        disableCssTransition(): void;

        /**
         * Restarts Obsidian and renders workspace in mobile mode.
         *
         * @param emulate - Whether to enable or disable mobile emulation.
         * @tutorial Very useful for testing the rendering of your plugin on mobile devices.
         * @unofficial
         */
        emulateMobile(emulate: boolean): void;

        /**
         * Enables all CSS transitions in the vault.
         *
         * @unofficial
         */
        enableCssTransition(): void;

        /**
         * Manually fix all file links pointing towards image/audio/video resources in element.
         *
         * @param element - Element to fix links in.
         * @param sourcePath - Source path used to resolve relative links via {@link MetadataCache.getFirstLinkpathDest}.
         * @unofficial
         */
        fixFileLinks(element: HTMLElement, sourcePath: string): void;

        /**
         * Applies an obfuscation font to all text characters in the vault.
         *
         * @tutorial Useful for hiding sensitive information or sharing pretty screenshots of your vault.
         * @remark Uses the `Flow Circular` font.
         * @remark You will have to restart the app to get normal text back.
         * @unofficial
         */
        garbleText(): void;

        /**
         * Get the accent color of the application.
         *
         * @returns The accent color string.
         * @remark Often a better alternative than `app.vault.getConfig('accentColor')` as it returns an empty string if no accent color was set.
         * @unofficial
         */
        getAccentColor(): string;

        /**
         * Get the current title of the application.
         *
         * @param title - Optional prefix to prepend to the app title (e.g. active file name).
         * @returns The application title.
         * @remark The title is based on the currently active leaf.
         * @unofficial
         */
        getAppTitle(title?: string): string;

        /**
         * Get the URI for opening specified file in Obsidian.
         *
         * @param file - The file to generate URI for.
         * @returns The Obsidian URI for the file.
         * @unofficial
         */
        getObsidianUrl(file: TFile): string;

        /**
         * Get currently active spellcheck languages.
         *
         * @returns The active spellcheck languages.
         * @remark Originally spellcheck languages were stored in app settings, languages are now stored in `localStorage.getItem('spellcheck-languages')`.
         * @unofficial
         */
        getSpellcheckLanguages(): string[];

        /**
         * Get the current color scheme of the application.
         *
         * @returns The current theme.
         * @remark Identical to `app.vault.getConfig('theme')`.
         * @unofficial
         */
        getTheme(): 'moonstone' | 'obsidian';

        /**
         * Get webview partition identifier.
         *
         * @returns The webview partition identifier.
         * @unofficial
         */
        getWebviewPartition(): string;

        /**
         * Import attachments into specified folder.
         *
         * @param attachmentsToImport - The attachments to import.
         * @param folder - The folder to import the attachments to.
         * @returns A promise that resolves when all attachments are imported.
         * @unofficial
         */
        importAttachments(attachmentsToImport: ImportedAttachment[], folder: TFolder | null): Promise<void>;

        /**
         * Initialize the entire application using the provided FS adapter
         *
         * @param adapter - The data adapter to use.
         * @returns A promise that resolves when the application is initialized.
         * @unofficial
         */
        initializeWithAdapter(adapter: DataAdapter): Promise<void>;

        /**
         * Check if the application is in dark mode.
         *
         * @returns Whether the application is in dark mode.
         * @official
         * @since 1.10.0
         */
        isDarkMode(): boolean;

        /**
         * Check whether Vim keybindings are enabled.
         *
         * @returns Whether Vim mode is enabled.
         * @unofficial
         */
        isVimEnabled(): boolean;

        /**
         * Retrieve value from `localStorage` for this vault.
         *
         * @param key - The key to retrieve.
         * @returns The value from `localStorage`.
         * @remark This method is device *and* vault specific.
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault.
         * @official - Changed return type.
         * @since 1.8.7
         */
        loadLocalStorage(key: string): null | unknown;

        /**
         * Add callback to execute on next frame
         *
         * @param callback - The callback to execute.
         * @unofficial
         */
        nextFrame(callback: () => void): void;

        /**
         * Add callback to execute on next frame, and remove after execution
         *
         * @param callback - The callback to execute once.
         * @unofficial
         */
        nextFrameOnceCallback(callback: () => void): void;

        /**
         * Register an event listener on the app.
         * @unofficial
         */
        on(): void;

        /**
         * Called when app config changes.
         *
         * @param configKey - The configuration key that changed.
         * @unofficial
         */
        onConfigChanged(configKey: string): void;

        /**
         * Execute all logged callback (called when next frame is loaded)
         *
         * @param callback - The callback to execute.
         * @unofficial
         */
        onNextFrame(callback: () => void): void;

        /**
         * Open the help vault (or site if mobile).
         *
         * @unofficial
         */
        openHelp(): void;

        /**
         * Open the vault picker.
         *
         * @param closeWindow - Whether to close the current vault window after opening the chooser (desktop only).
         * @unofficial
         */
        openVaultChooser(closeWindow?: boolean): void;

        /**
         * Open the file with OS defined default file browser application.
         *
         * @param path - The path to the file.
         * @unofficial
         */
        openWithDefaultApp(path: string): void;

        /**
         * Register all basic application commands
         *
         * @unofficial
         */
        registerCommands(): void;

        /**
         * Register a hook for saving workspace data before unload
         *
         * @unofficial
         */
        registerQuitHook(): void;

        /**
         * Run the vault opening behavior.
         *
         * @param behavior - The opening behavior to run.
         * @unofficial
         */
        runOpeningBehavior(behavior: string): void;

        /**
         * Save attachment at default attachments location
         *
         * @param name - The attachment name.
         * @param extension - The file extension.
         * @param data - The binary content.
         * @returns A promise that resolves to the saved file.
         * @unofficial
         */
        saveAttachment(name: string, extension: string, data: ArrayBuffer): Promise<TFile>;

        /**
         * Save vault-specific value to `localStorage`. If data is `null`, the entry will be cleared.
         *
         * @param key - The key to save.
         * @param data - The value to save. Must be serializable.
         * @example
         * ```ts
         * app.saveLocalStorage('my-key', 'my-value');
         * ```
         * @remark This method is device *and* vault specific.
         * @tutorial Use load/saveLocalStorage for saving configuration data that needs to be unique to the current vault.
         * @official
         * @since 1.8.7
         */
        saveLocalStorage(key: string, data: unknown | null): void;

        /**
         * Set the accent color of the application.
         *
         * @param color - The accent color to set.
         * @remark Also updates the CSS `--accent` variables.
         * @unofficial
         */
        setAccentColor(color: string): void;

        /**
         * Set the spellcheck languages.
         *
         * @param languages - The spellcheck languages to set.
         * @unofficial
         */
        setSpellcheckLanguages(languages: string[]): void;

        /**
         * Set the current color scheme of the application and reload the CSS.
         *
         * @param theme - The theme to set.
         * @unofficial
         */
        setTheme(theme: 'moonstone' | 'obsidian'): void;

        /**
         * Open the OS file picker at path location.
         *
         * @param path - The path to show.
         * @unofficial
         */
        showInFolder(path: string): void;

        /**
         * Show the release notes for provided version as a new leaf.
         *
         * @param version Version to show release notes for (defaults to current version).
         * @unofficial
         */
        showReleaseNotes(version?: string): void;

        /**
         * Updates the accent color and reloads the CSS.
         *
         * @unofficial
         */
        updateAccentColor(): void;

        /**
         * Update auto full screen display.
         *
         * @unofficial
         */
        updateAutoFullScreenDisplay(): void;

        /**
         * Update floating navigation display.
         *
         * @unofficial
         */
        updateFloatingNavigationDisplay(): void;

        /**
         * Update the font family of the application and reloads the CSS.
         *
         * @unofficial
         */
        updateFontFamily(): void;

        /**
         * Update the font size of the application and reloads the CSS.
         *
         * @unofficial
         */
        updateFontSize(): void;

        /**
         * Update the inline title rendering in notes.
         *
         * @unofficial
         */
        updateInlineTitleDisplay(): void;

        /**
         * Update mobile frame theme.
         *
         * @param isDark - Whether to use the dark theme.
         * @unofficial
         */
        updateMobileFrameTheme(isDark: boolean): void;

        /**
         * Update the ribbon display.
         *
         * @unofficial
         */
        updateRibbonDisplay(): void;

        /**
         * Update tab size setting.
         *
         * @unofficial
         */
        updateTabSize(): void;

        /**
         * Update the color scheme of the application and reloads the CSS.
         *
         * @unofficial
         */
        updateTheme(): void;

        /**
         * Update native menu usage.
         *
         * @unofficial
         */
        updateUseNativeMenu(): void;

        /**
         * Update the view header display in notes.
         *
         * @unofficial
         */
        updateViewHeaderDisplay(): void;
    }

    namespace App {
        /**
         * Get the override config directory for the given app ID.
         *
         * @param appId - The app ID.
         * @returns The override config directory or `null`.
         * @unofficial
         */
        function getOverrideConfigDir(appId: string): string | null;
    }
}
