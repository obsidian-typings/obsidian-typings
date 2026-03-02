import type { VimState } from './VimState.d.ts';

/**
 * Wrapper around an editor instance providing access to Vim state.
 * @public
 * @unofficial
 */
export interface VimEditor {
    /** The Vim state associated with this editor. */
    state: VimState;
}
