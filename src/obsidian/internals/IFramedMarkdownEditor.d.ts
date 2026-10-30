import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';

import type { EmbeddedEditorView } from './EmbeddedEditorView.d.ts';
import type { MarkdownScrollableEditView } from './MarkdownScrollableEditView.d.ts';

/**
 * A markdown editor that runs inside an iframe, used for embedded editable views.
 *
 * @public
 * @unofficial
 */
export interface IFramedMarkdownEditor extends MarkdownScrollableEditView {
  /**
   * Function that cleans up the iframe and listeners.
   */
  cleanup: (() => void) | null;

  /**
   * Element where the editor is embedded into.
   */
  iframeEl: HTMLIFrameElement | null;

  /**
   * Executes cleanup function if exists.
   */
  cleanupIframe(): void;

  /**
   * Constructor.
   *
   * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<IFramedMarkdownEditor\>}.
   *
   * @param owner - The embedded view the editor is created in, which also controls it.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__?(owner: EmbeddedEditorView): this;

  /**
   * Constructs extensions for the editor based on user settings.
   *
   * @returns Array of dynamic CodeMirror extensions.
   * @remark Creates extension for overriding escape keymap to showPreview.
   */
  getDynamicExtensions(): Extension[];

  /**
   * Loads the iframe element and prepare cleanup function.
   */
  onIframeLoad(): void;

  /**
   * Execute cleanup of the iframe.
   */
  onunload(): void;

  /**
   * Execute functionality on CM editor state update.
   *
   * @param update - The CodeMirror view update.
   * @param changed - Whether the document content changed.
   */
  onUpdate(update: ViewUpdate, changed: boolean): void;
}
