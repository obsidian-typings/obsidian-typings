import type { FileExplorerLeaf } from "../InternalPlugins/FileExplorer/FileExplorerLeaf.js";
import type { ViewType } from "../../implementations/ViewType.js";

/** @public */
export type ViewTypeLeafMapping = {
    [ViewType.FileExplorer]: FileExplorerLeaf;
    [ViewType.Markdown]: FileExplorerLeaf;
};
