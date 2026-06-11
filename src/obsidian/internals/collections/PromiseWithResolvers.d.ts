/**
 * A promise bundled with its `resolve` and `reject` callbacks, as returned by `Promise.withResolvers()`.
 *
 * Mirrors the ES2024 `PromiseWithResolvers` global so the typings stay consumable when the consumer's `lib` only targets ES2022 (e.g. the minimum supported Obsidian installer, which runs on Node 16).
 *
 * @typeParam T - The type the promise resolves to.
 * @public
 * @unofficial
 */
export interface PromiseWithResolvers<T> {
  /**
   * The pending promise.
   */
  promise: Promise<T>;

  /**
   * Rejects {@link PromiseWithResolvers.promise}.
   *
   * @param reason - The rejection reason.
   */
  reject(reason?: unknown): void;

  /**
   * Resolves {@link PromiseWithResolvers.promise}.
   *
   * @param value - The resolution value.
   */
  resolve(value: PromiseLike<T> | T): void;
}
