import type {
  ItemView,
  WorkspaceLeaf
} from 'obsidian';

import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';

/**
 * View that renders an embedded web browser for browsing web pages within Obsidian.
 *
 * @public
 * @unofficial
 */
export interface WebviewerView extends ItemView {
  /** Close the in-page search bar. */
  closeSearch(): void;

  /**
   * Finalize and commit the current page load.
   *
   * @returns The commit result.
   */
  commitPageLoad(): unknown;

  /** Configure the web contents settings for the webview. */
  configureWebContents(): void;

  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param browserPluginInstance - The webviewer plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__(leaf: WorkspaceLeaf, browserPluginInstance: WebviewerPluginInstance): this;

  /**
   * Build context menu items for an image element.
   *
   * @param e - The image element context.
   * @returns The context menu items.
   */
  contextMenuItemsForImg(e: unknown): unknown;

  /**
   * Build context menu items for a link element.
   *
   * @param e - The link element context.
   * @param t - The link target information.
   * @returns The context menu items.
   */
  contextMenuItemsForLink(e: unknown, t: unknown): unknown;

  /**
   * Build context menu items for selected text.
   *
   * @param e - The selection context.
   * @param t - The selection target information.
   * @returns The context menu items.
   */
  contextMenuItemsForSelection(e: unknown, t: unknown): unknown;

  /** Display a blank page in the webview. */
  displayBlank(): void;

  /**
   * Display a context menu at the given position.
   *
   * @param e - The context menu event data.
   */
  displayContextMenu(e: unknown): void;

  /**
   * Shows the error view.
   */
  displayErrorView(): void;

  /**
   * Display the page content in reader mode.
   *
   * @returns Resolves when the reader view is displayed.
   */
  displayReaderView(): Promise<unknown>;

  /**
   * Shows the webview.
   */
  displayWebView(): void;

  /**
   * Get the parsed content for reader mode.
   *
   * @returns The parsed reader mode content.
   */
  getReaderModeContent(): Promise<unknown>;

  /**
   * Get the current view type.
   *
   * @returns The webviewer view type.
   */
  getViewType(): typeof ViewType.Webviewer;

  /** Hide all view content (webview, reader, error). */
  hideAll(): void;

  /**
   * Setup the webview.
   */
  instantiateWebView(): void;

  /**
   * Navigate the webview to a URL.
   *
   * @param e - The URL or navigation target.
   * @param t - Navigation options.
   * @returns The navigation result.
   */
  navigate(e: unknown, t: unknown): unknown;

  /**
   * Handle a checkbox click in reader mode.
   *
   * @param e - The click event.
   * @param t - The checkbox element.
   * @param n - The checkbox state information.
   */
  onCheckboxClick(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle a click on an external link.
   *
   * @param e - The click event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onExternalLinkClick(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle a right-click on an external link.
   *
   * @param e - The right-click event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onExternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;

  /** Handle a fold/collapse state change in reader mode. */
  onFoldChange(): void;

  /**
   * Handle a click on an internal (vault) link.
   *
   * @param e - The click event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onInternalLinkClick(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle dragging an internal link.
   *
   * @param e - The drag event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onInternalLinkDrag(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle mouseover on an internal link for preview.
   *
   * @param e - The mouseover event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onInternalLinkMouseover(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle a right-click on an internal link.
   *
   * @param e - The right-click event.
   * @param t - The link element.
   * @param n - The link target information.
   */
  onInternalLinkRightClick(e: unknown, t: unknown, n: unknown): void;

  /**
   * Handle a context menu event in reader mode.
   *
   * @param e - The context menu event.
   */
  onReaderModeContextMenu(e: unknown): void;

  /** Called when the reader mode rendering is complete. */
  onRenderComplete(): void;

  /** Handle scroll events in the webview. */
  onScroll(): void;

  /**
   * Handle a click on a tag in reader mode.
   *
   * @param e - The click event.
   * @param t - The tag element.
   * @param n - The tag information.
   */
  onTagClick(e: unknown, t: unknown, n: unknown): void;

  /**
   * Post-process rendered content in reader mode.
   *
   * @param e - The rendered content element.
   * @param t - The processing context.
   * @param n - Additional processing options.
   */
  postProcess(e: unknown, t: unknown, n: unknown): void;

  /**
   * Push the current page to the view navigation history stack.
   *
   * @param e - The history entry to push.
   */
  pushViewStackHistory(e: unknown): void;

  /**
   * Report a page load event to the history database.
   *
   * @param url - The URL of the loaded page.
   * @param title - The title of the loaded page.
   * @param navigate - Navigation metadata.
   */
  reportPageLoad(url: string, title: string, navigate: unknown): void;

  /**
   * Save the current page content as a Markdown file.
   *
   * @returns Resolves when the file has been saved.
   */
  saveAsMarkdown(): Promise<unknown>;

  /**
   * Select the appropriate favicon for the current page.
   *
   * @param e - The favicon candidates.
   * @returns The selected favicon.
   */
  selectFavicon(e: unknown): unknown;

  /**
   * Set the favicon for the current page.
   *
   * @param e - The favicon data.
   * @returns The result of setting the favicon.
   */
  setFavicon(e: unknown): unknown;

  /** Show the in-page search bar. */
  showSearch(): void;

  /**
   * Stores the title of the current webview.
   *
   * @returns Resolves when the title has been stored.
   */
  storeCurrentPageTitle(): Promise<unknown>;

  /**
   * Toggles the reader mode.
   */
  toggleReaderMode(): void;

  /**
   * Zoom in the webview.
   */
  zoomIn(): void;

  /**
   * Zoom out the webview.
   */
  zoomOut(): void;

  /**
   * Resets the zoom factor of the webview.
   */
  zoomReset(): void;
}
