import type { App } from 'obsidian';
import type { MetadataTypeManagerConstructor } from '../../../internals/constructors/internals/MetadataTypeManagerConstructor.d.ts';

/**
 * Get the MetadataTypeManager constructor.
 *
 * @param app - The app instance.
 * @returns The MetadataTypeManager constructor.
 *
 * @public
 * @unofficial
 */
export function getMetadataTypeManagerConstructor(app: App): MetadataTypeManagerConstructor {
    return app.metadataTypeManager.constructor as MetadataTypeManagerConstructor;
}
