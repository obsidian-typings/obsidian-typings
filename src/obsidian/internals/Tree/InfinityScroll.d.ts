/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface InfinityScroll {
    /** @todo Documentation incomplete. */
    height: number;

    /** @todo Documentation incomplete. */
    lastScroll: number;

    /** @todo Documentation incomplete. */
    queued: unknown | null;

    /** @todo Documentation incomplete. */
    renderBlockSize: number;

    /** @todo Documentation incomplete. */
    rootEl: unknown;

    /** @todo Documentation incomplete. */
    scrollEl: HTMLElement;

    /** @todo Documentation incomplete. */
    setWidth: boolean;

    /** @todo Documentation incomplete. */
    width: number;

    /** @todo Documentation incomplete. */
    _layout(x: unknown, y: unknown): unknown;

    /** @todo Documentation incomplete. */
    _measure(x: unknown): unknown;

    /** @todo Documentation incomplete. */
    _precompute(x: unknown): unknown;

    /** @todo Documentation incomplete. */
    compute(x: unknown): unknown;

    /** @todo Documentation incomplete. */
    findElementTop(x: unknown, y: unknown, z: unknown): unknown;

    /** @todo Documentation incomplete. */
    getRootTop(): unknown;

    /** @todo Documentation incomplete. */
    invalidate(x: unknown, y: unknown): unknown;

    /** @todo Documentation incomplete. */
    invalidateAll(): unknown;

    /** @todo Documentation incomplete. */
    measure(x: unknown, y: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResize(): unknown;

    /** @todo Documentation incomplete. */
    onScroll(): unknown;

    /** @todo Documentation incomplete. */
    queueCompute(): unknown;

    /** @todo Documentation incomplete. */
    scrollIntoView(x: unknown, y: unknown): unknown;

    /** @todo Documentation incomplete. */
    update(x: unknown, y: unknown, z: unknown, u: unknown, v: unknown, w: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateVirtualDisplay(x: unknown): unknown;
}
