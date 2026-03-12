import type {
  TFile,
  View,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { InfoFileView } from '../../views/InfoFileView.d.ts';
import type { OutlinePluginInstance } from './OutlinePluginInstance.d.ts';

/**
 * View that displays the headings outline for the current file.
 *
 * @public
 * @unofficial
 */
export interface OutlineView extends InfoFileView {
  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param outlinePluginInstance - The outline plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__(leaf: WorkspaceLeaf, outlinePluginInstance: OutlinePluginInstance): this;

  /**
   * Create a DOM element for an outline heading item.
   *
   * @param e - The heading data.
   * @returns The created DOM element.
   */
  createItemDom(e: unknown): unknown;

  /** Filter the outline items based on the current search query. */
  filterSearchResults(): void;

  /**
   * Find the heading that corresponds to the current cursor position.
   *
   * @param e - The cursor position or context.
   * @returns The active heading, or `undefined` if none found.
   */
  findActiveHeading(e: unknown): undefined | unknown;

  /**
   * Finds the active leaf.
   *
   * @returns The corresponding workspace leaf, or `null`.
   */
  findCorrespondingLeaf(): null | WorkspaceLeaf;

  /**
   * Returns the headings of the active file.
   *
   * @returns The list of heading strings.
   */
  getHeadings(): string[];

  /**
   * Finds the view to the active leaf.
   *
   * @returns The owner view, or `null`.
   */
  getOwner(): null | View;

  /**
   * Get the current view type.
   *
   * @returns The outline view type.
   */
  getViewType(): typeof ViewType.Outline;

  /**
   * Handle the collapse/expand all toggle action.
   *
   * @param e - Whether to collapse all.
   */
  handleCollapseAll(e: unknown): void;

  /** Handle editor selection changes and highlight the active heading. */
  handleSelectionChange(): void;

  /**
   * Handle a file content change and refresh the outline.
   *
   * @param file - The changed file.
   */
  onFileChanged(file: TFile): void;

  /**
   * Handle scroll events in the markdown editor and sync outline highlight.
   *
   * @param e - The scroll event.
   */
  onMarkdownScroll(e: unknown): void;

  /**
   * Toggles the visibility of the search.
   */
  onToggleShowSearch(): void;

  /**
   * Set which outline item is highlighted as active.
   *
   * @param e - The item to highlight.
   */
  setHighlightedItem(e: unknown): void;

  /**
   * Set the visibility of the search filter.
   *
   * @param e - Whether to show the search filter.
   */
  setShowSearch(e: unknown): void;

  /**
   * Shows the search.
   */
  showSearch(): void;

  /** Refresh the outline view with current headings. */
  update(): void;

  /**
   * Updates the search.
   */
  updateSearch(): void;
}
