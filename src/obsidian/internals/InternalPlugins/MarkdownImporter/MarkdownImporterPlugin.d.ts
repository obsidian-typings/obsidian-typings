import type { InternalPlugin } from '../InternalPlugin.d.ts';
import type { MarkdownImporterPluginInstance } from './MarkdownImporterPluginInstance.d.ts';

/**
 * Internal plugin registration for the Markdown importer feature.
 * @public
 * @unofficial
 */
export interface MarkdownImporterPlugin extends InternalPlugin<MarkdownImporterPluginInstance> {}
