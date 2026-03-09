import type {
  App,
  EditorSuggest,
  TFile
} from 'obsidian';
import type {
  getEditorSuggestsConstructor
} from '../implementations/constructors/internals/getEditorSuggestsConstructor.d.ts';
import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';

/**
 * Manager for editor suggestion popups providing autocompletion in the editor.
 * @public
 * @unofficial
 */
export interface EditorSuggests {
  /**
   * Currently active and rendered editor suggestion popup.
   */
  currentSuggest: null | EditorSuggest<unknown>;

  /**
   * Registered editor suggestions.
   *
   * @remark Used for providing autocompletions for specific strings.
   * @tutorial Reference official documentation under EditorSuggest<T> for usage.
   */
  suggests: EditorSuggest<unknown>[];

  /**
   * Add a new editor suggestion to the list of registered suggestion providers.
   *
   * @param suggest - Suggestion provider to add.
   */
  addSuggest(suggest: EditorSuggest<unknown>): void;

  /**
   * Close the currently active editor suggestion popup.
   */
  close(): void;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getEditorSuggestsConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App): this;

  /**
   * Whether there is a editor suggestion popup active and visible.
   *
   * @returns Whether a suggestion popup is visible.
   */
  isShowingSuggestion(): boolean;

  /**
   * Remove a registered editor suggestion from the list of registered suggestion providers.
   *
   * @param suggest - Suggestion provider to remove.
   */
  removeSuggest(suggest: EditorSuggest<unknown>): void;

  /**
   * Update position of currently active and rendered editor suggestion popup.
   */
  reposition(): void;

  /**
   * Set the currently active editor suggestion popup to specified suggester.
   *
   * @param suggest - Suggestion provider to activate.
   */
  setCurrentSuggest(suggest: EditorSuggest<unknown>): void;

  /**
   * Run check on focused editor to see whether a suggestion should be triggered and rendered.
   *
   * @param editor - The editor view.
   * @param t - The file being edited.
   * @param n - Whether to force trigger.
   */
  trigger(editor: MarkdownBaseView, t: TFile, n: boolean): void;
}
