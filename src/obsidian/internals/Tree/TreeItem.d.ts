import type { TreeNode } from './TreeNode.d.ts';

/**
 * @todo Documentation incomplete
 * 
 * @public
 * @unofficial
 */
export interface TreeItem extends TreeNode {
    /**
     * @todo Documentation incomplete
     */ 
    coverEl: HTMLElement;
    /**
     * @todo Documentation incomplete
     */ 
    innerEl: HTMLElement;
    /**
     * @todo Documentation incomplete
     */ 
    selfEl: HTMLElement;
    /**
     * Execute item functionality on clicking tree item.
     */
    onSelfClick(event: MouseEvent): void;
    /**
     * Set clickable state of tree item.
     */
    setClickable(value: boolean): void;
}