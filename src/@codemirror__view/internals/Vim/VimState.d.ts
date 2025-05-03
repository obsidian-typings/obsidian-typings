/** @todo Documentation incomplete */

import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStateVimPlugin } from './VimStateVimPlugin.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface VimState {
    /** @todo Documentation incomplete. */
    vim: VimStateVim;

    /** @todo Documentation incomplete. */
    vimPlugin: VimStateVimPlugin;
}
