import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { MetadataTypeManager } from '../../../internals/metadata-type-manager/MetadataTypeManager.d.ts';

type MetadataTypeManagerConstructor = ExtractConstructor<MetadataTypeManager>;

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
