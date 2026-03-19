export {};

declare module 'obsidian' {
  /**
   * A standard debounce export function.
   * Use this to have a time-delayed export function only be called once in a given timeframe.
   *
   * @typeParam T - The type of the arguments of the export function to debounce.
   * @typeParam V - The type of the return value of the export function to debounce.
   * @param cb - The export function to call.
   * @param timeout - The timeout to wait, in milliseconds.
   * @param resetTimer - Whether to reset the timeout when the debounce export function is called again.
   * @returns a debounced export function that takes the same parameter as the original export function.
   *
   * @example
   * ```ts
   * const debounced = debounce((text: string) => {
   *     console.log(text);
   * }, 1000, true);
   * debounced('foo'); // this will not be printed
   * await sleep(500);
   * debounced('bar'); // this will be printed to the console.
   * ```
   *
   * @official
   */

  export function debounce<T extends unknown[], V>(
    cb: (...args: [...T]) => V,
    timeout?: number,
    resetTimer?: boolean
  ): Debouncer<T, V>;
}
