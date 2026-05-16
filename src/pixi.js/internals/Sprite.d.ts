import type { ColorSource } from './ColorSource.d.ts';
import type { Container } from './Container.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';
import type { IPointData } from './IPointData.d.ts';
import type { ObservablePoint } from './ObservablePoint.d.ts';
import type { SpriteSource } from './SpriteSource.d.ts';
import type { Texture } from './Texture.d.ts';

/**
 * Sprite display object.
 *
 * @public
 * @unofficial
 */
export declare class Sprite extends Container {
  /**
   * Creates a new sprite.
   *
   * @param texture - The texture to use.
   */
  constructor(texture?: Texture);

  /** Anchor point. */
  get anchor(): ObservablePoint;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set anchor(value: IPointData);

  /**
   * Destroys this sprite.
   *
   * @param options - Destroy options.
   */
  destroy(options?: boolean | IDestroyOptions): void;

  /**
   * Creates a sprite from the given source.
   *
   * @param source - The sprite source.
   * @returns The created sprite.
   */
  static from(source: SpriteSource): Sprite;

  /** Height of the sprite. */
  get height(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set height(value: number);

  /** Texture of the sprite. */
  get texture(): Texture;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set texture(value: Texture);

  /** Tint color. */
  get tint(): ColorSource;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set tint(value: ColorSource);

  /** Width of the sprite. */
  get width(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set width(value: number);
}
