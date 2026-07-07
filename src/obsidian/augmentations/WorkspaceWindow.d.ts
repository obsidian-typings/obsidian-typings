import type { getWorkspaceWindowConstructor } from '../implementations/constructors/augmentations/getWorkspaceWindowConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace window.
   *
   * @since 0.15.4
   */
  interface WorkspaceWindow extends WorkspaceContainer {
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
     * Closes the popout window, detaching its leaves.
     *
     * @unofficial
     */
    close(): void;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceWindowConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param id - The id.
     * @param size - The size.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor4__?(workspace: Workspace, id?: string, size?: Record<string, number>): this;

    /**
     * Updates the stored window size from the current Electron window bounds.
     *
     * @unofficial
     */
    updateSize(): void;

    /**
     * Updates the window title from the most recent leaf.
     *
     * @unofficial
     */
    updateTitle(): void;
  }
}
