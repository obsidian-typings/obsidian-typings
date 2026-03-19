export {};

declare global {
  /**
   * Native Blink engine fetch, used to bypass patched fetch implementations.
   *
   * @unofficial
   */
  var blinkfetch: typeof fetch;
}
