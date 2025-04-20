export {};

declare global {
    /**
     * Augments the built-in {@link Math} interface.
     */
    interface Math {
        /**
         * Clamps a value between a minimum and maximum.
         *
         * @param value - The value to clamp.
         * @param min - The minimum value.
         * @param max - The maximum value.
         * @returns The clamped value.
         * @example
         * ```ts
         * console.log(Math.clamp(10, 0, 5)); // 5
         * console.log(Math.clamp(-10, 0, 5)); // 0
         * console.log(Math.clamp(3, 0, 5)); // 3
         * ```
         * @official
         */
        clamp(value: number, min: number, max: number): number;

        /**
         * Returns the square of a number.
         *
         * @param value - The number to square.
         * @returns The square of the number.
         * @example
         * ```ts
         * console.log(Math.square(2)); // 4
         * console.log(Math.square(-2)); // 4
         * ```
         * @official
         */
        square(value: number): number;
    }
}
