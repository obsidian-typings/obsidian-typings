import type { Scope } from 'obsidian';

/**
 * The workspace's key scope, which delegates each keypress to a scope chosen at the time of the press.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceScope extends Scope {
  /**
   * Returns the scope to hand the keypress to, the active leaf's view scope for the workspace. When it returns `null`,
   * the keypress is handled by this scope's own keys and then its parent.
   *
   * @returns The scope to delegate to, or `null`.
   */
  cb(): null | Scope;
}
