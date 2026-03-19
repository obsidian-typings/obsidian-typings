import type { getWorkspaceItemConstructor } from '../implementations/constructors/augmentations/getWorkspaceItemConstructor.d.ts';
import type { SerializedWorkspaceItem } from '../internals/workspace/SerializedWorkspaceItem.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace item.
   * @since 0.10.2
   */
  interface WorkspaceItem extends Events {
    /**
     * Reference to the app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * The component managing the lifecycle of this workspace item.
     *
     * @unofficial
     */
    component: Component;

    /**
     * Container element for this workspace item.
     *
     * @unofficial
     */
    containerEl: HTMLDivElement;

    /**
     * The flex-grow dimension of this item within its parent split.
     *
     * @unofficial
     */
    dimension: null | number;

    /**
     * Unique identifier for this workspace item.
     *
     * @unofficial
     */
    id: string;

    /**
     * The direct parent of the leaf.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link WorkspaceItem.parent} instead.
     * @since 1.6.6
     */
    parent__: WorkspaceParent;

    /**
     * The resize handle element used for adjusting item dimensions.
     *
     * @unofficial
     */
    resizeHandleEl: HTMLHRElement;

    /**
     * The type identifier for this workspace item (e.g. 'leaf', 'split', 'tabs').
     *
     * @unofficial
     */
    type: string;

    /**
     * Reference to the workspace this item belongs to.
     *
     * @unofficial
     */
    workspace: Workspace;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceItemConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(workspace: Workspace, id?: string): this;

    /**
     * Detach this item from its parent.
     *
     * @unofficial
     */
    detach(): void;

    /**
     * Get the root container parent item, which can be one of:.
     * - {@link WorkspaceRoot}
     * - {@link WorkspaceWindow}
     *
     * @returns The root container parent item.
     * @official
     * @since 0.15.4
     */
    getContainer(): WorkspaceContainer;

    /**
     * Get the icon name for this workspace item.
     *
     * @returns The icon name for this workspace item.
     * @unofficial
     */
    getIcon(): IconName;

    /**
     * Get the root item.
     *
     * @returns The root workspace item.
     * @official
     * @since 0.10.2
     */
    getRoot(): WorkspaceItem;

    /**
     * Handle the start of a resize operation on this item.
     *
     * @param evt - The mouse event that started the resize.
     * @unofficial
     */
    onResizeStart(evt: MouseEvent): void;

    /**
     * The parent split containing this item.
     *
     * @returns The parent workspace container.
     * @unofficial
     */
    get parentSplit(): WorkspaceParent;

    /**
     * Serialize this workspace item's state for persistence.
     *
     * @returns The serialized workspace item state.
     * @unofficial
     */
    serialize(): SerializedWorkspaceItem;

    /**
     * Set the flex-grow dimension of this item within its parent split.
     *
     * @param dimension - The flex-grow value, or `null` to reset.
     * @unofficial
     */
    setDimension(dimension: null | number): void;

    /**
     * Set the parent split for this workspace item.
     *
     * @param parent - The parent workspace container.
     * @unofficial
     */
    setParent(parent: WorkspaceParent): void;
  }
}
