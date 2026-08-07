import type { Bookmark } from '../Bookmark.d.ts';
import type { VimActionKeyMapping } from './VimActionKeyMapping.d.ts';
import type { VimInputState } from './VimInputState.d.ts';
import type { VimLastSelection } from './VimLastSelection.d.ts';
import type { VimMotionFn } from './VimMotionFn.d.ts';
import type { VimOption } from './VimOption.d.ts';
import type { VimSearchState } from './VimSearchState.d.ts';
import type { VimSelection } from './VimSelection.d.ts';

/**
 * Vim's state for one editor: which mode it is in, the command being typed, and everything needed to
 * repeat the last edit.
 *
 * The optional fields are absent until the feature that owns them is first used — an editor that has
 * never searched has no search state, and one that has never left visual mode has no last selection.
 *
 * @public
 * @unofficial
 */
export interface VimStateVim {
  /**
   * Whether the Ex prompt is open.
   */
  exMode?: boolean;

  /**
   * Whether the next key is taken literally, which is how `f` and `r` read their argument through a
   * langmap.
   */
  expectLiteralNext: boolean;

  /**
   * The command currently being typed.
   */
  inputState: VimInputState;

  /**
   * Where the current insertion ends, tracked so the inserted text can be found again after the
   * document changes.
   */
  insertEnd?: Bookmark;

  /**
   * Whether the editor is in insert mode.
   */
  insertMode: boolean;

  /**
   * How many times the insertion is repeated when insert mode is left, as `3i` asks for. Only set
   * while insert mode is active.
   */
  insertModeRepeat?: number;

  /**
   * Whether leaving insert mode returns to the mode it was entered from rather than to normal mode.
   */
  insertModeReturn: boolean;

  /**
   * The action command behind the last edit, replayed by `.`.
   */
  lastEditActionCommand?: VimActionKeyMapping;

  /**
   * The input state that produced the last edit, replayed by `.`.
   */
  lastEditInputState?: VimInputState;

  /**
   * The column the cursor should return to when moving between lines shorter than it.
   */
  lastHPos: number;

  /**
   * The screen column the cursor should return to, which is what `gj` and `gk` move by.
   */
  lastHSPos: number;

  /**
   * The motion that ran last, cleared as soon as a non-motion command runs.
   */
  lastMotion: null | VimMotionFn;

  /**
   * The text pasted last, so a following paste can find what it replaced.
   */
  lastPastedText: null | string;

  /**
   * The visual selection as it was when visual mode was last left, restored by `gv`.
   */
  lastSelection: null | VimLastSelection;

  /**
   * The marks set in this editor, keyed by their one-character name.
   */
  marks: Record<string, Bookmark>;

  /**
   * The options set for this editor only, which override the global ones.
   */
  options: Record<string, VimOption>;

  /**
   * The search state for this editor. Absent until the first search.
   */
  searchState_?: VimSearchState;

  /**
   * The selection Vim is maintaining, which is empty until the first motion runs.
   */
  sel: VimSelection;

  /**
   * The key sequence shown in the status area while a command is being typed.
   */
  status?: string;

  /**
   * Whether the editor is in visual block mode. No effect unless `visualMode` is set.
   */
  visualBlock: boolean;

  /**
   * Whether the editor is in visual line mode. No effect unless `visualMode` is set.
   */
  visualLine: boolean;

  /**
   * Whether the editor is in visual mode.
   */
  visualMode: boolean;

  /**
   * Whether the selection that visual mode was just left from was a block, which operators consult
   * after the mode has already been left.
   */
  wasInVisualBlock?: boolean;

  /**
   * The paste handler installed on the editor's input field while Vim mode is on.
   */
  onPasteFn?(): void;
}
