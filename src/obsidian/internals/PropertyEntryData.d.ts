/**
 * Data for a single frontmatter property entry.
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
