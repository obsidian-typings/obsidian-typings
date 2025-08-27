import type { BasesQuery } from './BasesQuery.d.ts';

/**
 * Bases property.
 *
 * @public
 * @unofficial
 */
export interface BasesProperty {
    /**
     * The property ID.
     */
    propertyId: string;

    /**
     * The query.
     */
    query: BasesQuery;

    /**
     * The unrecognized data.
     */
    unrecognizedData: object;

    /**
     * Gets the display name.
     */
    getDisplayName(): string;

    /**
     * Migrates the display name.
     */
    migrateDisplayName(getDisplayName: string): string;

    /**
     * Serializes the property.
     */
    serialize(): object;

    /**
     * Sets the display name.
     */
    setDisplayName(displayName: string): void;
}
