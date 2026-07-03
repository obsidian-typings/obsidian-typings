import type {
  Editor,
  EditorSuggest,
  TFile
} from 'obsidian';

/**
 * Extended editor suggest interface for managing editor suggestion providers.
 *
 * @public
 * @unofficial
 */
export interface EditorSuggestEx {
  /**
   * Currently active and rendered editor suggestion popup.
   */
  currentSuggest?: EditorSuggest<unknown>;

  /**
   * Registered editor suggestion providers.
   */
  suggests: EditorSuggest<unknown>[];

  /**
   * Registers an editor suggestion provider.
   *
   * @param suggest - The provider to add.
   */
  addSuggest(suggest: EditorSuggest<unknown>): void;

  /**
   * Closes the active suggestion provider.
   */
  close(): void;

  /**
   * Checks whether a suggestion popup is currently shown.
   *
   * @returns Whether a suggestion is showing.
   */
  isShowingSuggestion(): boolean;

  /**
   * Unregisters an editor suggestion provider.
   *
   * @param suggest - The provider to remove.
   */
  removeSuggest(suggest: EditorSuggest<unknown>): void;

  /**
   * Repositions the active suggestion popup.
   */
  reposition(): void;

  /**
   * Sets the active suggestion provider, closing the previous one.
   *
   * @param suggest - The provider to activate, or `null` to clear.
   */
  setCurrentSuggest(suggest: EditorSuggest<unknown> | null): void;

  /**
   * Triggers the registered suggestion providers at the cursor.
   *
   * @param editor - The editor.
   * @param file - The file being edited.
   * @param force - Whether to force the suggestion popup open.
   */
  trigger(editor: Editor, file: TFile, force: boolean): void;
}
