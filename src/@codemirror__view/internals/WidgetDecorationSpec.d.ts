import type { WidgetType } from './WidgetType.d.ts';

/**
 * Specification for a widget decoration that inserts a widget at a position.
 *
 * @public
 * @unofficial
 */
export interface WidgetDecorationSpec {
  /** Whether this is a block widget. */
  block?: boolean;

  /** Which side of the position the widget is on. */
  side?: number;

  /** The widget to display. */
  widget: WidgetType;
}
