import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { MarkdownImporterPlugin } from './MarkdownImporterPlugin.d.ts';

/**
 * Plugin instance for the Markdown importer, providing conversion from other formats to Markdown.
 * @public
 * @unofficial
 */
export interface MarkdownImporterPluginInstance extends InternalPluginInstance<MarkdownImporterPlugin> {
    /** Reference to the app. */
    app: App;
}
