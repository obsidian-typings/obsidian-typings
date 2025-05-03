import type { TAbstractFile } from 'obsidian';
import type { FileExplorerView } from './FileExplorerView.d.ts';
import type { TreeNodeInfo } from '../../Tree/TreeNodeInfo.d.ts';
import type { TreeItem } from '../../Tree/TreeItem.d.ts';
import type { FileTreeItemParent } from './FileTreeItemParent.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface AbstractFileTreeItem<T extends TAbstractFile> extends TreeItem {
    /**
     * Associated file with this item.
     */
    file: T;
    /**
     * @todo Documentation incomplete.
     */
    info: TreeNodeInfo;
    /**
     * @todo Documentation incomplete.
     */
    parent: FileTreeItemParent;
    /**
     * @todo Documentation incomplete.
     */
    rendered: boolean;
    /**
     * @todo Documentation incomplete.
     */
    view: FileExplorerView;
    /**
     * @todo Documentation incomplete.
     */
    getTitle(): string;
    /**
     * @todo Documentation incomplete.
     */
    isFullTimeShown(): boolean;
    /**
     * @todo Documentation incomplete.
     */
    onRender(): void;
    /**
     * @todo Documentation incomplete.
     */
    startRename(): void;
    /**
     * @todo Documentation incomplete.
     */
    stopRename(): void;
    /**
     * @todo Documentation incomplete.
     */
    updateTitle(): void;
}
