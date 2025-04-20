export {};

declare global {
    /**
     * Augments the built-in {@link String} interface.
     */
    interface String {
        /**
         * Checks if the string contains a specific substring.
         *
         * @param target - The substring to check for.
         * @returns `true` if the string contains the substring, `false` otherwise.
         * @example
         * ```ts
         * console.log('foo'.contains('oo')); // true
         * console.log('foo'.contains('bar')); // false
         * ```
         * @official
         */
        contains(target: string): boolean;

        /**
         * Checks if the string ends with a specific substring.
         *
         * @param searchString - The substring to check for.
         * @param endPosition - The position to end checking at.
         * @returns `true` if the string ends with the substring, `false` otherwise.
         * @example
         * ```ts
         * console.log('foo'.endsWith('oo')); // true
         * console.log('foo'.endsWith('fo')); // false
         * console.log('foo'.endsWith('foo', 2)); // false
         * console.log('foo'.endsWith('fo', 2)); // true
         * ```
         * @remarks The original version had different argument names.
         * See bug: {@link https://forum.obsidian.md/t/bug-string-endwith-definition/98103}.
         * @official
         */
        endsWith(searchString: string, endPosition?: number): boolean;

        /**
         * Formats a string using the indexed placeholders.
         *
         * @param args - The arguments to format the string with.
         * @returns The formatted string.
         * @example
         * ```ts
         * console.log('foo {0} bar {1} baz {0}'.format('qux', 'quux')); // foo qux bar quux baz qux
         * ```
         * @official
         */
        format(...args: string[]): string;

        /**
         * Checks if the string starts with a specific substring.
         *
         * @param searchString - The substring to check for.
         * @param position - The position to start checking from.
         * @returns `true` if the string starts with the substring, `false` otherwise.
         * @example
         * ```ts
         * console.log('foo'.startsWith('fo')); // true
         * console.log('foo'.startsWith('oo')); // false
         * console.log('foo'.startsWith('foo', 1)); // false
         * console.log('foo'.startsWith('oo', 1)); // true
         * ```
         * @official
         */
        startsWith(searchString: string, position?: number): boolean;
    }
}
