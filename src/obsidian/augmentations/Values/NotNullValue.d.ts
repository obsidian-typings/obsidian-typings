export {};

declare module 'obsidian' {
    /**
     * Base type for all non-null {@link Values}.
     *
     * @since 1.10.0
     */
    interface NotNullValue extends Value {
    }
}
