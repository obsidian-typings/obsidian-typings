import type {
  EditorView,
  WidgetType
} from '@codemirror/view';

import type { EmbedAction } from './EmbedAction.d.ts';

/**
 * Base class Obsidian puts between its own block widgets and the CodeMirror {@link @codemirror/view#WidgetType}.
 *
 * Tracks the document range the widget stands for, owns the widget's container element, and provides
 * the shared action-bar, click-forwarding and resize plumbing used by embeds, tables and callouts.
 *
 * @public
 * @unofficial
 */
export interface ObsidianWidgetType extends WidgetType {
  /**
   * Element holding the widget's action buttons, or `null` until the first action is added.
   */
  actionsEl: HTMLElement | null;

  /**
   * Container element built by {@link ObsidianWidgetType.initDOM} and cached by {@link ObsidianWidgetType.toDOM}.
   */
  containerEl: HTMLElement;

  /**
   * End offset of the widget's range in the document, or `-1` before {@link ObsidianWidgetType.setPos} is called.
   */
  end: number;

  /**
   * Observer used by {@link ObsidianWidgetType.resizeWidget}, created on first use.
   */
  resizeObserver?: ResizeObserver;

  /**
   * Start offset of the widget's range in the document, or `-1` before {@link ObsidianWidgetType.setPos} is called.
   */
  start: number;

  /**
   * Add an action to the widget's action bar, creating the bar on first use.
   *
   * @param el - Element to create the action bar in.
   * @param callback - Callback that configures the action.
   * @returns The widget, for chaining.
   */
  addAction(el: HTMLElement, callback: (action: EmbedAction) => void): this;

  /**
   * Add the standard edit button, which selects the widget's source range when clicked.
   *
   * @param view - The CodeMirror editor view.
   * @param el - Element to create the action bar in.
   */
  addEditButton(view: EditorView, el: HTMLElement): void;

  /**
   * Make clicks on the element select the widget's source range, unless they land inside a nested editor.
   *
   * @param view - The CodeMirror editor view.
   * @param el - The element to hook.
   */
  hookClickHandler(view: EditorView, el: HTMLElement): void;

  /**
   * Build the widget's container element.
   *
   * @param view - The CodeMirror editor view.
   * @returns The container element.
   * @remark Abstract - each widget subclass implements it, and {@link ObsidianWidgetType.toDOM} calls it once.
   */
  initDOM(view: EditorView): HTMLElement;

  /**
   * Re-measure the editor whenever the given element resizes.
   *
   * @param view - The CodeMirror editor view.
   * @param el - The element to observe.
   */
  resizeWidget(view: EditorView, el: Element): void;

  /**
   * Register the widget as the owner of the given element, so that clicks on it can be routed back here.
   *
   * @param el - The element to associate with the widget.
   */
  setOwner(el: HTMLElement): void;

  /**
   * Record the document range the widget stands for.
   *
   * @param start - Start offset in the document.
   * @param end - End offset in the document.
   */
  setPos(start: number, end: number): void;

  /**
   * Get the widget's container element, building it via {@link ObsidianWidgetType.initDOM} on first call.
   *
   * @param view - The CodeMirror editor view.
   * @returns The container element.
   */
  toDOM(view: EditorView): HTMLElement;
}
