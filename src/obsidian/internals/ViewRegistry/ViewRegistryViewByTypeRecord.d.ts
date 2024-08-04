import type {
    View,
    WorkspaceLeaf
} from "obsidian";

/** @public */
export interface ViewRegistryViewByTypeRecord extends Record<string, (leaf: WorkspaceLeaf) => View> {}
