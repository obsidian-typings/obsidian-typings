export {};

declare global {
  /**
   * Sleeps for a given number of milliseconds.
   *
   * @param ms - The number of milliseconds to sleep.
   * @returns A promise that resolves after the given number of milliseconds.
   * @example
   * ```ts
   * await sleep(1000);
   * ```
   * @official
   */
  function sleep(ms: number): Promise<void>;
}
