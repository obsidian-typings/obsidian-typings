import type { VimStateVimInputState } from './VimStateVimInputState.d.ts';
import type { VimStateVimLastMotion } from './VimStateVimLastMotion.d.ts';

/** @public */
export interface VimStateVim {
    inputState: VimStateVimInputState;
    insertMode: false;
    insertModeRepeat: undefined;
    lastEditActionCommand: undefined;
    lastEditInputState: undefined;
    lastHPos: number;
    lastHSPos: number;
    lastMotion: VimStateVimLastMotion;
    lastPastedText: null;
    lastSelection: null;
}
