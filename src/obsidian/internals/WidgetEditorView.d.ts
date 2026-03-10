import type {
  CachedMetadata,
  Scope,
  TAbstractFile,
  TFile
} from 'obsidian';

import type { EmbeddedEditorView } from './EmbeddedEditorView.d.ts';
import type { FoldInfo } from './FoldInfo.d.ts';

/**
 * Editable widget view for embedded file sections (headings, blocks) within the editor.
 * @public
 * @unofficial
 */
export interface WidgetEditorView extends EmbeddedEditorView {
  /**
   * Data after reference.
   */
  after: string;

  /**
   * Data before reference.
   */
  before: string;

  /**
   * Full file contents.
   */
  data: string;

  /**
   * File being currently renamed.
   */
  fileBeingRenamed: null | TFile;

  /**
   * Current heading.
   */
  heading: string;

  /**
   * Indent.
   */
  indent: string;

  /**
   * Inline title element.
   */
  inlineTitleEl: HTMLElement;

  /**
   * Full inline content string.
   */
  lastSavedData: null | string;

  /**
   * Whether embedding should be saved twice on save.
   */
  saveAgain: boolean;

  /**
   * Whether the widget is currently saving.
   */
  saving: boolean;

  /**
   * Subpath reference of the path.
   */
  subpath: string;

  /**
   * Whether the subpath was not found in the cache.
   */
  subpathNotFound: boolean;

  /**
   * Push/pop current scope.
   *
   * @param scope - Scope to apply.
   */
  applyScope(scope: Scope): void;

  /**
   * Get the current folds of the editor.
   *
   * @returns Current fold information, or `null`.
   */
  getFoldInfo(): FoldInfo | null;

  /**
   * Splice incoming data at according to subpath for correct reference, then update heading and render.
   *
   * @param data - File contents.
   * @param cache - Cached metadata for the file.
   */
  loadContents(data: string, cache: CachedMetadata): void;

  /**
   * Load file from cache based on stored path.
   *
   * @returns A promise that resolves when the file has been loaded.
   */
  loadFile(): Promise<void>;

  /**
   * Load file and check if data is different from last saved data, then loads contents.
   *
   * @param data - File contents.
   * @param cache - Cached metadata for the file.
   */
  loadFileInternal(data: string, cache?: CachedMetadata): void;

  /**
   * Update representation on file finished updating.
   *
   * @param file - The changed file.
   * @param data - New file contents.
   * @param cache - Updated cached metadata.
   */
  onFileChanged(file: TFile, data: string, cache: CachedMetadata): void;

  /**
   * Update representation on file rename.
   *
   * @param file - The renamed file.
   * @param oldPath - Previous file path.
   */
  onFileRename(file: TAbstractFile, oldPath: string): void;

  /**
   * On loading widget, register vault change and rename events.
   */
  onload(): void;

  /**
   * Save fold made in the editor to foldManager.
   */
  onMarkdownFold(): void;

  /**
   * On change of editor title element.
   *
   * @param element - The title element.
   */
  onTitleChange(element: HTMLElement): void;

  /**
   * On keypress on editor title element.
   *
   * @param event - The keyboard event.
   */
  onTitleKeydown(event: KeyboardEvent): void;

  /**
   * On pasting on editor title element.
   *
   * @param element - The title element.
   * @param event - The clipboard event.
   */
  onTitlePaste(element: HTMLElement, event: ClipboardEvent): void;

  /**
   * On unloading widget, unload component and remove scope.
   */
  onunload(): void;

  /**
   * Save changes made in editable widget.
   *
   * @param data - Data to save.
   * @param delayed - Whether to delay the save.
   * @returns A promise that resolves when the data has been saved.
   */
  save(data: string, delayed?: boolean): Promise<void>;

  /**
   * On blur widget, save title.
   *
   * @param element - The title element.
   */
  saveTitle(element: HTMLElement): void;

  /**
   * Show preview of widget.
   *
   * @param show - Whether to show or hide the preview.
   */
  showPreview(show?: boolean): void;
}
