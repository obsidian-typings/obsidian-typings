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
     * Gets the value for a built-in or property identifier (e.g. `this`, `note`, `file`, `formula`, or a property name).
     *
     * @param identifier - The identifier to resolve.
     * @returns The resolved value.
     * @unofficial
     */
    getByIdentifier(identifier: string): Value;

    /**
     * Gets the frontmatter property keys of the entry.
     *
     * @returns The property keys.
     * @unofficial
     */
    getPropertyKeys(): string[];

    /**
     * Gets the raw (un-wrapped) frontmatter value for a key.
     *
     * @param key - The property key.
     * @returns The raw value, or `null` if not present.
     * @unofficial
     */
    getRawProperty(key: string): unknown;

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

    /**
     * Gets all accessible keys on the entry (frontmatter keys plus `this`, `note`, `file`, `formula`).
     *
     * @returns The accessible keys.
     * @unofficial
     */
    keys(): string[];
  }
}
