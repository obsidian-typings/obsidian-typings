import type { EditorView } from './EditorView.d.ts';

/**
 * The base class for widgets that can be added to the editor as decorations.
 *
 * @public
 * @unofficial
 */
export declare abstract class WidgetType {
  /**
   * Destroy the widget's DOM representation.
   *
   * @param dom - The DOM element to destroy.
   */
  destroy(dom: HTMLElement): void;

  /**
   * Compare this widget to another of the same type.
   *
   * @param widget - The widget to compare with.
   * @returns Whether the widgets are equivalent.
   */
  eq(widget: WidgetType): boolean;

  /** The estimated height of this widget in pixels. */
  get estimatedHeight(): number;

  /**
   * Determine whether the widget should ignore the given event.
   *
   * @param event - The event to check.
   * @returns Whether the event should be ignored.
   */
  ignoreEvent(event: Event): boolean;

  /** The number of line breaks this widget introduces. */
  get lineBreaks(): number;

  /**
   * Create the DOM representation of this widget.
   *
   * @param view - The editor view.
   * @returns The DOM element for this widget.
   */
  abstract toDOM(view: EditorView): HTMLElement;

  /**
   * Update the DOM representation of this widget.
   *
   * @param dom - The existing DOM element.
   * @param view - The editor view.
   * @returns Whether the update was successful.
   */
  updateDOM(dom: HTMLElement, view: EditorView): boolean;
}
