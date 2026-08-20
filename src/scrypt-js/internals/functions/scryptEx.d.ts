import type { ProgressCallback } from '../ProgressCallback.d.ts';

/**
 * Derive a key using the scrypt key derivation function.
 *
 * @param password - The password to derive from.
 * @param salt - The salt value.
 * @param N - CPU/memory cost parameter.
 * @param r - Block size parameter.
 * @param p - Parallelization parameter.
 * @param dkLen - Desired key length in bytes.
 * @param callback - Optional progress callback.
 * @returns A promise that resolves to the derived key.
 * @public
 * @unofficial
 */
export declare function scryptEx(
  password: ArrayLike<number>,
  salt: ArrayLike<number>,
  N: number,
  r: number,
  p: number,
  dkLen: number,
  callback?: ProgressCallback
): Promise<Uint8Array>;
