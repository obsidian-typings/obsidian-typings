import type { TFile } from 'obsidian';
import type { TreeCollapsibleItem } from '../../Tree/TreeCollapsibleItem.d.ts';
import type { TreeNodeVChildren } from '../../Tree/TreeNodeVChildren.d.ts';
import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';

/**
 * Tree item representing a folder in the file explorer, supporting collapse and child items.
 * @public
 * @unofficial
 */
export interface FolderTreeItem extends AbstractFileTreeItem<TFile>, TreeCollapsibleItem {
    /** Spacer element used for indentation in the tree. */
    pusherEl: HTMLElement;

    /** Virtual children container managing child file and folder tree items. */
    vChildren: TreeNodeVChildren<FolderTreeItem | FileTreeItem, FolderTreeItem>;

    /**
     * Sort file items inside by current sort order.
     */
    sort(): void;
}
