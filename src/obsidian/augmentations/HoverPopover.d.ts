import type { getHoverPopoverConstructor } from '../implementations/constructors/augmentations/getHoverPopoverConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A hover popover.
   *
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
     * Whether the popover is currently focused.
     *
     * @unofficial
     */
    isFocused: boolean;

    /**
     * Whether the pointer is currently over the popover.
     *
     * @unofficial
     */
    onHover: boolean;

    /**
     * Whether the pointer is currently over the target element.
     *
     * @unofficial
     */
    onTarget: boolean;

    /**
     * The parent that owns this popover.
     *
     * @unofficial
     */
    parent: HoverParent;

    /**
     * The state of the hover popover.
     *
     * @official
     */
    state: PopoverState;

    /**
     * The fixed position of the popover, or `null` to position relative to the target.
     *
     * @unofficial
     */
    staticPos: null | Point;

    /**
     * The target element the popover is anchored to, or `null`.
     *
     * @unofficial
     */
    targetEl: HTMLElement | null;

    /**
     * The active show/hide timer handle.
     *
     * @unofficial
     */
    timer: number;

    /**
     * The delay before showing or hiding, in milliseconds.
     *
     * @unofficial
     */
    waitTime: number;

    /**
     * The child popovers nested within this popover's element.
     *
     * @unofficial
     */
    get childHovers(): HoverPopover[];

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
      staticPos?: null | Point
    ): this;

    /**
     * Updates the hover/target flags based on the element under the pointer.
     *
     * @param el - The element under the pointer.
     * @unofficial
     */
    detect(el: Node): void;

    /**
     * Hides and unloads the popover.
     *
     * @unofficial
     */
    hide(): void;

    /**
     * Called when the popover is hidden.
     *
     * @unofficial
     */
    onHide(): void;

    /**
     * Handles the pointer entering the target.
     *
     * @param evt - The mouse event.
     * @unofficial
     */
    onMouseIn(evt: MouseEvent): void;

    /**
     * Handles the pointer leaving the target.
     *
     * @param evt - The mouse event.
     * @unofficial
     */
    onMouseOut(evt: MouseEvent): void;

    /**
     * Called when the popover is shown.
     *
     * @unofficial
     */
    onShow(): void;

    /**
     * Positions the popover relative to its target or static position.
     *
     * @unofficial
     */
    position(): void;

    /**
     * Sets whether the popover is focused.
     *
     * @param isFocused - Whether the popover is focused.
     * @unofficial
     */
    setIsFocused(isFocused: boolean): void;

    /**
     * Whether the popover (or any child) should currently be shown.
     *
     * @returns Whether to show the popover.
     * @unofficial
     */
    shouldShow(): boolean;

    /**
     * Whether any child popover should currently be shown.
     *
     * @returns Whether to show a child popover.
     * @unofficial
     */
    shouldShowChild(): boolean;

    /**
     * Whether this popover itself should currently be shown.
     *
     * @returns Whether to show this popover.
     * @unofficial
     */
    shouldShowSelf(): boolean;

    /**
     * Shows the popover.
     *
     * @unofficial
     */
    show(): void;

    /**
     * Transitions the popover between shown and hidden based on {@link HoverPopover.shouldShow}.
     *
     * @unofficial
     */
    transition(): void;

    /**
     * Start observing the popover element for size changes.
     *
     * @unofficial
     */
    watchResize(): void;
  }
}
