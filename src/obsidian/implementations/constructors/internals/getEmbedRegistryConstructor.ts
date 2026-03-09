import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { EmbedRegistry } from '../../../internals/embed-registry/EmbedRegistry.d.ts';

type EmbedRegistryConstructor = ExtractConstructor<EmbedRegistry>;

/**
 * Get the EmbedRegistry constructor.
 *
 * @param app - The app instance.
 * @returns The EmbedRegistry constructor.
 *
 * @public
 * @unofficial
 */
export function getEmbedRegistryConstructor(app: App): EmbedRegistryConstructor {
  return app.embedRegistry.constructor as EmbedRegistryConstructor;
}
