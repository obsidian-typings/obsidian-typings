/**
 * Vim plugin state tracking the last keydown event.
 *
 * @public
 * @unofficial
 */
export interface VimStateVimPlugin {
  /** The last keydown event key string. */
  lastKeydown: string;
}
