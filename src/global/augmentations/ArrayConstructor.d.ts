export {};

declare global {
    /**
     * Augments the built-in {@link ArrayConstructor} interface.
     */
    interface ArrayConstructor {
        /**
         * Combines an array of arrays into a single array.
         *
         * @typeParam T - The type of the elements in the arrays.
         * @param arrays - The array of arrays to combine.
         * @returns A single array containing all elements from the input arrays.
         * @example
         * ```ts
         * console.log(Array.combine([[1, 2], [3, 4], [5, 6]])); // [1, 2, 3, 4, 5, 6]
         * ```
         * @official
         */
        combine<T>(arrays: T[][]): T[];
    }
}
