import type { TFile } from 'obsidian';
import type { TreeCollapsibleItem } from '../../Tree/TreeCollapsibleItem.d.ts';
import type { TreeNodeVChildren } from '../../Tree/TreeNodeVChildren.d.ts';
import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';
import type { FileTreeItem } from './FileTreeItem.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface FolderTreeItem extends AbstractFileTreeItem<TFile>, TreeCollapsibleItem {
    /** @todo Documentation incomplete. */
    pusherEl: HTMLElement;

    /** @todo Documentation incomplete. */
    vChildren: TreeNodeVChildren<FolderTreeItem | FileTreeItem, FolderTreeItem>;

    /**
     * Sort file items inside by current sort order.
     */
    sort(): void;
}
