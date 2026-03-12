export {};

declare global {
  /**
   * TurndownService for converting HTML to Markdown.
   * @unofficial
   */
  const TurndownService: typeof import('turndown');
}
