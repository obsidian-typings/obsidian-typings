import type {
  Debouncer,
  Editor,
  HeadingCache,
  MarkdownFileInfo,
  MarkdownView,
  TFile,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../../implementations/constants/ViewType.d.ts';
import type { NavigationSearch } from '../../../components/NavigationSearch.d.ts';
import type { ObsidianSearchQuery } from '../../../search-query/ObsidianSearchQuery.d.ts';
import type { Tree } from '../../../tree/Tree.d.ts';
import type { InfoFileView } from '../../../views/InfoFileView.d.ts';
import type { OutlinePluginInstance } from '../OutlinePluginInstance.d.ts';
import type { OutlineTreeItem } from './OutlineTreeItem.d.ts';

/**
 * {@link obsidian#View} that displays the headings outline for the current file.
 *
 * @public
 * @unofficial
 */
export interface OutlineView extends InfoFileView {
  /** Highlighted heading element, or `null`. */
  activeEl: HTMLElement | null;

  /** Cached rows in heading order. */
  cachedHeadingDom: OutlineTreeItem[];

  /** Button that collapses or expands headings. */
  collapseOrExpandAllEl: HTMLDivElement;

  /** Message displayed when there are no headings. */
  emptyEl: HTMLDivElement;

  /** Whether the active heading is scrolled into view. */
  followCursor: boolean;

  /** Button that toggles following the cursor. */
  followCursorButtonEl: HTMLDivElement;

  /** Debounced editor selection handler. */
  onSelectionChange: Debouncer<Parameters<OutlineView['handleSelectionChange']>, void>;

  /** Owning outline plugin. */
  plugin: OutlinePluginInstance;

  /** Query used for the previous match rendering. */
  prevQuery: string;

  /** Debounced content refresh inherited from the information view. */
  requestUpdate: Debouncer<[], void>;

  /** Search visibility and input controls. */
  search: NavigationSearch;

  /** Compiled heading filter, or `null`. */
  searchQuery: null | ObsidianSearchQuery;

  /** Tree of headings. */
  tree: Tree<OutlineTreeItem>;

  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param outlinePluginInstance - The outline plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__?(leaf: WorkspaceLeaf, outlinePluginInstance: OutlinePluginInstance): this;

  /**
   * Create a DOM element for an outline heading item.
   *
   * @param heading - The heading data.
   * @returns The created DOM element.
   */
  createItemDom(heading: HeadingCache): OutlineTreeItem;

  /**
   * Find the heading that corresponds to the current cursor position.
   *
   * @param owner - The editor or preview owner, or `null`.
   * @returns The active row, `null` without an owner, or `undefined` when no heading matches.
   */
  findActiveHeading(owner: MarkdownFileInfo | MarkdownView | null): null | OutlineTreeItem | undefined;

  /**
   * Finds the active leaf.
   *
   * @returns The corresponding workspace leaf, or `null`.
   */
  findCorrespondingLeaf(): null | WorkspaceLeaf;

  /**
   * Returns the headings of the active file.
   *
   * @returns The cached headings of the current Markdown file.
   */
  getHeadings(): HeadingCache[];

  /**
   * Finds the view to the active leaf.
   *
   * @returns The owner view, or `null`.
   */
  getOwner(): MarkdownFileInfo | MarkdownView | null;

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

  /**
   * Handle editor selection changes and highlight the active heading.
   *
   * @param editor - The editor whose selection changed.
   * @param info - The editor owner.
   */
  handleSelectionChange(editor: Editor, info: MarkdownFileInfo | MarkdownView): void;

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
   * Compile the query and refresh heading matches.
   *
   * @param query - The search text.
   */
  onSearchChanged(query: string): void;

  /**
   * Toggle following the cursor and save the layout.
   */
  onToggleFollowCursor(): void;

  /**
   * Update the highlighted query matches in heading rows.
   */
  renderSearchMatches(): void;

  /**
   * Set whether to scroll the active heading into view.
   *
   * @param value - Whether to follow the cursor.
   */
  setFollowCursor(value: boolean): void;

  /**
   * Set which outline item is highlighted as active.
   *
   * @param item - The item to highlight, or no item to clear the highlight.
   */
  setHighlightedItem(item: null | OutlineTreeItem | undefined): void;

  /**
   * Shows the search.
   */
  showSearch(): void;

  /**
   * Refresh the outline view with current headings.
   */
  update(): void;
}
