import type { PixiModule } from '../../../pixi.js/internals/PixiModule.d.ts';

export {};

declare global {
  /**
   * PixiJS library for 2D rendering (used for the graph view).
   *
   * Not loaded at startup: unset until {@link obsidian#loadPixi} (or a view that needs it) has loaded it.
   *
   * @unofficial
   */
  var PIXI: PixiModule | undefined;
}
