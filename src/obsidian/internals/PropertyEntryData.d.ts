/**
 * Data for a single frontmatter property entry.
 *
 * @typeParam T - The type of the property value.
 * @public
 * @unofficial
 */
export interface PropertyEntryData<T> {
    /**
     * Property key.
     */
    key: string;

    /**
     * Property widget type.
     */
    type: string;

    /**
     * Property value.
     */
    value: T;
}
