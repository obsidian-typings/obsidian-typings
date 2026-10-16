/**
 * Ephemeral state for a markdown view, storing scroll position.
 *
 * @public
 * @unofficial
 */
export interface MarkdownViewEphemeralState extends Record<string, unknown> {
  /**
   * Scroll position in the view.
   */
  scroll: number;

  /**
   * Link subpath to navigate to, such as `#Heading` or `#^block-id`.
   *
   * `Workspace.openLinkText` puts it here, and `MarkdownView.setEphemeralState` resolves it to a line.
   * `MarkdownView.getEphemeralState` never returns it.
   */
  subpath?: string;
}
