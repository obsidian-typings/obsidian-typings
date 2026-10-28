import type {
  Debouncer,
  FileView,
  TFile
} from 'obsidian';

/**
 * Info file view.
 *
 * @remark This is probably not the right term.
 * @public
 * @unofficial
 */
export interface InfoFileView extends FileView {
  /**
   * Debounced (10 ms) request to refresh the view's content. Called when the view's file is unloaded.
   */
  requestUpdate: Debouncer<[], void>;

  /**
   * Called when a file is opened. Loads the file and requests a content update.
   *
   * @param file - The opened file.
   */
  onFileOpen(file: TFile): void;
}
