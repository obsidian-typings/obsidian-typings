import type { TFile } from 'obsidian';
import type { AbstractFileTreeItem } from './AbstractFileTreeItem.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface FileTreeItem extends AbstractFileTreeItem<TFile> {
    /**
     * Element that indicates associated file extension,
     * if it wasn't a Markdown file.
     */
    tagEl: HTMLElement | null;

    /** @todo Documentation incomplete. */
    isSupported(): boolean;
}
