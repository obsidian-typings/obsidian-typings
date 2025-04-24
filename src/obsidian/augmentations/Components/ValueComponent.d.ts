export {};

declare module 'obsidian' {
    /**
     * A value component.
     */
    interface ValueComponent<T> extends BaseComponent {
        /**
         * Get the value of the component.
         *
         * @returns The value of the component.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getValue} instead.
         */
        getValue__?(): T;

        /**
         * Register an option listener.
         *
         * @param listeners - The listeners to register.
         * @param key - The key of the option.
         * @returns The component.
         * @example
         * ```ts
         * valueComponent.registerOptionListener({
         *     'foo': (value) => {
         *         console.log(value);
         *     }
         * }, 'foo');
         * ```
         * @official
         */
        registerOptionListener(listeners: Record<string, (value?: T) => T>, key: string): this;

        /**
         * Set the value of the component.
         *
         * @param value - The value to set.
         * @returns The component.
         * @example
         * ```ts
         * valueComponent.setValue('foo');
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link setValue} instead.
         */
        setValue__(value: T): this;
    }
}
