/**
 * Virtual scrolling component that renders only visible items in large lists for performance.
 * @public
 * @unofficial
 */
export interface InfinityScroll {
    /** Current visible height of the scroll container. */
    height: number;

    /** Last recorded scroll position. */
    lastScroll: number;

    /** Queued computation task, or null if none is pending. */
    queued: unknown | null;

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

    /** Internal method to perform layout calculations. */
    _layout(x: unknown, y: unknown): unknown;

    /** Internal method to measure element dimensions. */
    _measure(x: unknown): unknown;

    /** Internal method to precompute layout information. */
    _precompute(x: unknown): unknown;

    /** Compute visible items and update the virtual display. */
    compute(x: unknown): unknown;

    /** Find the top position of an element within the scroll container. */
    findElementTop(x: unknown, y: unknown, z: unknown): unknown;

    /** Get the top offset of the root element. */
    getRootTop(): unknown;

    /** Invalidate the cached layout for specific items. */
    invalidate(x: unknown, y: unknown): unknown;

    /** Invalidate all cached layout information. */
    invalidateAll(): unknown;

    /** Measure dimensions for the given elements. */
    measure(x: unknown, y: unknown): unknown;

    /** Handle resize events and recalculate layout. */
    onResize(): unknown;

    /** Handle scroll events and update the virtual display. */
    onScroll(): unknown;

    /** Queue a deferred computation of visible items. */
    queueCompute(): unknown;

    /** Scroll the container to bring the specified element into view. */
    scrollIntoView(x: unknown, y: unknown): unknown;

    /** Update the virtual scroll state with new parameters. */
    update(x: unknown, y: unknown, z: unknown, u: unknown, v: unknown, w: unknown): unknown;

    /** Update the virtual display to reflect current scroll position. */
    updateVirtualDisplay(x: unknown): unknown;
}
