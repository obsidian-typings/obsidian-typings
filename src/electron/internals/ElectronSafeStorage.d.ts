/**
 * Electron `safeStorage` module for encrypting and decrypting strings using OS-level cryptography.
 *
 * @public
 * @unofficial
 */
export interface ElectronSafeStorage extends NodeJS.EventEmitter {
  /**
   * Decrypts the encrypted buffer obtained with `encryptString` back into a string.
   *
   * This function will throw an error if decryption fails.
   *
   * @param encrypted - The buffer produced by `encryptString`.
   * @returns The decrypted string.
   */
  decryptString(encrypted: Buffer): string;

  /**
   * Encrypts a string using OS-level cryptography.
   *
   * This function will throw an error if encryption fails.
   *
   * @param plainText - The string to encrypt.
   * @returns A buffer of bytes representing the encrypted string.
   */
  encryptString(plainText: string): Buffer;

  /**
   * Whether encryption is available.
   *
   * On Linux, returns `true` if the app has emitted the `ready` event and the secret key is
   * available. On macOS, returns `true` if Keychain is available. On Windows, returns `true` once
   * the app has emitted the `ready` event.
   *
   * @returns `true` if string encryption is available on the current platform.
   */
  isEncryptionAvailable(): boolean;
}
