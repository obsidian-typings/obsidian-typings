/** @todo Documentation incomplete */

import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStateVimPlugin } from './VimStateVimPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface VimState {
    /**
     * @todo Documentation incomplete.
     */
    vim: VimStateVim;

    /**
     * @todo Documentation incomplete.
     */
    vimPlugin: VimStateVimPlugin;
}
