export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a Date.
     * RelativeDateValue behaves the same as a {@link DateValue} however it renders as a time relative to now.
     *
     * @since 1.10.0
     */
    interface RelativeDateValue extends DateValue {
    }
}
