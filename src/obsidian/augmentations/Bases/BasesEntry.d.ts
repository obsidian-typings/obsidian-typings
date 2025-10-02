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
         * @throws Error if the property is a formula and cannot be evaluated.
         * @official
         * @since 1.10.0
         */
        getValue(propertyId: BasesPropertyId): Value | null;
    }
}
