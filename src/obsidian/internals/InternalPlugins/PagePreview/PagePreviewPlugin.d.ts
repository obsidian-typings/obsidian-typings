import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { PagePreviewPluginInstance } from './PagePreviewPluginInstance.d.ts';

/**
 * Internal plugin registration for the page preview (hover preview) feature.
 * @public
 * @unofficial
 */
export interface PagePreviewPlugin extends InternalPlugin<PagePreviewPluginInstance> {}
