import type { VimStateVimInputState } from './VimStateVimInputState.d.ts';
import type { VimStateVimLastMotion } from './VimStateVimLastMotion.d.ts';

/**
 * Core Vim state holding mode, input state, and edit history.
 * @public
 * @unofficial
 */
export interface VimStateVim {
  /** Current input state of the Vim command parser. */
  inputState: VimStateVimInputState;

  /** Whether the editor is currently in insert mode. */
  insertMode: false;

  /** Repeat count for the current insert mode session. */
  insertModeRepeat: undefined;

  /** The last edit action command that was executed. */
  lastEditActionCommand: undefined;

  /** Input state snapshot of the last edit action. */
  lastEditInputState: undefined;

  /** Last horizontal cursor position (column). */
  lastHPos: number;

  /** Last horizontal cursor screen position. */
  lastHSPos: number;

  /** The last motion that was executed. */
  lastMotion: VimStateVimLastMotion;

  /** The last text that was pasted. */
  lastPastedText: null;

  /** The last visual selection range. */
  lastSelection: null;
}
