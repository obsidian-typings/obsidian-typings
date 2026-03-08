import type { TAbstractFile } from 'obsidian';
import type { TreeItem } from '../../tree/TreeItem.d.ts';
import type { TreeNodeInfo } from '../../tree/TreeNodeInfo.d.ts';
import type { FileExplorerView } from './FileExplorerView.d.ts';
import type { FileTreeItemParent } from './FileTreeItemParent.d.ts';

/**
 * Base interface for file and folder tree items in the file explorer.
 *
 * @typeParam T - The type of the abstract file.
 * @public
 * @unofficial
 */
export interface AbstractFileTreeItem<T extends TAbstractFile> extends TreeItem {
    /**
     * Associated file with this item.
     */
    file: T;

    /** Tree node metadata and layout information. */
    info: TreeNodeInfo;

    /** Parent tree item (folder or tree root). */
    parent: FileTreeItemParent;

    /** Whether this item has been rendered to the DOM. */
    rendered: boolean;

    /** Reference to the file explorer view containing this item. */
    view: FileExplorerView;

    /**
     * Get the display title for this tree item.
     *
     * @returns The display title.
     */
    getTitle(): string;

    /**
     * Whether the full timestamp is shown for this item.
     *
     * @returns Whether the full timestamp is shown.
     */
    isFullTimeShown(): boolean;

    /** Called when this item is rendered to the DOM. */
    onRender(): void;

    /** Begin inline renaming of this tree item. */
    startRename(): void;

    /** Cancel inline renaming of this tree item. */
    stopRename(): void;

    /** Refresh the displayed title of this tree item. */
    updateTitle(): void;
}
