import type { default as TurndownServiceInstance } from 'turndown';

export {};

declare global {
  /**
   * TurndownService for converting HTML to Markdown.
   * @unofficial
   */
  const TurndownService: typeof TurndownServiceInstance;
}
