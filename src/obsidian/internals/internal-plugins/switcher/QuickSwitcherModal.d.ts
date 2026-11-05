import type { App } from 'obsidian';

import type { FileSuggestModal } from '../../FileSuggestModal/FileSuggestModal.d.ts';
import type { FileSuggestModalSuggestion } from '../../FileSuggestModal/FileSuggestModalSuggestion.d.ts';
import type { SwitcherPluginOptions } from './SwitcherPluginOptions.d.ts';

/**
 * The quick switcher modal.
 *
 * Its suggestions come from {@link FileSuggestModal.getSuggestions}; it offers unresolved link text unless
 * {@link SwitcherPluginOptions.showExistingOnly} is set, non-file bookmarks, and creating a new file.
 *
 * @public
 * @unofficial
 */
export interface QuickSwitcherModal extends FileSuggestModal {
  /**
   * Constructor.
   *
   * @param app - The app.
   * @param options - The quick switcher plugin options.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor2__?(app: App, options: SwitcherPluginOptions): this;

  /**
   * Opens the chosen suggestion: a file or alias suggestion opens its file, an unresolved suggestion opens its link
   * text, a bookmark suggestion opens the bookmark, and `null` opens (creating if needed) the file named after the
   * query.
   *
   * A mod-key event opens it in a new leaf.
   *
   * @param item - The chosen suggestion, or `null` to create a new file.
   * @param evt - The event that chose it.
   */
  onChooseSuggestion(item: FileSuggestModalSuggestion | null, evt: KeyboardEvent | MouseEvent): void;
}
