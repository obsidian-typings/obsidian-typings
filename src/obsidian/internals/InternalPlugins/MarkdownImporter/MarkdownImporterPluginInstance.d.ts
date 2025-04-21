import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { MarkdownImporterPlugin } from './MarkdownImporterPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface MarkdownImporterPluginInstance extends InternalPluginInstance<MarkdownImporterPlugin> {
    /** @todo Documentation incomplete. */
    app: App;
}
