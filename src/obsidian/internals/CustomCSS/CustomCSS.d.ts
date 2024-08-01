import type { ThemeManifest } from "../index.js";
import type {
    CustomCSSThemesRecord,
    CustomCSSUpdatesRecord
} from "./index.js";

import type {
    App,
    Component
} from "obsidian";
/** @todo Documentation incomplete */
export interface CustomCSS extends Component {
    /**
     * Reference to App
     */
    app: App;
    /** @internal Cache of CSS snippet filepath (relative to vault root) to CSS snippet contents */
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
    /** @internal */
    queue: WeakMap<object, unknown>;
    /**
     * List of snippets detected by Obsidian, given by their filenames
     */
    snippets: string[];
    /**
     * Currently active theme, given by its name
     *
     * @remark is the default Obsidian theme
     */
    theme: "" | string;
    /**
     * Mapping of theme names to their manifest
     */
    themes: CustomCSSThemesRecord;
    /** @internal */
    updates: CustomCSSUpdatesRecord;

    /** @internal */
    boundRaw(): void;
    /**
     * Check whether a specific theme can be updated
     *
     * @param themeName - Name of the theme to check
     */
    checkForUpdate(themeName: string): void;
    /**
     * Check all themes for updates
     */
    checkForUpdates(): void;
    /**
     * Disable translucency of application background
     */
    disableTranslucency(): void;
    /**
     * Fetch legacy theme CSS using the pre-v1.0.0 theme download pipeline
     *
     * @returns String obsidian.css contents
     */
    downloadLegacyTheme(arg: { repo: string }): Promise<string>;
    /**
     * Enable translucency of application background
     */
    enableTranslucency(): void;
    /**
     * Fetch a theme's manifest using repository URL
     *
     * @remark Do **not** include github prefix, only `username/repo`
     */
    getManifest(repoUrl: string): Promise<ThemeManifest>;
    /**
     * Convert snippet name to its corresponding filepath (relative to vault root)
     *
     * @returns String `.obsidian/snippets/${snippetName}.css`
     */
    getSnippetPath(snippetName: string): string;
    /**
     * Returns the folder path where snippets are stored (relative to vault root)
     */
    getSnippetsFolder(): string;
    /**
     * Convert theme name to its corresponding filepath (relative to vault root)
     *
     * @returns String `.obsidian/themes/${themeName}/theme.css`
     */
    getThemePath(themeName: string): string;
    /**
     * Returns the folder path where themes are stored (relative to vault root)
     */
    getThemesFolder(): string;
    /**
     * Returns whether there are themes that can be updated
     */
    hasUpdates(): boolean;
    /**
     * Install a legacy theme using the pre-v1.0.0 theme download pipeline<br> Will create a corresponding
     * dummy manifest for the theme
     *
     * @remark Name will be used as the folder name for the theme
     */
    installLegacyTheme(arg: { name: string; repo: string; author: string }): Promise<void>;
    /**
     * Install a theme using the regular theme download pipeline
     */
    installTheme(arg: { name: string; repo: string; author: string }, version: string): Promise<void>;
    /**
     * Check whether a specific theme is installed by theme name
     */
    isThemeInstalled(themeName: string): boolean;
    /** @internal */
    onload(): void;
    /** @internal */
    onRaw(e: unknown): void;
    /** @internal */
    readSnippets(): void;
    /** @internal */
    readThemes(): void;
    /**
     * Remove a theme by theme name
     */
    removeTheme(themeName: string): Promise<void>;
    /** @internal */
    requestLoadSnippets(): void;
    /** @internal */
    requestLoadTheme(): void;
    /** @internal */
    requestReadThemes(): void;
    /**
     * Set the activation status of a snippet by snippet name
     */
    setCssEnabledStatus(snippetName: string, enabled: boolean): void;
    /**
     * Set the active theme by theme name
     */
    setTheme(themeName: string): void;
    /**
     * Set the translucency of application background
     */
    setTranslucency(translucency: boolean): void;
}
