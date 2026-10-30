import type { MarkdownFileInfo } from 'obsidian';

/**
 * Controller of a {@link MarkdownScrollableEditView}.
 *
 * @public
 * @unofficial
 */
export interface MarkdownScrollableEditViewOwner extends MarkdownFileInfo {
  /**
   * Called by the editor each time it scrolls.
   *
   * @remark {@link MarkdownScrollableEditView.handleScroll} calls it unconditionally, so an owner without it throws on the first scroll.
   */
  syncScroll(): void;
}
