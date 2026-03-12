import type {
  App,
  HoverParent
} from 'obsidian';

/**
 * Information about the DOM events handlers.
 *
 * @public
 * @unofficial
 */
export interface DomEventsHandlersInfo extends HoverParent {
  /**
   * Obsidian app instance.
   */
  app: App;

  /**
   * The path to calculate relative links from.
   */
  path: string;
}
