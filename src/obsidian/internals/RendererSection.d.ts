/**
 * A section of the read view renderer representing a block of rendered content.
 * @public
 * @unofficial
 */
export interface RendererSection {
    /** DOM element for this section. */
    el: HTMLElement;

    /** Raw HTML content for this section. */
    html: string;

    /** Whether this section has been rendered to the DOM. */
    rendered: boolean;
}
