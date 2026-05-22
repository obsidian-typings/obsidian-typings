import type { ViewCreator } from 'obsidian';

import type { ViewRegistryViewByTypeMapping } from './ViewRegistryViewByTypeMapping.d.ts';

/**
 * Record mapping view type strings to their corresponding view creator functions.
 *
 * @public
 * @unofficial
 */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator>, ViewRegistryViewByTypeMapping {
}
