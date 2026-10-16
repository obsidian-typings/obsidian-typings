import type { AbstractInputSuggest } from 'obsidian';

import type { FileSuggestManager } from '../FileSuggestManager.d.ts';
import type { PropertyRenderContext } from '../PropertyRenderContext.d.ts';
import type { PropertyValueSuggestItem } from './PropertyValueSuggestItem.d.ts';

/**
 * Suggest attached to the value input of a `text` or `multitext` property, offering the values the property already
 * holds across the vault, or links once the value starts with `[[`.
 *
 * @public
 * @unofficial
 */
export interface PropertyValueSuggest extends AbstractInputSuggest<PropertyValueSuggestItem> {
  /**
   * Render context of the property widget the suggest belongs to.
   */
  context: PropertyRenderContext;

  /**
   * The contenteditable value input.
   */
  inputEl: HTMLDivElement;

  /**
   * Element holding the keyboard instructions shown under the suggestions.
   */
  instructionsEl: HTMLDivElement;

  /**
   * Manager providing the link suggestions.
   */
  manager: FileSuggestManager;

  /**
   * Path of the file whose property is edited.
   */
  sourcePath: string;

  /**
   * Get the link query: the text between the opening `[[` and the closing `]]` or the caret, whichever comes first.
   *
   * @param text - Text of the value input.
   * @returns The link query.
   */
  getLinktextQuery(text: string): string;

  /**
   * Get the suggestions for the query.
   *
   * @param query - The query.
   * @returns The suggestions.
   */
  getSuggestions__?(query: string): Promise<PropertyValueSuggestItem[]>;

  /**
   * Called with the value to commit when a suggestion is chosen.
   *
   * @param value - The value to commit.
   * @param evt - The event that chose the suggestion.
   */
  onSelectLink(value: string, evt: KeyboardEvent | MouseEvent): void;

  /**
   * Render a suggestion.
   *
   * @param value - The suggestion.
   * @param el - The element to render into.
   */
  renderSuggestion__?(value: PropertyValueSuggestItem, el: HTMLElement): void;

  /**
   * Commit a suggestion, or the typed value when `value` is `null` (Shift+Enter).
   *
   * @param value - The suggestion, or `null` for the typed value.
   * @param evt - The event that chose the suggestion.
   */
  selectSuggestion(value: null | PropertyValueSuggestItem, evt: KeyboardEvent | MouseEvent): void;

  /**
   * Filter applied to every suggestion, set by the `multitext` widget to hide values the property already lists.
   *
   * @param value - The suggestion.
   * @returns Whether to keep the suggestion.
   */
  suggestionFilter?(value: PropertyValueSuggestItem): boolean;

  /**
   * Refresh the keyboard instructions.
   *
   * @param isLink - Whether to include the link suggester's instructions.
   */
  updateInstructions(isLink: boolean): void;
}
