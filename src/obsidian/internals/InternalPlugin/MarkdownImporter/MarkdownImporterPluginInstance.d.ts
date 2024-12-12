import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.js';
import type { MarkdownImporterPlugin } from './MarkdownImporterPlugin.js';

/** @public */
export interface MarkdownImporterPluginInstance extends InternalPluginInstance<MarkdownImporterPlugin> {
    app: App;
}
