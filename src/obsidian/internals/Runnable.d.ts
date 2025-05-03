/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface Runnable {
    /** @todo Documentation incomplete. */
    cancelled: boolean;

    /** @todo Documentation incomplete. */
    onCancel: null | (() => void);

    /** @todo Documentation incomplete. */
    onStart: null | (() => void);

    /** @todo Documentation incomplete. */
    onStop: null | (() => void);

    /** @todo Documentation incomplete. */
    running: boolean;

    /** @todo Documentation incomplete. */
    cancel(): void;

    /** @todo Documentation incomplete. */
    isCancelled(): boolean;

    /** @todo Documentation incomplete. */
    isRunning(): boolean;

    /** @todo Documentation incomplete. */
    start(): void;

    /** @todo Documentation incomplete. */
    stop(): void;
}
