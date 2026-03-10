import type { AppVaultConfigHotkeysRecord } from './AppVaultConfigHotkeysRecord.d.ts';
import type { PdfExportSettings } from './PdfExportSettings.d.ts';

/**
 * Vault-level configuration settings stored in the `.obsidian` config folder.
 * @public
 * @unofficial
 */
export interface AppVaultConfig {
  /**
   * Appearance &gt; Accent color.
   */
  accentColor: '' | string;

  /**
   * Files & Links &gt; Automatically update internal links.
   */
  alwaysUpdateLinks?: false | boolean;

  /**
   * Files & Links &gt; Attachment folder path.
   */
  attachmentFolderPath?: '/' | string;

  /**
   * Editor &gt; Auto convert HTML.
   */
  autoConvertHtml?: true | boolean;

  /**
   * Editor &gt; Auto pair brackets.
   */
  autoPairBrackets?: true | boolean;

  /**
   * Editor &gt; Auto pair Markdown syntax.
   */
  autoPairMarkdown?: true | boolean;

  /**
   * Appearance &gt; Font size.
   */
  baseFontSize?: 16 | number;

  /**
   * Appearance &gt; Quick font size adjustment.
   */
  baseFontSizeAction?: true | boolean;

  /**
   * Community Plugins &gt; Browse &gt; Sort order.
   */
  communityPluginSortOrder: 'download' | 'update' | 'release' | 'alphabetical';

  /**
   * Themes &gt; Browse &gt; Sort order.
   */
  communityThemeSortOrder: 'download' | 'update' | 'release' | 'alphabetical';

  /**
   * Appearance &gt; Theme.
   *
   * @remark is the default Obsidian theme.
   */
  cssTheme?: '' | string;

  /**
   * Editor &gt; Default view for new tabs.
   */
  defaultViewMode?: 'source' | 'preview';

  /** Whether Emacs-style keybindings are enabled. */
  emacsyKeys?: true | boolean;

  /**
   * Appearance &gt; CSS snippets.
   */
  enabledCssSnippets?: string[];

  /** Sort order for files in the file explorer. */
  fileSortOrder?: 'alphabetical';

  /**
   * Editor &gt; Always focus new tabs.
   */
  focusNewTab?: true | boolean;

  /**
   * Editor &gt; Fold heading.
   */
  foldHeading?: true | boolean;

  /**
   * Editor &gt; Fold indent.
   */
  foldIndent?: true | boolean;

  /**
   * Hotkeys.
   *
   * @deprecated Likely not used anymore.
   */
  hotkeys?: AppVaultConfigHotkeysRecord;

  /**
   * Appearance &gt; Interface font.
   */
  interfaceFontFamily?: '' | string;

  /**
   * Editor &gt; Use legacy editor.
   */
  legacyEditor?: false | boolean;

  /** Whether live preview mode is enabled in the editor. */
  livePreview?: true | boolean;

  /**
   * Mobile &gt; Configure mobile Quick Action.
   */
  mobilePullAction?: 'command-palette:open' | string;

  /** Command ID for the mobile quick ribbon action item. */
  mobileQuickRibbonItem?: '' | string;

  /**
   * Mobile &gt; Manage toolbar options.
   */
  mobileToolbarCommands?: string[];

  /** Appearance &gt; Monospace font. */
  monospaceFontFamily?: '' | string;

  /**
   * Appearance &gt; Native menus.
   */
  nativeMenus?: null | boolean;

  /**
   * Files & Links &gt; Default location for new notes | 'folder' &gt; Folder to create new notes in.
   */
  newFileFolderPath?: '/' | string;

  /**
   * Files & Links &gt; Default location for new notes.
   */
  newFileLocation?: 'root' | 'current' | 'folder';

  /**
   * Files & Links &gt; New link format.
   */
  newLinkFormat?: 'shortest' | 'relative' | 'absolute';

  /**
   * Saved on executing 'Export to PDF' command.
   */
  pdfExportSettings?: PdfExportSettings;

  /**
   * Files & Links &gt; Confirm line deletion.
   */
  promptDelete?: true | boolean;

  /**
   * Editor &gt; Properties in document.
   */
  propertiesInDocument?: 'visible' | 'hidden' | 'source';

  /**
   * Editor &gt; Readable line length.
   */
  readableLineLength?: true | boolean;

  /**
   * Editor &gt; Right-to-left (RTL).
   */
  rightToLeft?: false | boolean;

  /**
   * Editor &gt; Show indentation guides.
   */
  showIndentGuide?: true | boolean;

  /**
   * Editor &gt; Show inline title.
   */
  showInlineTitle?: true | boolean;

  /**
   * Editor &gt; Show line numbers.
   */
  showLineNumber?: false | boolean;

  /**
   * Appearance &gt; Show ribbon.
   */
  showRibbon?: true | boolean;

  /**
   * Files & Links &gt; Detect all file extensions.
   */
  showUnsupportedFiles?: false | boolean;

  /**
   * Appearance &gt; Show tab title bar.
   */
  showViewHeader?: false | boolean;

  /**
   * Editor &gt; Smart indent lists.
   */
  smartIndentList?: true | boolean;

  /**
   * Editor &gt; Spellcheck.
   */
  spellcheck?: false | boolean;

  /**
   * Editor &gt; Spellcheck languages.
   */
  spellcheckLanguages?: null | string[];

  /**
   * Editor &gt; Strict line breaks.
   */
  strictLineBreaks?: false | boolean;

  /**
   * Editor &gt; Tab indent size.
   */
  tabSize?: 4 | number;

  /**
   * Appearance &gt; Text font.
   */
  textFontFamily?: '' | string;

  /**
   * Appearance &gt; Base color scheme.
   *
   * @remark Not be confused with cssTheme, this setting is for the light/dark mode.
   * @remark moonstone is light theme, 'obsidian' is dark theme.
   */
  theme?: 'moonstone' | 'obsidian';

  /**
   * Appearance &gt; Translucent window.
   */
  translucency?: false | boolean;

  /**
   * Files & Links &gt; Deleted files.
   */
  trashOption?: 'system' | 'local' | 'none';

  /** @deprecated Probably left-over code from old properties type storage */
  types: object;

  /**
   * Files & Links &gt; Use [[Wikilinks]].
   */
  useMarkdownLinks?: false | boolean;

  /**
   * Files & Links &gt; Excluded files.
   */
  userIgnoreFilters?: null | string[];

  /**
   * Editor &gt; Indent using tabs.
   */
  useTab?: true | boolean;

  /**
   * Editor &gt; Vim key bindings.
   */
  vimMode?: false | boolean;
}
