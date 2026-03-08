import type {
    App,
    Component,
    Debouncer
} from 'obsidian';
import type { PromisedQueue } from '../PromisedQueue.d.ts';
import type { ThemeManifest } from '../ThemeManifest.d.ts';
import type { CustomCSSThemesRecord } from './CustomCSSThemesRecord.d.ts';
import type { CustomCSSUpdatesRecord } from './CustomCSSUpdatesRecord.d.ts';
import type { DownloadLegacyThemeOptions } from './DownloadLegacyThemeOptions.d.ts';
import type { InstallThemeOptions } from './InstallThemeOptions.d.ts';

/**
 * Manager for custom CSS themes and snippets.
 * @public
 * @unofficial
 */
export interface CustomCSS extends Component {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Cache of CSS snippet filepath (relative to vault root) to CSS snippet contents.
     */
    csscache: Map<string, string>;

    /**
     * Set of enabled snippet, given by filenames.
     */
    enabledSnippets: Set<string>;

    /**
     * Contains references to Style elements containing custom CSS snippets.
     */
    extraStyleEls: HTMLStyleElement[];

    /**
     * List of theme names not fully updated to post v1.0.0 theme guidelines.
     */
    oldThemes: string[];

    /** Queue for sequential CSS processing operations. */
    queue: PromisedQueue;

    /** Debounced function to reload CSS snippets. */
    requestLoadSnippets: Debouncer<[], void>;

    /** Debounced function to reload the active theme. */
    requestLoadTheme: Debouncer<[], void>;

    /** Debounced function to re-read available themes from disk. */
    requestReadThemes: Debouncer<[], void>;

    /**
     * List of snippets detected by Obsidian, given by their filenames.
     */
    snippets: string[];

    /** Main style element for the active theme. */
    styleEl: HTMLStyleElement;

    /**
     * Currently active theme, given by its name.
     *
     * @remark is the default Obsidian theme.
     */
    theme: '' | string;

    /**
     * Mapping of theme names to their manifest.
     */
    themes: CustomCSSThemesRecord;

    /** Record of available theme updates. */
    updates: CustomCSSUpdatesRecord;

    /**
     * Bound callback for handling raw file change events for a theme.
     *
     * @param themeName - Name of the theme.
     */
    boundRaw(themeName: string): void;

    /**
     * Check whether a specific theme can be updated.
     *
     * @param themeName - Name of the theme to check.
     */
    checkForUpdate(themeName: string): void;

    /**
     * Check all themes for updates.
     */
    checkForUpdates(): void;

    /**
     * Constructor.
     *
     * @param app - The app.
     * @returns The new instance.
     * To get the constructor, use `getCustomCSSConstructor()` from `obsidian-typings/implementations`.
     * @deprecated - Added only for typing purposes.
     */
    constructor__(app: App): this;

    /**
     * Disable translucency of application background.
     */
    disableTranslucency(): void;

    /**
     * Fetch legacy theme CSS using the pre-v1.0.0 theme download pipeline.
     *
     * @param options - Options for downloading the legacy theme.
     * @returns String obsidian.css contents.
     */
    downloadLegacyTheme(options: DownloadLegacyThemeOptions): Promise<string>;

    /**
     * Enable translucency of application background.
     */
    enableTranslucency(): void;

    /**
     * Fetch a theme's manifest using repository URL.
     *
     * @param repoUrl - Repository URL (e.g. `username/repo`).
     * @returns The theme manifest.
     * @remark Do **not** include github prefix, only `username/repo`.
     */
    getManifest(repoUrl: string): Promise<ThemeManifest>;

    /**
     * Convert snippet name to its corresponding filepath (relative to vault root).
     *
     * @param snippetName - Name of the snippet.
     * @returns String `.obsidian/snippets/${snippetName}.css`.
     */
    getSnippetPath(snippetName: string): string;

    /**
     * Returns the folder path where snippets are stored (relative to vault root).
     *
     * @returns Path to the snippets folder.
     */
    getSnippetsFolder(): string;

    /**
     * Returns the folder path where themes are stored (relative to vault root).
     *
     * @returns Path to the themes folder.
     */
    getThemeFolder(): string;

    /**
     * Convert theme name to its corresponding filepath (relative to vault root).
     *
     * @param themeName - Name of the theme.
     * @returns String `.obsidian/themes/${themeName}/theme.css`.
     */
    getThemePath(themeName: string): string;

    /**
     * Returns whether there are themes that can be updated.
     *
     * @returns Whether any themes have available updates.
     */
    hasUpdates(): boolean;

    /**
     * Install a legacy theme using the pre-v1.0.0 theme download pipeline<br> Will create a corresponding.
     * dummy manifest for the theme.
     *
     * @param options - Options for installing the theme.
     * @returns A promise that resolves when the legacy theme is installed.
     * @remark Name will be used as the folder name for the theme.
     */
    installLegacyTheme(options: InstallThemeOptions): Promise<void>;

    /**
     * Install a theme using the regular theme download pipeline.
     *
     * @param options - Options for installing the theme.
     * @param version - Version to install.
     * @returns A promise that resolves when the theme is installed.
     */
    installTheme(options: InstallThemeOptions, version: string): Promise<void>;

    /** Check whether the current theme is dark mode. */
    isDarkMode(): boolean;

    /**
     * Check whether a specific theme is installed by theme name.
     *
     * @param themeName - Name of the theme.
     * @returns Whether the theme is installed.
     */
    isThemeInstalled(themeName: string): boolean;

    /**
     * Load and apply CSS from the given source.
     *
     * @returns The result of loading CSS.
     */
    loadCss(arg1: unknown): Promise<unknown>;

    /**
     * Load stored CustomCSS configuration data.
     *
     * @returns The loaded configuration data.
     */
    loadData(): unknown;

    /**
     * Load and apply all enabled CSS snippets.
     *
     * @returns The result of loading snippets.
     */
    loadSnippets(): unknown;

    /**
     * Load and apply a specific theme.
     *
     * @returns The result of loading the theme.
     */
    loadTheme(arg1: unknown): unknown;

    /** Lifecycle hook called when the component is loaded. */
    onload(): void;

    /**
     * Handle raw file system change events for a theme.
     *
     * @param themeName - Name of the theme that changed.
     */
    onRaw(themeName: string): void;

    /**
     * Read available CSS snippets from the snippets folder.
     *
     * @param reload - Whether to reload snippets after reading.
     */
    readSnippets(reload?: boolean): void;

    /**
     * Read available themes from the themes folder.
     *
     * @param reload - Whether to reload themes after reading.
     */
    readThemes(reload?: boolean): void;

    /** Reload the active theme CSS. */
    reloadTheme(): void;

    /**
     * Remove a theme by theme name.
     *
     * @param themeName - Name of the theme to remove.
     * @returns A promise that resolves when the theme is removed.
     */
    removeTheme(themeName: string): Promise<void>;

    /**
     * Set the activation status of a snippet by snippet name.
     *
     * @param snippetName - Name of the snippet.
     * @param enabled - Whether the snippet should be enabled.
     */
    setCssEnabledStatus(snippetName: string, enabled: boolean): void;

    /**
     * Set the active theme by theme name.
     *
     * @param themeName - Name of the theme to activate.
     */
    setTheme(themeName: string): void;

    /**
     * Set the translucency of application background.
     *
     * @param translucency - Whether translucency should be enabled.
     */
    setTranslucency(translucency: boolean): void;
}
