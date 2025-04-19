import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * @todo Documentation incomplete
 * @public @unofficial
 */
export type TreeNode<T = object, Child = T, Owner = T> = T & {
    childrenEl: HTMLElement;
    el: HTMLElement;
    info: TreeNodeInfo;
    pusherEl: HTMLElement;
    vChildren: TreeNodeVChildren<Child, Owner>;
};
