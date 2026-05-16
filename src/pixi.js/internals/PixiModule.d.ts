import type { Application } from './Application.d.ts';
import type { Container } from './Container.d.ts';
import type { DisplayObject } from './DisplayObject.d.ts';
import type { Graphics } from './Graphics.d.ts';
import type { GraphicsGeometry } from './GraphicsGeometry.d.ts';
import type { Matrix } from './Matrix.d.ts';
import type { ObservablePoint } from './ObservablePoint.d.ts';
import type { PixiRectangle } from './PixiRectangle.d.ts';
import type { PixiText } from './PixiText.d.ts';
import type { Sprite } from './Sprite.d.ts';
import type { TextStyle } from './TextStyle.d.ts';
import type { Texture } from './Texture.d.ts';
import type { Transform } from './Transform.d.ts';

/**
 * The PixiJS library module type, representing the `window.PIXI` object.
 *
 * @public
 * @unofficial
 */
export interface PixiModule {
  /** PixiJS application constructor. */
  Application: typeof Application;
  /** Container constructor. */
  Container: typeof Container;
  /** Display object constructor. */
  DisplayObject: typeof DisplayObject;
  /** Graphics constructor. */
  Graphics: typeof Graphics;
  /** Graphics geometry constructor. */
  GraphicsGeometry: typeof GraphicsGeometry;
  /** 2D transformation matrix constructor. */
  Matrix: typeof Matrix;
  /** Observable point constructor. */
  ObservablePoint: typeof ObservablePoint;
  /** Rectangle constructor. */
  Rectangle: typeof PixiRectangle;
  /** Sprite constructor. */
  Sprite: typeof Sprite;
  /** PixiJS text display object constructor. */
  Text: typeof PixiText;
  /** Text style constructor. */
  TextStyle: typeof TextStyle;
  /** Texture resource. */
  Texture: typeof Texture;
  /** Transform constructor. */
  Transform: typeof Transform;
}
