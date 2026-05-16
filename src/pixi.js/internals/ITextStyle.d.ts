import type { TEXT_GRADIENT } from './TEXT_GRADIENT.d.ts';
import type { TextStyleAlign } from './TextStyleAlign.d.ts';
import type { TextStyleFill } from './TextStyleFill.d.ts';
import type { TextStyleFontStyle } from './TextStyleFontStyle.d.ts';
import type { TextStyleFontVariant } from './TextStyleFontVariant.d.ts';
import type { TextStyleFontWeight } from './TextStyleFontWeight.d.ts';
import type { TextStyleLineJoin } from './TextStyleLineJoin.d.ts';
import type { TextStyleTextBaseline } from './TextStyleTextBaseline.d.ts';
import type { TextStyleWhiteSpace } from './TextStyleWhiteSpace.d.ts';

/**
 * Text style interface.
 *
 * @public
 * @unofficial
 */
export interface ITextStyle {
  /** Text alignment. */
  align: TextStyleAlign;

  /** Whether to break words. */
  breakWords: boolean;

  /** Whether to show a drop shadow. */
  dropShadow: boolean;

  /** Drop shadow alpha. */
  dropShadowAlpha: number;

  /** Drop shadow angle in radians. */
  dropShadowAngle: number;

  /** Drop shadow blur radius. */
  dropShadowBlur: number;

  /** Drop shadow color. */
  dropShadowColor: number | string;

  /** Drop shadow distance. */
  dropShadowDistance: number;

  /** Fill style for the text. */
  fill: TextStyleFill;

  /** Fill gradient stops. */
  fillGradientStops: number[];

  /** Fill gradient type. */
  fillGradientType: TEXT_GRADIENT;

  /** Font family. */
  fontFamily: string | string[];

  /** Font size. */
  fontSize: number | string;

  /** Font style. */
  fontStyle: TextStyleFontStyle;

  /** Font variant. */
  fontVariant: TextStyleFontVariant;

  /** Font weight. */
  fontWeight: TextStyleFontWeight;

  /** Leading between lines. */
  leading: number;

  /** Letter spacing. */
  letterSpacing: number;

  /** Line height. */
  lineHeight: number;

  /** Line join style. */
  lineJoin: TextStyleLineJoin;

  /** Miter limit. */
  miterLimit: number;

  /** Padding around the text. */
  padding: number;

  /** Stroke color. */
  stroke: number | string;

  /** Stroke thickness. */
  strokeThickness: number;

  /** Text baseline. */
  textBaseline: TextStyleTextBaseline;

  /** Whether to trim whitespace. */
  trim: boolean;

  /** White space handling. */
  whiteSpace: TextStyleWhiteSpace;

  /** Whether to word wrap. */
  wordWrap: boolean;

  /** Word wrap width. */
  wordWrapWidth: number;
}
