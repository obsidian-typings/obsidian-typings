import type { WorkspaceLeaf } from "obsidian";
import type { View } from "obsidian";

/** @public */
export type TypedViewCreator<TView extends View> = (leaf: WorkspaceLeaf) => TView;
