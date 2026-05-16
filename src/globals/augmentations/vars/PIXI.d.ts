import type { PixiModule } from '../../../pixi.js/internals/PixiModule.d.ts';

export {};

declare global {
  /**
   * PixiJS library for 2D rendering (used for canvas views).
   *
   * @unofficial
   */
  var PIXI: PixiModule;
}
