import type { VimHistoryController } from './VimHistoryController.d.ts';
import type { VimJumpList } from './VimJumpList.d.ts';
import type { VimLastCharacterSearch } from './VimLastCharacterSearch.d.ts';
import type { VimMacroModeState } from './VimMacroModeState.d.ts';
import type { VimRegisterController } from './VimRegisterController.d.ts';

/**
 * The Vim state shared by every editor: registers, macros, search and command history, and the jump
 * list.
 *
 * @public
 * @unofficial
 */
export interface VimGlobalState {
  /**
   * The history of the Ex command prompt.
   */
  exCommandHistoryController: VimHistoryController;

  /**
   * Whether the active search runs towards the start of the document. Read and written through the
   * per-editor search state.
   */
  isReversed?: boolean;

  /**
   * The ring buffer of positions jumped from.
   */
  jumpList: VimJumpList;

  /**
   * The most recent character search, so `;` and `,` can repeat it.
   */
  lastCharacterSearch: VimLastCharacterSearch;

  /**
   * The replacement text of the last `:substitute`, so a later one can reuse it.
   */
  lastSubstituteReplacePart: string | undefined;

  /**
   * Macro recording and playback state.
   */
  macroModeState: VimMacroModeState;

  /**
   * The active search query. Read and written through the per-editor search state.
   */
  query?: null | RegExp;

  /**
   * Every register, and the routing that decides which one an operator uses.
   */
  registerController: VimRegisterController;

  /**
   * The history of the search prompt.
   */
  searchHistoryController: VimHistoryController;

  /**
   * Whether the last search ran towards the start of the document.
   */
  searchIsReversed: boolean;

  /**
   * The query the last search ran with, or `null` when nothing has been searched for yet.
   */
  searchQuery: null | RegExp;
}
