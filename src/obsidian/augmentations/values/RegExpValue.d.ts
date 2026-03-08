export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a RegExp pattern.
     *
     * @since 1.10.0
     */
    interface RegExpValue extends NotNullValue {
        /**
         * Returns a boolean indicating whether this RegExpValue is truthy.
         *
         * @returns A boolean indicating whether this RegExpValue is truthy.
         * @official
         * @since 1.10.0
         */
        isTruthy(): boolean;

        /**
         * Get the string representation of this RegExpValue.
         *
         * @returns The string representation of this RegExpValue.
         * @official
         * @since 1.10.0
         */
        toString(): string;
    }
}
