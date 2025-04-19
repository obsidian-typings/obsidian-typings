import type { AppVaultConfigHotkeysRecord } from './AppVaultConfigHotkeysRecord.d.ts';
import type { PdfExportSettings } from './PdfExportSettings.d.ts';

/** @public @unofficial */
export interface AppVaultConfig {
    /**
     * Appearance \> Accent color
     */
    accentColor: '' | string;
    /**
     * Files & Links \> Automatically update internal links
     */
    alwaysUpdateLinks?: false | boolean;
    /**
     * Files & Links \> Attachment folder path
     */
    attachmentFolderPath?: '/' | string;
    /**
     * Editor \> Auto convert HTML
     */
    autoConvertHtml?: true | boolean;
    /**
     * Editor \> Auto pair brackets
     */
    autoPairBrackets?: true | boolean;
    /**
     * Editor \> Auto pair Markdown syntax
     */
    autoPairMarkdown?: true | boolean;
    /**
     * Appearance \> Font size
     */
    baseFontSize?: 16 | number;
    /**
     * Appearance \> Quick font size adjustment
     */
    baseFontSizeAction?: true | boolean;
    /**
     * Community Plugins \> Browse \> Sort order
     */
    communityPluginSortOrder: 'download' | 'update' | 'release' | 'alphabetical';
    /**
     * Themes \> Browse \> Sort order
     */
    communityThemeSortOrder: 'download' | 'update' | 'release' | 'alphabetical';
    /**
     * Appearance \> Theme
     *
     * @remark is the default Obsidian theme
     */
    cssTheme?: '' | string;
    /**
     * Editor \> Default view for new tabs
     */
    defaultViewMode?: 'source' | 'preview';
    emacsyKeys?: true | boolean;
    /**
     * Appearance \> CSS snippets
     */
    enabledCssSnippets?: string[];
    fileSortOrder?: 'alphabetical';
    /**
     * Editor \> Always focus new tabs
     */
    focusNewTab?: true | boolean;
    /**
     * Editor \> Fold heading
     */
    foldHeading?: true | boolean;
    /**
     * Editor \> Fold indent
     */
    foldIndent?: true | boolean;
    /**
     * Hotkeys
     *
     * @deprecated Likely not used anymore
     */
    hotkeys?: AppVaultConfigHotkeysRecord;
    /**
     * Appearance \> Interface font
     */
    interfaceFontFamily?: '' | string;
    /**
     * Editor \> Use legacy editor
     */
    legacyEditor?: false | boolean;
    livePreview?: true | boolean;
    /**
     * Mobile \> Configure mobile Quick Action
     */
    mobilePullAction?: 'command-palette:open' | string;
    mobileQuickRibbonItem?: '' | string;
    /**
     * Mobile \> Manage toolbar options
     */
    mobileToolbarCommands?: string[];
    monospaceFontFamily?: '' | string;
    /**
     * Appearance \> Native menus
     */
    nativeMenus?: null | boolean;
    /**
     * Files & Links \> Default location for new notes | 'folder' \> Folder to create new notes in
     */
    newFileFolderPath?: '/' | string;
    /**
     * Files & Links \> Default location for new notes
     */
    newFileLocation?: 'root' | 'current' | 'folder';
    /**
     * Files & Links \> New link format
     */
    newLinkFormat?: 'shortest' | 'relative' | 'absolute';
    /**
     * Saved on executing 'Export to PDF' command
     */
    pdfExportSettings?: PdfExportSettings;
    /**
     * Files & Links \> Confirm line deletion
     */
    promptDelete?: true | boolean;
    /**
     * Editor \> Properties in document
     */
    propertiesInDocument?: 'visible' | 'hidden' | 'source';
    /**
     * Editor \> Readable line length
     */
    readableLineLength?: true | boolean;
    /**
     * Editor \> Right-to-left (RTL)
     */
    rightToLeft?: false | boolean;
    /** @deprecated Removed as of version 1.4.3 */
    showFrontmatter?: false | boolean;
    /**
     * Editor \> Show indentation guides
     */
    showIndentGuide?: true | boolean;
    /**
     * Editor \> Show inline title
     */
    showInlineTitle?: true | boolean;
    /**
     * Editor \> Show line numbers
     */
    showLineNumber?: false | boolean;
    /**
     * Appearance \> Show ribbon
     */
    showRibbon?: true | boolean;
    /**
     * Files & Links \> Detect all file extensions
     */
    showUnsupportedFiles?: false | boolean;
    /**
     * Appearance \> Show tab title bar
     */
    showViewHeader?: false | boolean;
    /**
     * Editor \> Smart indent lists
     */
    smartIndentList?: true | boolean;
    /**
     * Editor \> Spellcheck
     */
    spellcheck?: false | boolean;
    /**
     * @deprecated Deprecated
     * @todo
     */
    spellcheckDictionary?: [] | string[];
    /**
     * Editor \> Spellcheck languages
     */
    spellcheckLanguages?: null | string[];
    /**
     * Editor \> Strict line breaks
     */
    strictLineBreaks?: false | boolean;
    /**
     * Editor \> Tab indent size
     */
    tabSize?: 4 | number;
    /**
     * Appearance \> Text font
     */
    textFontFamily?: '' | string;
    /**
     * Appearance \> Base color scheme
     *
     * @remark Not be confused with cssTheme, this setting is for the light/dark mode
     * @remark moonstone is light theme, 'obsidian' is dark theme
     */
    theme?: 'moonstone' | 'obsidian';
    /**
     * Appearance \> Translucent window
     */
    translucency?: false | boolean;
    /**
     * Files & Links \> Deleted files
     */
    trashOption?: 'system' | 'local' | 'none';
    /** @deprecated Probably left-over code from old properties type storage */
    types: object;
    /**
     * Files & Links \> Use [[Wikilinks]]
     */
    useMarkdownLinks?: false | boolean;
    /**
     * Files & Links \> Excluded files
     */
    userIgnoreFilters?: null | string[];
    /**
     * Editor \> Indent using tabs
     */
    useTab?: true | boolean;
    /**
     * Editor \> Vim key bindings
     */
    vimMode?: false | boolean;
}
