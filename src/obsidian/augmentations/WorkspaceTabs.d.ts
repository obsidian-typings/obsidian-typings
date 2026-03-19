import type { getWorkspaceTabsConstructor } from '../implementations/constructors/augmentations/getWorkspaceTabsConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace tabs.
   */
  interface WorkspaceTabs extends WorkspaceParent {
    /**
     * The parent of the tabs.
     *
     * @official
     */
    parent: WorkspaceSplit;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceTabsConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(workspace: Workspace, id?: string): this;
  }
}
