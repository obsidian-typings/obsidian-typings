import type {
    FileTreeItem,
    TreeItem
} from "../index.js";

export interface FileExplorerViewFileItemsRecord extends Record<string, TreeItem<FileTreeItem>> {}
