import type {
  EditableFileView,
  TFile
} from 'obsidian';
import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * View for rendering and interacting with PDF files.
 * @public
 * @unofficial
 */
export interface PdfView extends EditableFileView {
  /** The PDF viewer component used to render the document. */
  viewer: unknown;

  /**
   * Get the current view type.
   *
   * @returns The view type identifier.
   */
  getViewType(): typeof ViewType.Pdf;

  /**
   * Is called when the vault has a 'modify' event. Reloads the file if the modified file is the file in this view.
   *
   * @param file - The modified file.
   */
  onModify(file: TFile): void;

  /**
   * Shows the search.
   */
  showSearch(): void;
}
