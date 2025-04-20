export {};

declare global {
    /**
     * Augments the built-in {@link ObjectConstructor} interface.
     */
    interface ObjectConstructor {
        /**
         * Check if all properties in an object satisfy a condition.
         *
         * @typeParam T - The type of the properties in the object.
         * @param object - The object to check.
         * @param callback - The condition to check.
         * @param context - The context passed as `this` to the `callback`.
         * @returns `true` if all properties satisfy the condition, `false` otherwise.
         * @example
         * ```ts
         * console.log(Object.each({ a: 1, b: 2 }, function(value) { return value > this.min }, { min: 0 })); // true
         * console.log(Object.each({ a: 1, b: 2 }, function(value) { return value > this.min }, { min: 1 }); // false
         * ```
         * @official
         */
        each<T>(
            object: {
                [key: string]: T;
            },
            callback: (value: T, key?: string) => boolean | void,
            context?: any
        ): boolean;

        /**
         * Checks if an object is empty.
         *
         * @param object - The object to check.
         * @returns `true` if the object is empty, `false` otherwise.
         * @example
         * ```ts
         * console.log(Object.isEmpty({})); // true
         * console.log(Object.isEmpty({ a: 1 })); // false
         * ```
         * @official
         */
        isEmpty(object: Record<string, any>): boolean;
    }
}
