import type {
  App,
  Component,
  TFile
} from 'obsidian';

import type { InfinityScroll } from '../../tree/InfinityScroll.d.ts';
import type { ResultDom } from '../../tree/ResultDom.d.ts';

/**
 * Main UI component that renders outgoing links and unlinked mentions for a file.
 *
 * @public
 * @unofficial
 */
export interface OutgoingLinkComponent extends Component {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * The file whose outgoing links are being shown.
   */
  file: null | TFile;

  /**
   * Whether the outgoing links section is collapsed.
   */
  linksCollapsed: boolean;

  /**
   * Element displaying the count of outgoing links.
   */
  linksCountEl: HTMLSpanElement;

  /**
   * Header element for the outgoing links section.
   */
  linksHeaderEl: HTMLDivElement;

  /**
   * File for which outgoing links are currently displayed.
   */
  outgoingFile: null | TFile;

  /**
   * Virtual scroller rendering the outgoing links list.
   */
  outgoingLinkInfinityScroller: InfinityScroll;

  /**
   * Whether the search filter is shown.
   */
  showSearch: boolean;

  /**
   * Placement direction for tooltips.
   */
  tooltipPlacement: string;

  /**
   * Whether the unlinked mentions section is collapsed.
   */
  unlinkedCollapsed: boolean;

  /**
   * Element displaying the count of unlinked mentions.
   */
  unlinkedCountEl: HTMLSpanElement;

  /**
   * DOM tree rendering unlinked mention search results.
   */
  unlinkedDom: ResultDom;

  /**
   * File for which unlinked mentions are currently displayed.
   */
  unlinkedFile: null | TFile;

  /**
   * Header element for the unlinked mentions section.
   */
  unlinkedHeaderEl: HTMLDivElement;

  /**
   * Handle a file deletion event.
   */
  onFileDeleted(): void;

  /**
   * Handle a metadata cache resolve event.
   *
   * @param file - The resolved file.
   */
  onFileResolved(file: TFile): void;

  /**
   * Lifecycle hook called when the component is loaded.
   */
  onload(): void;

  /**
   * Handle the component being resized.
   */
  onResize(): void;

  /**
   * Recompute the outgoing links of the current file.
   */
  recomputeLinks(): void;

  /**
   * Recompute the unlinked mentions of the current file.
   *
   * @returns A promise that resolves when the recomputation is done.
   */
  recomputeUnlinked(): Promise<void>;

  /**
   * Request a debounced {@link OutgoingLinkComponent.update}.
   */
  requestUpdate(): void;

  /**
   * Set whether the outgoing links section is collapsed.
   *
   * @param linksCollapsed - Whether the section should be collapsed.
   * @param shouldAnimate - Whether to animate the transition.
   * @returns A promise that resolves when the section is updated.
   */
  setLinksCollapsed(linksCollapsed: boolean, shouldAnimate: boolean): Promise<void>;

  /**
   * Set the collapsed state of a specific section.
   *
   * @param headerEl - The header element of the section.
   * @param dom - The DOM tree of the section.
   * @param collapsed - Whether the section should be collapsed.
   * @param shouldAnimate - Whether to animate the transition.
   * @returns A promise that resolves when the section is updated.
   */
  setSectionCollapsed(headerEl: HTMLElement, dom: ResultDom, collapsed: boolean, shouldAnimate: boolean): Promise<void>;

  /**
   * Set whether the unlinked mentions section is collapsed.
   *
   * @param unlinkedCollapsed - Whether the section should be collapsed.
   * @param shouldAnimate - Whether to animate the transition.
   * @returns A promise that resolves when the section is updated.
   */
  setUnlinkedCollapsed(unlinkedCollapsed: boolean, shouldAnimate: boolean): Promise<void>;

  /**
   * Toggle the collapsed state of the outgoing links section.
   */
  toggleLinksCollapsed(): void;

  /**
   * Toggle the collapsed state of the unlinked mentions section.
   */
  toggleUnlinkedCollapsed(): void;

  /**
   * Recompute whichever sections are stale for the current file.
   */
  update(): void;

  /**
   * Update the tooltip text of a section header.
   *
   * @param headerEl - The header element.
   * @param collapsed - Whether the section is collapsed.
   */
  updateHeaderTooltip(headerEl: HTMLElement, collapsed: boolean): void;
}
