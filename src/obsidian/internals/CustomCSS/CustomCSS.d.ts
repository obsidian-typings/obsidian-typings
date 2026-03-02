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

    /** Bound callback for handling raw file change events for a theme. */
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
     * Disable translucency of application background.
     */
    disableTranslucency(): void;

    /**
     * Fetch legacy theme CSS using the pre-v1.0.0 theme download pipeline.
     *
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
     * @remark Do **not** include github prefix, only `username/repo`.
     */
    getManifest(repoUrl: string): Promise<ThemeManifest>;

    /**
     * Convert snippet name to its corresponding filepath (relative to vault root).
     *
     * @returns String `.obsidian/snippets/${snippetName}.css`.
     */
    getSnippetPath(snippetName: string): string;

    /**
     * Returns the folder path where snippets are stored (relative to vault root).
     */
    getSnippetsFolder(): string;

    /**
     * Returns the folder path where themes are stored (relative to vault root).
     */
    getThemeFolder(): string;

    /**
     * Convert theme name to its corresponding filepath (relative to vault root).
     *
     * @returns String `.obsidian/themes/${themeName}/theme.css`.
     */
    getThemePath(themeName: string): string;

    /**
     * Returns whether there are themes that can be updated.
     */
    hasUpdates(): boolean;

    /**
     * Install a legacy theme using the pre-v1.0.0 theme download pipeline<br> Will create a corresponding.
     * dummy manifest for the theme.
     *
     * @remark Name will be used as the folder name for the theme.
     */
    installLegacyTheme(options: InstallThemeOptions): Promise<void>;

    /**
     * Install a theme using the regular theme download pipeline.
     */
    installTheme(options: InstallThemeOptions, version: string): Promise<void>;

    /**
     * Check whether a specific theme is installed by theme name.
     */
    isThemeInstalled(themeName: string): boolean;

    /** Load and apply CSS from the given source. */
    loadCss(arg1: unknown): Promise<unknown>;

    /** Load stored CustomCSS configuration data. */
    loadData(): unknown;

    /** Load and apply all enabled CSS snippets. */
    loadSnippets(): unknown;

    /** Load and apply a specific theme. */
    loadTheme(arg1: unknown): unknown;

    /** Lifecycle hook called when the component is loaded. */
    onload(): void;

    /** Handle raw file system change events for a theme. */
    onRaw(themeName: string): void;

    /** Read available CSS snippets from the snippets folder. */
    readSnippets(): void;

    /** Read available themes from the themes folder. */
    readThemes(): void;

    /**
     * Remove a theme by theme name.
     */
    removeTheme(themeName: string): Promise<void>;

    /**
     * Set the activation status of a snippet by snippet name.
     */
    setCssEnabledStatus(snippetName: string, enabled: boolean): void;

    /**
     * Set the active theme by theme name.
     */
    setTheme(themeName: string): void;

    /**
     * Set the translucency of application background.
     */
    setTranslucency(translucency: boolean): void;
}
