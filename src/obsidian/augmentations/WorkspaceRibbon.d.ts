import type { getWorkspaceRibbonConstructor } from '../implementations/constructors/augmentations/getWorkspaceRibbonConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace ribbon.
   */
  interface WorkspaceRibbon {
    /**
     * The container element of the ribbon.
     *
     * @unofficial
     */
    containerEl: HTMLElement;

    /**
     * The registered ribbon items.
     *
     * @unofficial
     */
    items: RibbonItem[];

    /**
     * The element holding the ribbon action buttons, or `null` on a side without actions.
     *
     * @unofficial
     */
    ribbonItemsEl: HTMLElement | null;

    /**
     * The element holding the ribbon settings button, or `null` on a side without settings.
     *
     * @unofficial
     */
    ribbonSettingEl: HTMLElement | null;

    /**
     * Reference to the workspace.
     *
     * @unofficial
     */
    workspace: Workspace;

    /**
     * Adds a ribbon item button.
     *
     * @param id - The unique identifier of the item.
     * @param icon - The lucide icon name.
     * @param title - The tooltip title.
     * @param callback - The click handler.
     * @returns The created button element.
     * @unofficial
     */
    addRibbonItemButton(id: string, icon: string, title: string, callback: (evt: MouseEvent) => unknown): HTMLElement;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceRibbonConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param side - The side.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__?(workspace: Workspace, side: string): this;

    /**
     * Hides the ribbon.
     *
     * @unofficial
     */
    hide(): void;

    /**
     * Restores the ribbon's hidden-item state.
     *
     * @param state - The serialized ribbon state.
     * @unofficial
     */
    load(state: Partial<RibbonState>): void;

    /**
     * Creates a ribbon item button element without registering it.
     *
     * @param icon - The lucide icon name.
     * @param title - The tooltip title.
     * @param callback - The click handler.
     * @returns The created button element.
     * @unofficial
     */
    makeRibbonItemButton(icon: string, title: string, callback: (evt: MouseEvent) => unknown): HTMLElement;

    /**
     * Re-renders the ribbon items, optionally persisting the layout.
     *
     * @param save - Whether to request a layout save.
     * @unofficial
     */
    onChange(save: boolean): void;

    /**
     * Shows the ribbon's context menu at the pointer.
     *
     * @param event - The mouse event.
     * @unofficial
     */
    onContextMenu(event: MouseEvent): void;

    /**
     * Removes a ribbon action by id.
     *
     * @param id - The id of the action to remove.
     * @unofficial
     */
    removeRibbonAction(id: string): void;

    /**
     * Serializes the ribbon's hidden-item state.
     *
     * @returns The serialized ribbon state.
     * @unofficial
     */
    serialize(): RibbonState;

    /**
     * Sets the collapsed state of the ribbon.
     *
     * @param collapsed - Whether the ribbon is collapsed.
     * @unofficial
     */
    setCollapsedState(collapsed: boolean): void;

    /**
     * Shows the ribbon.
     *
     * @unofficial
     */
    show(): void;
  }
}
