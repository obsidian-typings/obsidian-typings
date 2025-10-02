import type { AppMenuBarManager } from '../internals/AppMenuBarManager.d.ts';
import type { AppSetting } from '../internals/AppSetting.d.ts';
import type { Commands } from '../internals/Commands/Commands.d.ts';
import type { CustomCSS } from '../internals/CustomCSS/CustomCSS.d.ts';
import type { DragManager } from '../internals/DragManager/DragManager.d.ts';
import type { EmbedRegistry } from '../internals/EmbedRegistry/EmbedRegistry.d.ts';
import type { FoldManager } from '../internals/FoldManager.d.ts';
import type { HotkeyManager } from '../internals/HotkeyManager/HotkeyManager.d.ts';
import type { ImportedAttachment } from '../internals/ImportedAttachment.d.ts';
import type { InternalPlugins } from '../internals/InternalPlugins/InternalPlugins.d.ts';
import type { MetadataTypeManager } from '../internals/MetadataTypeManager/MetadataTypeManager.d.ts';
import type { MobileNavbar } from '../internals/MobileNavbar.d.ts';
import type { MobileTabSwitcher } from '../internals/MobileTabSwitcher.d.ts';
import type { MobileToolbar } from '../internals/MobileToolbar.d.ts';
import type { ObsidianDOM } from '../internals/ObsidianDOM.d.ts';
import type { Plugins } from '../internals/Plugins/Plugins.d.ts';
import type { ShareReceiver } from '../internals/ShareReceiver.d.ts';
import type { StatusBar } from '../internals/StatusBar.d.ts';
import type { ViewRegistry } from '../internals/ViewRegistry/ViewRegistry.d.ts';

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
         * @todo Documentation incomplete.
         * @unofficial
         */
        appMenuBarManager: AppMenuBarManager;

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
         * @todo Documentation incomplete.
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
         * @todo Documentation incomplete.
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
         * @remark Will be true if `app.emulateMobile()` was enabled.
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
         * @todo Documentation incomplete.
         * @unofficial
         */
        mobileNavbar: MobileNavbar | null;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        mobileTabSwitcher: MobileTabSwitcher | null;

        /**
         * @todo Documentation incomplete.
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
         * Manages the settings modal and its tabs.
         *
         * @tutorial Can be used to open the settings modal to a specific tab, extend the settings modal functionality, ...
         * @remark Do not use this to get settings values from other plugins, it is better to do this via `app.plugins.getPlugin(ID)?.settings` (check how the plugin stores its settings).
         * @unofficial
         */
        setting: AppSetting;

        /**
         * @todo Documentation incomplete.
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
         * @param element Element to fix links in.
         * @unofficial
         */
        fixFileLinks(element: HTMLElement): void;

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
         * @remark Often a better alternative than `app.vault.getConfig('accentColor')` as it returns an empty string if no accent color was set.
         * @unofficial
         */
        getAccentColor(): string;

        /**
         * Get the current title of the application.
         *
         * @remark The title is based on the currently active leaf.
         * @unofficial
         */
        getAppTitle(): string;

        /**
         * Get the URI for opening specified file in Obsidian.
         *
         * @unofficial
         */
        getObsidianUrl(file: TFile): string;

        /**
         * Get currently active spellcheck languages.
         *
         * @remark Originally spellcheck languages were stored in app settings, languages are now stored in `localStorage.getItem('spellcheck-languages')`.
         * @unofficial
         */
        getSpellcheckLanguages(): string[];

        /**
         * Get the current color scheme of the application.
         *
         * @remark Identical to `app.vault.getConfig('theme')`.
         * @unofficial
         */
        getTheme(): 'moonstone' | 'obsidian';

        /**
         * Import attachments into specified folder.
         *
         * @param attachmentsToImport - The attachments to import.
         * @param folder - The folder to import the attachments to.
         * @unofficial
         */
        importAttachments(attachmentsToImport: ImportedAttachment[], folder: TFolder | null): Promise<void>;

        /**
         * Initialize the entire application using the provided FS adapter
         *
         * @unofficial
         */
        initializeWithAdapter(adapter: DataAdapter): Promise<void>;

        /**
         * Check if the application is in dark mode.
         *
         * @official
         * @since 1.10.0
         */
        isDarkMode(): boolean;

        /**
         * @todo Documentation incomplete.
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
         * @unofficial
         */
        nextFrame(callback: () => void): void;

        /**
         * Add callback to execute on next frame, and remove after execution
         *
         * @unofficial
         */
        nextFrameOnceCallback(callback: () => void): void;

        /**
         * Add callback to execute on next frame with promise
         *
         * @unofficial
         */
        nextFramePromise(callback: () => Promise<void>): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        on(): void;

        /**
         * Execute all logged callback (called when next frame is loaded)
         *
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
         * @unofficial
         */
        openVaultChooser(): void;

        /**
         * Open the file with OS defined default file browser application.
         *
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
         * Save attachment at default attachments location
         *
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
         * @remark Also updates the CSS `--accent` variables.
         * @unofficial
         */
        setAccentColor(color: string): void;

        /**
         * Set the path where attachments should be stored.
         *
         * @unofficial
         */
        setAttachmentFolder(path: string): void;

        /**
         * Set the spellcheck languages.
         *
         * @unofficial
         */
        setSpellcheckLanguages(languages: string[]): void;

        /**
         * Set the current color scheme of the application and reload the CSS.
         *
         * @unofficial
         */
        setTheme(theme: 'moonstone' | 'obsidian'): void;

        /**
         * Open the OS file picker at path location.
         *
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
         * Update the ribbon display.
         *
         * @unofficial
         */
        updateRibbonDisplay(): void;

        /**
         * Update the color scheme of the application and reloads the CSS.
         *
         * @unofficial
         */
        updateTheme(): void;

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
         * @unofficial
         */
        function getOverrideConfigDir(appId: string): string | null;
    }
}
