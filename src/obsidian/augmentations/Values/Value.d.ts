export {};

declare module 'obsidian' {
    /**
     * Container type for data which can expose functions for retrieving, comparing, and rendering the data.
     * Most commonly used in conjunction with formulas for Bases. Values can be used as formula parameters,
     * intermediate values, and the result of evaluation.
     *
     * @since 1.10.0
     */
    interface Value {
        /**
         * Returns a boolean indicating whether this Value is equal to the provided Value.
         *
         * @param other - The Value to compare to.
         * @returns A boolean indicating whether this Value is equal to the provided Value.
         * @official
         * @since 1.10.0
         */
        equals(other: this): boolean;

        /**
         * Returns a boolean indicating whether this Value is truthy.
         *
         * @returns A boolean indicating whether this Value is truthy.
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link Value.isTruthy} instead.
         */
        isTruthy__(): boolean;

        /**
         * Returns a boolean indicating whether this Value is loosely equal to the provided Value.
         *
         * @param other - The Value to compare to.
         * @returns A boolean indicating whether this Value is loosely equal to the provided Value.
         * @official
         * @since 1.10.0
         */
        looseEquals(other: Value): boolean;

        /**
         * Render this value into the provided HTMLElement.
         *
         * @param el - The HTMLElement to render to.
         * @param ctx - The RenderContext to render to.
         * @official
         * @since 1.10.0
         */
        renderTo(el: HTMLElement, ctx: RenderContext): void;

        /**
         * Get the string representation of this Value.
         *
         * @returns The string representation of this Value.
         * @deprecated - Added only for typing purposes. Use {@link Value.toString} instead.
         * @official
         * @since 1.10.0
         */
        toString__(): string;
    }

    namespace Value {
        /**
         * The type of the value.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link Value.type} instead.
         */
        let type__: string;
        /**
         * Equals.
         *
         * @param a - The Value to compare to.
         * @param b - The Value to compare to.
         * @returns A boolean indicating whether this Value is equal to the provided Value.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link Value.equals} instead.
         */
        function equals__(a: Value | null, b: Value | null): boolean;

        /**
         * Loose equals.
         *
         * @param a - The Value to compare to.
         * @param b - The Value to compare to.
         * @returns A boolean indicating whether this Value is loosely equal to the provided Value.
         *
         * @official
         * @since 1.10.0
         * @deprecated - Added only for typing purposes. Use {@link Value.looseEquals} instead.
         */
        function looseEquals__(a: Value | null, b: Value | null): boolean;
    }
}
