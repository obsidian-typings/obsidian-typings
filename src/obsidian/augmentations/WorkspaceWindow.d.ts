export {};

declare module 'obsidian' {
    /**
     * Workspace window.
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
        constructor2__(workspace: Workspace, id?: string, size?: Record<string, number>): this;
}
}
