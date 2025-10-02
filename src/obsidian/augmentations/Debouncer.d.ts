export {};

declare module 'obsidian' {
    /**
     * A debouncer wrapper for a function.
     *
     * @typeParam T - The type of the arguments of the function to debounce.
     * @typeParam V - The type of the return value of the function to debounce.
     */
    interface Debouncer<T extends unknown[], V> {
        /**
         * Call the debounced function.
         *
         * @param args - The arguments to pass to the function.
         * @returns The debouncer.
         * @example
         * ```ts
         * debouncer('foo');
         * ```
         * @official
         */
        (...args: [...T]): this;

        /**
         * Cancel any pending debounced function call.
         *
         * @returns The debouncer.
         * @example
         * ```ts
         * debouncer.cancel();
         * ```
         * @official
         */
        cancel(): this;

        /**
         * If there is any pending function call, clear the timer and call the function immediately.
         *
         * @returns The return value of the function or `void` if the are no pending function calls.
         * @example
         * ```ts
         * debouncer.run();
         * ```
         * @official
         * @since 1.4.4
         */
        run(): V | void;
    }
}
