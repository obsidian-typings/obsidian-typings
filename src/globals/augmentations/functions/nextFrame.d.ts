export {};

declare global {
  /**
   * Waits for the next frame.
   *
   * @returns A promise that resolves after the next frame.
   * @example
   * ```ts
   * await nextFrame();
   * ```
   * @official
   */
  function nextFrame(): Promise<void>;
}
