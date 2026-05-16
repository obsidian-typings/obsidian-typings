import type { PrismModule } from '../../../prismjs/internals/PrismModule.d.ts';

export {};

declare global {
  /**
   * Prism.js syntax highlighting library instance.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link Prism} instead.
   */
  var Prism__: PrismModule;
}
