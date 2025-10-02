export {};

declare module 'obsidian' {
    /**
     * The full ID of a property, used in the bases config file. The prefixed
     * {@link BasesPropertyType} disambiguates properties of the same name but from different sources.
     *
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link BasesPropertyId} instead.
     */
    type BasesPropertyId__ = `${BasesPropertyType}.${string}`;
}
