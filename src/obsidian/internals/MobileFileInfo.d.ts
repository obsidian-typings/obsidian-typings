/**
 * Interface for rendering file information on mobile.
 * @public
 * @unofficial
 */
export interface MobileFileInfo {
    /**
     * Callback to render file info into the given element.
     *
     * @param el - The element to render file info into.
     */
    renderCallback(el: HTMLElement): void;
}
