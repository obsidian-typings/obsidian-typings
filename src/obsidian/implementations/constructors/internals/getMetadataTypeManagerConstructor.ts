import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { MetadataTypeManager } from '../../../internals/metadata-type-manager/MetadataTypeManager.d.ts';

/**
 * Get the MetadataTypeManager constructor.
 *
 * @param app - The app instance.
 * @returns The MetadataTypeManager constructor.
 *
 * @public
 * @unofficial
 */
export function getMetadataTypeManagerConstructor(app: App): ExtractConstructor<MetadataTypeManager> {
  return app.metadataTypeManager.constructor as ExtractConstructor<MetadataTypeManager>;
}
