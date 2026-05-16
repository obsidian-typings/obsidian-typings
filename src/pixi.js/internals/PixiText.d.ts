import type { ICanvas } from './ICanvas.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';
import type { ITextStyle } from './ITextStyle.d.ts';
import type { Sprite } from './Sprite.d.ts';
import type { TextStyle } from './TextStyle.d.ts';

/**
 * PixiJS text display object.
 *
 * @public
 * @unofficial
 */
export declare class PixiText extends Sprite {
  /**
   * Creates a new text object.
   *
   * @param text - The text content.
   * @param style - The text style.
   * @param canvas - The canvas to render on.
   */
  constructor(text?: number | string, style?: Partial<ITextStyle> | TextStyle, canvas?: ICanvas);

  /**
   * Destroys this text object.
   *
   * @param options - Destroy options.
   */
  destroy(options?: boolean | IDestroyOptions): void;

  /** Height of the text. */
  get height(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set height(value: number);

  /** Text resolution. */
  get resolution(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set resolution(value: number);

  /** Text style. */
  get style(): TextStyle;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set style(style: Partial<ITextStyle> | TextStyle);

  /** Text content. */
  get text(): string;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set text(text: number | string);

  /**
   * Updates the text rendering.
   *
   * @param respectDirty - Whether to respect the dirty flag.
   */
  updateText(respectDirty: boolean): void;

  /** Width of the text. */
  get width(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set width(value: number);
}
