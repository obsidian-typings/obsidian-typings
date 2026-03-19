import type { getBasesEntryConstructor } from '../../implementations/constructors/augmentations/bases/getBasesEntryConstructor.d.ts';

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
     * Constructor.
     *
     * To get the constructor instance, use {@link getBasesEntryConstructor} from `obsidian-typings/implementations`.
     *
     * @param ctx - The ctx.
     * @param file - The file.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__(ctx: unknown, file: TFile): this;

    /**
     * Get the value of the property.
     * Note: Errors are returned as {@link ErrorValue}
     *
     * @param propertyId - The property identifier to get the value for.
     * @returns The value of the property, or `null`.
     * @official
     * @since 1.10.0
     */
    getValue(propertyId: BasesPropertyId): null | Value;
  }
}
