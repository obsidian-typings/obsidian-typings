import type { PixiModule } from '../../../pixi.js/internals/PixiModule.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Load PixiJS and return a promise to the global PIXI object.
   * Can also use {@link Window.PIXI} after this promise resolves to get the same reference.
   *
   * PixiJS is no longer loaded at startup, so {@link Window.PIXI} stays unset until this (or a view that needs it, such as the graph) has loaded it.
   *
   * @returns A promise that resolves to the global {@link Window.PIXI} object.
   *
   * @see {@link https://pixijs.com/ Official PixiJS documentation}.
   * @unofficial
   */
  export function loadPixi(): Promise<PixiModule>;
}
