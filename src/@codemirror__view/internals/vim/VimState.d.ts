import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStateVimPlugin } from './VimStateVimPlugin.d.ts';

/**
 * The state bag hanging off a CM5 editor adapter, which is where the Vim layer keeps everything it
 * associates with that editor.
 *
 * @public
 * @unofficial
 */
export interface VimState {
  /**
   * Whether typing replaces the character under the cursor rather than inserting before it.
   */
  overwrite?: boolean;

  /**
   * Vim's mode and command state for this editor.
   */
  vim: VimStateVim;

  /**
   * Vim plugin state for tracking key events.
   */
  vimPlugin: VimStateVimPlugin;

  /**
   * Dismiss the notification the Vim layer is currently showing. Only present while one is showing.
   */
  closeVimNotification?(): void;
}
