/** Augmentations for the WorkspaceSplit interface. */
import type { getWorkspaceSplitConstructor } from '../implementations/constructors/augmentations/getWorkspaceSplitConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace split.
   *
   * @since 0.9.7
   */
  interface WorkspaceSplit extends WorkspaceParent {
    /**
     * The layout direction of the split.
     *
     * @unofficial
     */
    direction: 'horizontal' | 'vertical';

    /**
     * Whether a resize drag is currently in progress.
     *
     * @unofficial
     */
    isResizing: boolean;

    /**
     * The child sizes captured at the start of a resize, or `null` when not resizing.
     *
     * @unofficial
     */
    originalSizes: null | number[];

    /**
     * The parent of the split.
     *
     * @official
     */
    parent: WorkspaceParent;

    /**
     * The pointer position captured at the start of a resize, or `null` when not resizing.
     *
     * @unofficial
     */
    resizeStartPos: null | Point;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceSplitConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param direction - The direction.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(workspace: Workspace, direction: string, id?: string): this;

    /**
     * Finishes the current resize, persisting the new child sizes.
     *
     * @unofficial
     */
    finishResize(): void;

    /**
     * Gets the size of an element along the split's direction.
     *
     * @param el - The element to measure.
     * @returns The size in pixels, or `undefined` when the direction is unset.
     * @unofficial
     */
    getElSize(el: HTMLElement): number | undefined;

    /**
     * Handles the start of a resize initiated by a child.
     *
     * @param child - The child that initiated the resize.
     * @param event - The pointer event.
     * @unofficial
     */
    onChildResizeStart(child: WorkspaceItem, event: PointerEvent): void;

    /**
     * Resizes the given items by a pixel difference.
     *
     * @param items - The items to resize.
     * @param diff - The pixel delta to apply.
     * @param sign - The direction multiplier (`+1` or `-1`).
     * @returns The total absolute number of pixels moved.
     * @unofficial
     */
    resizeItemsByDiff(items: WorkspaceItem[], diff: number, sign: number): number;

    /**
     * Sets the layout direction of the split.
     *
     * @param direction - The direction to set.
     * @unofficial
     */
    setDirection(direction: 'horizontal' | 'vertical'): void;

    /**
     * Sets the size of an element along the split's direction.
     *
     * @param el - The element to size.
     * @param size - The size in pixels.
     * @unofficial
     */
    setElSize(el: HTMLElement, size: number): void;

    /**
     * Clears the explicit size of an element.
     *
     * @param el - The element to reset.
     * @unofficial
     */
    unsetElSize(el: HTMLElement): void;
  }
}
