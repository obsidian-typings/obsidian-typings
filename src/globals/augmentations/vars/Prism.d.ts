import type { PrismModule } from '../../../prismjs/internals/PrismModule.d.ts';

export {};

declare global {
  /**
   * Prism.js syntax highlighting library instance.
   *
   * @unofficial
   */
  var Prism: PrismModule;
}
