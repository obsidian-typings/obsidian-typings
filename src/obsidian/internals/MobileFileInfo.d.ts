/**
 * Interface for rendering file information on mobile.
 * @public
 * @unofficial
 */
export interface MobileFileInfo {
    /** Callback to render file info into the given element. */
    renderCallback(el: HTMLElement): void;
}
