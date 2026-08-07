import type { VimStateVim } from '../../@codemirror__view/internals/vim/VimStateVim.d.ts';

/**
 * The state of a CM5 editor.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorState {
  /** The Vim mode state, if Vim mode is enabled. */
  vim?: VimStateVim;
}
