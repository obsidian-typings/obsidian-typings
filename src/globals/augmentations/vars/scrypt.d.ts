import type { scrypt as scryptInstance } from 'scrypt-js';

export {};

declare global {
  /**
   * Scrypt key derivation function library for password-based encryption.
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link scrypt} instead.
   */
  const scrypt__: typeof scryptInstance;
}
