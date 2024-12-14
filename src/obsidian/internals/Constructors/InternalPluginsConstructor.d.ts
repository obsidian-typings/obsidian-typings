import type { App } from 'obsidian';
import type { InternalPlugins } from '../InternalPlugins/InternalPlugins.js';

/**
 * The InternalPlugins constructor.
 *
 * @public
 */
export type InternalPluginsConstructor = new(app: App) => InternalPlugins;
