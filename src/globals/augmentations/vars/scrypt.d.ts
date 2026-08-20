import type { scryptEx } from '../../../scrypt-js/internals/functions/scryptEx.d.ts';

export {};

declare global {
  /**
   * Scrypt key derivation function library for password-based encryption.
   *
   * @unofficial
   */
  var scrypt: typeof scryptEx;
}
