import type { TFile } from 'obsidian';
import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';
import type { TreeItem } from '../../Tree/TreeItem.d.ts';
import type { FileTreeItemParent } from './FileTreeItemParent.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface FileTreeItem extends AbstractFileTreeItem<TFile>, TreeItem<FileTreeItemParent> {
    /**
     * Element that indicates associated file extension,
     * if it wasn't a Markdown file.
     */
    tagEl: HTMLElement | null;
    /**
     * @todo Documentation incomplete.
     */
    isSupported(): boolean;
}