/**
 * Ephemeral state that a PDF view reads in `setEphemeralState`.
 *
 * @public
 * @unofficial
 */
export interface PdfViewEphemeralState {
  /**
   * Whether the PDF viewer should receive focus.
   */
  focus?: boolean;

  /**
   * Link subpath to navigate to, such as `#page=3`.
   *
   * `Workspace.openLinkText` puts it here, and the view applies it to the PDF viewer.
   */
  subpath?: string;
}
