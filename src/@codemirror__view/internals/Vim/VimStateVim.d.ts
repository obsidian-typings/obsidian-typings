import type { VimStateVimInputState } from './VimStateVimInputState.d.ts';
import type { VimStateVimLastMotion } from './VimStateVimLastMotion.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface VimStateVim {
    /** @todo Documentation incomplete. */
    inputState: VimStateVimInputState;

    /** @todo Documentation incomplete. */
    insertMode: false;

    /** @todo Documentation incomplete. */
    insertModeRepeat: undefined;

    /** @todo Documentation incomplete. */
    lastEditActionCommand: undefined;

    /** @todo Documentation incomplete. */
    lastEditInputState: undefined;

    /** @todo Documentation incomplete. */
    lastHPos: number;

    /** @todo Documentation incomplete. */
    lastHSPos: number;

    /** @todo Documentation incomplete. */
    lastMotion: VimStateVimLastMotion;

    /** @todo Documentation incomplete. */
    lastPastedText: null;

    /** @todo Documentation incomplete. */
    lastSelection: null;
}
