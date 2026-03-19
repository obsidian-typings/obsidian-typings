export {};

declare global {
  /**
   * TurndownService for converting HTML to Markdown.
   * @unofficial
   */
  var TurndownService: typeof import('turndown');
}
