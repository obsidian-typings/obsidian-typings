export {};

declare global {
  /**
   * Executes a function when the DOM is ready.
   *
   * @param fn - The function to execute when the DOM is ready.
   * @example
   * ```ts
   * ready(() => {
   *     console.log('DOM is ready');
   * });
   * @official
   */
  function ready(fn: () => unknown): void;
}
