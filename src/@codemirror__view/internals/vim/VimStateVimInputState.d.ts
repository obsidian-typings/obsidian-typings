/**
 * Tracks the current input state of the Vim command parser.
 * @public
 * @unofficial
 */
export interface VimStateVimInputState {
    /** Queue of pending changes to apply. */
    changeQueue: null;

    /** Buffer of keys pressed for the current command sequence. */
    keyBuffer: [];

    /** Current pending motion command. */
    motion: null;

    /** Arguments for the current pending motion. */
    motionArgs: null;

    /** Repeat count for the current motion. */
    motionRepeat: [];

    /** Current pending operator command. */
    operator: null;

    /** Arguments for the current pending operator. */
    operatorArgs: null;

    /** Prefix repeat count for the current command. */
    prefixRepeat: [];

    /** Name of the currently specified register. */
    registerName: null;
}
