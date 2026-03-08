import type { App } from 'obsidian';
import type { EmbedRegistryConstructor } from '../../../internals/constructors/internals/EmbedRegistryConstructor.ts';

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
