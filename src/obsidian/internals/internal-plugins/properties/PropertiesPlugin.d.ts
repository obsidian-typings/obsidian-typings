import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { PropertiesPluginInstance } from './PropertiesPluginInstance.d.ts';

/**
 * Internal plugin registration for the properties (frontmatter metadata) feature.
 * @public
 * @unofficial
 */
export interface PropertiesPlugin extends InternalPlugin<PropertiesPluginInstance> {}
