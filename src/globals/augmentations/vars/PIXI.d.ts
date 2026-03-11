import type { default as PIXIInstance } from 'pixi.js';

export {};

declare global {
  /**
   * PixiJS library for 2D rendering (used for canvas views).
   * @unofficial
   */
  const PIXI: typeof PIXIInstance;
}
