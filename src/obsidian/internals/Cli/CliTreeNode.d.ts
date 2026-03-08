/**
 * A node in a CLI ASCII tree.
 * @public
 * @unofficial
 */
export interface CliTreeNode {
    /** Label text for this tree node. */
    label: string;

    /** Child nodes. */
    children?: CliTreeNode[];
}
