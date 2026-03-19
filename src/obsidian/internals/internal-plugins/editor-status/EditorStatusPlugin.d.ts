import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { EditorStatusPluginInstance } from './EditorStatusPluginInstance.d.ts';

/**
 * Internal plugin registration for the editor status bar feature.
 *
 * @public
 * @unofficial
 */
export interface EditorStatusPlugin extends InternalPlugin<EditorStatusPluginInstance> {}
