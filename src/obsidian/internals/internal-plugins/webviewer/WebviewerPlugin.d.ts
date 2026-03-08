import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { WebviewerPluginInstance } from './WebviewerPluginInstance.d.ts';

/**
 * Internal plugin registration for the embedded web browser feature.
 * @public
 * @unofficial
 */
export interface WebviewerPlugin extends InternalPlugin<WebviewerPluginInstance> {
}
