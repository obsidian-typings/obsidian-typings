import type * as Pixi from 'pixi.js-legacy';

export {};

declare global {
  /**
   * Upstream Pixi types selected only by the explicit integration import.
   *
   * @unofficial
   */
  interface ObsidianPixiTypes {
    /** Upstream application. */
    Application: Pixi.Application;
    /** Upstream container. */
    Container: Pixi.Container;
    /** Upstream graphics. */
    Graphics: Pixi.Graphics;
    /** Upstream canvas. */
    ICanvas: Pixi.ICanvas;
    /** Upstream module namespace. */
    PixiModule: typeof import('pixi.js-legacy');
    /** Upstream text display object. */
    PixiText: Pixi.Text;
    /** Upstream sprite. */
    Sprite: Pixi.Sprite;
    /** Upstream text style. */
    TextStyle: Pixi.TextStyle;
  }
}
