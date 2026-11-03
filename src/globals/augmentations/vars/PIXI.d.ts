import type { InteropPixiModule as PixiModule } from '../../../pixi.js/interop/InteropPixiModule.d.ts';

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
