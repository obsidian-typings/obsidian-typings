export {};

declare global {
  /**
   * TurndownService for converting HTML to Markdown.
   *
   * @unofficial
   */
  var TurndownService: import('../../../turndown/internals/TurndownService/TurndownService.d.ts').TurndownService;
}
