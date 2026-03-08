import type { TreeNode } from './TreeNode.d.ts';

/**
 * Represents a single interactive item within a tree view UI component.
 * @public
 * @unofficial
 */
export interface TreeItem extends TreeNode {
    /** Overlay element covering the tree item, used for visual effects. */
    coverEl: HTMLElement;

    /** Inner container element holding the tree item content. */
    innerEl: HTMLElement;

    /**
     * Execute item functionality on clicking tree item.
     *
     * @param event - The mouse click event.
     */
    onSelfClick(event: MouseEvent): void;

    /** The main element representing this tree item in the DOM. */
    selfEl: HTMLElement;

    /**
     * Set clickable state of tree item.
     *
     * @param value - Whether the item should be clickable.
     */
    setClickable(value: boolean): void;
}
