/**
 * Serialized representation of a single workspace item (leaf, split, or tab group).
 * @public
 * @unofficial
 */
export interface SerializedWorkspaceItem {
    /** Size dimension of the workspace item (width or height depending on split direction). */
    dimension?: number;

    /** Unique identifier of the workspace item. */
    id: string;

    /** Type of the workspace item (e.g., 'split', 'tabs', 'leaf'). */
    type: string;
}
