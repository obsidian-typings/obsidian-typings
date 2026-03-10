import type { EditorState } from '@codemirror/state';
import type {
  App,
  Component,
  HoverPopover,
  MarkdownPreviewView,
  TFile
} from 'obsidian';

import type { IFramedMarkdownEditor } from './IFramedMarkdownEditor.d.ts';

/**
 * View for an embedded markdown editor, supporting preview and edit modes.
 * @public
 * @unofficial
 */
export interface EmbeddedEditorView extends Component {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Container element for the embedded view.
   */
  containerEl: HTMLElement;

  /**
   * Whether the view is currently saving.
   */
  dirty: boolean;

  /**
   * Whether the editor may be edited.
   *
   * @remark Fun fact, setting this to `true` and calling showEditor() for embedded MD views, allows them to be edited.
   *          Though the experience is a little buggy.
   */
  editable: boolean;

  /**
   * Editor component of the view.
   */
  editMode?: IFramedMarkdownEditor | undefined;

  /**
   * Container in which the editor is embedded.
   */
  editorEl: HTMLElement;

  /**
   * File to which the view is attached.
   */
  file: null | TFile;

  /**
   * Hover element container.
   */
  hoverPopover: HoverPopover | null;

  /**
   * Element containing the preview for the embedded markdown.
   */
  previewEl: HTMLElement;

  /**
   * Preview component of the view.
   */
  previewMode: MarkdownPreviewView;

  /**
   * Current state of the editor.
   */
  state: unknown;

  /**
   * Text contents being embedded.
   */
  text: string;

  /**
   * Whether the view renders contents using an iFrame.
   */
  useIframe: boolean;

  /**
   * Destroy edit component editor and save contents if specified.
   *
   * @param save - Whether to save before destroying.
   */
  destroyEditor(save?: boolean): void;

  /**
   * Get the preview editor, if exists.
   *
   * @returns The iframed markdown editor, or `null`.
   */
  get editor(): IFramedMarkdownEditor | null;

  /**
   * Gets currently active mode (editMode returns 'source').
   *
   * @returns The current view mode.
   */
  getMode(): 'preview' | 'source';

  /**
   * On load of editor, show preview.
   */
  onload(): void;

  /**
   * Trigger markdown scroll on workspace.
   */
  onMarkdownScroll(): void;

  /**
   * On unload of editor, destroy editor and unset workspace activeEditor.
   */
  onunload(): void;

  /**
   * Get the path to the file, if any file registered.
   *
   * @returns The file path.
   */
  get path(): string;

  /**
   * Debounced save of contents.
   */
  requestSave(): void;

  /**
   * Debounced save of editor folds.
   */
  requestSaveFolds(): void;

  /**
   * Set file contents.
   *
   * @param data - Content to save.
   * @param save - Whether to persist to disk.
   */
  save(data: string, save?: boolean): void;

  /**
   * Get the scroll of the file renderer component.
   *
   * @returns The scroll position.
   */
  get scroll(): unknown;

  /**
   * Set the state of the editor.
   *
   * @param data - Document content to set.
   * @param clear - Whether to clear existing state.
   */
  set(data: string, clear: boolean): void;

  /**
   * Reveal the editor if editable widget and applies saved state.
   */
  showEditor(): void;

  /**
   * Reveal preview mode and destroy editor, save if specified.
   *
   * @param save - Whether to save before switching to preview.
   */
  showPreview(save?: boolean): void;

  /**
   * Reveal search component in file renderer component.
   *
   * @param replace - Whether to show the replace input.
   */
  showSearch(replace?: boolean): void;

  /**
   * Toggle between edit and preview mode.
   */
  toggleMode(): void;
}
