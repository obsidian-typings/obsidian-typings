export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a file in Obsidian.
     *
     * @since 1.10.0
     */
    interface FileValue extends NotNullValue {
        /**
         * Constructor.
         *
         * @param leaf - The leaf.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<FileValue>` or `getFileValueConstructor()` instead.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * Returns a boolean indicating whether this FileValue is truthy.
         *
         * @returns A boolean indicating whether this FileValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;
    
        /**
         * String representation of this FileValue.
         *
         * @returns The string representation of this FileValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
}
}
