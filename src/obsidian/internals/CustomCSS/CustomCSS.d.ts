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

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface CustomCSS extends Component {
    /**
     * Reference to App.
     */
    app: App;
    /** @internal Cache of CSS snippet filepath (relative to vault root) to CSS snippet contents */
    csscache: Map<string, string>;
    /**
     * Set of enabled snippet, given by filenames.
     */
    enabledSnippets: Set<string>;
    /**
     * @internal.
     * Contains references to Style elements containing custom CSS snippets.
     */
    extraStyleEls: HTMLStyleElement[];
    /**
     * List of theme names not fully updated to post v1.0.0 theme guidelines.
     */
    oldThemes: string[];
    /** @internal */
    queue: PromisedQueue;
    /** @internal */
    requestLoadSnippets: Debouncer<[], void>;
    /** @internal */
    requestLoadTheme: Debouncer<[], void>;
    /** @internal */
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
    /** @internal */
    updates: CustomCSSUpdatesRecord;

    /** @internal */
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
    loadCss(arg1: unknown): Promise<unknown>;
    loadData(): unknown;
    loadSnippets(): unknown;
    loadTheme(arg1: unknown): unknown;
    /** @internal */
    onload(): void;
    /** @internal */
    onRaw(themeName: string): void;
    /** @internal */
    readSnippets(): void;
    /** @internal */
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
