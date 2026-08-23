import type { ScryptModule } from '../../../scrypt-js/internals/ScryptModule.d.ts';

export {};

declare global {
  /**
   * Scrypt key derivation function library for password-based encryption.
   *
   * @unofficial
   */
  var scrypt: ScryptModule;
}
