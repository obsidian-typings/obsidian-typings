import type { default as PrismInstance } from 'prismjs';

export {};

declare global {
  /**
   * Prism.js syntax highlighting library instance.
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link Prism} instead.
   */
  const Prism__: typeof PrismInstance;
}
