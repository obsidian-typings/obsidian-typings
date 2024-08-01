import type {
    View,
    WorkspaceLeaf
} from "obsidian";

export interface ViewRegistryViewByTypeRecord extends Record<string, (leaf: WorkspaceLeaf) => View> { }
