export {};

declare global {
    /**
     * Augments the built-in {@link NumberConstructor} interface.
     */
    interface NumberConstructor {
        /**
         * Type guard to check if a value is a number.
         *
         * @param obj - The value to check.
         * @returns `true` if the value is a number, `false` otherwise.
         * @example
         * ```ts
         * console.log(Number.isNumber(123)); // true
         * console.log(Number.isNumber('123')); // false
         * console.log(Number.isNumber(NaN)); // true
         * console.log(Number.isNumber(Infinity)); // true
         * console.log(Number.isNumber(-Infinity)); // true
         * ```
         * @remarks Regarding `NaN` see: {@link https://forum.obsidian.md/t/bug-number-isnumber-definition/98104}.
         * @official
         */
        isNumber(obj: any): obj is number;
    }
}
