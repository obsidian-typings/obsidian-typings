import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStateVimPlugin } from './VimStateVimPlugin.d.ts';

/**
 * Top-level Vim state container for the editor.
 * @public
 * @unofficial
 */
export interface VimState {
  /** Core Vim mode and command state. */
  vim: VimStateVim;

  /** Vim plugin state for tracking key events. */
  vimPlugin: VimStateVimPlugin;
}
