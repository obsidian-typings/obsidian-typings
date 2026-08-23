import type { scryptEx } from './functions/scryptEx.d.ts';

/**
 * The scrypt-js library module type, representing the `window.scrypt` object.
 *
 * @public
 * @unofficial
 */
export interface ScryptModule {
  /** Derives a key asynchronously, yielding to the event loop while it works. */
  scrypt: typeof scryptEx;

  /**
   * Derives a key synchronously, blocking until it is done.
   *
   * @param password - The password to derive from.
   * @param salt - The salt value.
   * @param N - CPU/memory cost parameter.
   * @param r - Block size parameter.
   * @param p - Parallelization parameter.
   * @param dkLen - Desired key length in bytes.
   * @returns The derived key.
   */
  syncScrypt(password: ArrayLike<number>, salt: ArrayLike<number>, N: number, r: number, p: number, dkLen: number): Uint8Array;
}
