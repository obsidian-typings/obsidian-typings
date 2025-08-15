export {};

declare global {
    /**
     * Augments the built-in {@link Array} interface.
     *
     * @typeParam T - The type of the elements in the array.
     */
    interface Array<T> {
        /**
         * Checks if the array contains a specific element.
         *
         * @param target - The element to check for.
         * @returns `true` if the element is found, `false` otherwise.
         * @example
         * ```ts
         * console.log([1, 2, 3].contains(2)); // true
         * console.log([1, 2, 3].contains(4)); // false
         * ```
         * @official
         */
        contains(target: T): boolean;

        /**
         * Returns the index of the last element that satisfies the provided predicate.
         *
         * @param predicate - The predicate to test each element.
         * @returns The index of the last element that satisfies the predicate, or `-1` if no such element is found.
         * @example
         * ```ts
         * console.log([1, 2, 3, 2, 1].findLastIndex(x => x === 2)); // 3
         * console.log([1, 2, 3, 2, 1].findLastIndex(x => x === 4)); // -1
         * ```
         * @official
         */
        findLastIndex(predicate: (value: T) => boolean): number;

        /**
         * Returns the first element of the array.
         *
         * @returns The first element of the array, or `undefined` if the array is empty.
         * @example
         * ```ts
         * console.log([1, 2, 3].first()); // 1
         * console.log([].first()); // undefined
         * ```
         * @official
         */
        first(): T | undefined;

        /**
         * Returns the last element of the array.
         *
         * @returns The last element of the array, or `undefined` if the array is empty.
         * @example
         * ```ts
         * console.log([1, 2, 3].last()); // 3
         * console.log([].last()); // undefined
         * ```
         * @official
         */
        last(): T | undefined;

        /**
         * Removes an element from the array, if it exists, otherwise returns the array unchanged.
         *
         * @param target - The element to remove.
         * @example
         * ```ts
         * let arr = [1, 2, 3];
         * arr.remove(2);
         * console.log(arr); // [1, 3]
         * arr = [1, 2, 3];
         * arr.remove(4);
         * console.log(arr); // [1, 2, 3]
         * ```
         * @official
         */
        remove(target: T): void;

        /**
         * Shuffles the array in place.
         *
         * @returns The array itself.
         * @example
         * ```ts
         * const arr = [1, 2, 3];
         * console.log(arr.shuffle()); // something like [2, 3, 1]
         * console.log(arr); // same as above
         * ```
         * @official
         */
        shuffle(): this;

        /**
         * Returns a new array with unique elements.
         *
         * @returns A new array with unique elements.
         * @example
         * ```ts
         * console.log([1, 2, 3, 2, 1].unique()); // [1, 2, 3]
         * ```
         * @official
         */
        unique(): T[];
    }
}
