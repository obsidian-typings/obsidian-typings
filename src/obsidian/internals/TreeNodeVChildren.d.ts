import type { TreeNode } from './TreeNode.d.ts';

/** @public */
export interface TreeNodeVChildren<T> {
    _children: TreeNode<T>[];
    addChild: (item: TreeNode<T>) => void;
    owner: TreeNode<T>;
}
