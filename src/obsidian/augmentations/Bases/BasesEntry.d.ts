export {};

declare module 'obsidian' {
    /**
     * Represent a single "row" or file in a base.
     *
     * @since 1.10.0
     */
    interface BasesEntry extends FormulaContext {
        /**
         * File.
         *
         * @official
         * @since 1.10.0
         */
        file: TFile;

        /**
         * Get the value of the property.
         * Note: Errors are returned as {@link ErrorValue}
         *
         * @official
         * @since 1.10.0
         */
        getValue(propertyId: BasesPropertyId): Value | null;
    }
}
