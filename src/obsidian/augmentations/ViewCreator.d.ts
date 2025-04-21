export {};

declare module 'obsidian' {
    /**
     * A view creator.
     *
     * @deprecated - Added only for typing purposes. Use {@link ViewCreator} instead.
     */
    type ViewCreator__ = (leaf: WorkspaceLeaf) => View;
}
