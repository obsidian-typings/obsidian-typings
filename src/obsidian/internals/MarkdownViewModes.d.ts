import type {
  MarkdownEditView,
  MarkdownPreviewView
} from 'obsidian';

/**
 * Available view modes for a markdown view.
 *
 * @public
 * @unofficial
 */
export interface MarkdownViewModes {
  /** Reading/preview mode renderer. */
  preview: MarkdownPreviewView;

  /** Source/edit mode renderer. */
  source: MarkdownEditView;
}
