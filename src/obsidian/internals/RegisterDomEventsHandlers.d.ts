/**
 * The handlers for the DOM events.
 *
 * @public
 * @unofficial
 */
export interface RegisterDomEventsHandlers {
    /**
     * Handles the external link click event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onExternalLinkClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

    /**
     * Handles the external link right click event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onExternalLinkRightClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

    /**
     * Handles the internal link click event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onInternalLinkClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

    /**
     * Handles the internal link drag event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     * @param title - The title.
     */
    onInternalLinkDrag(evt: MouseEvent, targetEl: HTMLElement, linkText: string, title?: string): unknown;

    /**
     * Handles the internal link mouseover event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onInternalLinkMouseover(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

    /**
     * Handles the internal link right click event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onInternalLinkRightClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

    /**
     * Handles the tag click event.
     *
     * @param evt - The mouse event.
     * @param targetEl - The target element.
     * @param linkText - The link text.
     */
    onTagClick(evt: MouseEvent, targetEl: HTMLElement, tag: string): unknown;
}
