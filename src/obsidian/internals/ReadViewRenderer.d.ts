import type { RendererSection } from './RendererSection.d.ts';

/**
 * Renderer for the reading/preview view, managing section-based markdown rendering.
 * @public
 * @unofficial
 */
export interface ReadViewRenderer {
    /** Whether to add bottom padding to the preview. */
    addBottomPadding: boolean;

    /** Sections that are being rendered asynchronously. */
    asyncSections: unknown[];

    /** Timestamp of the last render operation. */
    lastRender: number;

    /** Last recorded scroll position. */
    lastScroll: number;

    /** Text content from the last render. */
    lastText: string;

    /** Container element for the rendered preview. */
    previewEl: HTMLElement;

    /** Element used to push content for scroll height calculation. */
    pusherEl: HTMLElement;

    /** Pool of recycled section elements for reuse. */
    recycledSections: unknown[];

    /** Currently rendered section data. */
    rendered: unknown[];

    /** All sections in the rendered document. */
    sections: RendererSection[];

    /** Current text content being rendered. */
    text: string;

    /** Clear all rendered sections and reset the renderer. */
    clear(): void;

    /** Parse the text content asynchronously into sections. */
    parseAsync(): void;

    /** Parse the text content synchronously into sections. */
    parseSync(): void;

    /** Queue a render update for the next animation frame. */
    queueRender(): void;

    /**
     * Set the text content and trigger a re-render.
     *
     * @param text - The text content to render.
     */
    set(text: string): void;
}
