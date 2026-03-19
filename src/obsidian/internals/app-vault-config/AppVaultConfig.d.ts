import type { AppVaultConfigHotkeysRecord } from './AppVaultConfigHotkeysRecord.d.ts';
import type { PdfExportSettings } from './PdfExportSettings.d.ts';

/**
 * Vault-level configuration settings stored in the `.obsidian` config folder.
 *
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
  alwaysUpdateLinks?: boolean | false;

  /**
   * Files & Links &gt; Attachment folder path.
   */
  attachmentFolderPath?: '/' | string;

  /**
   * Editor &gt; Auto convert HTML.
   */
  autoConvertHtml?: boolean | true;

  /**
   * Editor &gt; Auto pair brackets.
   */
  autoPairBrackets?: boolean | true;

  /**
   * Editor &gt; Auto pair Markdown syntax.
   */
  autoPairMarkdown?: boolean | true;

  /**
   * Appearance &gt; Font size.
   */
  baseFontSize?: 16 | number;

  /**
   * Appearance &gt; Quick font size adjustment.
   */
  baseFontSizeAction?: boolean | true;

  /**
   * Community Plugins &gt; Browse &gt; Sort order.
   */
  communityPluginSortOrder: 'alphabetical' | 'download' | 'release' | 'update';

  /**
   * Themes &gt; Browse &gt; Sort order.
   */
  communityThemeSortOrder: 'alphabetical' | 'download' | 'release' | 'update';

  /**
   * Appearance &gt; Theme.
   *
   * @remark is the default Obsidian theme.
   */
  cssTheme?: '' | string;

  /**
   * Editor &gt; Default view for new tabs.
   */
  defaultViewMode?: 'preview' | 'source';

  /** Whether Emacs-style keybindings are enabled. */
  emacsyKeys?: boolean | true;

  /**
   * Appearance &gt; CSS snippets.
   */
  enabledCssSnippets?: string[];

  /** Sort order for files in the file explorer. */
  fileSortOrder?: 'alphabetical';

  /**
   * Editor &gt; Always focus new tabs.
   */
  focusNewTab?: boolean | true;

  /**
   * Editor &gt; Fold heading.
   */
  foldHeading?: boolean | true;

  /**
   * Editor &gt; Fold indent.
   */
  foldIndent?: boolean | true;

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
  legacyEditor?: boolean | false;

  /** Whether live preview mode is enabled in the editor. */
  livePreview?: boolean | true;

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
  nativeMenus?: boolean | null;

  /**
   * Files & Links &gt; Default location for new notes | 'folder' &gt; Folder to create new notes in.
   */
  newFileFolderPath?: '/' | string;

  /**
   * Files & Links &gt; Default location for new notes.
   */
  newFileLocation?: 'current' | 'folder' | 'root';

  /**
   * Files & Links &gt; New link format.
   */
  newLinkFormat?: 'absolute' | 'relative' | 'shortest';

  /**
   * Saved on executing 'Export to PDF' command.
   */
  pdfExportSettings?: PdfExportSettings;

  /**
   * Files & Links &gt; Confirm line deletion.
   */
  promptDelete?: boolean | true;

  /**
   * Editor &gt; Properties in document.
   */
  propertiesInDocument?: 'hidden' | 'source' | 'visible';

  /**
   * Editor &gt; Readable line length.
   */
  readableLineLength?: boolean | true;

  /**
   * Editor &gt; Right-to-left (RTL).
   */
  rightToLeft?: boolean | false;

  /**
   * Editor &gt; Show indentation guides.
   */
  showIndentGuide?: boolean | true;

  /**
   * Editor &gt; Show inline title.
   */
  showInlineTitle?: boolean | true;

  /**
   * Editor &gt; Show line numbers.
   */
  showLineNumber?: boolean | false;

  /**
   * Appearance &gt; Show ribbon.
   */
  showRibbon?: boolean | true;

  /**
   * Files & Links &gt; Detect all file extensions.
   */
  showUnsupportedFiles?: boolean | false;

  /**
   * Appearance &gt; Show tab title bar.
   */
  showViewHeader?: boolean | false;

  /**
   * Editor &gt; Smart indent lists.
   */
  smartIndentList?: boolean | true;

  /**
   * Editor &gt; Spellcheck.
   */
  spellcheck?: boolean | false;

  /**
   * Editor &gt; Spellcheck languages.
   */
  spellcheckLanguages?: null | string[];

  /**
   * Editor &gt; Strict line breaks.
   */
  strictLineBreaks?: boolean | false;

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
  translucency?: boolean | false;

  /**
   * Files & Links &gt; Deleted files.
   */
  trashOption?: 'local' | 'none' | 'system';

  /**
   * Left-over storage for old properties types.
   *
   * @deprecated Probably left-over code from old properties type storage
   */
  types: object;

  /**
   * Files & Links &gt; Use [[Wikilinks]].
   */
  useMarkdownLinks?: boolean | false;

  /**
   * Files & Links &gt; Excluded files.
   */
  userIgnoreFilters?: null | string[];

  /**
   * Editor &gt; Indent using tabs.
   */
  useTab?: boolean | true;

  /**
   * Editor &gt; Vim key bindings.
   */
  vimMode?: boolean | false;
}
