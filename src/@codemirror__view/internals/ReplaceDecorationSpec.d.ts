import type { WidgetType } from '@codemirror/view';

/**
 * Specification for a replace decoration that replaces a range of text.
 *
 * @public
 * @unofficial
 */
export interface ReplaceDecorationSpec {
  /** Whether this is a block replacement. */
  block?: boolean;

  /** Whether both sides of the replacement are inclusive. */
  inclusive?: boolean;

  /** Whether the end of the replacement is inclusive. */
  inclusiveEnd?: boolean;

  /** Whether the start of the replacement is inclusive. */
  inclusiveStart?: boolean;

  /** Optional widget to display in place of the replaced text. */
  widget?: WidgetType;
}
