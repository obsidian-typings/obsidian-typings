import type { VimMode } from './VimMode.d.ts';
import type { VimSubMode } from './VimSubMode.d.ts';

/**
 * The payload of the `vim-mode-change` event, raised on an editor whenever its Vim mode changes.
 *
 * @public
 * @unofficial
 */
export interface VimModeChangeEvent {
  /**
   * The mode the editor has changed to.
   */
  mode: VimMode;

  /**
   * How visual mode is selecting. Only present when `mode` is `visual`.
   */
  subMode?: VimSubMode;
}
