import type { App } from 'obsidian';

import type { PropertyInfo } from '../../../PropertyInfo.d.ts';
import type { TreeItem } from '../../../tree/TreeItem.d.ts';
import type { TreeNodeVChildren } from '../../../tree/TreeNodeVChildren.d.ts';
import type { AllPropertiesView } from './AllPropertiesView.d.ts';

/**
 * A property row in the all properties sidebar.
 *
 * @public
 * @unofficial
 */
export interface PropertyTreeItem extends TreeItem {
  /** Application owning the view. */
  app: App;

  /** Property occurrence count element. */
  flairEl: HTMLSpanElement;

  /** Property type icon. */
  iconEl: HTMLDivElement;

  /** Property metadata assigned before the row is displayed. */
  property: PropertyInfo;

  /** Virtual scrolling spacer. */
  pusherEl: HTMLElement;

  /** Editable property name element. */
  titleEl: HTMLDivElement;

  /** Virtual child rows. */
  vChildren: TreeNodeVChildren<PropertyTreeItem, PropertyTreeItem>;

  /** Owning property view. */
  view: AllPropertiesView;

  /**
   * Show a temporary error tooltip.
   *
   * @param message - The error message.
   */
  displayError(message: string): void;

  /**
   * Assign property metadata and its occurrence count.
   *
   * @param property - The property metadata.
   * @param count - The occurrence count.
   * @returns This row.
   */
  setProperty(property: PropertyInfo, count: number): this;

  /**
   * Start editing the property name.
   */
  startRename(): void;

  /**
   * Stop editing the property name.
   */
  stopRename(): void;

  /**
   * Restore the property name label.
   */
  updateTitle(): void;
}
