/**
 * Virtual scrolling component that renders only visible items in large lists for performance.
 *
 * @public
 * @unofficial
 */
export interface InfinityScroll {
  /** Current visible height of the scroll container. */
  height: number;

  /** Last recorded scroll position. */
  lastScroll: number;

  /** Queued computation task, or `null` if none is pending. */
  queued: null | unknown;

  /** Number of items to render per block. */
  renderBlockSize: number;

  /** Root element of the virtual scroll container. */
  rootEl: unknown;

  /** Scrollable element that handles scroll events. */
  scrollEl: HTMLElement;

  /** Whether the width should be explicitly set on items. */
  setWidth: boolean;

  /** Current visible width of the scroll container. */
  width: number;

  /**
   * Internal method to perform layout calculations.
   *
   * @param x - First layout parameter.
   * @param y - Second layout parameter.
   * @returns The layout calculation result.
   */
  _layout(x: unknown, y: unknown): unknown;

  /**
   * Internal method to measure element dimensions.
   *
   * @param x - The element to measure.
   * @returns The measured dimensions.
   */
  _measure(x: unknown): unknown;

  /**
   * Internal method to precompute layout information.
   *
   * @param x - The input data to precompute.
   * @returns The precomputed layout data.
   */
  _precompute(x: unknown): unknown;

  /**
   * Compute visible items and update the virtual display.
   *
   * @param x - The computation input.
   * @returns The computation result.
   */
  compute(x: unknown): unknown;

  /**
   * Find the top position of an element within the scroll container.
   *
   * @param x - The element to find.
   * @param y - Second parameter.
   * @param z - Third parameter.
   * @returns The top position of the element.
   */
  findElementTop(x: unknown, y: unknown, z: unknown): unknown;

  /**
   * Get the top offset of the root element.
   *
   * @returns The top offset of the root element.
   */
  getRootTop(): unknown;

  /**
   * Invalidate the cached layout for specific items.
   *
   * @param x - First invalidation parameter.
   * @param y - Second invalidation parameter.
   * @returns The invalidation result.
   */
  invalidate(x: unknown, y: unknown): unknown;

  /**
   * Invalidate all cached layout information.
   *
   * @returns The invalidation result.
   */
  invalidateAll(): unknown;

  /**
   * Measure dimensions for the given elements.
   *
   * @param x - First measurement parameter.
   * @param y - Second measurement parameter.
   * @returns The measurement result.
   */
  measure(x: unknown, y: unknown): unknown;

  /**
   * Handle resize events and recalculate layout.
   *
   * @returns The resize handling result.
   */
  onResize(): unknown;

  /**
   * Handle scroll events and update the virtual display.
   *
   * @returns The scroll handling result.
   */
  onScroll(): unknown;

  /**
   * Queue a deferred computation of visible items.
   *
   * @returns The queued computation result.
   */
  queueCompute(): unknown;

  /**
   * Scroll the container to bring the specified element into view.
   *
   * @param x - The element to scroll into view.
   * @param y - Scroll options.
   * @returns The scroll result.
   */
  scrollIntoView(x: unknown, y: unknown): unknown;

  /**
   * Update the virtual scroll state with new parameters.
   *
   * @param x - First update parameter.
   * @param y - Second update parameter.
   * @param z - Third update parameter.
   * @param u - Fourth update parameter.
   * @param v - Fifth update parameter.
   * @param w - Sixth update parameter.
   * @returns The update result.
   */
  update(x: unknown, y: unknown, z: unknown, u: unknown, v: unknown, w: unknown): unknown;

  /**
   * Update the virtual display to reflect current scroll position.
   *
   * @param x - The display update input.
   * @returns The display update result.
   */
  updateVirtualDisplay(x: unknown): unknown;
}
