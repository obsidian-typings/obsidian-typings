import type {
  App,
  Component
} from 'obsidian';

import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';
import type { ObsidianWidgetType } from './ObsidianWidgetType.d.ts';

/**
 * {@link ObsidianWidgetType} that can host {@link obsidian#Component} children.
 *
 * Children are registered on the owning edit view rather than on the widget, so they survive for as
 * long as the view does; the widget only keeps its own list so it can drop them again.
 *
 * @remark Despite managing components, this is not itself a {@link obsidian#Component} - it is a
 *         CodeMirror {@link @codemirror/view#WidgetType}.
 * @public
 * @unofficial
 */
export interface ChildWidgetType extends ObsidianWidgetType {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Child components added through {@link ChildWidgetType.addChild}.
   */
  children: Component[];

  /**
   * Edit view that owns the widget.
   */
  editor: MarkdownBaseView;

  /**
   * Whether the widget should never be reused for a different instance.
   */
  readonly noReuse: boolean;

  /**
   * Add a child component, registering it on the owning edit view.
   *
   * @param component - The component to add.
   */
  addChild(component: Component): void;

  /**
   * Constructor.
   *
   * To extract the constructor type, use {@link ExtractConstructor | ExtractConstructor\<ChildWidgetType\>}.
   *
   * @param app - The app.
   * @param editor - The edit view that owns the widget.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor2__?(app: App, editor: MarkdownBaseView): this;

  /**
   * Remove a child component, unregistering it from the owning edit view.
   *
   * @param component - The component to remove.
   */
  removeChild(component: Component): void;
}
