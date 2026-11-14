import type {
  Workspace,
  WorkspaceFloating,
  WorkspaceTabs
} from 'obsidian';

/**
 * A {@link obsidian#Workspace} whose layout is loaded, so the members that are `null` before that are set.
 *
 * Get one with the `isLayoutReady` type guard or the `onLayoutReadyEx` helper from `obsidian-typings/implementations`.
 *
 * @example
 *
 * ```ts
 * import { onLayoutReadyEx } from 'obsidian-typings/implementations';
 * onLayoutReadyEx(this.app.workspace, (workspace) => {
 *   console.log(workspace.floatingSplit.children.length);
 * });
 * ```
 *
 * @public
 * @unofficial
 */
export interface LayoutReadyWorkspace extends Workspace {
  /**
   * Currently active tab group.
   */
  activeTabGroup: WorkspaceTabs;

  /**
   * The workspace container that holds the popout (floating) windows.
   */
  floatingSplit: WorkspaceFloating;

  /**
   * Whether the layout of the app has been successfully initialized.
   */
  layoutReady: true;
}
