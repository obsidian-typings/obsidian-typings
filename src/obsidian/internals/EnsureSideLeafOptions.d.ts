/**
 * Options for ensuring a side leaf exists in the workspace.
 *
 * @public
 * @unofficial
 */
export interface EnsureSideLeafOptions {
  /**
   * Whether the leaf should be set as active.
   */
  active?: boolean;

  /**
   * Whether the leaf should be revealed.
   */
  reveal?: boolean;

  /**
   * Whether to create a new split for the leaf.
   */
  split?: boolean;

  /**
   * The state to set on the leaf.
   */
  state?: unknown;
}
