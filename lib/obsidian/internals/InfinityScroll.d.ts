/** @todo Documentation incomplete */
export interface InfinityScroll {
    height: number;
    lastScroll: number;
    queued: unknown | null;
    renderBlockSize: number;
    rootEl: unknown;
    scrollEl: HTMLElement;
    setWidth: boolean;
    width: number;

    _layout(x: unknown, y: unknown): unknown;
    _measure(x: unknown): unknown;
    _precompute(x: unknown): unknown;
    compute(x: unknown): unknown;
    findElementTop(x: unknown, y: unknown, z: unknown): unknown;
    getRootTop(): unknown;
    invalidate(x: unknown, y: unknown): unknown;
    invalidateAll(): unknown;
    measure(x: unknown, y: unknown): unknown;
    onResize(): unknown;
    onScroll(): unknown;
    queueCompute(): unknown;
    scrollIntoView(x: unknown, y: unknown): unknown;
    update(x: unknown, y: unknown, z: unknown, u: unknown, v: unknown, w: unknown): unknown;
    updateVirtualDisplay(x: unknown): unknown;
}
