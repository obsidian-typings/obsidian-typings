import type { getRenderContextConstructor } from '../implementations/constructors/augmentations/getRenderContextConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Utility functions for rendering Values within the app.
   *
   * @since 1.10.0
   */
  interface RenderContext extends HoverParent {
    /**
     * Reference to the app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * Hover popover.
     *
     * @official
     * @since 1.10.0
     */
    hoverPopover: HoverPopover | null;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getRenderContextConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__(app: App): this;

    /**
     * Renders an external link into a container element.
     *
     * @param url - The link URL.
     * @param display - The display value, or `null` to use the URL as text.
     * @param containerEl - The container element to render into.
     * @unofficial
     */
    renderExternalLink(url: string, display: null | Value, containerEl: HTMLElement): void;

    /**
     * Renders an internal file link into a container element.
     *
     * @param file - The target file, or a link path to resolve.
     * @param display - The display value, or `null` to use the file name as text.
     * @param containerEl - The container element to render into.
     * @unofficial
     */
    renderFileLink(file: string | TFile, display: null | Value, containerEl: HTMLElement): void;

    /**
     * Renders a tag link into a container element.
     *
     * @param tag - The tag, including its leading `#`.
     * @param containerEl - The container element to render into.
     * @unofficial
     */
    renderTag(tag: string, containerEl: HTMLElement): void;
  }
}
