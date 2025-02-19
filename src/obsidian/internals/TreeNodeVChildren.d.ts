import type { TreeNode } from './TreeNode.d.ts';

/** @public */
export interface TreeNodeVChildren<T> {
    addChild: (item: TreeNode<T>) => void;
    _children: TreeNode<T>[];
    owner: TreeNode<T>;
}
