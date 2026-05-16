import type { CmRange } from '../../@codemirror__state/internals/CmRange.d.ts';
import type { RangeValue } from '../../@codemirror__state/internals/RangeValue.d.ts';
import type { DecorationSet } from './DecorationSet.d.ts';
import type { LineDecorationSpec } from './LineDecorationSpec.d.ts';
import type { MarkDecorationSpec } from './MarkDecorationSpec.d.ts';
import type { ReplaceDecorationSpec } from './ReplaceDecorationSpec.d.ts';
import type { WidgetDecorationSpec } from './WidgetDecorationSpec.d.ts';

/**
 * A decoration that can be applied to an editor view.
 *
 * @public
 * @unofficial
 */
export declare abstract class Decoration extends RangeValue {
  /** An empty decoration set. */
  static none: DecorationSet;

  /** The specification used to create this decoration. */
  readonly spec: Record<string, unknown>;

  /**
   * Compare this decoration to another.
   *
   * @param other - The decoration to compare with.
   * @returns Whether the decorations are equal.
   */
  abstract eq(other: Decoration): boolean;

  /**
   * Create a line decoration.
   *
   * @param spec - The line decoration specification.
   * @returns A new line decoration.
   */
  static line(spec: LineDecorationSpec): Decoration;

  /**
   * Create a mark decoration.
   *
   * @param spec - The mark decoration specification.
   * @returns A new mark decoration.
   */
  static mark(spec: MarkDecorationSpec): Decoration;

  /**
   * Create a replace decoration.
   *
   * @param spec - The replace decoration specification.
   * @returns A new replace decoration.
   */
  static replace(spec: ReplaceDecorationSpec): Decoration;

  /**
   * Create a decoration set from an array of decorations.
   *
   * @param of - The decoration(s) to include.
   * @param sort - Whether to sort the decorations.
   * @returns A new decoration set.
   */
  static set(of: CmRange<Decoration> | CmRange<Decoration>[], sort?: boolean): DecorationSet;

  /**
   * Create a widget decoration.
   *
   * @param spec - The widget decoration specification.
   * @returns A new widget decoration.
   */
  static widget(spec: WidgetDecorationSpec): Decoration;
}
