import type {
  getHoverPopoverConstructor
} from '../implementations/constructors/augmentations/getHoverPopoverConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A hover popover.
   * @since 0.15.0
   */
  interface HoverPopover extends Component {
    /**
     * The HTML element representation of the hover popover.
     *
     * @official
     */
    hoverEl: HTMLElement;

    /**
     * The state of the hover popover.
     *
     * @official
     */
    state: PopoverState;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getHoverPopoverConstructor} from `obsidian-typings/implementations`.
     *
     * @param parent - The parent of the hover popover.
     * @param targetEl - The target element of the hover popover.
     * @param waitTime - The wait time of the hover popover.
     * @param staticPos - The static position of the hover popover.
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(
      parent: HoverParent,
      targetEl: HTMLElement | null,
      waitTime?: number,
      staticPos?: Point | null
    ): this;

    /**
     * Start observing the popover element for size changes.
     * @unofficial
     */
    watchResize(): void;
  }
}
