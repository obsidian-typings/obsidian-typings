import type { IconName } from 'obsidian';

/**
 * Builder for a single action in a widget's action bar.
 *
 * Handed to the {@link ObsidianWidgetType.addAction} callback, it wraps one `div.embed-action`
 * inside the `div.embed-actions` bar.
 *
 * @remark Despite the fluent setters, this is not an {@link obsidian#BaseComponent} - it has no base
 *         class at all, and none of the component lifecycle.
 * @public
 * @unofficial
 */
export interface EmbedAction {
  /**
   * Element for the action itself.
   */
  actionEl: HTMLElement;

  /**
   * Register a click handler for the action.
   *
   * @param callback - Handler invoked when the action is clicked.
   * @returns The action, for chaining.
   */
  onClick(callback: () => unknown): this;

  /**
   * Set an additional CSS class on the action element.
   *
   * @param cls - The CSS class to add.
   * @returns The action, for chaining.
   */
  setClass(cls: string): this;

  /**
   * Set the icon of the action.
   *
   * @param icon - ID of the icon to display.
   * @returns The action, for chaining.
   */
  setIcon(icon: IconName): this;

  /**
   * Set the tooltip shown when hovering the action.
   *
   * @param tooltip - The tooltip text.
   * @returns The action, for chaining.
   */
  setTooltip(tooltip: string): this;
}
