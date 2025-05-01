import type { TFile } from 'obsidian';
import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';
import type { ContainerTreeItem } from '../../Tree/ContainerTreeItem.d.ts';
import type { FileTreeItemParent } from './FileTreeItemParent.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface FolderTreeItem extends AbstractFileTreeItem<TFile>, ContainerTreeItem<FileTreeItemParent> {
    /**
     * Sort file items inside by current sort order.
     */
    sort(): void;
}