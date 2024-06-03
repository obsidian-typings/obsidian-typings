/** @todo Documentation incomplete */
interface Runnable {
    cancelled: boolean;
    onCancel: null | (() => void);
    onStart: null | (() => void);
    onStop: null | (() => void);
    running: boolean;

    cancel(): void;
    isCancelled(): boolean;
    isRunning(): boolean;
    start(): void;
    stop(): void;
}
