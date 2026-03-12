/**
 * Options for ensuring a side leaf exists in the workspace.
 * @public
 * @unofficial
 */
export interface EnsureSideLeafOptions {
  /**
   * Whether the leaf should be set as active.
   * @official
   */
  active?: boolean;

  /**
   * Whether the leaf should be revealed.
   * @official
   */
  reveal?: boolean;

  /**
   * Whether to create a new split for the leaf.
   * @official
   */
  split?: boolean;

  /**
   * The state to set on the leaf.
   * @official
   */
  state?: unknown;
}
