/** @todo Documentation incomplete */

import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStateVimPlugin } from './VimStateVimPlugin.d.ts';

/** @public */
export interface VimState {
    vim: VimStateVim;
    vimPlugin: VimStateVimPlugin;
}
