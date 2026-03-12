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
  }
}
