/**
 * A node in a CLI ASCII tree.
 * @public
 * @unofficial
 */
export interface CliTreeNode {
    /** Child nodes. */
    children?: CliTreeNode[];

    /** Label text for this tree node. */
    label: string;
}
