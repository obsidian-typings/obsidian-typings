import type { BasesQuery } from './BasesQuery.d.ts';

/**
 * Bases property.
 *
 * @public
 * @unofficial
 */
export interface BasesProperty {
    /**
     * Gets the display name.
     *
     * @returns The display name.
     */
    getDisplayName(): string;

    /**
     * Migrates the display name.
     *
     * @param getDisplayName - The display name to migrate.
     * @returns The migrated display name.
     */
    migrateDisplayName(getDisplayName: string): string;

    /**
     * The property ID.
     */
    propertyId: string;

    /**
     * The query.
     */
    query: BasesQuery;

    /**
     * Serializes the property.
     *
     * @returns The serialized property data.
     */
    serialize(): object;

    /**
     * Sets the display name.
     *
     * @param displayName - The display name to set.
     */
    setDisplayName(displayName: string): void;

    /**
     * The unrecognized data.
     */
    unrecognizedData: object;
}
