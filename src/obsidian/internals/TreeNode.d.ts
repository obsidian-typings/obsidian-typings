/**
 * @todo Documentation incomplete
 */
/** @public */
export type TreeNode<T = object> = T & {
    childrenEl: HTMLElement;
    el: HTMLElement;
    info: {
        childLeft: number;
        childLeftPadding: number;
        childTop: number;
        computed: boolean;
        height: number;
        hidden: boolean;
        next: boolean;
        queued: boolean;
        width: number;
    };
    pusherEl: HTMLElement;
    vChildren: {
        addChild: (item: TreeNode<T>) => void;
        _children: TreeNode<T>[];
        owner: TreeNode<T>;
    };
};
