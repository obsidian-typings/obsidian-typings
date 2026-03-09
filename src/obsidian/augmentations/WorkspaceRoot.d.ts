import type {
  getWorkspaceRootConstructor
} from '../implementations/constructors/augmentations/getWorkspaceRootConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace root.
   * @since 0.15.2
   */
  interface WorkspaceRoot extends WorkspaceContainer {
    /**
     * The document object.
     *
     * @official
     */
    doc: Document;

    /**
     * The window object.
     *
     * @official
     */
    win: Window;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceRootConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param direction - The direction.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor4__(workspace: Workspace, direction: string, id?: string): this;
  }
}
