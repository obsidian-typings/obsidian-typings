export {};

declare global {
    /**
     * Augments the built-in {@link StringConstructor} interface.
     */
    interface StringConstructor {
        /**
         * Type guard to check if a value is a string.
         *
         * @param obj - The value to check.
         * @returns `true` if the value is a string, `false` otherwise.
         * @example
         * ```ts
         * console.log(String.isString('foo')); // true
         * console.log(String.isString(123)); // false
         * ```
         * @official
         */
        isString(obj: any): obj is string;
    }
}
