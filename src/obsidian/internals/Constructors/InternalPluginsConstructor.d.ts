import type { App } from 'obsidian';
import type { InternalPlugins } from '../InternalPlugins/InternalPlugins.d.ts';

/**
 * The InternalPlugins constructor.
 *
 * @public
 */
export type InternalPluginsConstructor = new(app: App) => InternalPlugins;
