/**
 * Options of the quick switcher plugin, stored in its `data.json`.
 *
 * Each option is absent when the settings file was changed externally to one that lacks it.
 *
 * @public
 * @unofficial
 */
export interface SwitcherPluginOptions {
  /**
   * Whether files of every extension are offered, including those Obsidian cannot open.
   *
   * @default `false`
   */
  showAllFileTypes?: boolean;

  /**
   * Whether attachments (images and other non-Markdown files) are offered.
   *
   * @default `true`
   */
  showAttachments?: boolean;

  /**
   * Whether only existing files are offered, hiding the link text of unresolved links.
   *
   * @default `false`
   */
  showExistingOnly?: boolean;
}
