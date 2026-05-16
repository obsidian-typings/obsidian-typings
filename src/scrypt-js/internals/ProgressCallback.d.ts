/**
 * Callback function invoked during scrypt key derivation to report progress.
 *
 * @public
 * @unofficial
 */
export type ProgressCallback = (progress: number) => boolean | void;
