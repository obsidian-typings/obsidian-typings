/** Augmentations for the WorkspaceSplit interface. */
import type { getWorkspaceSplitConstructor } from '../implementations/constructors/augmentations/getWorkspaceSplitConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace split.
   * @since 0.9.7
   */
  interface WorkspaceSplit extends WorkspaceParent {
    /**
     * The parent of the split.
     *
     * @official
     */
    parent: WorkspaceParent;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceSplitConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param direction - The direction.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(workspace: Workspace, direction: string, id?: string): this;
  }
}
