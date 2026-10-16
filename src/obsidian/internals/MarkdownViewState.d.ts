import type { MarkdownViewModeType } from 'obsidian';

/**
 * State of a markdown view, as returned by `MarkdownView.getState()`.
 *
 * @public
 * @unofficial
 */
export interface MarkdownViewState extends Record<string, unknown> {
  /**
   * State of the embedded backlinks component, present only while it is shown.
   */
  backlinkOpts?: unknown;

  /**
   * Whether the embedded backlinks are shown.
   */
  backlinks: boolean;

  /**
   * Path of the file in the view, absent when no file is open.
   */
  file?: string;

  /**
   * Current mode of the view.
   */
  mode: MarkdownViewModeType;

  /**
   * Whether the editor is in source mode rather than live preview.
   */
  source: boolean;
}
