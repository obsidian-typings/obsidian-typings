export {};

declare global {
  /**
   * Native Blink engine fetch, used to bypass patched fetch implementations.
   * @unofficial
   * @hidden
   */
  const blinkfetch: typeof fetch;
}
